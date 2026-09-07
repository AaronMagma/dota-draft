// analyzer.js — движок аналитики драфта Dota 2

/**
 * Получение актуального пула всех героев с dotabuff.com.
 *
 * @returns {Array} Массив объектов героев со свойствами:
 *   id - строка ID героя (например, "axe")
 *   name - локализованное имя героя
 *   role - массив позиций [1-5]
 *   winrate - средневзвешенный винрейт по всем MMR-диапазонам (%)
 */
export async function fetchHeroesMeta() {
    const headers = {
        // Заголовки нужны, чтобы обойти Cloudflare
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
        'Accept-Language': 'ru-RU,ru;q=0.9'
    };

    try {
        // Запрашиваем страницу меты за последнюю неделю (Very High + все остальные рейтинги).
        const response = await fetch('https://ru.dotabuff.com/heroes/meta?date=week', { headers });
        
        if (!response.ok) throw new Error(`Failed to fetch heroes meta: ${response.status}`);

        // Парсим HTML как документ
        const parser = new DOMParser();
        const doc = parser.parseFromString(await response.text(), 'text/html');

        // Ищем таблицу с героями
        const rows = Array.from(doc.querySelectorAll('.table > tbody tr'));

        return rows.map((row) => {
            const heroCell = row.querySelector('[data-tooltip="Герой"] a');
            
            // Извлекаем ID из ссылки /heroes/alchemist -> alchemist
            const id = heroCell.href.split('/').pop(); 

            // Имя героя
            const name = heroCell.textContent.trim();

            // Позиции берутся из иконок над именем героя
            const roles = [];
            for (let i = 1; i <= 5; i++) {
                if (heroCell.parentElement.querySelector(`img[data-tooltip="${i}"]`)) {
                    roles.push(i);
                }
            }

            // ⚡️ Считываем ВСЕ колонки с винрейтами (по разным MMR)
            let totalWinrate = 0;
            let count = 0;

            // Проходим по первым пяти ячейкам (игнорируем первую общую)
            for (let colIdx = 1; colIdx <= 9; colIdx += 2) {
                const cell = row.children[colIdx];
                if (!cell || !cell.querySelector('span')) continue;
                
                // Пример текста ячейки: "46.13%"
                const winrateText = cell.querySelector('span').textContent;
                const winrate = parseFloat(winrateText.replace('%', ''));

                totalWinrate += winrate;
                count++;
            }

            // Вычисляем средний винрейт по всем диапазонам
            const avgWinrate = Math.round(totalWinrate / count);

            return { 
                id,
                name,
                role: roles,
                winrate: avgWinrate // Средневзвешенный винрейт
            };
        });
    } catch (err) {
        console.error(err.message);
        return [];
    }
}

/**
 * Получение объекта героя по его ID.
 *
 * @param {string} heroId - Уникальный идентификатор героя.
 * @returns Объект героя или null.
 */
export async function getHero(heroId) {
  try {
    const allHeroes = await fetchHeroesMeta();
    
    // Возвращает первого найденного героя с этим ID (регистр не важен)
    return allHeroes.find((hero) => hero.id === heroId.toLowerCase());
  } catch (err) {
    console.error('Ошибка при получении героя:', err.message);
    return null;
  }
}

/**
 * Константы для удобного перевода позиции в число.
 */
export const POSITION_MAP = {
    1: 'Керри',
    2: 'Мид / Оффлейн',
    3: 'Оффлейн',
    4: 'Саппорт 4',
    5: 'Хард саппорт'
};

/**
 * Считает очки за баланс состава при распределении ролей.
 *
 * Баллы начисляются так:
 * +5 если герой стоит на своей основной позиции (первой в списке)
 * +3 если он стоит на любой из подходящих ему позиций
 * 0 баллов если роль не подходит вообще.
 *
 * @param {Array<string>} teamHeroes Список ID выбранных героев.
 * @param {Array<number>} roleOrder Массив назначенных им позиций (от 1 до 5).
 * @returns Число набранных очков.
 */
