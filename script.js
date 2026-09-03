const heroesPool = [
    // Сила (Strength)
    { name: "Axe", icon: "🪓", role: "Core", counters: ["Phantom Assassin", "Sven"], synergy: ["Dazzle"] },
    { name: "Pudge", icon: "🥩", role: "Support", counters: ["Crystal Maiden"], synergy: ["Grimstroke"] },
    { name: "Sven", icon: "⚔️", role: "Core", counters: ["Winter Wyvern"], synergy: ["Undying", "Magnus"] },
    { name: "Undying", icon: "🧟", role: "Support", counters: ["Sven"], synergy: ["Sniper"] },
    { name: "Tidehunter", icon: "🍉", role: "Core", counters: ["Anti-Mage"], synergy: ["Invoker", "Lina"] },
    { name: "Wraith King", icon: "👑", role: "Core", counters: ["Anti-Mage"], synergy: ["Grimstroke"] },
    { name: "Slardar", icon: "🐟", role: "Core", counters: ["Slark"], synergy: ["Lina"] },
    { name: "Dragon Knight", icon: "🐉", role: "Core", counters: ["Viper"], synergy: ["Lion"] },
    { name: "Doom", icon: "😈", role: "Core", counters: ["Viper", "Slark"], synergy: ["Grimstroke"] },
    { name: "Magnus", icon: "🦏", role: "Core", counters: ["Sniper"], synergy: ["Sven", "Juggernaut"] },

    // Ловкость (Agility)
    { name: "Juggernaut", icon: "🎭", role: "Core", counters: ["Axe"], synergy: ["Magnus", "Shadow Shaman"] },
    { name: "Phantom Assassin", icon: "🗡️", role: "Core", counters: ["Viper"], synergy: ["Magnus"] },
    { name: "Anti-Mage", icon: "🧙", role: "Core", counters: ["Lina", "Zeus"], synergy: ["Grimstroke"] },
    { name: "Shadow Fiend", icon: "💀", role: "Core", counters: ["Templar Assassin"], synergy: ["Eul"] },
    { name: "Slark", icon: "🦈", role: "Core", counters: ["Sven", "Axe"], synergy: ["Omniknight"] },
    { name: "Viper", icon: "🐍", role: "Core", counters: ["Lina"], synergy: ["Undying"] },
    { name: "Sniper", icon: "🎯", role: "Core", counters: ["Drow Ranger"], synergy: ["Undying"] },
    { name: "Drow Ranger", icon: "🏹", role: "Core", counters: ["Axe"], synergy: ["Vengeful Spirit"] },
    { name: "Faceless Void", icon: "⏳", role: "Core", counters: ["Viper"], synergy: ["Invoker"] },
    { name: "Templar Assassin", icon: "🏵️", role: "Core", counters: ["Viper", "Doom"], synergy: ["Slardar"] },
    { name: "Vengeful Spirit", icon: "🦇", role: "Support", counters: ["Lion"], synergy: ["Drow Ranger"] },

    // Интеллект и Универсалы (Intelligence / Universal)
    { name: "Lina", icon: "🔥", role: "Core", counters: ["Viper"], synergy: ["Shadow Shaman"] },
    { name: "Crystal Maiden", icon: "👑", role: "Support", counters: ["Doom"], synergy: ["Juggernaut"] },
    { name: "Invoker", icon: "🔮", role: "Core", counters: ["Anti-Mage"], synergy: ["Faceless Void"] },
    { name: "Winter Wyvern", icon: "❄️", role: "Support", counters: ["Sven"], synergy: ["Sven"] },
    { name: "Grimstroke", icon: "🖌️", role: "Support", counters: ["Doom"], synergy: ["Doom", "Lich"] },
    { name: "Lion", icon: "🦁", role: "Support", counters: ["Anti-Mage"], synergy: ["Lina"] },
    { name: "Zeus", icon: "⚡", role: "Core", counters: ["Anti-Mage"], synergy: ["Faceless Void"] },
    { name: "Dazzle", icon: "🧪", role: "Support", counters: ["Axe"], synergy: ["Axe"] },
    { name: "Shadow Shaman", icon: "🦎", role: "Support", counters: ["Sniper"], synergy: ["Juggernaut"] },
    { name: "Rubick", icon: "🟢", role: "Support", counters: ["Enigma"], synergy: ["Magnus"] },
    { name: "Lich", icon: "🥶", role: "Support", counters: ["Anti-Mage"], synergy: ["Grimstroke"] },
    { name: "Witch Doctor", icon: "🥥", role: "Support", counters: ["Slark"], synergy: ["Faceless Void"] },
    { name: "Enigma", icon: "🕳️", role: "Core", counters: ["Rubick", "Silencer"], synergy: ["Tidehunter"] },
    { name: "Silencer", icon: "🤫", role: "Support", counters: ["Enigma"], synergy: ["Drow Ranger"] }
];
let availableHeroes = heroesPool.map(h => h.name);let currentStep = 0;let selectedHero = null;let isAiThinking = false;
const radiantDraft = { bans: [], picks: [] };const direDraft = { bans: [], picks: [] };
// СТРОГО ВАША ПОСЛЕДОВАТЕЛЬНОСТЬ (7 Банов / 5 Пиков для каждой команды)// side: false - Игрок (Свет / Radiant), side: true - Компьютер (Тьма / Dire)const draftSchedule = [
    // Фаза 1: 7 банов, затем 2 пика и 3 бана
    { type: "ban", side: true }, { type: "ban", side: true },   // Дайр -> Дайр
    { type: "ban", side: false }, { type: "ban", side: false }, // Радиант -> Радиант
    { type: "ban", side: true },                                // Дайр
    { type: "ban", side: false }, { type: "ban", side: false }, // Радиант -> Радиант
    { type: "pick", side: true }, { type: "pick", side: false },// Дайр -> Радиант
    { type: "ban", side: true }, { type: "ban", side: true },   // Дайр -> Дайр
    { type: "ban", side: false },                               // Радиант

    // Фаза 2: 6 пиков, затем 4 пика
    { type: "pick", side: false }, { type: "pick", side: true }, { type: "pick", side: true }, // Радиант -> Дайр -> Дайр
    { type: "pick", side: false }, { type: "pick", side: false }, { type: "pick", side: true },// Радиант -> Радиант -> Дайр
    { type: "pick", side: true }, { type: "pick", side: false },                               // Дайр -> Радиант
    { type: "pick", side: true }, { type: "pick", side: false },                               // Дайр -> Радиант

    // Фаза 3: 4 бана, затем финальные пики
    { type: "ban", side: true }, { type: "ban", side: false },  // Дайр -> Радиант
    { type: "ban", side: true }, { type: "ban", side: false },  // Дайр -> Радиант
    { type: "pick", side: true }, { type: "pick", side: false } // Дайр -> Радиант
];
const statusMessage = document.getElementById('status-message');const actionBtn = document.getElementById('action-btn');const container = document.getElementById('heroes-container');
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
    if (currentStep >= draftSchedule.length || isAiThinking) return;
    
    const currentTurn = draftSchedule[currentStep];
    if (currentTurn.side === true) return; // Игнорируем клики в ход ИИ
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
    if (currentStep >= draftSchedule.length || isAiThinking) return;
    
    const currentTurn = draftSchedule[currentStep];
    if (currentTurn.side === false) {
        if (!selectedHero) {
            alert("Сначала выберите героя!");
            return;
        }
        executeDraftStep(selectedHero);
        selectedHero = null;
    }
});
function makeAiMove() {
    if (currentStep >= draftSchedule.length || availableHeroes.length === 0) return;
    
    isAiThinking = true;
    const currentTurn = draftSchedule[currentStep];

    setTimeout(() => {
        let bestHero = availableHeroes[0];
        let maxScore = -999;

        availableHeroes.forEach(heroName => {
            const heroData = heroesPool.find(h => h.name === heroName);
            let score = 0;

            if (currentTurn.type === "pick") {
                // ИИ считает силу контрпиков против ваших персонажей
                radiantDraft.picks.forEach(enemyHero => {
                    if (heroData.counters.includes(enemyHero)) score += 2;
                });
                // ИИ считает силу синергии со своими персонажами
                direDraft.picks.forEach(allyHero => {
                    if (heroData.synergy.includes(allyHero)) score += 1;
                });
            } else if (currentTurn.type === "ban") {
                // ИИ банит то, что контрит его текущие пики
                direDraft.picks.forEach(allyHero => {
                    const allyData = heroesPool.find(h => h.name === allyHero);
                    if (allyData && allyData.counters.includes(heroName)) score += 2;
                });
                // ИИ мешает вам взять хороших героев
                radiantDraft.picks.forEach(enemyHero => {
                    if (heroData.counters.includes(enemyHero)) score += 1;
                });
            }

            score += Math.random() * 0.5; // Слегка разбавляем рандомом

            if (score > maxScore) {
                maxScore = score;
                bestHero = heroName;
            }
        });

        isAiThinking = false;
        executeDraftStep(bestHero);
    }, 1000);
}
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
        statusMessage.style.color = "#fbbf24";
        actionBtn.innerText = "Конец";
        actionBtn.className = "disabled";
        return;
    }

    const nextTurn = draftSchedule[currentStep];
    
    if (nextTurn.side === false) {
        statusMessage.innerText = nextTurn.type === 'ban' ? "Ваш ход: Бан героя" : "Ваш ход: Выберите Пик";
        statusMessage.style.color = "#4ade80";
        actionBtn.innerText = "Выберите героя";
        actionBtn.className = "disabled";
    } else {
        statusMessage.innerText = nextTurn.type === 'ban' ? "Ход Тьмы (ИИ): Думает над баном..." : "Ход Тьмы (ИИ): Выбирает пик...";
        statusMessage.style.color = "#f87171";
        actionBtn.innerText = "ИИ выбирает...";
        actionBtn.className = "disabled";
        
        makeAiMove();
    }
}

// БЕЗОПАСНЫЙ ЗАПУСК: Ждем, пока браузер полностью построит HTML-дерево
document.addEventListener('DOMContentLoaded', () => {
    initHeroesGrid();
    updateUI();
});
initHeroesGrid();
updateUI();
