// gameLogic.js — Логика симулятора Dota 2 Draft Simulator

import {
    fetchHeroesMeta,
    calculateDraftScore,
    POSITION_MAP,
    getHero as getAnalyticHero, // Используем вашу функцию поиска + нашу аналитику
} from './analyzer.js';

// Импортируем ваши глобальные переменные и функции из script.js
import {
    heroesPool, // Ваш список героев с эмодзи
    draftSequence,
    currentStepIndex,
    bannedHeroes,
    pickedHeroes,
    selectedHeroId,
    selectHero,
    commitCurrentTurn,
    updateUI
} from './script.js'; // ВАЖНО: Подключаем ваш старый скрипт как модуль!

let playerIsRadiant = true; // По умолчанию игрок управляет Radiant

/**
 * Проверяет, закончен ли драфт по визуальному состоянию слотов.
 */
function isDraftFinished() {
    const allSlots = [...document.querySelectorAll('.slot-display')];
    const filledSlots = allSlots.filter(slot => slot.classList.contains('filled-ban') || slot.classList.contains('filled-pick'));

    return filledSlots.length === draftSequence.length;
}

/**
 * Продвинутый алгоритм выбора героя для бота.
 * Работает на основе данных о мета-игре: винрейта, пикрейта и контрпиков.
 *
 * @param {number} stepIndex - Текущий номер шага в последовательности.
 * @param {Array<Object>} metaHeroes - Данные о всех героях с Dotabuff.
 */
async function botAdvancedPick(stepIndex, metaHeroes) {
    const turnConfig = draftSequence[stepIndex];

    // Список всех доступных героев (не забаненных и не выбранных)
    const availableHeroes = metaHeroes.filter(
        h => !bannedHeroes.has(h.id) && !pickedHeroes.has(h.id)
    );

    // Отфильтрованный пул только по вашим 127 героям
    const filteredHeroes = availableHeroes.filter(h =>
        heroesPool.some(poolHero => poolHero.id === h.id.toLowerCase())
    );

    // Если никто не подходит, выбираем рандома из полного списка
    const candidates = filteredHeroes.length ? filteredHeroes : availableHeroes;

    // Сортируем кандидатов по силе их пиков
    const scoredCandidates = await Promise.all(candidates.map(async hero => ({
        ...hero,
        score: await calculateDraftScore(
            'pick',
            turnConfig.team,
            hero.id,
            new Set([...pickedHeroes])
        )
    })));

    // Находим лучшего кандидата
    const bestCandidate = scoredCandidates.sort((a, b) => b.score - a.score)[0];

    if (!bestCandidate) {
        console.error('AI не смог найти подходящего героя!');
        return;
    }

    // Делаем выбор
    selectHero(bestCandidate.id);

    // Через секунду подтверждаем ход (эмуляция задержки человека)
    setTimeout(() => {
        commitCurrentTurn(); // Вызываем вашу существующую функцию подтверждения хода
        checkBotTurn(metaHeroes); // Рекурсивно проверяем следующий шаг
    }, 1500);
}

/**
 * Вспомогательная функция для бана без подтверждения через кнопку.
 */
function banHero(heroId) {
    bannedHeroes.add(heroId);
    const card = document.getElementById(`grid-hero-${heroId}`);
    if (card) card.classList.add('disabled');

    const targetSlotId = draftSequence[currentStepIndex].team === 'radiant'
        ? `slot-left-${currentStepIndex}`
        : `slot-right-${currentStep`;

    const slot = document.getElementById(targetSlotId);
    if (slot) {
        slot.classList.remove('empty-slot', 'active-slot');
        slot.classList.add('filled-ban');
        
        // Вставляем иконку и имя героя прямо в слот
        const heroObj = heroesPool.find(h => h.id === heroId);
        slot.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; gap: 4px; width: 100%;">
                <span style="font-size: 13px;">${heroObj.icon}</span>
                <span style="font-size: 9px; font-weight: bold; color: #ffffff; text-transform: uppercase; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 55px;">${heroObj.name}</span>
            </div>
        `;
    }

    currentStepIndex++;
    updateUI();
}

/**
 * Основной цикл хода.
 * Определяет, чей сейчас ход, и вызывает нужную функцию.
 */
export async function checkBotTurn(metaHeroes) {
    if (isDraftFinished()) return;

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
    if (turnConfig.type === 'ban') {
        // Просто выбираем случайного доступного героя для бана
        const availableHeroes = heroesPool.filter(
            hero => !bannedHeroes.has(hero.id) && !pickedHeroes.has(hero.id)
        );
        const randomBan = availableHeroes[
            Math.floor(Math.random() * availableFriends.length)
        ];

        banHero(randomBan.id);
    } else {
        // Для пика используем продвинутый алгоритм
        await botAdvancedPick(currentStepIndex, metaHeroes);
    }
}

// ⚡️ ВАЖНО: Запуск всего процесса
window.addEventListener('DOMContentLoaded', async () => {
    // Предварительно кэшируем всю мету при загрузке страницы
    const META_HEROES = await fetchHeroesMeta();

    // Начинаем проверять текущий шаг
    checkBotTurn(META_HEROES);
});
