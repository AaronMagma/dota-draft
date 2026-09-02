const heroesPool = [
    { name: "Doom", icon: "😈", counters: ["Viper", "Slark"], synergy: ["Grimstroke"] },
    { name: "Lina", icon: "🔥", counters: ["Viper"], synergy: [] },
    { name: "Slark", icon: "🦈", counters: ["Sven"], synergy: [] },
    { name: "Viper", icon: "🐍", counters: ["Lina"], synergy: [] },
    { name: "Sven", icon: "⚔️", counters: ["Winter Wyvern"], synergy: ["Undying"] },
    { name: "Winter Wyvern", icon: "❄️", counters: [], synergy: [] },
    { name: "Grimstroke", icon: "🖌️", counters: [], synergy: ["Doom"] },
    { name: "Undying", icon: "🧟", counters: ["Sven"], synergy: [] },
    { name: "Pudge", icon: "🥩", counters: [], synergy: [] },
    { name: "Juggernaut", icon: "🎭", counters: [], synergy: [] },
    { name: "Crystal Maiden", icon: "👑", counters: [], synergy: [] },
    { name: "Axe", icon: "🪓", counters: [], synergy: [] },
    { name: "Invoker", icon: "🔮", counters: [], synergy: [] },
    { name: "Phantom Assassin", icon: "🗡️", counters: [], synergy: [] },
    { name: "Anti-Mage", icon: "🧙", counters: [], synergy: [] },
    { name: "Shadow Fiend", icon: "💀", counters: [], synergy: [] },
    { name: "Wraith King", icon: "👑", counters: [], synergy: [] },
    { name: "Tidehunter", icon: "🍉", counters: [], synergy: [] },
    { name: "Lion", icon: "🦁", counters: [], synergy: [] },
    { name: "Zeus", icon: "⚡", counters: [], synergy: [] }
];

let availableHeroes = heroesPool.map(h => h.name);
let currentStep = 0;
let selectedHero = null;

const radiantDraft = { bans: [], picks: [] };
const direDraft = { bans: [], picks: [] };

const draftSchedule = [
    { type: "ban", side: false }, { type: "ban", side: false },
    { type: "ban", side: true }, { type: "ban", side: true },
    { type: "ban", side: false }, { type: "ban", side: true },
    { type: "ban", side: true }, { type: "pick", side: false },
    { type: "pick", side: true }, { type: "ban", side: false },
    { type: "ban", side: false }, { type: "ban", side: true },
    { type: "pick", side: true }, { type: "pick", side: false },
    { type: "pick", side: false }, { type: "pick", side: true },
    { type: "pick", side: true }, { type: "pick", side: false },
    { type: "ban", side: false }, { type: "ban", side: true },
    { type: "ban", side: false }, { type: "ban", side: true },
    { type: "pick", side: false }, { type: "pick", side: true }
];

const statusMessage = document.getElementById('status-message');
const actionBtn = document.getElementById('action-btn');
const container = document.getElementById('heroes-container');

function initHeroesGrid() {
    container.innerHTML = "";
    heroesPool.forEach(hero => {
        const card = document.createElement('div');
        card.className = 'hero-card';
        card.id = 'card-' + hero.name.replace(/\s+/g, '');
        
        const iconDiv = document.createElement('div');
        iconDiv.className = 'hero-icon';
        iconDiv.innerText = hero.icon;
        
        const nameLabel = document.createElement('div');
        nameLabel.className = 'hero-name-label';
        nameLabel.innerText = hero.name;

        card.appendChild(iconDiv);
        card.appendChild(nameLabel);
        
        card.addEventListener('click', () => selectHero(hero.name));
        container.appendChild(card);
    });
}

