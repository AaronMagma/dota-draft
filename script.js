const heroesPool = [
    // --- STRENGTH ---
    { id: "axe", name: "Axe", attr: "str" },
    { id: "pudge", name: "Pudge", attr: "str" },
    { id: "earthshaker", name: "Earthshaker", attr: "str" },
    { id: "sven", name: "Sven", attr: "str" },
    { id: "undying", name: "Undying", attr: "str" },
    { id: "tidehunter", name: "Tidehunter", attr: "str" },
    { id: "wraith_king", name: "Wraith King", attr: "str" },
    { id: "slardar", name: "Slardar", attr: "str" },
    { id: "doom", name: "Doom", attr: "str" },
    { id: "magnus", name: "Magnus", attr: "str" },
    { id: "kunkka", name: "Kunkka", attr: "str" },
    { id: "tiny", name: "Tiny", attr: "str" },

    // --- AGILITY ---
    { id: "juggernaut", name: "Juggernaut", attr: "agi" },
    { id: "phantom_assassin", name: "Phantom Assassin", attr: "agi" },
    { id: "nevermore", name: "Shadow Fiend", attr: "agi" }, // Официальный ID СФа в файлах игры — nevermore
    { id: "slark", name: "Slark", attr: "agi" },
    { id: "viper", name: "Viper", attr: "agi" },
    { id: "sniper", name: "Sniper", attr: "agi" },
    { id: "drow_ranger", name: "Drow Ranger", attr: "agi" },
    { id: "faceless_void", name: "Faceless Void", attr: "agi" },
    { id: "templar_assassin", name: "Templar Assassin", attr: "agi" },
    { id: "bloodseeker", name: "Bloodseeker", attr: "agi" },
    { id: "ursa", name: "Ursa", attr: "agi" },
    { id: "riki", name: "Riki", attr: "agi" },

    // --- INTELLIGENCE ---
    { id: "crystal_maiden", name: "Crystal Maiden", attr: "int" },
    { id: "lina", name: "Lina", attr: "int" },
    { id: "lion", name: "Lion", attr: "int" },
    { id: "zuus", name: "Zeus", attr: "int" }, // Официальный ID Зевса в файлах — zuus
    { id: "storm_spirit", name: "Storm Spirit", attr: "int" },
    { id: "puck", name: "Puck", attr: "int" },
    { id: "pugna", name: "Pugna", attr: "int" },
    { id: "lich", name: "Lich", attr: "int" },
    { id: "witch_doctor", name: "Witch Doctor", attr: "int" },
    { id: "tinker", name: "Tinker", attr: "int" },
    { id: "skywrath_mage", name: "Skywrath Mage", attr: "int" },
    { id: "necrolyte", name: "Necrophos", attr: "int" }, // Официальный ID Некрофоса — necrolyte

    // --- UNIVERSAL ---
    { id: "invoker", name: "Invoker", attr: "uni" },
    { id: "rubick", name: "Rubick", attr: "uni" },
    { id: "antimage", name: "Anti-Mage", attr: "uni" }, // Официальный ID Антимага — antimage
    { id: "winter_wyvern", name: "Winter Wyvern", attr: "uni" },
    { id: "grimstroke", name: "Grimstroke", attr: "uni" },
    { id: "dazzle", name: "Dazzle", attr: "uni" },
    { id: "shadow_shaman", name: "Shadow Shaman", attr: "uni" },
    { id: "abaddon", name: "Abaddon", attr: "uni" },
    { id: "marci", name: "Marci", attr: "uni" },
    { id: "dark_willow", name: "Dark Willow", attr: "uni" },
    { id: "vengefulspirit", name: "Vengeful Spirit", attr: "uni" }, // Официальный ID Венги — vengefulspirit
    { id: "enigma", name: "Enigma", attr: "uni" }
];