async function calculateRoleScore(teamHeroes, roleOrder) {
    let score = 0;

    for (let i = 0; i < 5; i++) {
        const heroObj = await getHero(teamHeroes[i]);
        
        // Если герой не найден на Dotabuff (например, новый), пропускаем его
        if (!heroObj || !roleOrder[i]) continue;

        const assignedPosition = parseInt(roleOrder[i]); // Позиция от 1 до 5
        const isMainRole = heroObj.role[0] === assignedPosition;

        // Проверяем, может ли герой играть на этой позиции
        if (heroObj.role.includes(assignedPosition)) {
            score += isMainRole ? 5 : 3;
        }
    }

    return score;
}

/**
 * Считывает очки за пик конкретного героя во время драфта.
 *
 * Правила:
 * Пик метового героя (+10)
 * Контр-пик вражеского героя (+очки из списка counters)
 * Если тебя законтрили (-70% от силы контрпика)
 *
 * Баны никак не влияют на счёт!
 *
 * @param {'pick'} actionType Тип действия (только pick!).
 * @param {'radiant' | 'dire'} team Команда.
 * @param {string} heroId ID выбранного героя.
 * @param {Set<string>} enemyTeam Герои противника.
 * @returns Изменение счёта.
 */
export async function calculateDraftScore(actionType, team, heroId, enemyTeam) {
  const hero = await getHero(heroId); // <-- Добавлено await здесь
  let delta = 0;

  switch (actionType) {
      case 'pick':
          // Очки за мета-пика
          // ❗️ МЕТА-ГЕРОИ ТЕПЕРЬ ОПРЕДЕЛЯЮТСЯ ДИНАМИЧЕСКИ ПО ВИНРЕЙТУ!
          // Герой считается мета, если его общий винрейт >= 54%
          if (hero && hero.winrate >= 54) delta += 10;

          // Контрпики
          for (const enemy of enemyTeam.values()) {
              const enemyObj = await getHero(enemy); // <-- Добавлено await здесь
              if (!enemyObj || !COUNTERS[heroId]) continue;

              // Мы кого-то законтрили
              if (COUNTERS[heroId]?.includes(enemy.id)) {
                  delta += 15; // Твой бонус за контр-пик
              }

              // Нас законтрил враг
              if (COUNTERS[enemy.id]?.includes(hero.id)) {
                  delta -= Math.floor(15 * 0.7); // Штраф ~ -10
              }
          }
          break;

      // ❗ ВАЖНО: Бан любого героя НЕ влияет на очки!
      // case 'ban': ... удалено
  }

  return delta;
}

/**
 * Таблица контрпиков.
 * Добавляй свои пары здесь.
 */
