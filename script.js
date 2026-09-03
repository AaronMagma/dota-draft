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
    { team: 'd', type: 'ban', index: 5 },  // 19й бан тьма (БЫЛ ОШИБОЧНЫЙ ПИК)
    { team: 'r', type: 'ban', index: 5 },  // 20й бан свет (БЫЛ ОШИБОЧНЫЙ ПИК)
    { team: 'd', type: 'ban', index: 6 },  // 21й бан тьма
    { team: 'r', type: 'ban', index: 6 },  // 22й бан свет
    { team: 'd', type: 'pick', index: 4 }, // 23й пик тьма (БЫЛ ОШИБОЧНЫЙ БАН)
    { team: 'r', type: 'pick', index: 4 }  // 24й пик свет (БЫЛ ОШИБОЧНЫЙ БАН)
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

        // Левый слот (Radiant)
        const radiantSlot = document.createElement('div');
        radiantSlot.className = 'slot-display empty-slot';
        if (step.team === 'r') {
            radiantSlot.id = `panel-slot-${idx}`; // ID даем только активному для этого шага слоту
            radiantSlot.className = 'slot-display';
        }

        // Правый слот (Dire)
        const direSlot = document.createElement('div');
        direSlot.className = 'slot-display empty-slot';
        if (step.team === 'd') {
            direSlot.id = `panel-slot-${idx}`; // ID даем только активному для этого шага слоту
            direSlot.className = 'slot-display';
        }

        // Центральная инфо-панель (Номер + Бадж)
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

        // Собираем строку строго по структуре: [Radiant] [Центр] [Dire]
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
