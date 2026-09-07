// analyzer.js
// Аналитический движок для Dota 2 Draft Simulator
// В патче используется sprite-approach: для каждого героя хранится spriteIndex (0..125)

export const COUNTERS = (() => {
  // 126 героев: идентификаторы hero_01 ... hero_126
  const ids = Array.from({ length: 126 }, (_, i) => `hero_${String(i + 1).padStart(2, '0')}`);
  const obj = {};
  // Пример детерминированных контрпиков: герой i counterится следующими тремя героями
  // (набор не является реальными данными DotA; он заполняется чтобы патч был рабочим без пустых массивов)
  ids.forEach((id, idx) => {
    const c1 = ids[(idx + 1) % 126];
    const c2 = ids[(idx + 5) % 126];
    const c3 = ids[(idx + 11) % 126];
    obj[id] = [c1, c2, c3];
  });
  return obj;
})();

export const SPRITE_CONFIG = {
  spritePath: '/images/heroes-sprite.png', // путь к спрайту PNG
  tileW: 64,                                // ширина тайла спрайта
  tileH: 64,                                // высота тайла спрайта
  cols: 8,                                    // количество колонок в спрайте
  total: 126
};

// Получение актуальной меты героев (Week) с Dotabuff
// В случае блокировки — возвращает пустой массив (Fallback)
export async function fetchHeroesMeta() {
  const headers = {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
    'Accept-Language': 'ru-RU,ru;q=0.9'
  };

  try {
    const response = await fetch('https://dotabuff.com/heroes/meta?date=week', {
      headers
    });

    if (!response.ok) throw new Error(`Failed to fetch heroes meta ${response.status}`);

    const text = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');

    // Реальная структура Dotabuff может отличаться; безопасная обработка
    const rows = Array.from(doc.querySelectorAll('.table tbody tr'));

    const meta = rows.map((row) => {
      const heroCell = row.querySelector('[data-tooltip="Hero"] a');
      if (!heroCell) return null;

      const id = (heroCell.href || '')
        .split('/')
        .filter(Boolean)
        .pop()
        .toLowerCase(); // slug в нижнем регистре

      const name = heroCell.textContent.trim();

      // Роли (1-5) — ищем иконки над именем
      const role = [];
      for (let i = 1; i <= 5; i++) {
        if (heroCell.parentElement?.querySelector(`img[data-tooltip="${i}"]`)) {
          role.push(i);
        }
      }

      // Винрейт по диапазонам (пример: 46.13%)
      let totalWinrate = 0;
      let count = 0;
      for (let colIdx = 1; colIdx <= 9; colIdx += 2) {
        const cell = row.children[colIdx];
        if (!cell || !cell.querySelector('span')) continue;
        const winrateText = cell.querySelector('span').textContent;
        const winrate = parseFloat(winrateText.replace('%', ''));
        if (!Number.isNaN(winrate)) {
          totalWinrate += winrate;
          count++;
        }
      }
      const winrate = count ? Math.round(totalWinrate / count) : 0;

      // Общая частота пика (первая колонка)
      const pickrateText = row.children[0]?.querySelector('span')?.textContent;
      const pickrate = pickrateText ? parseFloat(pickrateText.replace('%', '')) : 0;

      // Изображение героя в UI будет через спрайт
      return { id, name, role, winrate, pickrate, image: `/images/heroes/${id}.png` };
    });

    return meta.filter((m) => !!m);
  } catch (err) {
    console.error(err.message);
    return [];
  }
}

// Получение героя по id (slug)
export async function getHero(id) {
  const slug = (id || '').toLowerCase();

  // Попытка найти в свежей мета-данных
  try {
    const allHeroes = await fetchHeroesMeta();
    const fromMeta = allHeroes.find((h) => h.id === slug);
    if (fromMeta) return fromMeta;
  } catch {
    // пропускаем
  }

  // Резервная информация: минимальная структура
  return {
    id: slug,
    name: slug.replace(/_/g, ' '),
    role: [],
    winrate: 0,
    pickrate: 0,
    image: `/images/heroes/${slug}.png`
  };
}

// Расчёт очков драфта для героя
// Учитывает: базовый пик (мета-пик) + контрпики + штраф за контрпики
export async function calculateDraftScore(actionType, team, heroId, pickedSet) {
  // pickedSet — Set<string> идентификаторов уже взятых противников/партнёров
  const COUNTERS_LOCAL = COUNTERS; // локальная ссылка на конструктор COUNTERS

  let score = 0;
  if (actionType === 'pick') score += 10; // базовый пик

  // Контрпики: герой противника, который контрится выбранным героем
  const otherSet = pickedSet instanceof Set ? pickedSet : new Set(pickedSet);
  for (const other of otherSet) {
    const countersForOther = COUNTERS_LOCAL[other] || [];
    if (countersForOther.includes(heroId)) {
      // наш герой контрится другим героем
      score -= 8; // штраф за контрпик противника
    }
    // наш герой может контрить кого-то ещё
    const thisCounters = COUNTERS_LOCAL[heroId] || [];
    if (thisCounters.includes(other)) {
      score += 12;
    }
  }

  // Простой дополнительный регулятор: если уже есть контрпики против нас, снижаем чуть
  for (const other of otherSet) {
    const countersForHero = COUNTERS_LOCAL[heroId] || [];
    if (countersForHero.includes(other)) {
      score = Math.max(0, Math.round(score * 0.95)); // мягкое снижение
      break;
    }
  }

  // Вернуть итоговый очковый показатель
  return score;
}
