// gameLogic.js — Логика симулятора с поддержкой динамического AI

import {
  fetchHeroesMeta,
  getHero as getAnalyticHero,
  calculateDraftScore,
  POSITION_MAP
} from './analyzer.js';

// Импортируем ваши глобальные переменные и функции из script.js
// Они доступны благодаря type="module" в index.html
const {
  draftSequence,
  currentStepIndex,
  bannedHeroes,
  pickedHeroes,
  selectedHeroId,
  selectHero,
  commitCurrentTurn,
  updateUI
} = window;

// ⚡️ ВАЖНО: Эта функция запускает весь процесс
window.addEventListener('DOMContentLoaded', async () => {
  // Ждём загрузки вашего UI и сетки героев
  document.getElementById('status-message').textContent = '';

  // Предварительно кэшируем всю мету при загрузке страницы
  const META_HEROES = await fetchHeroesMeta();

  // Начинаем автоматический драфт
  while (!isDraftFinished(currentStepIndex)) {
    await nextTurn(currentStepIndex, META_HEROES);
    setTimeout(() => {}, 700); // Пауза между ходами
  }
});

/**
 * Основной цикл хода.
 * Определяет, чей сейчас ход, и вызывает нужную функцию.
 */
async function nextTurn(stepIndex, metaHeroes) {
  const turnConfig = draftSequence[stepIndex];

  if (turnConfig.team === 'dire') {
    // Ход компьютера: вызываем продвинутого AI
    await botAdvancedPick(stepIndex, metaHeroes);
  } else {
    // Ход игрока: ничего не делаем, ждём клика по герою
    // Ваш текущий обработчик кнопки работает корректно
  }
}

/**
 * Проверяет, закончен ли драфт.
 */
function isDraftFinished(stepIndex) {
  return stepIndex >= draftSequence.length;
}

/**
 * Продвинутый алгоритм выбора героя для бота.
 * Работает на основе динамических данных о мете.
 */
async function botAdvancedPick(stepIndex, metaHeroes) {
  const turnConfig = draftSequence[stepIndex];

  // Список всех доступных героев (не забаненных и не выбранных)
  const availableHeroes = metaHeroes.filter(
    h => !bannedHeroes.has(h.id) && !pickedHeroes.has(h.id)
  );

  // Отфильтрованный пул только по вашим 127 героям
  const filteredHeroes = availableHeroes.filter(h =>
    heroesPool.some(poolHero => poolHero.id === h.id)
  );

  // Если никто не подходит, выбираем рандома из полного списка
  const candidates = filteredHeroes.length ? filteredHeroes : availableHeroes;

  // Сортируем кандидатов по силе их пиков
  // Бот выбирает того, кто даст максимальный прирост очков
  const scoredCandidates = candidates.map(async hero => ({
    ...hero,
    score: await calculateDraftScore(
      'pick',
      turnConfig.team,
      hero.id,
      new Set([...pickedHeroes])
    )
  }));

  // Ждём завершения асинхронного мапинга
  const resolvedScores = await Promise.all(scoredCandidates);

  // Находим лучшего кандидата
  const bestCandidate = resolvedScores.sort((a, b) => b.score - a.score)[0];

  // Делаем выбор
  selectHero(bestCandidate.id);

  // Через секунду подтверждаем ход (эмуляция задержки человека)
  setTimeout(commitCurrentTurn, 1000);
}

// Простой пример рендера состояния для тестирования
// Вставьте этот блок в конец файла, если хотите видеть текстовые ID вместо ваших карточек
/*
function render(state) {
  document.getElementById('left-slots-column').innerHTML =
    state.radiantHeroes.join(', ');
  document.getElementById('right-slots-column').innerHTML =
    state.direHeroes.join(', ');
}
*/
