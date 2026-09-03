// Полный пул героев, разбитый на 4 класса по 6 штук в каждом
const heroesPool = [
    // --- STRENGTH (Сила) ---
    { id: "axe", name: "Axe", attr: "str", icon: "🪓" },
    { id: "pudge", name: "Pudge", attr: "str", icon: "🥩" },
    { id: "earthshaker", name: "Earthshaker", attr: "str", icon: "🪨" },
    { id: "sven", name: "Sven", attr: "str", icon: "⚔️" },
    { id: "undying", name: "Undying", attr: "str", icon: "🧟" },
    { id: "slardar", name: "Slardar", attr: "str", icon: "🐟" },

    // --- AGILITY (Ловкость) ---
    { id: "juggernaut", name: "Juggernaut", attr: "agi", icon: "👺" },
    { id: "phantom_assassin", name: "PA", attr: "agi", icon: "🗡️" },
    { id: "sniper", name: "Sniper", attr: "agi", icon: "🎯" },
    { id: "anti_mage", name: "Anti-Mage", attr: "agi", icon: "🔮" },
    { id: "bloodseeker", name: "Bloodseeker", attr: "agi", icon: "🩸" },
    { id: "viper", name: "Viper", attr: "agi", icon: "🐍" },

    // --- INTELLIGENCE (Интеллект) ---
    { id: "crystal_maiden", name: "CM", attr: "int", icon: "❄️" },
    { id: "invoker", name: "Invoker", attr: "int", icon: "☄️" },
    { id: "storm_spirit", name: "Storm", attr: "int", icon: "⚡" },
    { id: "witch_doctor", name: "WD", attr: "int", icon: "🧪" },
    { id: "lina", name: "Lina", attr: "int", icon: "🔥" },
    { id: "shadow_shaman", name: "Shaman", attr: "int", icon: "🐍" },

    // --- UNIVERSAL (Универсалы) ---
    { id: "abaddon", name: "Abaddon", attr: "uni", icon: "🐴" },
    { id: "lycan", name: "Lycan", attr: "uni", icon: "🐺" },
    { id: "magnus", name: "Magnus", attr: "uni", icon: "🦏" },
    { id: "windranger", name: "WR", attr: "uni", icon: "🏹" },
    { id: "mirana", name: "Mirana", attr: "uni", icon: "🐯" },
    { id: "timbersaw", name: "Timbersaw", attr: "uni", icon: "🌲" }
];

// Ваш точный порядок ходов на 24 шага (Тьма начинает)
const draftSequence = [
    { step: 1, team: "dire", type: "ban" },
    { step: 2, team: "dire", type: "ban" },
    { step: 3, team: "radiant", type: "ban" },
    { step: 4, team: "radiant", type: "ban" },
    { step: 5, team: "dire", type: "ban" },
    { step: 6, team: "radiant", type: "ban" },
    { step: 7, team: "radiant", type: "ban" },
    { step: 8, team: "dire", type: "pick" },
    { step: 9, team: "radiant", type: "pick" },
    { step: 10, team: "dire", type: "ban" },
    { step: 11, team: "dire", type: "ban" },
    { step: 12, team: "radiant", type: "ban" },
    { step: 13, team: "radiant", type: "pick" },
    { step: 14, team: "dire", type: "pick" },
    { step: 15, team: "dire", type: "pick" },
    { step: 16, team: "radiant", type: "pick" },
    { step: 17, team: "radiant", type: "pick" },
    { step: 18, team: "dire", type: "pick" },
    { step: 19, team: "dire", type: "ban" },
    { step: 20, team: "radiant", type: "ban" },
    { step: 21, team: "dire", type: "ban" },
    { step: 22, team: "radiant", type: "ban" },
    { step: 23, team: "dire", type: "pick" },
    { step: 24, team: "radiant", type: "pick" }
];

let currentStepIndex = 0;
let selectedHeroId = null;
const bannedHeroes = new Set();
const pickedHeroes = new Set();

document.addEventListener("DOMContentLoaded", () => {
    renderHeroesGrid();
    renderDraftRows();
    updateUI();
    
    const actionBtn = document.getElementById("action-btn");
    actionBtn.addEventListener("click", commitCurrentTurn);
});