const draftSequence = [
    { team: 'd', type: 'ban', index: 0 },  { team: 'd', type: 'ban', index: 1 },
    { team: 'r', type: 'ban', index: 0 },  { team: 'r', type: 'ban', index: 1 },
    { team: 'd', type: 'ban', index: 2 },  { team: 'r', type: 'ban', index: 2 },
    { team: 'r', type: 'ban', index: 3 },  { team: 'd', type: 'pick', index: 0 },
    { team: 'r', type: 'pick', index: 0 }, { team: 'd', type: 'ban', index: 3 },
    { team: 'd', type: 'ban', index: 4 },  { team: 'r', type: 'ban', index: 4 },
    { team: 'r', type: 'pick', index: 1 }, { team: 'd', type: 'pick', index: 1 },
    { team: 'd', type: 'pick', index: 2 }, { team: 'r', type: 'pick', index: 2 },
    { team: 'r', type: 'pick', index: 3 }, { team: 'd', type: 'pick', index: 3 },
    { team: 'd', type: 'ban', index: 5 },  { team: 'r', type: 'ban', index: 5 },
    { team: 'd', type: 'ban', index: 6 },  { team: 'r', type: 'ban', index: 6 },
    { team: 'd', type: 'pick', index: 4 }, { team: 'r', type: 'pick', index: 4 }
];

let currentStepIndex = 0;
let selectedHeroId = null;
const bannedHeroes = new Set();
const pickedHeroes = new Set();

// Вспомогательная функция, которая собирает прямую ссылку на картинку героя с серверов Steam/Valve
function getHeroImageUrl(heroId) {
    return `https://steamstatic.com{heroId}.png`;
}

function init() {
    renderHeroesGrid();
    renderDraftList();
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
        
        // Вместо текста-смайлика вставляем тег <img> с официальной аватаркой
        card.innerHTML = `<img src="${getHeroImageUrl(hero.id)}" alt="${hero.name}">`;
        
        card.addEventListener('click', () => selectHero(hero.id));
        
        const targetContainer = document.getElementById(`${hero.attr}-container`);
        if (targetContainer) targetContainer.appendChild(card);
    });
}

function renderDraftList() {
    const listContainer = document.getElementById('draft-list-container');
    listContainer.innerHTML = '';

    draftSequence.forEach((step, idx) => {
        const row = document.createElement('div');
        row.className = 'draft-row';
        row.id = `step-row-${idx}`;

        const radiantSlot = document.createElement('div');
        radiantSlot.className = 'slot-display empty-slot';
        if (step.team === 'r') {
            radiantSlot.id = `panel-slot-${idx}`;
            radiantSlot.className = 'slot-display';
        }

        const direSlot = document.createElement('div');
        direSlot.className = 'slot-display empty-slot';
        if (step.team === 'd') {
            direSlot.id = `panel-slot-${idx}`;
            direSlot.className = 'slot-display';
        }

        const centerInfo = document.createElement('div');
        centerInfo.className = 'row-center-info';

        const num = document.createElement('div');
        num.className = 'row-num';
        num.innerText = idx + 1;

        const badge = document.createElement('div');
        badge.className = `row-type-badge ${step.type === 'ban' ? 'ban-badge' : 'pick-badge'}`;
        badge.innerText = step.type;

        centerInfo.appendChild(num);
        centerInfo.appendChild(badge);

        row.appendChild(radiantSlot);
        row.appendChild(centerInfo);
        row.appendChild(direSlot);

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
    
    const slotElement = document.getElementById(`panel-slot-${currentStepIndex}`);
    if (slotElement) {
        // При подтверждении хода вставляем картинку героя прямо в ячейку правой панели
        slotElement.innerHTML = `<img src="${getHeroImageUrl(selectedHeroId)}" alt="hero">`;
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
    
    document.querySelectorAll('.draft-row').forEach(r => r.classList.remove('active-row'));

    if (currentStepIndex >= draftSequence.length) {
        statusMessage.innerText = 'ДРАФТ ЗАВЕРШЕН!';
        statusMessage.style.color = "#fbbf24";
        document.getElementById('action-btn').innerText = 'КОНЕЦ';
        return;
    }

    const activeRow = document.getElementById(`step-row-${currentStepIndex}`);
    if (activeRow) activeRow.classList.add('active-row');

    const step = draftSequence[currentStepIndex];
    const teamName = step.team === 'r' ? 'СВЕТ (RADIANT)' : 'ТЬМА (DIRE)';
    const actionName = step.type === 'ban' ? 'БАНЯТ' : 'ПИКАЮТ';
    
    statusMessage.innerText = `ХОД КОМАНДЫ: ${teamName}\nОНИ ${actionName} ГЕРОЙ #${step.index + 1}`;
    statusMessage.style.color = step.team === 'r' ? '#4ade80' : '#f87171';
}

document.addEventListener('DOMContentLoaded', init);
