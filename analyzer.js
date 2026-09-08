// analyzer.js
// Генерация контрпиков на основе вашего списка и привязок к героям из script.js

import { HERO_DATA } from './script.js';

// Канонические IDs собираем по списку героев
const CANONICAL_IDS = new Set();
['Strength','Agility','Intelligence','Universal'].forEach(cat => {
  const arr = HERO_DATA[cat];
  if (Array.isArray(arr)) arr.forEach(h => {
    if (h && h.id) CANONICAL_IDS.add(h.id.toLowerCase());
  });
});

// Алиасы для приведения названий из вашего файла контрпиков к каноническим id
const ALIASES = {
  centaur_warrunner: 'centaur',
  antimage: 'anti_mage',
  keeper_of_the_light: 'keeper',
  kotl: 'keeper',
  queen_of_pain: 'queen_of_pain',
  shadow_fiend: 'shadow_fiend',
  faceless_void: 'faceless_void',
  windranger: 'windranger',
  // добавляйте по мере необходимости
};

// Нормализация имени героя к каноническому id
function normalizeHeroName(name) {
  if (!name) return '';
  let raw = String(name).toLowerCase().trim();
  // прямое совпадение
  if (CANONICAL_IDS.has(raw)) return raw;
  // алиасы
  if (ALIASES.hasOwnProperty(raw)) return ALIASES[raw];
  // замена пробелов/дефисов
  raw = raw.replace(/[\s-]+/g, '_');
  if (CANONICAL_IDS.has(raw)) return raw;
  // фоллбек
  return raw;
}

// Заготовка контрпиков — заменить содержимое CONTROPS_TEXT на ваш файл контрпиков
const CONTROPS_TEXT = `
// --- STRENGTH (Сила) контрпики — вставьте ваш текст контрпиков сюда ---
`;

// Парсер контрпиков из текста
function parseCountersFromText(text) {
  const result = {};
  if (!text) return result;

  const lines = text.split(/\r?\n/);
  for (const line of lines) {
    const m = line.match(/^\s*([A-Za-z0-9_]+)\s*$$(.*)$$/);
    if (!m) continue;

    const heroKey = m[1];
    const inner = m[2];
    const counters = [];

    const reg = /'([^']+)'/g;
    let mm;
    while ((mm = reg.exec(inner)) !== null) {
      counters.push(mm[1]);
    }

    const heroCanon = normalizeHeroName(heroKey);
    if (!heroCanon) continue;

    if (!result[heroCanon]) result[heroCanon] = [];
    counters.forEach(c => {
      const canon = normalizeHeroName(c);
      if (canon && !result[heroCanon].includes(canon)) result[heroCanon].push(canon);
    });
  }

  return result;
}

// Преобразуем текст контрпиков в структуру COUNTERS
const parsed = parseCountersFromText(CONTROPS_TEXT);
const COUNTERS = parsed;

// Экспортируем COUNTERS и утилиту normalize
export { COUNTERS, normalizeHeroName };

export default { COUNTERS, normalizeHeroName };
