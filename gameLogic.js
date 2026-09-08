// gameLogic.js
// Логика драфта под ваш макет: выбор банов, таймер, кнопка BAN HERO

import { renderBoard } from './script.js';
import { COUNTERS, normalizeHeroName } from './analyzer.js';

let selectedForBan = null;
let banSlotsState = []; // выбранные баны
let timerValue = 86; // 1:26
let timerInterval = null;
let currentTurn = 'Radiant';

window.addEventListener('DOMContentLoaded', () => {
  const boardContainer = document.getElementById('board');
  renderBoard(boardContainer);

  // выбор героя для бана
  boardContainer.addEventListener('click', (e) => {
    const tile = e.target.closest('.hero-tile');
    if (!tile) return;
    selectedForBan = tile.dataset.heroId;
    // подсветка выбранного
    boardContainer.querySelectorAll('.hero-tile').forEach(t => t.removeAttribute('data-selected'));
    tile.setAttribute('data-selected', 'true');
    // активируем кнопку
    const banBtn = document.getElementById('banHeroBtn');
    banBtn.disabled = false;
  });

  // кнопка BAN HERO
  const banBtn = document.getElementById('banHeroBtn');
  banBtn.addEventListener('click', () => {
    if (!selectedForBan) return;

    // первый пустой слот
    const slots = document.getElementById('banSlots');
    const empty = Array.from(slots.children).find(el => !el.dataset.hero);
    const heroId = normalizeHeroName(selectedForBan) || selectedForBan;

    if (empty) {
      empty.dataset.hero = heroId;
      empty.innerHTML = `<span>${selectedForBan}</span>`;
      banSlotsState.push(heroId);
    }

    // пометим бан как выполненный и отключим выбор на время
    const tiles = boardContainer.querySelectorAll(`.hero-tile[data-hero-id="${selectedForBan}"]`);
    tiles.forEach(t => {
      t.style.opacity = '0.25';
      t.style.pointerEvents = 'none';
    });

    banBtn.disabled = true;
    selectedForBan = null;
  });

  // простой таймер (1:26)
  const timerEl = document.getElementById('timer');
  timerEl.textContent = '1:26';
  timerInterval = setInterval(() => {
    timerValue = Math.max(0, timerValue - 1);
    const m = Math.floor(timerValue / 60);
    const s = timerValue % 60;
    timerEl.textContent = `${m}:${s.toString().padStart(2, '0')}`;

    // смена стороны по таймеру (простой пример)
    if (timerValue === 0) {
      currentTurn = (currentTurn === 'Radiant') ? 'Dire' : 'Radiant';
      timerValue = 86;
      // можно обновлять UI о текущей очереди, если нужно
    }
  }, 1000);
});

export { renderBoard };
