const heroesPool = [
    // --- НАША ИДЕАЛЬНАЯ ТЕСТОВАЯ ЧЕТВЕРКА СИЛЫ ---
    { id: "axe", name: "Axe", attr: "str", img: "https://dotabuff.com" },
    { id: "pudge", name: "Pudge", attr: "str", img: "https://ru.dotabuff.com/assets/heroes/pudge-d8673aca5ef38b0cff4826c8c7d22e09e8e09b44940a86859c8161553caefa8c.jpg" },
    { id: "earthshaker", name: "Earthshaker", attr: "str", img: "https://ru.dotabuff.com/assets/heroes/earthshaker-b491d33fcf49d6be267f9c01734b8684e4183c142c9cd0f3e0e1dc84207241a8.jpg" },
    { id: "sven", name: "Sven", attr: "str", img: "https://ru.dotabuff.com/assets/heroes/sven-33b31c39c41f43d6d00e525522fd9f24b971213541a2224b86abf67a39f313c0.jpg" }
];

const draftSequence = [
    { team: 'd', type: 'ban', index: 0 },  { team: 'd', type: 'ban', index: 1 },
    { team: 'r', type: 'ban', index: 0 },  { team: 'r', type: 'ban', index: 1 }
];

let currentStepIndex = 0;
let selectedHeroId = null;
const bannedHeroes = new Set();
const pickedHeroes = new Set();

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
        
        card.innerHTML = `<img src="${hero.img}" alt="${hero.name}">`;
        card.addEventListener('click', () => selectHero(hero.id));
        
        const targetContainer = document.getElementById(`${hero.attr}-container`);
        if (targetContainer) targetContainer.appendChild(card);
    });
}

function renderDraftList() {
    const listContainer = document.getElementById('draft-list-container');
    if (!listContainer) return;
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
    const hero = heroesPool.find(h => h.id === selectedHeroId);
    
    const slotElement = document.getElementById(`panel-slot-${currentStepIndex}`);
    if (slotElement) {
        slotElement.innerHTML = `<img src="${hero.img}" alt="hero">`;
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
    if (!statusMessage) return;
    
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

init();
