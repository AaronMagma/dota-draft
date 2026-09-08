// gameLogic.js // Логика драфта под ваш макет: выбор банов, таймер, кнопка BAN HERO
import { renderBoard } from './script.js'; import { COUNTERS, normalizeHeroName } from './analyzer.js';

let selectedForBan = null; let banSlotsState = []; // будет хранить выбранные баны (макс 5) let currentTeamTurn = 'Radiant'; let timerValue = 86; // 1:26

window.addEventListener('DOMContentLoaded', () => { const boardContainer = document.getElementById('board'); renderBoard(boardContainer);

// выбор героя для бана boardContainer.addEventListener('click', (e) => { const tile = e.target.closest('.hero-tile'); if (!tile) return; selectedForBan = tile.dataset.heroId; // подсветка выбранного boardContainer.querySelectorAll('.hero-tile').forEach(t => t.removeAttribute('data-selected')); tile.setAttribute('data-selected', 'true'); });

// кнопка BAN HERO const banBtn = document.getElementById('banHeroBtn'); banBtn.addEventListener('click', () => { if (!selectedForBan) return;

// находим первый пустой слот
const slots = document.getElementById('banSlots');
const emptySlot = Array.from(slots.children).find(s => !s.dataset.hero);
const heroId = normalizeHeroName(selectedForBan) || selectedForBan;

if (emptySlot) {
  emptySlot.dataset.hero = heroId;
  emptySlot.innerHTML = `<span>${selectedForBan}</span>`;
  banSlotsState.push(heroId);
}

// пометим бан как выполненный и отключим выбор на время
const tiles = boardContainer.querySelectorAll('.hero-tile');
tiles.forEach(t => {
  if (t.dataset.heroId === selectedForBan) {
    t.style.opacity = '0.25';
    t.style.pointerEvents = 'none';
  }
});

banBtn.disabled = true;
selectedForBan = null;
});

// простой таймер (1:26) const timerEl = document.getElementById('timer'); timerEl.textContent = '1:26'; setInterval(() => { timerValue = Math.max(0, timerValue - 1); const m = Math.floor(timerValue / 60); const s = timerValue % 60; timerEl.textContent = ${m}:${s.toString().padStart(2, '0')};

// простая смена хода
if (timerValue === 0) {
  // смена стороны через простой триггер
  currentTeamTurn = currentTeamTurn === 'Radiant' ? 'Dire' : 'Radiant';
  // можно обновить UI здесь, если добавите элементы для команды
  timerValue = 86; // перезапуск таймера
}
}, 1000); });

export { renderBoard };
