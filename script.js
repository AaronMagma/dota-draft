// Стабильная база данных героев (строго 12 первоначальных героев)
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

// СТРОГО ВАША ПОСЛЕДОВАТЕЛЬНОСТЬ ИЗ 24 ШАГОВ ONE-BY-ONE
// 'r' - Свет (Radiant), 'd' - Тьма (Dire)
const draftSequence = [
    { team: 'd', type: 'ban', index: 0 },  // 1й бан тьма
    { team: 'd', type: 'ban', index: 1 },  // 2й бан тьма
    { team: 'r', type: 'ban', index: 0 },  // 3й бан свет
    { team: 'r', type: 'ban', index: 1 },  // 4й бан свет
    { team: 'd', type: 'ban', index: 2 },  // 5й бан тьма
    { team: 'r', type: 'ban', index: 2 },  // 6й бан свет
    { team: 'r', type: 'ban', index: 3 },  // 7й бан свет 
    { team: 'd', type: 'pick', index: 0 }, // 8й пик тьма
    { team: 'r', type: 'pick', index: 0 }, // 9й пик свет
    { team: 'd', type: 'ban', index: 3 },  // 10й бан тьма
    { team: 'd', type: 'ban', index: 4 },  // 11й бан тьма
    { team: 'r', type: 'ban', index: 4 },  // 12й бан свет
    { team: 'r', type: 'pick', index: 1 }, // 13й пик свет
    { team: 'd', type: 'pick', index: 1 }, // 14й пик тьма
    { team: 'd', type: 'pick', index: 2 }, // 15й пик тьма
    { team: 'r', type: 'pick', index: 2 }, // 16й пик свет
    { team: 'r', type: 'pick', index: 3 }, // 17й пик свет
    { team: 'd', type: 'pick', index: 3 }, // 18й пик тьма
    { team: 'd', type: 'ban', index: 5 },  // 19й бан тьма
    { team: 'r', type: 'ban', index: 5 },  // 20й бан свет
    { team: 'd', type: 'ban', index: 6 },  // 21й бан тьма
    { team: 'r', type: 'ban', index: 6 },  // 22й бан свет
    { team: 'd', type: 'pick', index: 4 }, // 23й пик тьма
    { team: 'r', type: 'pick', index: 4 }  // 24й пик свет
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
    
    // Генерируем ID слота (например, d-ban-0 или r-pick-3) строго по вашему графику
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
    if (card) {
        card.classList.remove('selected');
        card.classList.add('disabled');
    }

    selectedHeroId = null;
    currentStepIndex++;

    actionBtn.classList.add('disabled');
    actionBtn.classList.remove('player-turn');
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
