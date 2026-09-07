// gameLogic.js
import { 
  fetchHeroesMeta,
  calculateDraftScore
} from './analyzer.js';

import {
  heroesPool,
  draftSequence,
  bannedHeroes,
  pickedHeroes,
  selectHero,
  commitCurrentTurn
} from './script.js';

let metaHeroesCache = [];
let currentStepIndex = 0;

// Пример простой логики переключения хода
let playerIsRadiant = true;

window.addEventListener('DOMContentLoaded', async () => {
  // Предзагрузим мету (если доступно)
  metaHeroesCache = await fetchHeroesMeta();

  // Рендерим сетку и драфт-слоты (если реализуете UI)
  if (typeof renderHeroesGrid === 'function') renderHeroesGrid();
  if (typeof renderDraftRows === 'function') renderDraftRows();

  // Запуск бота
  checkBotTurn(metaHeroesCache);
});

async function checkBotTurn(metaHeroes) {
  if (currentStepIndex >= draftSequence.length) return;

  const turn = draftSequence[currentStepIndex];

  // Определяем, чей ход
  const isBotTurn = (turn.team === 'radiant' && !playerIsRadiant) ||
                    (turn.team === 'dire' && playerIsRadiant);

  if (!isBotTurn) {
    // Сейчас ход игрока — ждём ввода через UI
    return;
  }

  let botSelectedHero = null;

  if (turn.type === 'ban') {
    const availableHeroes = heroesPool.filter(
      h => !bannedHeroes.has(h.id) && !pickedHeroes.has(h.id)
    );
    if (availableHeroes.length > 0) {
      botSelectedHero = availableHeroes[Math.floor(Math.random() * availableHeroes.length)];
    }
  } else {
    const availableHeroes = heroesPool.filter(
      h => !bannedHeroes.has(h.id) && !pickedHeroes.has(h.id)
    );

    const filteredHeroes = metaHeroes.filter(h =>
      availableHeroes.some(poolHero => poolHero.id === h.id)
    );

    const scoredCandidates = await Promise.all(
      filteredHeroes.map(async hero => ({
        ...hero,
        score: await calculateDraftScore('pick', turn.team, hero.id, new Set([...pickedHeroes]))
      }))
    );

    const bestCandidate = scoredCandidates.sort((a, b) => b.score - a.score)[0];
    if (bestCandidate) botSelectedHero = bestCandidate;
    else if (availableHeroes.length > 0) botSelectedHero = availableHeroes[0];
  }

  if (botSelectedHero) {
    selectHero(botSelectedHero.id);
  }

  setTimeout(commitCurrentTurn, 1200);

  // Рекурсивный вызов на следующий ход
  setTimeout(() => checkBotTurn(metaHeroes), 1800);
}

export { }
