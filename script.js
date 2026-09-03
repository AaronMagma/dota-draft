// Официальные CDN-картинки Valve/Steam, которые точно загрузятся
const heroesPool = [
     --- STRENGTH ---
    { id axe, name Axe, attr str, img httpsru.dotabuff.comassetsheroesaxe-b974399c8ee8079a6c83b2b6a8ca033a63defc0229b07b547f4befd775ca53f3.jpg },
    { id pudge, name Pudge, attr str, img httpsru.dotabuff.comassetsheroespudge-d8673aca5ef38b0cff4826c8c7d22e09e8e09b44940a86859c8161553caefa8c.jpg },
    { id earthshaker, name Earthshaker, attr str, img httpsru.dotabuff.comassetsheroesearthshaker-b491d33fcf49d6be267f9c01734b8684e4183c142c9cd0f3e0e1dc84207241a8.jpg },
    { id sven, name Sven, attr str, img httpsru.dotabuff.comassetsheroessven-33b31c39c41f43d6d00e525522fd9f24b971213541a2224b86abf67a39f313c0.jpg },
    { id undying, name Undying, attr str, img httpsru.dotabuff.comassetsheroesundying-a30a48d689e0b40f6afc6f6892a5f9d8d16549098043f29dcfd6e2221c5a51f0.jpg },
    { id tidehunter, name Tidehunter, attr str, img httpsru.dotabuff.comassetsheroestidehunter-89034daeb395b0cb9799f5c7b79220310407c382823b012f3c23d0a98f7d7e0a.jpg },
    { id wraith_king, name Wraith King, attr str, img httpsru.dotabuff.comassetsheroeswraith-king-233a53f103c784de0f480cec4f18dd8490bd6da44357154e4717dfb31ffbb2b3.jpg },
    { id slardar, name Slardar, attr str, img httpsru.dotabuff.comassetsheroesslardar-f8cad16974d24ca788a8da6aea7b74bf82f2d1df97bfdade68992011ed9ce7fa.jpg },
    { id doom, name Doom, attr str, img httpsru.dotabuff.comassetsheroesdoom-3b31f2b2a692a4d59e6e7f01abfb13a47fadde69b0d2ab15aa30878c945ad428.jpg },
    { id magnus, name Magnus, attr str, img httpsru.dotabuff.comassetsheroesmagnus-5d9d18053840882b32748dd0bff8659053daf53e2611ecbce64839e5fe77bc88.jpg },
    { id kunkka, name Kunkka, attr str, img httpsru.dotabuff.comassetsheroeskunkka-1360505f595012f22b938e9be7fa181916d6e8cde1f59fca4147c27c65fd0293.jpg },
    { id tiny, name Tiny, attr str, img httpsru.dotabuff.comassetsheroestiny-3dba927336577daaf57ddfde9e74f4b25d1a117bf3eb76c5635ddcbc8225bb61.jpg },

  
];

// Официальный Captains Mode на 24 шага
const draftSequence = [
    { step: 1, team: "radiant", type: "ban" },  { step: 2, team: "dire",    type: "ban" },
    { step: 3, team: "radiant", type: "ban" },  { step: 4, team: "dire",    type: "ban" },
    { step: 5, team: "radiant", type: "ban" },  { step: 6, team: "dire",    type: "ban" },
    { step: 7, team: "radiant", type: "pick" }, { step: 8, team: "dire",    type: "pick" },
    { step: 9, team: "dire",    type: "pick" }, { step: 10, team: "radiant", type: "pick" },
    { step: 11, team: "radiant", type: "ban" }, { step: 12, team: "dire",    type: "ban" },
    { step: 13, team: "radiant", type: "ban" }, { step: 14, team: "dire",    type: "ban" },
    { step: 15, team: "dire",    type: "pick" }, { step: 16, team: "radiant", type: "pick" },
    { step: 17, team: "dire",    type: "pick" }, { step: 18, team: "radiant", type: "pick" },
    { step: 19, team: "dire",    type: "ban" },  { step: 20, team: "radiant", type: "ban" },
    { step: 21, team: "dire",    type: "ban" },  { step: 22, team: "radiant", type: "ban" },
    { step: 23, team: "radiant", type: "pick" }, { step: 24, team: "dire",    type: "pick" }
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
    const container = document.getElementById("str-container");
    if (!container) return;
    container.innerHTML = "";

    heroesPool.forEach(hero => {
        const card = document.createElement("div");
        card.className = "hero-card";
        card.id = `grid-hero-${hero.id}`;
        card.innerHTML = `<img src="${hero.img}" alt="${hero.name}" title="${hero.name}">`;
        
        card.addEventListener("click", () => selectHero(hero.id));
        container.appendChild(card);
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
        slot.innerHTML = `<img src="${hero.img}" alt="${hero.name}">`;
    }

    currentStepIndex++;
    selectedHeroId = null;
    
    updateUI();
}

function updateUI() {
    const statusMsg = document.getElementById("status-message");
    const actionBtn = document.getElementById("action-btn");

    document.querySelectorAll(".draft-row").forEach(r => r.classList.remove("active-row"));

    // Проверка: если сыграли все 24 шага ИЛИ если все 12 героев уже забанены/пикнуты
    const totalUsed = bannedHeroes.size + pickedHeroes.size;
    if (currentStepIndex >= draftSequence.length || totalUsed >= heroesPool.length) {
        statusMsg.textContent = totalUsed >= heroesPool.length ? "ГЕРОИ ЗАКОНЧИЛИСЬ!" : "ДРАФТ ЗАВЕРШЕН!";
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