window.selectHero = function(heroName) {
    if (currentStep >= draftSchedule.length) return;
    const currentTurn = draftSchedule[currentStep];
    if (currentTurn.side === true) {
        alert("Сейчас ход Компьютера! Нажмите на кнопку.");
        return;
    }
    if (!availableHeroes.includes(heroName)) return;

    if (selectedHero) {
        const oldId = 'card-' + selectedHero.replace(/\s+/g, '');
        const oldCard = document.getElementById(oldId);
        if (oldCard) oldCard.classList.remove('selected');
    }

    selectedHero = heroName;
    const newId = 'card-' + heroName.replace(/\s+/g, '');
    document.getElementById(newId).classList.add('selected');
    
    actionBtn.classList.remove('disabled');
    actionBtn.innerText = currentTurn.type === 'ban' ? 'Забанить героя' : 'Пикнуть героя';
    actionBtn.classList.add('player-turn');
};

actionBtn.addEventListener('click', () => {
    if (currentStep >= draftSchedule.length) return;
    const currentTurn = draftSchedule[currentStep];

    if (currentTurn.side === false) {
        if (!selectedHero) {
            alert("Сначала выберите героя!");
            return;
        }
        executeDraftStep(selectedHero);
        selectedHero = null;
    } else {
        if (availableHeroes.length === 0) return;
        
        let bestHero = availableHeroes[0];
        let maxScore = -999;

        availableHeroes.forEach(heroName => {
            const heroData = heroesPool.find(h => h.name === heroName);
            let score = 0;

            if (currentTurn.type === "pick") {
                radiantDraft.picks.forEach(enemyHero => {
                    if (heroData.counters.includes(enemyHero)) score += 2;
                });
                direDraft.picks.forEach(allyHero => {
                    if (heroData.synergy.includes(allyHero)) score += 1;
                });
            } else if (currentTurn.type === "ban") {
                direDraft.picks.forEach(allyHero => {
                    const allyData = heroesPool.find(h => h.name === allyHero);
                    if (allyData && allyData.counters.includes(heroName)) score += 2;
                });
            }

            score += Math.random() * 0.5;

            if (score > maxScore) {
                maxScore = score;
                bestHero = heroName;
            }
        });

        executeDraftStep(bestHero);
    }
});

function executeDraftStep(heroName) {
    const currentTurn = draftSchedule[currentStep];
    const heroData = heroesPool.find(h => h.name === heroName);

    availableHeroes = availableHeroes.filter(name => name !== heroName);
    const cardId = 'card-' + heroName.replace(/\s+/g, '');
    const card = document.getElementById(cardId);
    if (card) {
        card.classList.remove('selected');
        card.classList.add('disabled');
    }

    const sidePrefix = currentTurn.side ? 'd' : 'r';
    const draftRef = currentTurn.side ? direDraft : radiantDraft;
    const arrayToPush = currentTurn.type === 'ban' ? draftRef.bans : draftRef.picks;
    const slotIndex = arrayToPush.length;
    arrayToPush.push(heroName);

    const slotId = sidePrefix + '-' + currentTurn.type + '-' + slotIndex;
    const slotElement = document.getElementById(slotId);
    
    if (slotElement) {
        slotElement.innerText = heroData.icon;
        if (currentTurn.type === 'ban') {
            slotElement.style.filter = 'grayscale(100%) brightness(40%)';
        }
    }

    currentStep++;
    updateUI();
}

function updateUI() {
    if (currentStep >= draftSchedule.length) {
        statusMessage.innerText = "Драфт окончен!";
        actionBtn.innerText = "Конец";
        actionBtn.className = "disabled";
        return;
    }

    const nextTurn = draftSchedule[currentStep];
    if (nextTurn.side === false) {
        statusMessage.innerText = nextTurn.type === 'ban' ? "Ваш ход: Бан героя" : "Ваш ход: Выберите Пик";
        actionBtn.innerText = "Выберите героя";
        actionBtn.className = "disabled";
    } else {
        statusMessage.innerText = nextTurn.type === 'ban' ? "Ход Тьмы (ИИ): Бан" : "Ход Тьмы (ИИ): Пик";
        actionBtn.innerText = "Ход Компьютера";
        actionBtn.className = "";
    }
}

initHeroesGrid();
updateUI();
