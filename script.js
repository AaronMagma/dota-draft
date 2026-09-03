const heroesData = [
    // --- СИЛА (Strength) ---
    { id: "abaddon", name: "Abaddon", icon: "🐴" },
    { id: "alchemist", name: "Alchemist", icon: "🧪" },
    { id: "axe", name: "Axe", icon: "🪓" },
    { id: "beastmaster", name: "Beastmaster", icon: "🦅" },
    { id: "brewmaster", name: "Brewmaster", icon: "🐼" },
    { id: "bristleback", name: "Bristleback", icon: "🦔" },
    { id: "centaur", name: "Centaur Warrunner", icon: "🐴" },
    { id: "chaos_knight", name: "Chaos Knight", icon: "🐴" },
    { id: "clockwerk", name: "Clockwerk", icon: "⚙️" },
    { id: "doom", name: "Doom", icon: "😈" },
    { id: "dragon_knight", name: "Dragon Knight", icon: "🐉" },
    { id: "earth_spirit", name: "Earth Spirit", icon: "🗿" },
    { id: "earthshaker", name: "Earthshaker", icon: "🐮" },
    { id: "elder_titan", name: "Elder Titan", icon: "🔨" },
    { id: "huskar", name: "Huskar", icon: "🔥" },
    { id: "io", name: "Io", icon: "🔵" },
    { id: "kunkka", name: "Kunkka", icon: "🚢" },
    { id: "legion_commander", name: "Legion Commander", icon: "🛡️" },
    { id: "lifestealer", name: "Lifestealer", icon: "🧛" },
    { id: "lycan", name: "Lycan", icon: "🐺" },
    { id: "magnus", name: "Magnus", icon: "🦏" },
    { id: "marci", name: "Marci", icon: "👊" },
    { id: "mars", name: "Mars", icon: "🛡️" },
    { id: "night_stalker", name: "Night Stalker", icon: "🦇" },
    { id: "omniknight", name: "Omniknight", icon: "🔨" },
    { id: "phoenix", name: "Phoenix", icon: "🐦" },
    { id: "primal_beast", name: "Primal Beast", icon: "🦖" },
    { id: "pudge", name: "Pudge", icon: "🥩" },
    { id: "sand_king", name: "Sand King", icon: "🦂" },
    { id: "slardar", name: "Slardar", icon: "🐟" },
    { id: "snapfire", name: "Snapfire", icon: "🦎" },
    { id: "spirit_breaker", name: "Spirit Breaker", icon: "🐮" },
    { id: "sven", name: "Sven", icon: "⚔️" },
    { id: "tidehunter", name: "Tidehunter", icon: "🍉" },
    { id: "timbersaw", name: "Timbersaw", icon: "🪚" },
    { id: "tinker", name: "Tinker", icon: "🤖" },
    { id: "tiny", name: "Tiny", icon: "🪨" },
    { id: "treant", name: "Treant Protector", icon: "🌳" },
    { id: "tusk", name: "Tusk", icon: "❄️" },
    { id: "underlord", name: "Underlord", icon: "🟢" },
    { id: "undying", name: "Undying", icon: "🧟" },
    { id: "wraith_king", name: "Wraith King", icon: "👑" },

    // --- ЛОВКОСТЬ (Agility) ---
    { id: "anti_mage", name: "Anti-Mage", icon: "🧙‍♂️" },
    { id: "arc_warden", name: "Arc Warden", icon: "⚡" },
    { id: "bloodseeker", name: "Bloodseeker", icon: "🩸" },
    { id: "bounty_hunter", name: "Bounty Hunter", icon: "💰" },
    { id: "broodmother", name: "Broodmother", icon: "🕷️" },
    { id: "clinkz", name: "Clinkz", icon: "🏹" },
    { id: "drow_ranger", name: "Drow Ranger", icon: "🏹" },
    { id: "ember_spirit", name: "Ember Spirit", icon: "🔥" },
    { id: "faceless_void", name: "Faceless Void", icon: "⏳" },
    { id: "gyrocopter", name: "Gyrocopter", icon: "🚁" },
    { id: "hoodwink", name: "Hoodwink", icon: "🐿️" },
    { id: "juggernaut", name: "Juggernaut", icon: "🎭" },
    { id: "kez", name: "Kez", icon: "🦤" },
    { id: "leshrac", name: "Leshrac", icon: "🐴" },
    { id: "lone_druid", name: "Lone Druid", icon: "🐻" },
    { id: "luna", name: "Luna", icon: "🌙" },
    { id: "medusa", name: "Medusa", icon: "🐍" },
    { id: "meepo", name: "Meepo", icon: "⛏️" },
    { id: "monkey_king", name: "Monkey King", icon: "🐒" },
    { id: "morphling", name: "Morphling", icon: "🌊" },
    { id: "naga_siren", name: "Naga Siren", icon: "🧜‍♀️" },
    { id: "nyx_assassin", name: "Nyx Assassin", icon: "🪲" },
    { id: "pangolier", name: "Pangolier", icon: "🦔" },
    { id: "phantom_assassin", name: "Phantom Assassin", icon: "🗡️" },
    { id: "phantom_lancer", name: "Phantom Lancer", icon: "🔱" },
    { id: "razor", name: "Razor", icon: "⚡" },
    { id: "riki", name: "Riki", icon: "🐐" },
    { id: "shadow_fiend", name: "Shadow Fiend", icon: "💀" },
    { id: "slark", name: "Slark", icon: "🦈" },
    { id: "sniper", name: "Sniper", icon: "🎯" },
    { id: "spectre", name: "Spectre", icon: "👻" },
    { id: "templar_assassin", name: "Templar Assassin", icon: "🏵️" },
    { id: "terrorblade", name: "Terrorblade", icon: "😈" },
    { id: "troll_warlord", name: "Troll Warlord", icon: "🪓" },
    { id: "ursa", name: "Ursa", icon: "🐻" },
    { id: "vengeful_spirit", name: "Vengeful Spirit", icon: "🦇" },
    { id: "venomancer", name: "Venomancer", icon: "🐍" },
    { id: "viper", name: "Viper", icon: "🐍" },
    { id: "weaver", name: "Weaver", icon: "🕷️" },

    // --- ИНТЕЛЛЕКТ (Intelligence) ---
    { id: "ancient_apparition", name: "Ancient Apparition", icon: "❄️" },
    { id: "bane", name: "Bane", icon: "🔮" },
    { id: "batrider", name: "Batrider", icon: "🦇" },
    { id: "chen", name: "Chen", icon: "🐴" },
    { id: "crystal_maiden", name: "Crystal Maiden", icon: "❄️" },
    { id: "dark_seer", name: "Dark Seer", icon: "🧠" },
    { id: "dark_willow", name: "Dark Willow", icon: "🧚‍♀️" },
    { id: "dazzle", name: "Dazzle", icon: "🧪" },
    { id: "death_prophet", name: "Death Prophet", icon: "👻" },
    { id: "disraptor", name: "Disruptor", icon: "🦖" },
    { id: "enchanterss", name: "Enchantress", icon: "🦌" },
    { id: "enigma", name: "Enigma", icon: "🕳️" },
    { id: "grimstroke", name: "Grimstroke", icon: "🖌️" },
    { id: "invoker", name: "Invoker", icon: "🔮" },
    { id: "jakiro", name: "Jakiro", icon: "🐲" },
    { id: "keeper_of_the_light", name: "Keeper of the Light", icon: "🐴" },
    { id: "lich", name: "Lich", icon: "🥶" },
    { id: "lina", name: "Lina", icon: "🔥" },
    { id: "lion", name: "Lion", icon: "🦁" },
    { id: "muerta", name: "Muerta", icon: "💀" },
    { id: "nature_prophet", name: "Nature's Prophet", icon: "🌱" },
    { id: "necrophos", name: "Necrophos", icon: "🤮" },
    { id: "ogre_magi", name: "Ogre Magi", icon: "👹" },
    { id: "oracle", name: "Oracle", icon: "👁️" },
    { id: "outworld_destroyer", name: "Outworld Destroyer", icon: "🪐" },
    { id: "puck", name: "Puck", icon: "🧚" },
    { id: "pugna", name: "Pugna", icon: "🟢" },
    { id: "queen_of_pain", name: "Queen of Pain", icon: "👑" },
    { id: "rubick", name: "Rubick", icon: "🟢" },
    { id: "shadow_demon", name: "Shadow Demon", icon: "😈" },
    { id: "shadow_shaman", name: "Shadow Shaman", icon: "🦎" },
    { id: "silencer", name: "Silencer", icon: "🤫" },
    { id: "skywrath_mage", name: "Skywrath Mage", icon: "🦅" },
    { id: "storm_spirit", name: "Storm Spirit", icon: "⚡" },
    { id: "techies", name: "Techies", icon: "💣" },
    { id: "tinker_old", name: "Visage", icon: "🪨" },
    { id: "void_spirit", name: "Void Spirit", icon: "🔮" },
    { id: "warlock", name: "Warlock", icon: "📜" },
    { id: "windranger", name: "Windranger", icon: "🏹" },
    { id: "winter_wyvern", name: "Winter Wyvern", icon: "🥶" },
    { id: "witch_doctor", name: "Witch Doctor", icon: "🥥" },
    { id: "zeus", name: "Zeus", icon: "⚡" }
];
// СТРОГО ВАША ПОСЛЕДОВАТЕЛЬНОСТЬ ИЗ 24 ШАГОВ ONE-BY-ONE
// 'r' - Свет (Radiant), 'd' - Тьма (Dire)
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
    { team: 'd', type: 'ban', index: 5 },  // 19й бан тьма
    { team: 'r', type: 'ban', index: 5 },  // 20й бан свет
    { team: 'd', type: 'ban', index: 6 },  // 21й бан тьма
    { team: 'r', type: 'ban', index: 6 },  // 22й бан свет
    { team: 'd', type: 'pick', index: 4 }, // 23й пик тьма
    { team: 'r', type: 'pick', index: 4 }  // 24й пик свет
];

