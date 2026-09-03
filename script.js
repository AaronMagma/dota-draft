const heroesPool = [
    // --- STRENGTH ---
    { id: "axe", name: "Axe", icon: "🪓", attr: "str" },
    { id: "pudge", name: "Pudge", icon: "🥩", attr: "str" },
    { id: "earthshaker", name: "Earthshaker", icon: "🐮", attr: "str" },
    { id: "sven", name: "Sven", icon: "⚔️", attr: "str" },
    { id: "undying", name: "Undying", icon: "🧟", attr: "str" },
    { id: "tidehunter", name: "Tidehunter", icon: "🍉", attr: "str" },
    { id: "wraith_king", name: "Wraith King", icon: "👑", attr: "str" },
    { id: "slardar", name: "Slardar", icon: "🐟", attr: "str" },
    { id: "doom", name: "Doom", icon: "😈", attr: "str" },
    { id: "magnus", name: "Magnus", icon: "🦏", attr: "str" },
    { id: "kunkka", name: "Kunkka", icon: "🚢", attr: "str" },
    { id: "tiny", name: "Tiny", icon: "🪨", attr: "str" },

    // --- AGILITY ---
    { id: "juggernaut", name: "Juggernaut", icon: "🎭", attr: "agi" },
    { id: "phantom_assassin", name: "Phantom Assassin", icon: "🗡️", attr: "agi" },
    { id: "shadow_fiend", name: "Shadow Fiend", icon: "💀", attr: "agi" },
    { id: "slark", name: "Slark", icon: "🦈", attr: "agi" },
    { id: "viper", name: "Viper", icon: "🐍", attr: "agi" },
    { id: "sniper", name: "Sniper", icon: "🎯", attr: "agi" },
    { id: "drow_ranger", name: "Drow Ranger", icon: "🏹", attr: "agi" },
    { id: "faceless_void", name: "Faceless Void", icon: "⏳", attr: "agi" },
    { id: "templar_assassin", name: "Templar Assassin", icon: "🏵️", attr: "agi" },
    { id: "bloodseeker", name: "Bloodseeker", icon: "🩸", attr: "agi" },
    { id: "ursa", name: "Ursa", icon: "🐻", attr: "agi" },
    { id: "riki", name: "Riki", icon: "🐐", attr: "agi" },

    // --- INTELLIGENCE ---
    { id: "crystal_maiden", name: "Crystal Maiden", icon: "❄️", attr: "int" },
    { id: "lina", name: "Lina", icon: "🔥", attr: "int" },
    { id: "lion", name: "Lion", icon: "🦁", attr: "int" },
    { id: "zeus", name: "Zeus", icon: "⚡", attr: "int" },
    { id: "storm_spirit", name: "Storm Spirit", icon: "⚡", attr: "int" },
    { id: "puck", name: "Puck", icon: "🧚", attr: "int" },
    { id: "pugna", name: "Pugna", icon: "🟢", attr: "int" },
    { id: "lich", name: "Lich", icon: "🥶", attr: "int" },
    { id: "witch_doctor", name: "Witch Doctor", icon: "🥥", attr: "int" },
    { id: "tinker", name: "Tinker", icon: "🤖", attr: "int" },
    { id: "skywrath_mage", name: "Skywrath Mage", icon: "🦅", attr: "int" },
    { id: "necrophos", name: "Necrophos", icon: "🤮", attr: "int" },

    // --- UNIVERSAL ---
    { id: "invoker", name: "Invoker", icon: "🔮", attr: "uni" },
    { id: "rubick", name: "Rubick", icon: "🟢", attr: "uni" },
    { id: "anti_mage", name: "Anti-Mage", icon: "🧙‍♂️", attr: "uni" },
    { id: "winter_wyvern", name: "Winter Wyvern", icon: "🥶", attr: "uni" },
    { id: "grimstroke", name: "Grimstroke", icon: "🖌️", attr: "uni" },
    { id: "dazzle", name: "Dazzle", icon: "🧪", attr: "uni" },
    { id: "shadow_shaman", name: "Shadow Shaman", icon: "🦎", attr: "uni" },
    { id: "abaddon", name: "Abaddon", icon: "🐴", attr: "uni" },
    { id: "marci", name: "Marci", icon: "👊", attr: "uni" },
    { id: "dark_willow", name: "Dark Willow", icon: "🧚‍♀️", attr: "uni" },
    { id: "vengeful_spirit", name: "Vengeful Spirit", icon: "🦇", attr: "uni" },
    { id: "enigma", name: "Enigma", icon: "🕳️", attr: "uni" }
];

const draftSequence = [
    { team: 'd', type: 'ban', index: 0 }, { team: 'd', type: 'ban', index: 1 },
    { team: 'r', type: 'ban', index: 0 }, { team: 'r', type: 'ban', index: 1 },
    { team: 'd', type: 'ban', index: 2 }, { team: 'r', type: 'ban', index: 2 },
    { team: 'r', type: 'ban', index: 3 }, { team: 'd', type: 'pick', index: 0 },
    { team: 'r', type: 'pick', index: 0 }, { team: 'd', type: 'ban', index: 3 },
    { team: 'd', type: 'ban', index: 4 }, { team: 'r', type: 'ban', index: 4 },
    { team: 'r', type: 'pick', index: 1 }, { team: 'd', type: 'pick', index: 1 },
    { team: 'd', type: 'pick', index: 2 }, { team: 'r', type: 'pick', index: 2 },
    { team: 'r', type: 'pick', index: 3 }, { team: 'd', type: 'pick', index: 3 },
    { team: 'd', type: 'pick', index: 4 }, { team: 'r', type: 'pick', index: 4 },
    { team: 'd', type: 'ban', index: 5 }, { team: 'r', type: 'ban', index: 5 },
    { team: 'd', type: 'ban', index: 6 }, { team: 'r', type: 'ban', index: 6 }
];

