
const heroesPool = [
    // --- STRENGTH (Сила) — 35 героев строго по вашим рядам (без дублей) ---
    { id: "alchemist", name: "Alchemist", attr: "str", icon: "🧪" },
    { id: "axe", name: "Axe", attr: "str", icon: "🪓" },
    { id: "bristleback", name: "Bristleback", attr: "str", icon: "🦔" },
    { id: "centaur", name: "Centaur", attr: "str", icon: "🛡️" },
    { id: "chaos_knight", name: "Chaos Knight", attr: "str", icon: "🐴" },
    { id: "clockwerk", name: "Clockwerk", attr: "str", icon: "⚙️" },
    { id: "dawnbreaker", name: "Dawnbreaker", attr: "str", icon: "🔨" },
    { id: "dragon_knight", name: "Dragon Knight", attr: "str", icon: "🐉" },
    { id: "earth_spirit", name: "Earth Spirit", attr: "str", icon: "🟢" },
    { id: "earthshaker", name: "Earthshaker", attr: "str", icon: "🪨" },
    { id: "elder_titan", name: "Elder Titan", attr: "str", icon: "🤠" },
    { id: "huskar", name: "Huskar", attr: "str", icon: "🩸" },
    { id: "kunkka", name: "Kunkka", attr: "str", icon: "⚓" },
    { id: "largo", name: "Largo", attr: "str", icon: "🥊" },
    { id: "legion_commander", name: "Legion", attr: "str", icon: "🚩" },
    { id: "lifestealer", name: "Lifestealer", attr: "str", icon: "🦷" },
    { id: "mars", name: "Mars", attr: "str", icon: "⭕" },
    { id: "night_stalker", name: "Night Stalker", attr: "str", icon: "🦇" },
    { id: "ogre_magi", name: "Ogre Magi", attr: "str", icon: "👥" },
    { id: "omniknight", name: "Omniknight", attr: "str", icon: "🛡️" },
    { id: "phoenix", name: "Phoenix", attr: "str", icon: "🦅" },
    { id: "primal_beast", name: "Primal Beast", attr: "str", icon: "🦖" },
    { id: "pudge", name: "Pudge", attr: "str", icon: "🥩" },
    { id: "slardar", name: "Slardar", attr: "str", icon: "🐟" },
    { id: "spirit_breaker", name: "Spirit Breaker", attr: "str", icon: "🐮" },
    { id: "sven", name: "Sven", attr: "str", icon: "⚔️" },
    { id: "tidehunter", name: "Tidehunter", attr: "str", icon: "🍉" },
    { id: "tiny", name: "Tiny", attr: "str", icon: "🗿" },
    { id: "treant_protector", name: "Treant", attr: "str", icon: "🌳" },
    { id: "tusk", name: "Tusk", attr: "str", icon: "❄️" },
    { id: "underlord", name: "Underlord", attr: "str", icon: "🟢" },
    { id: "undying", name: "Undying", attr: "str", icon: "🧟" },
    { id: "wraith_king", name: "Wraith King", attr: "str", icon: "👑" },

    // --- AGILITY (Ловкость) — 31 герой строго по вашим рядам (без дублей) ---
    { id: "anti_mage", name: "Anti-Mage", attr: "agi", icon: "🔮" },
    { id: "bloodseeker", name: "Bloodseeker", attr: "agi", icon: "🩸" },
    { id: "bounty_hunter", name: "Bounty Hunter", attr: "agi", icon: "💰" },
    { id: "clinkz", name: "Clinkz", attr: "agi", icon: "🏹" },
    { id: "drow_ranger", name: "Drow", attr: "agi", icon: "❄️" },
    { id: "ember_spirit", name: "Ember", attr: "agi", icon: "🔥" },
    { id: "faceless_void", name: "Void", attr: "agi", icon: "⏳" },
    { id: "gyrocopter", name: "Gyro", attr: "agi", icon: "🚀" },
    { id: "hoodwink", name: "Hoodwink", attr: "agi", icon: "🐿️" },
    { id: "juggernaut", name: "Juggernaut", attr: "agi", icon: "👺" },
    { id: "kez", name: "Kez", attr: "agi", icon: "🦤" },
    { id: "luna", name: "Luna", attr: "agi", icon: "🌙" },
    { id: "medusa", name: "Medusa", attr: "agi", icon: "🐍" },
    { id: "meepo", name: "Meepo", attr: "agi", icon: "⛏️" },
    { id: "monkey_king", name: "MK", attr: "agi", icon: "🐒" },
    { id: "morphling", name: "Morphling", attr: "agi", icon: "🌊" },
    { id: "naga_siren", name: "Naga", attr: "agi", icon: "🧜" },
    { id: "phantom_assassin", name: "PA", attr: "agi", icon: "🗡️" },
    { id: "phantom_lancer", name: "PL", attr: "agi", icon: "🐒" },
    { id: "razor", name: "Razor", attr: "agi", icon: "⚡" },
    { id: "riki", name: "Riki", attr: "agi", icon: "👣" },
    { id: "shadow_fiend", name: "SF", attr: "agi", icon: "💀" },
    { id: "slark", name: "Slark", attr: "agi", icon: "🦈" },
    { id: "sniper", name: "Sniper", attr: "agi", icon: "🎯" },
    { id: "spectre", name: "Spectre", attr: "agi", icon: "👻" },
    { id: "templar_assassin", name: "TA", attr: "agi", icon: "💜" },
    { id: "terrorblade", name: "TB", attr: "agi", icon: "😈" },
    { id: "troll_warlord", name: "Troll", attr: "agi", icon: "🪓" },
    { id: "ursa", name: "Ursa", attr: "agi", icon: "🐻" },
    { id: "viper", name: "Viper", attr: "agi", icon: "🐍" },
    { id: "weaver", name: "Weaver", attr: "agi", icon: "🕷️" },

    // --- INTELLIGENCE (Интеллект) — 33 героя строго по вашим рядам (без дублей) ---
    { id: "ancient_apparition", name: "AA", attr: "int", icon: "🥶" },
    { id: "chen", name: "Chen", attr: "int", icon: "🐘" },
    { id: "crystal_maiden", name: "CM", attr: "int", icon: "❄️" },
    { id: "dark_willow", name: "Willow", attr: "int", icon: "🧚" },
    { id: "disruptor", name: "Disruptor", attr: "int", icon: "🌩️" },
    { id: "enchantress", name: "Enchant", attr: "int", icon: "🦌" },
    { id: "grimstroke", name: "Grimstroke", attr: "int", icon: "🖌️" },
    { id: "invoker", name: "Invoker", attr: "int", icon: "☄️" },
    { id: "jakiro", name: "Jakiro", attr: "int", icon: "🐲" },
    { id: "keeper", name: "KotL", attr: "int", icon: "☀️" },
    { id: "leshrac", name: "Leshrac", attr: "int", icon: "🐎" },
    { id: "lich", name: "Lich", attr: "int", icon: "💀" },
    { id: "lina", name: "Lina", attr: "int", icon: "🔥" },
    { id: "lion", name: "Lion", attr: "int", icon: "🦁" },
    { id: "muerta", name: "Muerta", attr: "int", icon: "💀" },
    { id: "necrophos", name: "Necro", attr: "int", icon: "🤢" },
    { id: "oracle", name: "Oracle", attr: "int", icon: "🔮" },
    { id: "outworld_destroyer", name: "OD", attr: "int", icon: "🛸" },
    { id: "puck", name: "Puck", attr: "int", icon: "🧚" },
    { id: "pugna", name: "Pugna", attr: "int", icon: "🟢" },
    { id: "queen", name: "QoP", attr: "int", icon: "👑" },
    { id: "ringmaster", name: "Ringmaster", attr: "int", icon: "🎪" },
    { id: "rubick", name: "Rubick", attr: "int", icon: "💚" },
    { id: "shadow_demon", name: "SD", attr: "int", icon: "😈" },
    { id: "shadow_shaman", name: "Shaman", attr: "int", icon: "🐍" },
    { id: "silencer", name: "Silencer", attr: "int", icon: "🤫" },
    { id: "skywrath_mage", name: "Skywrath", attr: "int", icon: "🦅" },
    { id: "storm_spirit", name: "Storm", attr: "int", icon: "⚡" },
    { id: "tinker", name: "Tinker", attr: "int", icon: "🤖" },
    { id: "warlock", name: "Warlock", attr: "int", icon: "📜" },
    { id: "winter_wyvern", name: "Wyvern", attr: "int", icon: "❄️" },
    { id: "witch_doctor", name: "WD", attr: "int", icon: "🧪" },
    { id: "zeus", name: "Zeus", attr: "int", icon: "☁️" },

    // --- UNIVERSAL (Универсалы) — ровно 22 героя строго по вашему скриншоту ---
    { id: "abaddon", name: "Abaddon", attr: "uni", icon: "🐴" },
    { id: "arc_warden", name: "Arc Warden", attr: "uni", icon: "🌀" },
    { id: "bane", name: "Bane", attr: "uni", icon: "👁️" },
    { id: "batrider", name: "Batrider", attr: "uni", icon: "🦇" },
    { id: "beastmaster", name: "Beastmaster", attr: "uni", icon: "🐗" },
    { id: "brewmaster", name: "Brewmaster", attr: "uni", icon: "🐼" },
    { id: "dazzle", name: "Dazzle", attr: "uni", icon: "🔮" },
    { id: "death_prophet", name: "DP", attr: "uni", icon: "👻" },
    { id: "enigma", name: "Enigma", attr: "uni", icon: "🕳️" },
    { id: "io", name: "Io", attr: "uni", icon: "⚪" },
    { id: "magnus", name: "Magnus", attr: "uni", icon: "🦏" },
    { id: "marci", name: "Marci", attr: "uni", icon: "👊" },
    { id: "natures_prophet", name: "NP", attr: "uni", icon: "🌱" },
    { id: "nyx_assassin", name: "Nyx", attr: "uni", icon: "🪲" },
    { id: "pangolier", name: "Pango", attr: "uni", icon: "🦔" },
    { id: "sand_king", name: "Sand King", attr: "uni", icon: "🦂" },
    { id: "snapfire", name: "Snapfire", attr: "uni", icon: "🦎" },
    { id: "techies", name: "Techies", attr: "uni", icon: "💣" },
    { id: "venomancer", name: "Venom", attr: "uni", icon: "🐍" },
    { id: "visage", name: "Visage", attr: "uni", icon: "🪨" },
    { id: "void_spirit", name: "Void Spirit", attr: "uni", icon: "🌌" },
    { id: "windranger", name: "WR", attr: "uni", icon: "🍃" }
];
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
let currentStepIndex = 0;let selectedHeroId = null;const bannedHeroes = new Set();const pickedHeroes = new Set();

