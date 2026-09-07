// gameLogic.js — Логика симулятора драфта Dota 2

import {
  aiDraft,
  POSITION_MAP // Для отображения ролей на интерфейсе
} from './analyzer.js';

/**
 * Начальное состояние драфта.
 */
const initialState = {
  radiantHeroes: [],
  direHeroes: [],
  radiantBans: [], // Можно добавить позже
  direBans: [],
  radiantRoles: [null, null, null, null, null],
  direRoles: [null, null, null, null, null],
  currentTurn: 'radiant' /* Кто ходит первым */
};

/**
 * Проверяет, закончен ли драфт.
 */
function isDraftFinished(state) {
  return state.radiantHeroes.length === 5 && state.direHeroes.length === 5;
}

/**
 * Основной цикл бота.
 *
 * @param {Object} draftState - Текущий статус драфта.
 * @returns Объект с информацией о герое для следующего пика.
 */
async function nextTurn(currentState) {
  const { currentTurn, ...rest } = currentState;

  // Определяем команду, которой сейчас ходить
  const myTeam = currentTurn === 'radiant'
    ? rest.radiantHeroes : rest.direHeroes;
  const theirTeam = currentTurn === 'radiant'
    ? rest.direHeroes : rest.radiantHeroes;

  // Передаём состояние в AI
  const draftState = {
    teamHeroes: myTeam,
    enemyHeroes: theirTeam,
    roleOrder: currentTurn === 'radiant'
      ? rest.radiantRoles : rest.direRoles
  };

  // AI делает выбор
  const botPick = await aiDraft(draftState);

  if (!botPick) {
    console.error('AI не смог сделать ход!');
    return; // Или можно предложить случайного героя
  }

  // Обновляем состояние
  const updatedState = {
    ...currentState,
    // Ставим героя в свою команду
    [currentTurn]: [
      ...(currentTurn === 'radiant' ? rest.radiantHeroes : rest.direHeroes),
      botPick.id
    ],
    // Назначаем ему позицию
    [(currentTurn === 'radiant' ? 'radiantRoles' : 'direRoles')][botPick.position - 1] =
      botPick.position,
    // Меняем ход
    currentTurn: currentTurn === 'radiant' ? 'dire' : 'radiant'
  };

  // Выводим информацию о ходе в консоль и на страницу
  updateStatusMessage(updatedState); // Новая функция отрисовки статуса
  
  render(updatedState); // Вызов твоей функции отрисовки интерфейса
}

// ⚡️ НОВАЯ ФУНКЦИЯ ДЛЯ ТВОЕГО ИНТЕРФЕЙСА
/**
 * Отображает текущее действие в строке состояния.
 * @param {Object} state Текущий статус драфта.
 */
export async function updateStatusMessage(state) {
  const { currentTurn, radiantHeroes, direHeroes } = state;
  const radCount = radiantHeroes.length;
  const direCount = direHeroes.length;

  // Вычисляем номер текущего хода
  const turnNumber = Math.max(radCount + 1, direCount + 1);

  // Формируем текст сообщения
  let msg = `${turnNumber}-й ход (${currentTurn.toUpperCase()}):`;

  // Если бот только что сделал ход, добавляем инфо о герое
  const lastPicked = currentTurn === 'radiant'
    ? radiantHeroes[radCount - 1]
    : direHeroes[direCount - 1];

  if (lastPicked) {
    // Используем твою функцию getHero() из script.js!
    const heroObj = await getHero(lastPicked);
    
    // Берём первую роль по умолчанию
    const roleText = POSITION_MAP[heroObj.role[0]] || '?';
    document.getElementById('status-message').innerHTML = `
      <strong>${msg}</strong><br>
      ПИКНУТ: <b>${heroObj.name}</b> (${roleText})
    `;
  } else {
    document.getElementById('status-message').textContent = msg;
  }
}

// Запускаем игру при загрузке страницы
window.addEventListener('load', async () => {
  let state = initialState;

  // Очищаем сообщение загрузки
  document.getElementById('status-message').textContent = '';

  // Начинаем автоматический драфт
  while (!isDraftFinished(state)) {
    await nextTurn(state);
    state = await new Promise(resolve =>
      setTimeout(() => resolve(state), 700) // Пауза между ходами
    );
  }

  // По окончании драфта выводим итоговое сообщение
  document.getElementById('action-btn').classList.remove('disabled');
  document.getElementById('action-btn').innerHTML = `
    <span style=\"color:#eab308;\">ДРАФТ ЗАВЕРШЁН!</span><br>
    Radiant: ${state.radiantHeroes.join(', ')}.<br>
    Dire: ${state.direHeroes.join(', ')}.
  `;
});
// Вставь этот блок в конец файла gameLogic.js,
// если у тебя нет своей функции render()

/**
 * Простой пример рендера состояния для тестирования.
 */
function render(state) {
  // Очищаем списки пиков
  document.getElementById('left-slots-column').innerHTML = '';
  document.getElementById('right-slots-column').innerHTML = '';
  
  const radSlots = state.radiantHeroes.map((id, idx) => `<div class="slot-display filled-pick">${id} (${state.radiantRoles[idx]})</div>`).join('');
  const direSlots = state.direHeroes.map((id, idx) => `<div class="slot-display filled-pick">${id} (${state.direRoles[idx]})</div>`).join('');

  document.getElementById('left-slots-column').insertAdjacentHTML('beforeend', radSlots);
  document.getElementById('right-slots-column').insertAdjacentHTML('beforeend', direSlots);
}
