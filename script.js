// 1. База данных героев (демо-список со смайликами)
const heroesData = [
    { id: "axe", name: "Axe", icon: "🪓" },
    { id: "pudge", name: "Pudge", icon: "🥩" },
    { id: "invoker", name: "Invoker", icon: "🔮" },
    { id: "juggernaut", name: "Juggernaut", icon: "⚔️" },
    { id: "crystal_maiden", name: "Crystal Maiden", icon: "❄️" },
    { id: "shadow_fiend", name: "Shadow Fiend", icon: "💀" },
    { id: "phantom_assassin", name: "Phantom Assassin", icon: "🗡️" },
    { id: "sniper", name: "Sniper", icon: "🎯" },
    { id: "rubick", name: "Rubick", icon: "🟢" },
    { id: "anti_mage", name: "Anti-Mage", icon: "🧙‍♂️" },
    { id: "slark", name: "Slark", icon: "🐟" },
    { id: "earthshaker", name: "Earthshaker", icon: "🐮" }
];

// 2. Строгая последовательность Captains Mode в Dota 2 (7 банов, 5 пиков)
// 'r' - Radiant, 'd' - Dire | 'ban' - Бан, 'pick' - Пик
const draftSequence = [
    // Фаза 1: 2 бана каждой команды + 2 пика каждой команды
    { team: 'r', type: 'ban', index: 0 },
    { team: 'd', type: 'ban', index: 0 },
    { team: 'r', type: 'ban', index: 1 },
    { team: 'd', type: 'ban', index: 1 },
    
    { team: 'r', type: 'pick', index: 0 },
    { team: 'd', type: 'pick', index: 0 },
    { team: 'd', type: 'pick', index: 1 },
    { team: 'r', type: 'pick', index: 1 },

    // Фаза 2: 3 бана каждой команды + 2 пика каждой команды
    { team: 'r', type: 'ban', index: 2 },
    { team: 'd', type: 'ban', index: 2 },
    { team: 'r', type: 'ban', index: 3 },
    { team: 'd', type: 'ban', index: 3 },
    { team: 'r', type: 'ban', index: 4 },
    { team: 'd', type: 'ban', index: 4 },

    { team: 'd', type: 'pick', index: 2 },
    { team: 'r', type: 'pick', index: 2 },
    { team: 'd', type: 'pick', index: 3 },
    { team: 'r', type: 'pick', index: 3 },

    // Фаза 3: 2 бана каждой команды + последний пик
    { team: 'd', type: 'ban', index: 5 },
    { team: 'r', type: 'ban', index: 5 },
    { team: 'd', type: 'ban', index: 6 },
    { team: 'r', type: 'ban', index: 6 },

    { team: 'r', type: 'pick', index: 4 },
    { team: 'd', type: 'pick', index: 4 }
];

// Состояние драфта
let currentStepIndex = 0;
let selectedHeroId = null;
const bannedHeroes = new Set();
const pickedHeroes = new Set();

// DOM Элементы
const heroesContainer = document.getElementById('heroes-container');
const statusMessage = document.getElementById('status-message');
const actionBtn = document.getElementById('action-btn');

// Инициализация
function init() {
    renderHeroesGrid();
    updateStatus();
    
    actionBtn.addEventListener('click', handleActionClick);
}

// Рендер сетки героев
function renderHeroesGrid() {
    heroesContainer.innerHTML = '';
    heroesData.forEach(hero => {
        const card = document.createElement('div');
        card.className = 'hero-card';
        card.id = `card-${hero.id}`;
        card.innerHTML = `
            <div class="hero-icon">${hero.icon}</div>
            <div class="hero-name-label">${hero.name}</div>
        `;
        
        card.addEventListener('click', () => selectHero(hero.id));
        heroesContainer.appendChild(card);
    });
}

// Логика клика по герою
function selectHero(heroId) {
    // Если драфт окончен или герой уже занят — ничего не делаем
    if (currentStepIndex >= draftSequence.length || bannedHeroes.has(heroId) || pickedHeroes.has(heroId)) return;

    // Снимаем выделение с предыдущего
    if (selectedHeroId) {
        const prevCard = document.getElementById(`card-${selectedHeroId}`);
        if (prevCard) prevCard.classList.remove('selected');
    }

    // Выделяем нового
    selectedHeroId = heroId;
    const currentCard = document.getElementById(`card-${heroId}`);
    currentCard.classList.add('selected');

    // Активируем кнопку действия
    actionBtn.classList.remove('disabled');
    actionBtn.classList.add('player-turn');
    const step = draftSequence[currentStepIndex];
    actionBtn.innerText = step.type === 'ban' ? 'Забанить' : 'Пикнуть';
}

// Логика нажатия на кнопку "Забанить/Пикнуть"
function handleActionClick() {
    if (!selectedHeroId || currentStepIndex >= draftSequence.length) return;

    const step = draftSequence[currentStepIndex];
    const hero = heroesData.find(h => h.id === selectedHeroId);
    
    // Формируем ID целевого слота в HTML (например: r-pick-0 или d-ban-3)
    const slotId = `${step.team}-${step.type}-${step.index}`;
    const slotElement = document.getElementById(slotId);

    if (slotElement) {
        slotElement.innerText = hero.icon;
        // Можно добавить стилей для красоты (красный фон для бана, зеленый для пика)
        slotElement.style.backgroundColor = step.type === 'ban' ? '#451a1a' : '#1a4527';
    }

    // Добавляем героя в списки занятых
    if (step.type === 'ban') {
        bannedHeroes.add(selectedHeroId);
    } else {
        pickedHeroes.add(selectedHeroId);
    }

    // Блокируем карточку героя в сетке
    const card = document.getElementById(`card-${selectedHeroId}`);
    card.classList.remove('selected');
    card.classList.add('disabled');

    // Сброс выбора и переход к следующему шагу
    selectedHeroId = null;
    currentStepIndex++;

    // Сброс кнопки
    actionBtn.classList.add('disabled');
    actionBtn.classList.remove('player-turn');
    actionBtn.innerText = 'Выберите героя';

    updateStatus();
}

// Обновление верхнего статус-бара
function updateStatus() {
    if (currentStepIndex >= draftSequence.length) {
        statusMessage.innerText = 'Драфт завершен!';
        actionBtn.innerText = 'Конец';
        actionBtn.classList.add('disabled');
        return;
    }

    const step = draftSequence[currentStepIndex];
    const teamName = step.team === 'r' ? 'Свет (Radiant)' : 'Тьма (Dire)';
    const actionName = step.type === 'ban' ? 'БАНЯТ' : 'ПИКАЮТ';
    
    statusMessage.innerText = `Ход команды: ${teamName}\nОни ${actionName} герой #${step.index + 1}`;
    
    // Подкрасим статус цветом команды, чей сейчас ход
    statusMessage.style.color = step.team === 'r' ? '#4ade80' : '#f87171';
}

// Запуск
document.addEventListener('DOMContentLoaded', init);