let currentStepIndex = 0;
let selectedHeroId = null;
const bannedHeroes = new Set();
const pickedHeroes = new Set();

function init() {
    renderHeroesGrid();
    renderDraftList(); // Строим вертикальный список ходов справа
    updateStatus();
    document.getElementById('action-btn').addEventListener('click', handleActionClick);
}

function renderHeroesGrid() {
    document.getElementById('str-container').innerHTML = '';
    document.getElementById('agi-container').innerHTML = '';
    document.getElementById('int-container').innerHTML = '';
    document.getElementById('uni-container').innerHTML = '';

    heroesPool.forEach(hero => {
        const card = document.createElement('div');
        card.className = 'hero-card';
        card.id = `card-${hero.id}`;
        card.title = hero.name;
        card.innerHTML = `<div class="hero-icon">${hero.icon}</div>`;
        card.addEventListener('click', () => selectHero(hero.id));
        
        const targetContainer = document.getElementById(`${hero.attr}-container`);
        if (targetContainer) targetContainer.appendChild(card);
    });
}

// Отрисовка всей структуры вертикальной панели справа
function renderDraftList() {
    const listContainer = document.getElementById('draft-list-container');
    listContainer.innerHTML = '';

    draftSequence.forEach((step, idx) => {
        const row = document.createElement('div');
        row.className = 'draft-row';
        row.id = `step-row-${idx}`;

        const num = document.createElement('div');
        num.className = 'row-num';
        num.innerText = idx + 1;

        const badge = document.createElement('div');
        badge.className = `row-type-badge ${step.type === 'ban' ? 'ban-badge' : 'pick-badge'}`;
        badge.innerText = step.type;

        const slot = document.createElement('div');
        // Присваиваем класс слота в зависимости от стороны (Radiant - справа, Dire - слева)
        slot.className = `slot-display ${step.team === 'd' ? 'dire-slot' : ''}`;
        slot.id = `panel-slot-${idx}`; // Каждому шагу даем свой уникальный ID слота

        row.appendChild(num);
        if (step.team === 'd') {
            row.appendChild(slot);
            row.appendChild(badge);
        } else {
            row.appendChild(badge);
            row.appendChild(slot);
        }

        listContainer.appendChild(row);
    });
}

function selectHero(heroId) {
    if (currentStepIndex >= draftSequence.length || bannedHeroes.has(heroId) || pickedHeroes.has(heroId)) return;

    if (selectedHeroId) {
        const prevCard = document.getElementById(`card-${selectedHeroId}`);
        if (prevCard) prevCard.classList.remove('selected');
    }

    selectedHeroId = heroId;
    document.getElementById(`card-${heroId}`).classList.add('selected');

    const actionBtn = document.getElementById('action-btn');
    actionBtn.classList.remove('disabled');
    actionBtn.classList.add('player-turn');
    const step = draftSequence[currentStepIndex];
    actionBtn.innerText = step.type === 'ban' ? 'ЗАБАНИТЬ ГЕРОЯ' : 'ПИКНУТЬ ГЕРОЯ';
}

function handleActionClick() {
    if (!selectedHeroId || currentStepIndex >= draftSequence.length) return;

    const step = draftSequence[currentStepIndex];
    const hero = heroesPool.find(h => h.id === selectedHeroId);
    
    // Находим нужную ячейку в вертикальной панели по текущему индексу шага
    const slotElement = document.getElementById(`panel-slot-${currentStepIndex}`);
    if (slotElement) {
        slotElement.innerText = hero.icon;
        slotElement.className += step.type === 'ban' ? ' filled-ban' : ' filled-pick';
    }

    if (step.type === 'ban') bannedHeroes.add(selectedHeroId);
    else pickedHeroes.add(selectedHeroId);

    document.getElementById(`card-${selectedHeroId}`).classList.remove('selected');
    document.getElementById(`card-${selectedHeroId}`).classList.add('disabled');

    selectedHeroId = null;
    currentStepIndex++;

    const actionBtn = document.getElementById('action-btn');
    actionBtn.className = 'disabled';
    actionBtn.innerText = 'ВЫБЕРИТЕ ГЕРОЯ';

    updateStatus();
}

function updateStatus() {
    const statusMessage = document.getElementById('status-message');
    
    // Убираем старую подсветку строк
    document.querySelectorAll('.draft-row').forEach(r => r.classList.remove('active-row'));

    if (currentStepIndex >= draftSequence.length) {
        statusMessage.innerText = 'ДРАФТ ЗАВЕРШЕН!';
        statusMessage.style.color = "#fbbf24";
        document.getElementById('action-btn').innerText = 'КОНЕЦ';
        return;
    }

    // Подсвечиваем текущую активную строчку в вертикальной панели желтым цветом
    const activeRow = document.getElementById(`step-row-${currentStepIndex}`);
    if (activeRow) activeRow.classList.add('active-row');

    const step = draftSequence[currentStepIndex];
    const teamName = step.team === 'r' ? 'СВЕТ (RADIANT)' : 'ТЬМА (DIRE)';
    const actionName = step.type === 'ban' ? 'БАНЯТ' : 'ПИКАЮТ';
    
    statusMessage.innerText = `ХОД КОМАНДЫ: ${teamName}\nОНИ ${actionName} ГЕРОЙ #${step.index + 1}`;
    statusMessage.style.color = step.team === 'r' ? '#4ade80' : '#f87171';
}

document.addEventListener('DOMContentLoaded', init);
