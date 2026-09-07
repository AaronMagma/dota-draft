// gameLogic.js — Логика симулятора Dota 2 Draft Simulator

import { 
  fetchHeroesMeta,
  calculateDraftScore,
  POSITION_MAP,
  getHero as getAnalyticHero // Используем вашу функцию поиска + нашу аналитику
} from './analyzer.js';

// Импортируем ваши функции из script.js
import {
  heroesPool, // Ваш список героев с эмодзи
  draftSequence,
  bannedHeroes,
  pickedHeroes,
  selectedHeroId,
  selectHero,
  commitCurrentTurn,
  updateUI
} from './script.js'; // ВАЖНО: Подключите свой старый скрипт как модуль!

// ⚡️ ВАЖНО: Эта функция запускает весь процесс
window.addEventListener('DOMContentLoaded', async () => {
  // Ждём загрузки вашего UI и сетки героев
  renderHeroesGrid(); // Вызов из script.js
  renderDraftRows(); // Вызов из script.js

  // Предварительно кэшируем всю мету при загрузке страницы
  const META_HEROES = await fetchHeroesMeta();

  // Теперь начинаем автоматический драфт
  checkBotTurn(META_HEROES);
});

async function checkBotTurn(metaHeroes) {
  if (currentStepIndex >= draftSequence.length) return;

  const turnConfig = draftSequence[currentStepIndex];

  // Ход игрока
  if (
    (turnConfig.team === 'radiant' && playerIsRadiant) ||
    (turnConfig.team === 'dire' && !playerIsRadiant)
  ) {
    // Ничего не делаем, ждём клика пользователя
    return;
  }

  // Ход компьютера
  let botSelectedHero;

  if (turnConfig.type === 'ban') {
    // Просто выбираем случайного доступного героя для бана
    const availableHeroes = heroesPool.filter(
      hero => !bannedHeroes.has(hero.id) && !pickedHeroes.has(hero.id)
    );
    botSelectedHero = availableHeroes[
      Math.floor(Math.random() * availableHeroes.length)
    ];
  } else {
    // Продвинутый алгоритм выбора героя для пиков
    const availableHeroes = metaHeroes.filter(
      h => !bannedHeroes.has(h.id) && !pickedHeroes.has(h.id)
    );

    // Отфильтрованный пул только по вашему списку
    const filteredHeroes = availableHeroes.filter(h =>
      heroesPool.some(poolHero => poolHero.id === h.id)
    );

    // Сортируем кандидатов по силе их пиков
    const scoredCandidates = filteredHeroes.map(async hero => ({
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
    botSelectedHero = bestCandidate;
  }

  // Делаем выбор
  selectHero(botSelectedHero.id);

  // Через секунду подтверждаем ход (эмуляция задержки человека)
  setTimeout(commitCurrentTurn, 1500);

  // Рекурсивно проверяем следующий шаг
  setTimeout(() => checkBotTurn(metaHeroes), 1800);
}

let playerIsRadiant = true; // Измените на false, если хотите играть за Тьму
