// script.js
// Базовый набор героев и минимальная UI-инфраструктура
// В патче используется sprite PNG, поэтому здесь хранится только метаданные и простой UI-макс

// 126 героев: slug'ы hero_01 ... hero_126, id — slug
export const heroesPool = Array.from({ length: 126 }, (_, i) => {
  const n = String(i + 1).padStart(2, '0');
  const id = `hero_${n}`;
  // Категория/слотнгра (упрощённо)
  const attrs = ['str', 'agi', 'int', 'uni'];
  const attr = attrs[i % attrs.length];
  return {
    id,
    name: `Герой ${i + 1}`,
    attr,
    // путь к изображению героя в спрайте (PNG)
    image: `/images/heroes/${id}.png`,
    spriteIndex: i // индекс в спрайте
  };
});

// Пример последовательности драфта (минимальный набор)
export const draftSequence = [
  { step: 1, team: 'radiant', type: 'ban' },
  { step: 2, team: 'radiant', type: 'ban' },
  { step: 3, team: 'dire', type: 'ban' },
  { step: 4, team: 'dire', type: 'ban' }
  { step: 5, team: 'radiant', type: 'ban' }
  { step: 6, team: 'dire', type: 'ban' },
  { step: 7, team: 'dire', type: 'ban' },
  { step: 8, team: 'radiant', type: 'pick' },
  { step: 9, team: 'dire', type: 'pick' }
  { step: 10, team: 'radiant', type: 'ban' }
  { step: 11, team: 'radiant', type: 'ban' },
  { step: 12, team: 'radiant', type: 'ban' },
  { step: 13, team: 'dire', type: 'pick' },
  { step: 14, team: 'radiant', type: 'pick' }
  { step: 15, team: 'radiant', type: 'pick' }
  { step: 16, team: 'dire', type: 'pick' },
  { step: 17, team: 'dire', type: 'pick' },
  { step: 18, team: 'radiant', type: 'pick' },
  { step: 19, team: 'radiant', type: 'ban' }
  { step: 20, team: 'dire', type: 'ban' }
  { step: 21, team: 'radiant', type: 'ban' },
  { step: 22, team: 'dire', type: 'ban' },
  { step: 23, team: 'radiant', type: 'pick' },
  { step: 24, team: 'dire', type: 'pick' }
];

// Контроль полей драфта
export const bannedHeroes = new Set();
export const pickedHeroes = new Set();

// Простейшие функции-интерфейса (пустые заглушки — интеграция будет в патче)
export function renderHeroesGrid() {
  const grid = document.getElementById('heroes-grid');
  if (!grid) return;
  grid.innerHTML = '';
  for (const h of heroesPool) {
    const card = document.createElement('div');
    card.className = 'hero-card';
    // Используем спрайт-иконку (пока простая загрузка PNG; позже можно заменить на часть спрайта)
    const img = document.createElement('img');
    img.alt = h.name;
    img.src = h.image;
    card.appendChild(img);
    const t = document.createElement('div');
    t.textContent = h.name;
    card.appendChild(t);
    grid.appendChild(card);
  }
}
export function renderDraftRows() {
  // Заглушка — можно добавить отрисовку драфт-слотов
}
export function selectHero(id) {
  // Заглушка: выбрать героя в UI
  console.log(`selectHero: ${id}`);
}
export function commitCurrentTurn() {
  // Заглушка: зафиксировать текущий ход
}
export function updateUI() {
  // Заглушка: обновление UI после ходов
}

// Экспортируемые данные для совместимости
export default {
  heroesPool,
  draftSequence,
  bannedHeroes,
  pickedHeroes
};
