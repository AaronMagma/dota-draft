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
  { step: 1, team: 'dire', type: 'ban' },
  { step: 2, team: 'radiant', type: 'ban' },
  { step: 3, team: 'dire', type: 'pick' },
  { step: 4, team: 'radiant', type: 'pick' }
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
    // Простая карточка: бейдж с id и имя
    const badge = document.createElement('div');
    badge.textContent = h.id.toUpperCase();
    badge.style.fontSize = '12px';
    badge.style.fontWeight = '700';
    badge.style.marginBottom = '6px';
    card.appendChild(badge);

    const name = document.createElement('div');
    name.textContent = h.name;
    card.appendChild(name);

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
