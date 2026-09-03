// Стабильная база данных героев (самый первый рабочий список)
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

// СТРОГАЯ ПОСЛЕДОВАТЕЛЬНОСТЬ (7 Банов / 5 Пиков для каждой команды)
const draftSequence = [
    // Фаза 1: 7 банов (Дайр 2 -> Радиант 2 -> Дайр 1 -> Радиант 2), затем 2 пика (Дайр -> Радиант) и 3 бана (Дайр 2 -> Радиант 1)
    { team: 'd', type: 'ban', index: 0 },
    { team: 'd', type: 'ban', index: 1 },
    { team: 'r', type: 'ban', index: 0 },
    { team: 'r', type: 'ban', index: 1 },
    { team: 'd', type: 'ban', index: 2 },
    { team: 'r', type: 'ban', index: 2 },
    { team: 'r', type: 'ban', index: 3 },
    
    { team: 'd', type: 'pick', index: 0 },
    { team: 'r', type: 'pick', index: 0 },
    
    { team: 'd', type: 'ban', index: 3 },
    { team: 'd', type: 'ban', index: 4 },
    { team: 'r', type: 'ban', index: 4 },

    // Фаза 2: 6 пиков (Радиант -> Дайр -> Дайр -> Радиант -> Радиант -> Дайр), затем 4 пика (Дайр -> Радиант -> Дайр -> Радиант)
    { team: 'r', type: 'pick', index: 1 },
    { team: 'd', type: 'pick', index: 1 },
    { team: 'd', type: 'pick', index: 2 },
    { team: 'r', type: 'pick', index: 2 },
    { team: 'r', type: 'pick', index: 3 },
    { team: 'd', type: 'pick', index: 3 },
    
    { team: 'd', type: 'pick', index: 4 }, // Последний слот пиков для Дире (индекс 4)
    { team: 'r', type: 'pick', index: 4 }, // Последний слот пиков для Радиант (индекс 4)
    
    // В вашей схеме далее шли еще 4 пика (Дайр->Рад->Дайр->Рад), но так как слоты 0-4 (всего 5) уже заполнены, 
    // мы переходим сразу к финальной Фазе 3 (баны и последние выборы), чтобы не выйти за рамки ваших HTML-ячеек.

    // Фаза 3: 4 бана (Дайр -> Радиант -> Дайр -> Радиант), затем финальные пики (Дайр -> Радиант)
    { team: 'd', type: 'ban', index: 5 },
    { team: 'r', type: 'ban', index: 5 },
    { team: 'd', type: 'ban', index: 6 },
    { team: 'r', type: 'ban', index: 6 }
    
    // Драфт завершается на 24-м шаге, когда заполнено по 7 банов и 5 пиков с каждой стороны.
];

let currentStepIndex = 0;
let selectedHeroId = null;
const bannedHeroes = new Set();
const pickedHeroes = new Set();

const heroesContainer = document.getElementById('heroes-container');
const statusMessage = document.getElementById('status-message');
const actionBtn = document.getElementById('action-btn');

function init() {
    renderHeroesGrid();
    updateStatus();
    actionBtn.addEventListener('click', handleActionClick);
}

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

function selectHero(heroId) {
    if (currentStepIndex >= draftSequence.length || bannedHeroes.has(heroId) || pickedHeroes.has(heroId)) return;

    if (selectedHeroId) {
        const prevCard = document.getElementById(`card-${selectedHeroId}`);
        if (prevCard) prevCard.classList.remove('selected');
    }

    selectedHeroId = heroId;
    const currentCard = document.getElementById(`card-${heroId}`);
    currentCard.classList.add('selected');

    actionBtn.classList.remove('disabled');
    actionBtn.classList.add('player-turn');
    const step = draftSequence[currentStepIndex];
    actionBtn.innerText = step.type === 'ban' ? 'Забанить' : 'Пикнуть';
}

function handleActionClick() {
    if (!selectedHeroId || currentStepIndex >= draftSequence.length) return;

    const step = draftSequence[currentStepIndex];
    const hero = heroesData.find(h => h.id === selectedHeroId);
    const slotId = `${step.team}-${step.type}-${step.index}`;
    const slotElement = document.getElementById(slotId);

    if (slotElement) {
        slotElement.innerText = hero.icon;
        slotElement.style.backgroundColor = step.type === 'ban' ? '#451a1a' : '#1a4527';
    }

    if (step.type === 'ban') {
        bannedHeroes.add(selectedHeroId);
    } else {
        pickedHeroes.add(selectedHeroId);
    }

    const card = document.getElementById(`card-${selectedHeroId}`);
    card.classList.remove('selected');
    card.classList.add('disabled');

    selectedHeroId = null;
    currentStepIndex++;

    actionBtn.classList.add('disabled');
    actionBtn.removeClassName ? actionBtn.removeClassName('player-turn') : actionBtn.classList.remove('player-turn');
    actionBtn.innerText = 'Выберите героя';

    updateStatus();
}

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
    statusMessage.style.color = step.team === 'r' ? '#4ade80' : '#f87171';
}

document.addEventListener('DOMContentLoaded', init);
