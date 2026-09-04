// analyzer.js — движок аналитики драфта Dota 2

/**
 * Пул всех героев. Для каждого героя указаны его роли в виде цифр позиций: [1] = керри, [4, 5] = саппорты.
 */
const heroesPool = [
    // Strength
    { id: 'alchemist', name: 'Alchemist', role: [1], icon: "🧪" },
    { id: 'axe', name: 'Axe', role: [3], icon: "🪓" },
    { id: 'bristleback', name: 'Bristleback', role: [3], icon: "🦔" },
    { id: 'centaur', name: 'Centaur Warrunner', role: [3, 2], icon: "🛡️" },
    { id: 'chaos_knight', name: 'Chaos Knight', role: [1, 3], icon: "🐴" },
    { id: 'clockwerk', name: 'Clockwerk', role: [4, 5], icon: "⚙️" },
    { id: 'dawnbreaker', name: 'Dawnbreaker', role: [3], icon: "🔨" },
    { id: 'doom', name: 'Doom', role: [3, 1], icon: "😈" },
    { id: 'dragon_knight', name: 'Dragon Knight', role: [2, 1], icon: "🐉" },
    { id: 'earth_spirit', name: 'Earth Spirit', role: [2], icon: "🟢" },
    { id: 'earthshaker', name: 'Earthshaker', role: [2], icon: "🪨" },
    { id: 'elder_titan', name: 'Elder Titan', role: [4, 5], icon: "🤠" },
    { id: 'huskar', name: 'Huskar', role: [2, 3], icon: "🩸" },
    { id: 'kunkka', name: 'Kunkka', role: [2, 3], icon: "⚓" },
    { id: 'largo', name: 'Largo', role: [3], icon: "🥊" },
    { id: 'legion_commander', name: 'Legion Commander', role: [3], icon: "🚩" },
    { id: 'lifestealer', name: 'Lifestealer', role: [1], icon: "🦷" },
    { id: 'lycan', name: 'Lycan', role: [2, 3], icon: "🐺" },
    { id: 'mars', name: 'Mars', role: [3], icon: "⭕" },
    { id: 'night_stalker', name: 'Night Stalker', role: [3], icon: "🦇" },
    { id: 'ogre_magi', name: 'Ogre Magi', role: [4, 5], icon: "👥" },
    { id: 'omniknight', name: 'Omniknight', role: [4, 5], icon: "🛡️" },
    { id: 'phoenix', name: 'Phoenix', role: [4, 5], icon: "🦅" },
    { id: 'primal_beast', name: 'Primal Beast', role: [2, 3], icon: "🦖" },
    { id: 'pudge', name: 'Pudge', role: [1, 2, 3, 4, 5], icon: "🥩" },
    { id: 'slardar', name: 'Slardar', role: [3, 2], icon: "🐟" },
    { id: 'spirit_breaker', name: 'Spirit Breaker', role: [3, 4, 5], icon: "🐮" },
    { id: 'sven', name: 'Sven', role: [1], icon: "⚔️" },
    { id: 'tidehunter', name: 'Tidehunter', role: [3], icon: "🍉" },
    { id: 'timbersaw', name: 'Timbersaw', role: [3, 2], icon: "🌲" },
    { id: 'tiny', name: 'Tiny', role: [1], icon: "🗿" },
    { id: 'treant_protector', name: 'Treant Protector', role: [4, 5], icon: "🌳" },
    { id: 'tusk', name: 'Tusk', role: [4, 5], icon: "❄️" },
    { id: 'underlord', name: 'Underlord', role: [3], icon: "🟢" },
    { id: 'undying', name: 'Undying', role: [3, 4, 5], icon: "🧟" },
    { id: 'wraith_king', name: 'Wraith King', role: [1], icon: "👑" },

    // Agility
    { id: 'anti_mage', name: 'Anti-Mage', role: [1], icon: "🔮" },
    { id: 'bloodseeker', name: 'Bloodseeker', role: [1], icon: "🩸" },
    { id: 'bounty_hunter', name: 'Bounty Hunter', role: [4, 5], icon: "💰" },
    { id: 'broodmother', name: 'Broodmother', role: [2, 1], icon: "🕷️" },
    { id: 'clinkz', name: 'Clinkz', role: [1], icon: "🏹" },
    { id: 'drow_ranger', name: 'Drow Ranger', role: [1], icon: "❄️" },
    { id: 'ember_spirit', name: 'Ember Spirit', role: [2], icon: "🔥" },
    { id: 'faceless_void', name: 'Faceless Void', role: [1], icon: "⏳" },
    { id: 'gyrocopter', name: 'Gyrocopter', role: [1], icon: "🚀" },
    { id: 'hoodwink', name: 'Hoodwink', role: [4, 5], icon: "🐿️" },
    { id: 'juggernaut', name: 'Juggernaut', role: [1], icon: "👺" },
    { id: 'kez', name: 'Kez', role: [1, 2], icon: "🦤" },
    { id: 'lone_druid', name: 'Lone Druid', role: [1], icon: "🐻" },
    { id: 'luna', name: 'Luna', role: [1], icon: "🌙" },
    { id: 'medusa', name: 'Medusa', role: [1], icon: "🐍" },
    { id: 'meepo', name: 'Meepo', role: [1, 2], icon: "⛏️" },
    { id: 'mirana', name: 'Mirana', role: [4, 5], icon: "🐯" },
    { id: 'monkey_king', name: 'Monkey King', role: [1, 2], icon: "🐒" },
    { id: 'morphling', name: 'Morphling', role: [1, 2], icon: "🌊" },
    { id: 'naga_siren', name: 'Naga Siren', role: [1], icon: "🧜" },
    { id: 'phantom_assassin', name: 'Phantom Assassin', role: [1], icon: "🗡️" },
    { id: 'phantom_lancer', name: 'Phantom Lancer', role: [1], icon: "🐒" },
    { id: 'razor', name: 'Razor', role: [1, 3, 2], icon: "⚡" },
    { id: 'riki', name: 'Riki', role: [1, 2], icon: "👣" },
    { id: 'shadow_fiend', name: 'Shadow Fiend', role: [1, 2], icon: "💀" },
    { id: 'slark', name: 'Slark', role: [1, 2], icon: "🦈" },
    { id: 'sniper', name: 'Sniper', role: [1, 2], icon: "🎯" },
    { id: 'spectre', name: 'Spectre', role: [1], icon: "👻" },
    { id: 'templar_assassin', name: 'Templar Assassin', role: [1], icon: "💜" },
    { id: 'terrorblade', name: 'Terrorblade', role: [1], icon: "😈" },
    { id: 'troll_warlord', name: 'Troll Warlord', role: [1], icon: "🪓" },
    { id: 'ursa', name: 'Ursa', role: [1], icon: "🐻" },
    { id: 'vengeful_spirit', name: 'Vengeful Spirit', role: [4, 5, 1], icon: "🦅" },
    { id: 'viper', name: 'Viper', role: [2, 3], icon: "🐍" },
    { id: 'weaver', name: 'Weaver', role: [1], icon: "🕷️" },

    // Intelligence
    { id: 'ancient_apparition', name: 'Ancient Apparition', role: [4, 5], icon: "🫐" },
    { id: 'chen', name: 'Chen', role: [4, 5], icon: "🐘" },
    { id: 'crystal_maiden', name: 'Crystal Maiden', role: [4, 5], icon: "❄️" },
    { id: 'dark_seer', name: 'Dark Seer', role: [3], icon: "🧠" },
    { id: 'dark_willow', name: 'Dark Willow', role: [4, 5], icon: "🧚" },
    { id: 'disruptor', name: 'Disruptor', role: [4, 5], icon: "🌩️" },
    { id: 'enchantress', name: 'Enchantress', role: [4, 5], icon: "🦌" },
    { id: 'grimstroke', name: 'Grimstroke', role: [5, 4], icon: "🖌️" },
    { id: 'invoker', name: 'Invoker', role: [2], icon: "☄️" },
    { id: 'jakiro', name: 'Jakiro', role: [4, 5], icon: "🐲" },
    { id: 'keeper_of_the_light', name: 'Keeper of the Light', role: [2, 4, 5], icon: "☀️" },
    { id: 'leshrac', name: 'Leshrac', role: [2], icon: "🐎" },
    { id: 'lich', name: 'Lich', role: [4, 5], icon: "💀" },
    { id: 'lina', name: 'Lina', role: [2], icon: "🔥" },
    { id: 'lion', name: 'Lion', role: [5, 4], icon: "🦁" },
    { id: 'muerta', name: 'Muerta', role: [1], icon: "💀" },
    { id: 'necrophos', name: 'Necrophos', role: [2, 1], icon: "🤢" },
    { id: 'oracle', name: 'Oracle', role: [4, 5], icon: "🔮" },
    { id: 'outworld_destroyer', name: 'Outworld Destroyer', role: [2], icon: "🛸" },
    { id: 'puck', name: 'Puck', role: [2], icon: "🧚" },
    { id: 'pugna', name: 'Pugna', role: [4, 5], icon: "🟢" },
    { id: 'queen_of_pain', name: 'Queen of Pain', role: [2], icon: "👑" },
    { id: 'ringmaster', name: 'Ringmaster', role: [4, 5], icon: "🎪" },
    { id: 'rubick', name: 'Rubick', role: [2, 4, 5], icon: "💚" },
    { id: 'shadow_demon', name: 'Shadow Demon', role: [4, 5], icon: "😈" },
    { id: 'shadow_shaman', name: 'Shadow Shaman', role: [4, 5], icon: "🐍" },
    { id: 'silencer', name: 'Silencer', role: [4, 5], icon: "🤫" },
    { id: 'skywrath_mage', name: 'Skywrath Mage', role: [2, 4, 5], icon: "🦅" },
    { id: 'storm_spirit', name: 'Storm Spirit', role: [2], icon: "⚡" },
    { id: 'tinker', name: 'Tinker', role: [2], icon: "🤖" },
    { id: 'warlock', name: 'Warlock', role: [4, 5], icon: "📜" },
    { id: 'winter_wyvern', name: 'Winter Wyvern', role: [4, 5], icon: "❄️" },
    { id: 'witch_doctor', name: 'Witch Doctor', role: [4, 5], icon: "🧪" },
    { id: 'zeus', name: 'Zeus', role: [2, 4, 5], icon: "☁️" },

    // Universal
    { id: 'abaddon', name: 'Abaddon', role: [3, 4, 5, 1], icon: "🐴" },
    { id: 'arc_warden', name: 'Arc Warden', role: [2], icon: "🌀" },
    { id: 'bane', name: 'Bane', role: [4, 5], icon: "👁️" },
    { id: 'batrider', name: 'Batrider', role: [2, 4, 3], icon: "🦇" },
    { id: 'beastmaster', name: 'Beastmaster', role: [3, 2], icon: "🐗" },
    { id: 'brewmaster', name: 'Brewmaster', role: [3], icon: "🐼" },
    { id: 'dazzle', name: 'Dazzle', role: [4, 5], icon: "🔮" },
    { id: 'death_prophet', name: 'Death Prophet', role: [3, 2], icon: "👻" },
    { id: 'enigma', name: 'Enigma', role: [3, 5, 4], icon: "🕳️" },
    { id: 'io', name: 'Io', role: [2, 5, 4], icon: "⚪" },
    { id: 'magnus', name: 'Magnus', role: [3, 4], icon: "🦏" },
    { id: 'marci', name: 'Marci', role: [3, 4, 5], icon: "👊" },
    { id: 'natures_prophet', name: 'Nature\'s Prophet', role: [1, 2, 5, 4], icon: "🌱" },
    { id: 'nyx_assassin', name: 'Nyx Assassin', role: [4, 5, 2], icon: "🪲" },
    { id: 'pangolier', name: 'Pangolier', role: [2, 3], icon: "🦔" },
    { id: 'sand_king', name: 'Sand King', role: [2, 3], icon: "🦂" },
    { id: 'snapfire', name: 'Snapfire', role: [2, 4, 3, 5], icon: "🦎" },
    { id: 'techies', name: 'Techies', role: [4, 5], icon: "💣" },
    { id: 'venomancer', name: 'Venomancer', role: [4, 5], icon: "🐍" },
    { id: 'visage', name: 'Visage', role: [2, 3], icon: "🪨" },
    { id: 'void_spirit', name: 'Void Spirit', role: [2], icon: "🌌" },
    { id: 'windranger', name: 'Windranger', role: [2, 1, 4], icon: "🍃" }
];