let currentStepIndex = 0;
let selectedHeroId = null;
const bannedHeroes = new Set();
const pickedHeroes = new Set();

const heroesContainer = document.getElementById('heroes-container');
const statusMessage = document.getElementById('status-message');
const actionBtn = document.getElementById('action-btn');

function init() {
    renderHeroesGrid();
    updateStatus();
    actionBtn.addEventListener('click', handleActionClick);
}

function renderHeroesGrid() {
    heroesContainer.innerHTML = '';
    heroesData.forEach(hero => {
        const card = document.createElement('div');
        card.className = 'hero-card';
        card.id = `card-${hero.id}`;
        card.innerHTML = `
            <div class="hero-icon">${hero.icon}</div>
            <div class="hero-name-label">${hero.name}</div>
        `;
        card.addEventListener('click', () => selectHero(hero.id));
        heroesContainer.appendChild(card);
    });
}

function selectHero(heroId) {
    if (currentStepIndex >= draftSequence.length || bannedHeroes.has(heroId) || pickedHeroes.has(heroId)) return;

    if (selectedHeroId) {
        const prevCard = document.getElementById(`card-${selectedHeroId}`);
        if (prevCard) prevCard.classList.remove('selected');
    }

    selectedHeroId = heroId;
    const currentCard = document.getElementById(`card-${heroId}`);
    currentCard.classList.add('selected');

    actionBtn.classList.remove('disabled');
    actionBtn.classList.add('player-turn');
    const step = draftSequence[currentStepIndex];
    actionBtn.innerText = step.type === 'ban' ? 'Забанить' : 'Пикнуть';
}

