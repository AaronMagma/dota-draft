 // script.js // Базовый набор героев (126) для макета UI // Каждому герою присваиваем атрибут (Strength/Agility/Intelligence/Universal) и цвет
export const categories = [ { key: 'Strength', attr: 'strength', color: '#e74c3c' }, { key: 'Agility', attr: 'agility', color: '#2ecc71' }, { key: 'Intelligence', attr: 'intelligence', color: '#3498db' }, { key: 'Universal', attr: 'universal', color: '#f1c40f' } ];

// 126 героев export const heroesPool = Array.from({ length: 126 }, (_, i) => { const n = String(i + 1).padStart(2, '0'); const id = hero_${n}; const attr = i % 4 === 0 ? 'strength' : i % 4 === 1 ? 'agility' : i % 4 === 2 ? 'intelligence' : 'universal'; // простая цветовая вариативность const color = { strength: '#ff5a5a', agility: '#5bdc88', intelligence: '#4da3ff', universal: '#f5d041' }[attr]; return { id, name: Герой ${i + 1}, attr, color, image: '' // можно подставить путь к спрайту }; });

export const bannedHeroes = new Set(); export const pickedHeroes = new Set();

export function renderBoard(container) { if (!container) return;

container.innerHTML = '';

const panelData = [ { title: 'STRENGTH', color: '#e74c3c', key: 'Strength' }, { title: 'AGILITY', color: '#2ecc71', key: 'Agility' }, { title: 'INTELLIGENCE', color: '#3498db', key: 'Intelligence' }, { title: 'UNIVERSAL', color: '#f1c40f', key: 'Universal' } ];

// 2x2 сетка панелей const gridWrap = document.createElement('div'); gridWrap.style.display = 'grid'; gridWrap.style.gridTemplateColumns = '1fr 1fr'; gridWrap.style.gridGap = '16px';

panelData.forEach((pd) => { const panel = document.createElement('section'); panel.className = 'panel';

const header = document.createElement('div');
header.className = 'panel-header';
header.textContent = pd.title;
header.style.color = pd.color;
panel.appendChild(header);

const grid = document.createElement('div');
grid.className = 'panel-grid';
grid.style.gridTemplateColumns = 'repeat(8, 48px)';
grid.style.gridGap = '6px';

// фильтр по аттрибуту
const items = heroesPool.filter(h => h.attr === pd.key.toLowerCase()).slice(0, 24);
items.forEach(h => {
  const tile = document.createElement('div');
  tile.className = 'hero-tile';
  tile.title = h.name;
  tile.style.background = `linear-gradient(135deg, ${h.color}, #1c1c1c)`;
  tile.dataset.heroId = h.id;
  grid.appendChild(tile);
});

panel.appendChild(grid);
gridWrap.appendChild(panel);
});

container.appendChild(gridWrap); }

// helper: simple color shade (для вариативности плиток) export function shadeColor(hex, percent) { const f = parseInt(hex.slice(1), 16); const t = percent < 0 ? 0 : 255; const p = Math.abs(percent) / 100; const R = f >> 16; const G = (f >> 8) & 0x00FF; const B = f & 0x0000FF; const newR = Math.round((t - R) * p) + R; const newG = Math.round((t - G) * p) + G; const newB = Math.round((t - B) * p) + B; return '#' + (0x1000000 + (newR << 16) + (newG << 8) + newB).toString(16).slice(1); }

export default { heroesPool, bannedHeroes, pickedHeroes };