/**
 * Получение объекта героя по его ID.
 *
 * @param {string} heroId - Уникальный идентификатор героя.
 * @returns Объект героя или null.
 */
export function getHero(heroId) {
  return heroesPool.find((hero) => hero.id === heroId);
}

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
export function calculateRoleScore(teamHeroes, roleOrder) {
  let score = 0;

  for (let i = 0; i < 5; i++) {
    const hero = getHero(teamHeroes[i]);
    if (!hero || !roleOrder[i]) continue;

    const assignedPosition = parseInt(roleOrder[i]); // Позиция от 1 до 5
    const isMainRole = hero.role[0] === assignedPosition; // Основная ли это роль?

    // Проверяем, может ли герой играть на этой позиции
    if (hero.role.includes(assignedPosition)) {
      score += isMainRole ? 5 : 3;
    } else {
      // Герой не может стоять на этой позиции -> 0 очков
      score += 0;
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
export function calculateDraftScore(actionType, team, heroId, enemyTeam) {
  const hero = getHero(heroId);
  let delta = 0;

  // Мета-герои (настройка под текущую мете!)
  const META_HEROES = new Set(['centaur', 'clockwerk', 'doom', 'earth_spirit', 'lifestealer', 'tiny', 
                               'treant_protector', 'underlord', 'undying', 'ember_spirit', 'hoodwink', 
                               'lone_druid', 'shadow_fiend', 'terrorblade', 'dark_willow', 'keeper_of_the_light', 
                               'lina', 'winter_wyvern', 'bane', 'natures_prophet', 'pangolier', 'snapfire' 
    /* Добавь сюда актуальные ID по твоей текущей мете.
       Например: 'treant_protector', 'ember_spirit', 'mars'
     */
  ]);

  // Контрпики (добавляй свои пары здесь)
  const COUNTERS = {
    axe: ['slark', 'outworld_destroyer', 'timbersaw', 'shadow_demon', 'pugna', ], // Axe сильно контрит Slark
    alchemist : ['lifestealer', 'necrophos', 'doom', 'ancient_apparition'],
    bristleback : ['slark', 'viper', 'legion_commander', 'hoodwink', 'ancient_apparition'],
    centaur : ['lifestealer', 'timbersaw', 'disruptor', 'underlord', 'treant_protector', 'puck'],
    chaos_knight : ['naga_siren', 'puck', 'sand_king', 'earthshaker', 'phoenix'],
    dawnbreaker : ['weaver', 'viper', 'underlord', 'nyx_assassin', 'silencer'],
    doom : ['wraith_king', 'lone_druid', 'centaur', 'rubick', 'oracle'],
    dragon_knight : ['huskar', 'slark', 'viper', 'shadow_shaman', 'hoodwink'],
    earth_spirit : ['slark', 'lone_druid', 'tidehunter', 'clockwerk'],
    earthshaker : ['spectre', 'templar_assassin', 'night_stalker', 'venomancer', 'clockwerk'],
    elder_titan : ['templar_assassin', 'puck', 'dark_seer', 'clockwerk', 'lich'],
    // Добавь другие примеры ниже
  };

  switch (actionType) {
    case 'pick':
      // Очки за мета-пика
      if (META_HEROES.has(heroId)) delta += 10;

      // Контрпики
      for (const enemy of enemyTeam.values()) {
        const enemyObj = getHero(enemy);
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