document.addEventListener("DOMContentLoaded", () => {
    renderHeroesGrid();
    renderDraftRows();
    updateUI();
    const actionBtn = document.getElementById("action-btn");
    actionBtn.addEventListener("click", commitCurrentTurn);
    
    setTimeout(checkBotTurn, 500); 
});
function renderHeroesGrid() {
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
card.id = grid-hero-${hero.id};
// УВЕЛИЧЕННЫЙ ВАРИАНТ: Текст теперь белый, жирный (9px) и на контрастной подложке
card.innerHTML = <div style="display: flex; flex-direction: column; align-items: center; justify-content: space-between; width: 100%; height: 100%; padding-top: 5px; box-sizing: border-box;"> <span style="font-size: 20px; line-height: 1;">${hero.icon}</span> <div style="background: rgba(0, 0, 0, 0.75); width: 100%; text-align: center; padding: 2px 0;"> <span style="font-size: 9px; font-weight: 900; color: #ffffff; letter-spacing: 0.4px; text-transform: uppercase; white-space: nowrap; display: block; overflow: hidden; text-overflow: ellipsis; max-width: 100%; padding: 0 2px; box-sizing: border-box;">${hero.name}</span> </div> </div>;
card.addEventListener("click", () => selectHero(hero.id));
targetContainer.appendChild(card);
});
}
function renderDraftRows() {
const leftCol = document.getElementById("left-slots-column");
const numCol = document.getElementById("numbers-column");
const rightCol = document.getElementById("right-slots-column");
if (!leftCol || !numCol || !rightCol) return;
leftCol.innerHTML = "";
numCol.innerHTML = "";
rightCol.innerHTML = "";
draftSequence.forEach((config, index) => {
const numLabel = document.createElement("div");
numLabel.className = "num-label";
numLabel.textContent = config.step;
numCol.appendChild(numLabel);
const leftSlot = document.createElement("div");
leftSlot.id = slot-left-${index};
leftSlot.className = "slot-display empty-slot";
leftSlot.textContent = config.team === "radiant" ? (config.type === "ban" ? "B" : "P") : "";
leftCol.appendChild(leftSlot);
const rightSlot = document.createElement("div");
rightSlot.id = slot-right-${index};
rightSlot.className = "slot-display empty-slot";
rightSlot.textContent = config.team === "dire" ? (config.type === "ban" ? "B" : "P") : "";
rightCol.appendChild(rightSlot);
});
}
function selectHero(heroId) {
if (currentStepIndex >= draftSequence.length) return;
if (bannedHeroes.has(heroId) || pickedHeroes.has(heroId)) return;
if (draftSequence[currentStepIndex].team === "dire") return;
if (selectedHeroId) {
const oldCard = document.getElementById(grid-hero-${selectedHeroId});
if (oldCard) oldCard.classList.remove("selected");
}
selectedHeroId = heroId;
const newCard = document.getElementById(grid-hero-${heroId});
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
const card = document.getElementById(grid-hero-${selectedHeroId});
if (card) {
card.classList.remove("selected");
card.classList.add("disabled");
}
const targetSlotId = currentTurn.team === "radiant" ? slot-left-${currentStepIndex} : slot-right-${currentStepIndex};
const slot = document.getElementById(targetSlotId);
if (slot) {
slot.classList.remove("empty-slot", "active-slot");
slot.classList.add(currentTurn.type === "ban" ? "filled-ban" : "filled-pick");
slot.innerHTML = <span style="font-size: 13px;">${hero.icon}</span>;
}
currentStepIndex++;
selectedHeroId = null;
updateUI();
setTimeout(checkBotTurn, 400);
}
function updateUI() {
const statusMsg = document.getElementById("status-message");
const actionBtn = document.getElementById("action-btn");
document.querySelectorAll(".slot-display").forEach(s => s.classList.remove("active-slot"));
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
statusMsg.textContent = ${teamName}\n${actionName};
statusMsg.style.color = turn.team === "radiant" ? "#22c55e" : "#f87171";
const activeSlotId = turn.team === "radiant" ? slot-left-${currentStepIndex} : slot-right-${currentStepIndex};
const activeSlot = document.getElementById(activeSlotId);
if (activeSlot) {
activeSlot.classList.add("active-slot");
}
if (turn.team === "dire") {
actionBtn.textContent = "ДУМАЕТ КОМПЬЮТЕР...";
actionBtn.className = "disabled";
return;
}
if (selectedHeroId) {
const selectedHero = heroesPool.find(h => h.id === selectedHeroId);
actionBtn.textContent = ПОДТВЕРДИТЬ: ${selectedHero.name};
actionBtn.className = "player-turn";
} else {
actionBtn.textContent = turn.type === "ban" ? "ЗАБАНЬТЕ ГЕРОЯ" : "ВЫБЕРИТЕ ГЕРОЯ";
actionBtn.className = "disabled";
}
}
function checkBotTurn() {
if (currentStepIndex >= draftSequence.length) return;
const turn = draftSequence[currentStepIndex];
if (turn.team === "radiant") return;
const availableHeroes = heroesPool.filter(h => !bannedHeroes.has(h.id) && !pickedHeroes.has(h.id));
if (availableHeroes.length === 0) return;
const randomIndex = Math.floor(Math.random() * availableHeroes.length);
const botSelectedHero = availableHeroes[randomIndex];
selectedHeroId = botSelectedHero.id;
const card = document.getElementById(grid-hero-${selectedHeroId});
if (card) {
card.classList.add("selected");
}
const actionBtn = document.getElementById("action-btn");
const actionText = turn.type === "ban" ? "БАН" : "ПИК";
actionBtn.textContent = КОМПЬЮТЕР: ${actionText} ${botSelectedHero.name};
setTimeout(() => {
if (!selectedHeroId) return;
if (turn.type === "ban") {
bannedHeroes.add(selectedHeroId);
} else {
pickedHeroes.add(selectedHeroId);
}
const cardFinal = document.getElementById(grid-hero-${selectedHeroId});
if (cardFinal) {
cardFinal.classList.remove("selected");
cardFinal.classList.add("disabled");
}
const targetSlotId = turn.team === "radiant" ? slot-left-${currentStepIndex} : slot-right-${currentStepIndex};
const slot = document.getElementById(targetSlotId);
if (slot) {
slot.classList.remove("empty-slot", "active-slot");
slot.classList.add(turn.type === "ban" ? "filled-ban" : "filled-pick");
slot.innerHTML = <span style="font-size: 14px;">${botSelectedHero.icon}</span>;
}
currentStepIndex++;
selectedHeroId = null;
updateUI();
setTimeout(checkBotTurn, 400);
}, 1200);
}