function renderHeroesGrid() {
    // Очищаем все контейнеры классов перед заполнением
    const containers = {
        str: document.getElementById("str-container"),
        agi: document.getElementById("agi-container"),
        int: document.getElementById("int-container"),
        uni: document.getElementById("uni-container")
    };
    
    Object.values(containers).forEach(c => { if (c) c.innerHTML = ""; });

    heroesPool.forEach(hero => {
        const targetContainer = containers[hero.attr];
        if (!targetContainer) return;

        const card = document.createElement("div");
        card.className = "hero-card";
        card.id = `grid-hero-${hero.id}`;
        
        card.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px; padding: 2px;">
                <span style="font-size: 18px;">${hero.icon}</span>
                <span style="font-size: 9px; font-weight: bold; color: #a1a1aa; text-align: center; white-space: nowrap;">${hero.name}</span>
            </div>
        `;
        
        card.addEventListener("click", () => selectHero(hero.id));
        targetContainer.appendChild(card);
    });
}

function renderDraftRows() {
    const listContainer = document.getElementById("draft-list-container");
    listContainer.innerHTML = "";

    draftSequence.forEach((config, index) => {
        const row = document.createElement("div");
        row.className = "draft-row";
        row.id = `draft-row-${index}`;

        const leftSlot = document.createElement("div");
        leftSlot.id = `slot-left-${index}`;
        leftSlot.className = "slot-display empty-slot";

        const rightSlot = document.createElement("div");
        rightSlot.id = `slot-right-${index}`;
        rightSlot.className = "slot-display empty-slot";

        const centerInfo = document.createElement("div");
        centerInfo.className = "row-center-info";
        
        const numLabel = document.createElement("span");
        numLabel.className = "row-num";
        numLabel.textContent = config.step;

        const badge = document.createElement("span");
        badge.className = `row-type-badge ${config.type}-badge`;
        badge.textContent = config.type;

        centerInfo.appendChild(numLabel);
        centerInfo.appendChild(badge);

        row.appendChild(leftSlot);
        row.appendChild(centerInfo);
        row.appendChild(rightSlot);

        listContainer.appendChild(row);
    });
}

function selectHero(heroId) {
    if (currentStepIndex >= draftSequence.length) return;
    if (bannedHeroes.has(heroId) || pickedHeroes.has(heroId)) return;

    if (selectedHeroId) {
        const oldCard = document.getElementById(`grid-hero-${selectedHeroId}`);
        if (oldCard) oldCard.classList.remove("selected");
    }

    selectedHeroId = heroId;
    const newCard = document.getElementById(`grid-hero-${heroId}`);
    if (newCard) newCard.classList.add("selected");

    updateUI();
}

function commitCurrentTurn() {
    if (!selectedHeroId || currentStepIndex >= draftSequence.length) return;

    const currentTurn = draftSequence[currentStepIndex];
    const hero = heroesPool.find(h => h.id === selectedHeroId);

    if (currentTurn.type === "ban") {
        bannedHeroes.add(selectedHeroId);
    } else {
        pickedHeroes.add(selectedHeroId);
    }

    const card = document.getElementById(`grid-hero-${selectedHeroId}`);
    if (card) {
        card.classList.remove("selected");
        card.classList.add("disabled");
    }

    const targetSlotId = currentTurn.team === "radiant" ? `slot-left-${currentStepIndex}` : `slot-right-${currentStepIndex}`;
    const slot = document.getElementById(targetSlotId);
    if (slot) {
        slot.classList.remove("empty-slot");
        slot.classList.add(currentTurn.type === "ban" ? "filled-ban" : "filled-pick");
        slot.innerHTML = `<span style="font-size: 16px;">${hero.icon}</span>`;
    }

    currentStepIndex++;
    selectedHeroId = null;
    
    updateUI();
}

function updateUI() {
    const statusMsg = document.getElementById("status-message");
    const actionBtn = document.getElementById("action-btn");

    document.querySelectorAll(".draft-row").forEach(r => r.classList.remove("active-row"));

    if (currentStepIndex >= draftSequence.length) {
        statusMsg.textContent = "ДРАФТ ЗАВЕРШЕН!";
        statusMsg.style.color = "#22c55e";
        actionBtn.textContent = "КОНЕЦ";
        actionBtn.className = "disabled";
        return;
    }

    const turn = draftSequence[currentStepIndex];
    const teamName = turn.team === "radiant" ? "Radiant (Свет)" : "Dire (Тьма)";
    const actionName = turn.type === "ban" ? "БАНИТ" : "ВЫБИРАЕТ";
    
    statusMsg.textContent = `${teamName}\n${actionName}`;
    statusMsg.style.color = turn.team === "radiant" ? "#22c55e" : "#f87171";

    const activeRow = document.getElementById(`draft-row-${currentStepIndex}`);
    if (activeRow) {
        activeRow.classList.add("active-row");
    }

    if (selectedHeroId) {
        const selectedHero = heroesPool.find(h => h.id === selectedHeroId);
        actionBtn.textContent = `ПОДТВЕРДИТЬ: ${selectedHero.name}`;
        actionBtn.className = "player-turn";
    } else {
        actionBtn.textContent = turn.type === "ban" ? "ЗАБАНЬТЕ ГЕРОЯ" : "ВЫБЕРИТЕ ГЕРОЯ";
        actionBtn.className = "disabled";
    }
}