function handleActionClick() {
    if (!selectedHeroId || currentStepIndex >= draftSequence.length) return;

    const step = draftSequence[currentStepIndex];
    const hero = heroesData.find(h => h.id === selectedHeroId);
    
    // Генерируем ID слота (например, d-ban-0 или r-pick-3) строго по вашему графику
    const slotId = `${step.team}-${step.type}-${step.index}`;
    const slotElement = document.getElementById(slotId);

    if (slotElement) {
        slotElement.innerText = hero.icon;
        slotElement.style.backgroundColor = step.type === 'ban' ? '#451a1a' : '#1a4527';
    }

    if (step.type === 'ban') {
        bannedHeroes.add(selectedHeroId);
    } else {
        pickedHeroes.add(selectedHeroId);
    }

    const card = document.getElementById(`card-${selectedHeroId}`);
    if (card) {
        card.classList.remove('selected');
        card.classList.add('disabled');
    }

    selectedHeroId = null;
    currentStepIndex++;

    actionBtn.classList.add('disabled');
    actionBtn.classList.remove('player-turn');
    actionBtn.innerText = 'Выберите героя';

    updateStatus();
}

function updateStatus() {
    if (currentStepIndex >= draftSequence.length) {
        statusMessage.innerText = 'Драфт завершен!';
        actionBtn.innerText = 'Конец';
        actionBtn.classList.add('disabled');
        return;
    }

    const step = draftSequence[currentStepIndex];
    const teamName = step.team === 'r' ? 'Свет (Radiant)' : 'Тьма (Dire)';
    const actionName = step.type === 'ban' ? 'БАНЯТ' : 'ПИКАЮТ';
    
    statusMessage.innerText = `Ход команды: ${teamName}\nОни ${actionName} герой #${step.index + 1}`;
    statusMessage.style.color = step.team === 'r' ? '#4ade80' : '#f87171';
}

document.addEventListener('DOMContentLoaded', init);