export const COUNTERS = {
    // --- STRENGTH ---
    alchemist: ['ancient_apparition', 'viper', 'silencer'],
    axe: ['slark', 'timbersaw', 'pugna', 'brewmaster', 'spectre'],
    bristleback: ['viper', 'ancient_apparition', 'silencer', 'skywrath_mage', 'grimstroke'],
    centaur_warrunner: ['ember_spirit', 'storm_spirit', 'queen_of_pain', 'void_spirit', 'lina'],
    chaos_knight: ['spectre', 'naga_siren', 'phantom_lancer', 'morphling', 'arc_warden'],
    clockwerk: ['mirana', 'bounty_hunter'], // заглушка против инвизников
    dawnbreaker: ['weaver', 'viper', 'nyx_assassin', 'silencer'],
    doom: ['wraith_king', 'medusa', 'terrorblade', 'luna', 'abaddon'],
    dragon_knight: ['viper', 'huskar', 'bounty_hunter', 'weaver', 'troll_warlord'],
    earth_spirit: ['slark', 'riki', 'clinkz', 'troll_warlord', 'windranger'],
    earthshaker: ['spectre', 'templar_assassin', 'faceless_void', 'antimage', 'drow_ranger'],
    elder_titan: ['puck', 'templar_assassin', 'dark_seer', 'clockwerk'],
    huskar: ['ancient_apparition', 'outworld_destroyer', 'lich', 'shadow_shaman', 'bane'],
    kunkka: ['ancient_apparition', 'rubick', 'keeper_of_the_light', 'death_prophet'],
    legion_commander: ['phantom_lancer', 'naga_siren', 'broodmother', 'chaos_knight', 'lone_druid'],
    lifestealer: ['axe', 'earthshaker', 'abyssal_underlord', 'doom', 'spirit_breaker'],
    lycan: ['ancient_apparition', 'vengeful_spirit', 'keeper_of_the_light', 'dazzle'],
    mars: ['gyrocopter', 'drow_ranger', 'sniper', 'windranger'],
    night_stalker: ['lone_druid', 'meepo', 'beastmaster', 'chen', 'furion'],
    ogre_magi: ['ancient_apparition', 'skywrath_mage', 'zuus', 'rubick'],
    omniknight: ['invoker', 'ancient_apparition', 'viper', 'grimstroke'],
    phoenix: ['ancient_apparition', 'ember_spirit', 'zuus', 'skywrath_mage'],
    primal_beast: ['grimstroke', 'oracle', 'ancient_apparition', 'undying'],
    pudge: ['drow_ranger', 'sniper', 'windranger', 'hoodwink', 'gyrocopter'],
    slardar: ['templar_assassin', 'morphling', 'arc_warden', 'troll_warlord', 'razor'],
    spirit_breaker: ['puck', 'storm_spirit', 'ember_spirit', 'queen_of_pain', 'tusk'],
    sven: ['slardar', 'ancient_apparition', 'disruptor', 'death_prophet'],
    tidehunter: ['gyrocopter', 'luna', 'drow_ranger', 'sniper', 'windranger'],
    timbersaw: ['ancient_apparition', 'bloodseeker', 'axe', 'primal_beast'],
    tiny: ['ursa', 'bloodseeker', 'legion_commander', 'slardar', 'bristleback'],
    treant_protector: ['nyx_assassin', 'bounty_hunter', 'spirit_breaker', 'batrider'],
    tusk: ['monkey_king', 'spectre', 'faceless_void', 'medusa', 'terrorblade'],
    underlord: ['enchantress', 'broodmother', 'natures_prophet', 'furion'],
    undying: ['rubick', 'pugna', 'ancient_apparition', 'keeper_of_the_light'],
    wraith_king: ['pugna', 'ancient_apparition', 'grimstroke', 'oracle'],

    // AGILITY
    antimage: ['templar_assassin', 'nyx_assassin', 'dazzle', 'oracle', 'rubick'],
    bloodseeker: ['axe', 'primal_beast', 'centaur_warrunner', 'mars', 'kunkka'],
    bounty_hunter: ['keeper_of_the_light', 'techies', 'dark_willow', 'grimstroke', 'phoenix'],
    broodmother: ['ancient_apparition', 'earthshaker', 'nevermore', 'invoker', 'tiny'],
    clinkz: ['ancient_apparition', 'undying', 'necrophos', 'witch_doctor', 'warlock'],
    drow_ranger: ['bounty_hunter', 'spirit_breaker', 'axe', 'tidehunter', 'centaur_warrunner'],
    ember_spirit: ['ancient_apparition', 'skywrath_mage', 'zuus', 'rubick', 'disruptor'],
    faceless_void: ['spectre', 'earthshaker', 'magnus', 'slardar', 'dragon_knight'],
    gyrocopter: ['ancient_apparition', 'grimstroke', 'oracle', 'winter_wyvern'],
    hoodwink: ['ancient_apparition', 'rubick', 'keeper_of_the_light', 'death_prophet'],
    juggernaut: ['ancient_apparition', 'disruptor', 'death_prophet', 'warlock', 'enigma'],
    kez: ['ancient_apparition', 'keeper_of_the_light', 'silencer', 'rubick'],
    lone_druid: ['chen', 'enigma', 'earthshaker', 'magnus', 'beastmaster'],
    luna: ['vengeful_spirit', 'dazzle', 'oracle', 'abaddon', 'winter_wyvern'],
    medusa: ['viper', 'ancient_apparition', 'skywrath_mage', 'silencer', 'zeus'],
    meepo: ['earthshaker', 'enigma', 'magnus', 'void_spirit', 'ember_spirit'],
    mirana: ['keeper_of_the_light', 'night_stalker', 'bounty_hunter', 'viper'],
    monkey_king: ['earthshaker', 'enigma', 'magnus', 'tidehunter', 'centaur_warrunner'],
    morphling: ['ember_spirit', 'queen_of_pain', 'skywrath_mage', 'lina', 'ancient_apparition'],
    naga_siren: ['earthshaker', 'tidehunter', 'magnus', 'enigma', 'dark_seer'],
    phantom_assassin: ['axe', 'beastmaster', 'legion_commander', 'abyssal_underlord', 'spirit_breaker'],
    phantom_lancer: ['ancient_apparition', 'earthshaker', 'magnus', 'kunkka', 'enigma'],
    razor: ['chen', 'enigma', 'earthshaker', 'magnus', 'jakiro'],
    riki: ['ancient_apparition', 'keeper_of_the_light', 'skywrath_mage', 'rubick', 'grimstroke'],
    shadow_fiend: [], // заглушка под ранний прессинг/ганк
    slark: ['bounty_hunter', 'bloodseeker', 'slardar', 'spirit_breaker', 'axe'],
    sniper: ['spirit_breaker', 'bounty_hunter', 'pudge', 'axe', 'centaur_warrunner'],
    spectre: ['ancient_apparition', 'earthshaker', 'doom', 'axe', 'magnus'],
    templar_assassin: ['invoker', 'ancient_apparition', 'earthshaker', 'nevermore', 'lina'],
    terrorblade: ['ancient_apparition', 'grimstroke', 'vengeful_spirit', 'earthshaker', 'axe'],
    troll_warlord: ['keeper_of_the_light', 'techies', 'dark_willow', 'grimstroke', 'phoenix'],
    ursa: ['winter_wyvern', 'beastmaster', 'phoenix', 'keeper_of_the_light', 'dazzle'],
    vengeful_spirit: ['invoker', 'ancient_apparition', 'viper', 'grimstroke'],
    viper: ['ancient_apparition', 'zuus', 'rubick', 'keeper_of_the_light'],
    weaver: ['bane', 'bloodseeker', 'skywrath_mage', 'ancient_apparition', 'silencer'],

    // INTELLIGENCE
    ancient_apparition: ['tiny', 'spirit_breaker', 'pudge', 'axe', 'centaur_warrunner'],
    chen: ['night_stalker', 'bounty_hunter', 'riki', 'naga_siren'],
    crystal_maiden: ['bounty_hunter', 'nyx_assassin', 'centaur_warrunner', 'spirit_breaker', 'axe'],
    dark_seer: ['puck', 'rubick', 'keeper_of_the_light', 'death_prophet'],
    dark_willow: ['juggernaut', 'faceless_void', 'sven', 'wraith_king'],
    disruptor: ['storm_spirit', 'ember_spirit', 'queen_of_pain', 'puck', 'riki'],
    enchantress: ['heroes_with_burst', 'outworld_destroyer', 'lion', 'skywrath_mage', 'lina'],
    grimstroke: ['juggernaut', 'faceless_void', 'sven', 'wraith_king', 'troll_warlord'],
    invoker: ['legion_commander', 'axe', 'centaur_warrunner', 'bristleback', 'ursa'],
    jakiro: ['ancient_apparition', 'rubick', 'keeper_of_the_light', 'death_prophet'],
    keeper_of_the_light: ['night_stalker', 'bounty_hunter', 'riki', 'naga_siren', 'clinkz'],
    leshrac: ['nyx_assassin', 'silencer', 'disruptor', 'rubick', 'oracle'],
    lich: ['ancient_apparition', 'rubick', 'keeper_of_the_light', 'death_prophet'],
    lina: ['lion', 'legion_commander', 'axe', 'faceless_void', 'centaur_warrunner'],
    lion: ['juggernaut', 'omniknight', 'legion_commander', 'faceless_void', 'troll_warlord'],
    muerta: ['ancient_apparition', 'zuus', 'rubick', 'keeper_of_the_light'],
    necrophos: ['silencer', 'axe', 'doom', 'spirit_breaker', 'legion_commander'],
    oracle: ['juggernaut', 'legion_commander', 'axe', 'faceless_void', 'troll_warlord'],
    outworld_destroyer: ['enigma', 'earthshaker', 'beastmaster', 'nyx_assassin'],
    puck: ['stealth_heroes', 'silencer', 'disruptor', 'doom', 'axe'],
    pugna: ['underlord', 'huskar', 'dragon_knight', 'wraith_king', 'life_stealer'],
    queen_of_pain: ['silencer', 'doom', 'axe', 'legion_commander', 'faceless_void'],
    ringmaster: ['ancient_apparition', 'zuus', 'rubick', 'keeper_of_the_light'],
    rubick: ['heroes_without_good_spells', 'slark', 'troll_warlord', 'ursa', 'spectre'],
    silencer: ['storm_spirit', 'queen_of_pain', 'lina', 'skywrath_mage', 'death_prophet'],
    skywrath_mage: ['ancient_apparition', 'zuus', 'rubick', 'keeper_of_the_light'],
    storm_spirit: ['silencer', 'disruptor', 'ancient_apparition', 'ember_spirit', 'lina'],
    tinker: ['antimage', 'ancient_apparition', 'viper', 'silencer'],
    warlock: ['abaddon', 'winter_wyvern', 'omniknight', 'treant_protector', 'dazzle'],
    winter_wyvern: ['chaos_knight', 'phantom_lancer', 'terrorblade', 'spectre', 'medusa'],
    witch_doctor: ['abaddon', 'winter_wyvern', 'omniknight', 'treant_protector', 'dazzle'],
    zeus: ['anti-mage', 'ancient_apparition', 'storm_spirit', 'ember_spirit', 'skywrath_mage'],

    // UNIVERSAL
    abaddon: ['ancient_apparition', 'viper', 'grimstroke', 'oracle'],
    arc_warden: ['pugna', 'ancient_apparition', 'grimstroke', 'oracle'],
    bane: ['juggernaut', 'omniknight', 'legion_commander', 'faceless_void'],
    batrider: ['ancient_apparition', 'viper', 'keeper_of_the_light', 'death_prophet'],
    beastmaster: ['keeper_of_the_light', 'techies', 'dark_willow', 'grimstroke'],
    brewmaster: ['ancient_apparition', 'viper', 'keeper_of_the_light', 'death_prophet'],
    dazzle: ['ancient_apparition', 'viper', 'keeper_of_the_light', 'death_prophet'],
    death_prophet: ['silencer', 'axe', 'legion_commander', 'faceless_void'],
    enigma: ['ancient_apparition', 'rubick', 'keeper_of_the_light', 'death_prophet'],
    io: ['rubick', 'keeper_of_the_light', 'death_prophet', 'ancient_apparition'],
    magnus: ['puck', 'silencer', 'disruptor', 'doom'],
    marci: ['ancient_apparition', 'viper', 'keeper_of_the_light', 'death_prophet'],
    natures_prophet: ['ancient_apparition', 'rubick', 'keeper_of_the_light', 'death_prophet'],
    nyx_assassin: ['keeper_of_the_light', 'techies', 'dark_willow', 'grimstroke'],
    pangolier: ['keeper_of_the_light', 'techies', 'dark_willow', 'grimstroke'],
    sand_king: ['keeper_of_the_light', 'techies', 'dark_willow', 'grimstroke'],
    snapfire: ['ancient_apparition', 'viper', 'keeper_of_the_light', 'death_prophet'],
    techies: ['chen', 'enigma', 'earthshaker', 'magnus'],
    venomancer: ['ancient_apparition', 'rubick', 'keeper_of_the_light', 'death_prophet'],
    visage: ['keeper_of_the_light', 'techies', 'dark_willow', 'grimstroke'],
    void_spirit: ['keeper_of_the_light', 'techies', 'dark_willow', 'grimstroke'],
    windranger: ['keeper_of_the_light', 'techies', 'dark_willow', 'grimstroke']
};
