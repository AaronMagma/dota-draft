// Полный пул героев, разбитый на 4 класса по 6 штук в каждом
export const heroesPool = [
    // --- STRENGTH (Сила) — ровно 36 героев строго по вашему списку ---
    { id: "alchemist", name: "Alchemist", attr: "str", icon: "🧪" },
    { id: "axe", name: "Axe", attr: "str", icon: "🪓" },
    { id: "bristleback", name: "Bristleback", attr: "str", icon: "🦔" },
    { id: "centaur_warrunner", name: "Centaur", attr: "str", icon: "🛡️" },
    { id: "chaos_knight", name: "Chaos Knight", attr: "str", icon: "🐴" },
    { id: "clockwerk", name: "Clockwerk", attr: "str", icon: "⚙️" },
    { id: "dawnbreaker", name: "Dawnbreaker", attr: "str", icon: "🔨" },
    { id: "doom", name: "Doom", attr: "str", icon: "😈" },
    { id: "dragon_knight", name: "Dragon Knight", attr: "str", icon: "🐉" },
    { id: "earth_spirit", name: "Earth Spirit", attr: "str", icon: "🟢" },
    { id: "earthshaker", name: "Earthshaker", attr: "str", icon: "🪨" },
    { id: "elder_titan", name: "Elder Titan", attr: "str", icon: "🤠" },
    { id: "huskar", name: "Huskar", attr: "str", icon: "🩸" },
    { id: "kunkka", name: "Kunkka", attr: "str", icon: "⚓" },
    { id: "largo", name: "Largo", attr: "str", icon: "👊" },
    { id: "legion_commander", name: "Legion", attr: "str", icon: "🚩" },
    { id: "lifestealer", name: "Lifestealer", attr: "str", icon: "🦷" },
    { id: "lycan", name: "Lycan", attr: "str", icon: "🐺" },
    { id: "mars", name: "Mars", attr: "str", icon: "⭕" },
    { id: "night_stalker", name: "Night Stalker", attr: "str", icon: "🦇" },
    { id: "ogre_magi", name: "Ogre Magi", attr: "str", icon: "👥" },
    { id: "omniknight", name: "Omniknight", attr: "str", icon: "🛡️" },
    { id: "phoenix", name: "Phoenix", attr: "str", icon: "🦅" },
    { id: "primal_beast", name: "Primal Beast", attr: "str", icon: "🦖" },
    { id: "pudge", name: "Pudge", attr: "str", icon: "🍞️" },
    { id: "slardar", name: "Slardar", attr: "str", icon: "🐟" },
    { id: "spirit_breaker", name: "Spirit Breaker", attr: "str", icon: "🐮" },
    { id: "sven", name: "Sven", attr: "str", icon: "⚔️" },
    { id: "tidehunter", name: "Tidehunter", attr: "str", icon: "🍉" },
    { id: "timbersaw", name: "Timbersaw", attr: "str", icon: "🌲" },
    { id: "tiny", name: "Tiny", attr: "str", icon: "🗿" },
    { id: "treant_protector", name: "Treant", attr: "str", icon: "🌳" },
    { id: "tusk", name: "Tusk", attr: "str", icon: "❄️" },
    { id: "underlord", name: "Underlord", attr: "str", icon: "🟢" },
    { id: "undying", name: "Undying", attr: "str", icon: "🧟" },
    { id: "wraith_king", name: "Wraith King", attr: "str", icon: "👑" },

    // --- AGILITY (Ловкость) — ровно 35 героев строго по вашему списку ---
    { id: "anti_mage", name: "Anti-Mage", attr: "agi", icon: "🔮" },
    { id: "bloodseeker", name: "Bloodseeker", attr: "agi", icon: "🩸" },
    { id: "bounty_hunter", name: "Bounty Hunter", attr: "agi", icon: "💰" },
    { id: "broodmother", name: "Broodmother", attr: "agi", icon: "🕷️" },
    { id: "clinkz", name: "Clinkz", attr: "agi", icon: "🏹" },
    { id: "drow_ranger", name: "Drow", attr: "agi", icon: "❄️" },
    { id: "ember_spirit", name: "Ember", attr: "agi", icon: "🔥" },
    { id: "faceless_void", name: "Void", attr: "agi", icon: "⏳" },
    { id: "gyrocopter", name: "Gyro", attr: "agi", icon: "🚀" },
    { id: "hoodwink", name: "Hoodwink", attr: "agi", icon: "🐿️" },
    { id: "juggernaut", name: "Juggernaut", attr: "agi", icon: "👺" },
    { id: "keen_optic", name: "Keen Optic", attr: "agi", icon: "🦤" }, // Исправил опечатку Kez -> keen_optic
    { id: "lone_druid", name: "Lone Druid", attr: "agi", icon: "🐻" },
    { id: "luna", name: "Luna", attr: "agi", icon: "🌙" },
    { id: "medusa", name: "Medusa", attr: "agi", icon: "🐍" },
    { id: "meepo", name: "Meepo", attr: "agi", icon: "⛏️" },
    { id: "mirana", name: "Mirana", attr: "agi", icon: "🐯" },
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
    { id: "vengeful_spirit", name: "Vengeful", attr: "agi", icon: "🦅" },
    { id: "viper", name: "Viper", attr: "agi", icon: "🐍" },
    { id: "weaver", name: "Weaver", attr: "agi", icon: "🕷️" },

    // --- INTELLIGENCE (Интеллект) — ровно 34 героя строго по вашему списку ---
    { id: "ancient_apparition", name: "AA", attr: "int", icon: "🫁" },
    { id: "chen", name: "Chen", attr: "int", icon: "🐘" },
    { id: "crystal_maiden", name: "CM", attr: "int", icon: "❄️" },
    { id: "dark_seer", name: "Dark Seer", attr: "int", icon: "🧠" },
    { id: "dark_willow", name: "Willow", attr: "int", icon: "🧚" },
    { id: "disruptor", name: "Disruptor", attr: "int", icon: "🌩️" },
    { id: "enchantress", name: "Enchant", attr: "int", icon: "🦌" },
    { id: "grimstroke", name: "Grimstroke", attr: "int", icon: "🖌️" },
    { id: "invoker", name: "Invoker", attr: "int", icon: "🌀" },
    { id: "jakiro", name: "Jakiro", attr: "int", icon: "🐲" },
    { id: "keeper_of_the_light", name: "KotL", attr: "int", icon: "☀️" },
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
    { id: "queen_of_pain", name: "QoP", attr: "int", icon: "👑" },
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

    // --- UNIVERSAL (Универсалы) — ровно 22 героя строго по вашему списку ---
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

// Ваш точный порядок ходов на 24 шага (Тьма начинает)
export const draftSequence = [
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

/**
 * Глобальные переменные драфта.
 */
export let currentStepIndex = 0;
export const bannedHeroes = new Set();
export const pickedHeroes = new Set();
export let selectedHeroId = null; // Выбранный героем игроком

/**
 * Генерирует сетку всех доступных героев слева.
 */
export function renderHeroesGrid() {
    // Очищаем все контейнеры классов перед заполнением
    const containers = {
        str: document.getElementById("str-container"),
        agi: document.getElementById("agi-container"),
        int: document.getElementById("int-container"),
        uni: document.getElementById("uni-container")
    };

    Object.values(containers).forEach(c => c && (c.innerHTML = ""));

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
            </div>`;
        
        card.addEventListener("click", () => selectHero(hero.id));
        targetContainer.appendChild(card);
    });
}

/**
 * Создаёт разметку для панели драфта справа.
 */
export function renderDraftRows() {
    const leftCol = document.getElementById("left-slots-column");
    const numCol = document.getElementById("numbers-column");
    const rightCol = document.getElementById("right-slots-column");

    if (!leftCol || !numCol || !rightCol) return;

    [leftCol, numCol, rightCol].forEach(col => col.innerHTML = "");

    draftSequence.forEach((config, index) => {
        // Номер хода
        const numLabel = document.createElement("div");
        numLabel.className = "num-label";
        numLabel.textContent = config.step;
        numCol.appendChild(numLabel);

        // Слоты Radiant
        const leftSlot = document.createElement("div");
        leftSlot.id = `slot-left-${index}`;
        leftSlot.className = "slot-display empty-slot";
        leftSlot.textContent =
          config.team === "radiant"
            ? (config.type === "ban" ? "B" : "P")
            : "";
        leftCol.appendChild(leftSlot);

        // Слоты Dire
        const rightSlot = document.createElement("div");
        rightSlot.id = `slot-right-${index}`;
        rightSlot.className = "slot-display empty-slot";
        rightSlot.textContent =
          config.team === "dire"
            ? (config.type === "ban" ? "B" : "P")
            : "";
        rightCol.appendChild(rightSlot);
    });
}

/**
 * Выделяет карточку героя при клике.
 */
export function selectHero(heroId) {
    if (
      currentStepIndex >= draftSequence.length ||
      bannedHeroes.has(heroId) ||
      pickedHeroes.has(heroId)
    )
      return;

    if (selectedHeroId) {
        const oldCard = document.getElementById(`grid-hero-${selectedHeroId}`);
        oldCard?.classList.remove("selected");
    }

    selectedHeroId = heroId;
    const newCard = document.getElementById(`grid-hero-${heroId}`);
    newCard?.classList.add("selected");

    updateUI(); // Обновляем интерфейс кнопки действия
}


export function commitCurrentTurn() {
    if (!selectedHeroId || currentStepIndex >= draftSequence.length) return;

    const turnConfig = draftSequence[currentStepIndex];
    const heroObj = heroesPool.find(h => h.id === selectedHeroId)!;

    if (turnConfig.type === "ban") {
        bannedHeroes.add(selectedHeroId);
    } else {
        pickedHeroes.add(selectedHeroId);
    }

    // Блокируем карту в сетке
    const card = document.getElementById(`grid-hero-${selectedHeroId}`)!;
    card.classList.remove("selected");
    card.classList.add("disabled");

    // Находим правильный слот на основе команды
    const slotId =
      turnConfig.team === "radiant"
        ? `slot-left-${currentStepIndex}`
        : `slot-right-${currentStepIndex}`;
    
    const slot = document.getElementById(slotId)!;
    slot.classList.remove("empty-slot", "active-slot");
    slot.classList.add(
      turnConfig.type === "ban" ? "filled-ban" : "filled-pick"
    );

    // Вставляем иконку и имя героя прямо в слот
    slot.innerHTML = `
        <div style="
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 4px;
            width: 100%;
        ">
            <span style="font-size: 13px;">${heroObj.icon}</span>
            <span style="font-size: 9px; font-weight: bold; color: #ffffff; text-transform: uppercase; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 55px;">${heroObj.name}</span>
        </div>
    `;

    currentStepIndex++;
    selectedHeroId = null;
    updateUI();
}

/**
 * Обновляет текст статуса, подсветку слотов и кнопку действия.
 */
export function updateUI() {
    const statusMsg = document.getElementById("status-message");
    const actionBtn = document.getElementById("action-btn");

    // Сбрасываем старую подсветку активного хода со всех слотов
    [...document.querySelectorAll(".slot-display")].forEach(s =>
      s.classList.remove("active-slot")
    );

    // Проверяем завершение драфта по визуальному состоянию
    const allSlots = [...document.querySelectorAll(".slot-display")];
    const filledSlots = allSlots.filter(
      slot => slot.classList.contains("filled-ban") || slot.classList.contains("filled-pick")
    );

    if (filledSlots.length === draftSequence.length) {
        statusMsg.textContent = "ДРАФТ ЗАВЕРШЁН!";
        statusMsg.style.color = "#22c55e";
        actionBtn.textContent = "КОНЕЦ";
        actionBtn.className = "disabled";
        return;
    }

    const turn = draftSequence[currentStepIndex];
    const isPlayerTurn =
      (turn.team === "radiant" && playerIsRadiant) ||
      (turn.team === "dire" && !playerIsRadiant);

    const teamName = turn.team === "radiant"
      ? "Radiant (Свет)"
      : "Dire (Тьма)";
    const actionName = turn.type === "ban" ? "БАНИТ" : "ВЫБИРАЕТ";

    statusMsg.textContent = `${teamName} ${actionName}`;
    statusMsg.style.color = turn.team === "radiant" ? "#22c55e" : "#f87171";

    // Подсвечиваем рамкой текущий активный слот
    const activeSlotId = turn.team === "radiant"
      ? `slot-left-${currentStepIndex}`
      : `slot-right-${currentStepIndex}`;
    
    const activeSlot = document.getElementById(activeSlotId);
    activeSlot?.classList.add("active-slot");

    if (selectedHeroId) {
        const selectedHero = heroesPool.find(h => h.id === selectedHeroId)!;
        actionBtn.textContent = `ПОДТВЕРДИТЬ: ${selectedHero.name}`;
        actionBtn.className = "player-turn";
    } else {
        actionBtn.textContent = isPlayerTurn
          ? (turn.type === "ban" ? "ЗАБАНЬТЕ ГЕРОЯ" : "ВЫБЕРИТЕ ГЕРОЯ")
          : "КОМПЬЮТЕР ДУМАЕТ..."; // Добавил подсказку
        actionBtn.className = "disabled";
    }
}

// ⚡️ ВАЖНО: Этот блок должен быть в самом низу файла!
document.addEventListener("DOMContentLoaded", () => {
    renderHeroesGrid();
    renderDraftRows();
    updateUI();

    const actionBtn = document.getElementById("action-btn");
    if (actionBtn) {
        // Подключаем обработчик клика только если кнопка существует
        actionBtn.addEventListener("click", commitCurrentTurn);
    }
});
