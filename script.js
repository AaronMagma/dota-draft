const heroesPool = [
    // --- STRENGTH ---
    { id: "axe", name: "Axe", attr: "str", img: "https://ru.dotabuff.com/assets/heroes/axe-b974399c8ee8079a6c83b2b6a8ca033a63defc0229b07b547f4befd775ca53f3.jpg" },
    { id: "pudge", name: "Pudge", attr: "str", img: "https://ru.dotabuff.com/assets/heroes/pudge-d8673aca5ef38b0cff4826c8c7d22e09e8e09b44940a86859c8161553caefa8c.jpg" },
    { id: "earthshaker", name: "Earthshaker", attr: "str", img: "https://ru.dotabuff.com/assets/heroes/earthshaker-b491d33fcf49d6be267f9c01734b8684e4183c142c9cd0f3e0e1dc84207241a8.jpg" },
    { id: "sven", name: "Sven", attr: "str", img: "https://ru.dotabuff.com/assets/heroes/sven-33b31c39c41f43d6d00e525522fd9f24b971213541a2224b86abf67a39f313c0.jpg" },
    { id: "undying", name: "Undying", attr: "str", img: "https://ru.dotabuff.com/assets/heroes/undying-a30a48d689e0b40f6afc6f6892a5f9d8d16549098043f29dcfd6e2221c5a51f0.jpg" },
    { id: "tidehunter", name: "Tidehunter", attr: "str", img: "https://ru.dotabuff.com/assets/heroes/tidehunter-89034daeb395b0cb9799f5c7b79220310407c382823b012f3c23d0a98f7d7e0a.jpg" },
    { id: "wraith_king", name: "Wraith King", attr: "str", img: "https://ru.dotabuff.com/assets/heroes/wraith-king-233a53f103c784de0f480cec4f18dd8490bd6da44357154e4717dfb31ffbb2b3.jpg" },
    { id: "slardar", name: "Slardar", attr: "str", img: "https://ru.dotabuff.com/assets/heroes/slardar-f8cad16974d24ca788a8da6aea7b74bf82f2d1df97bfdade68992011ed9ce7fa.jpg" },
    { id: "doom", name: "Doom", attr: "str", img: "https://ru.dotabuff.com/assets/heroes/doom-3b31f2b2a692a4d59e6e7f01abfb13a47fadde69b0d2ab15aa30878c945ad428.jpg" },
    { id: "magnus", name: "Magnus", attr: "str", img: "https://ru.dotabuff.com/assets/heroes/magnus-5d9d18053840882b32748dd0bff8659053daf53e2611ecbce64839e5fe77bc88.jpg" },
    { id: "kunkka", name: "Kunkka", attr: "str", img: "https://ru.dotabuff.com/assets/heroes/kunkka-1360505f595012f22b938e9be7fa181916d6e8cde1f59fca4147c27c65fd0293.jpg" },
    { id: "tiny", name: "Tiny", attr: "str", img: "https://ru.dotabuff.com/assets/heroes/tiny-3dba927336577daaf57ddfde9e74f4b25d1a117bf3eb76c5635ddcbc8225bb61.jpg" },

    // --- AGILITY ---
    { id: "juggernaut", name: "Juggernaut", attr: "agi", img: "https://ru.dotabuff.com/assets/heroes/juggernaut-728c0be217dd13bb223cede80923e398b94449f398f43b9b259a404605c8140f.jpg" },
    { id: "phantom_assassin", name: "Phantom Assassin", attr: "agi", img: "https://ru.dotabuff.com/assets/heroes/phantom-assassin-7654f46ff00ddaefca29b284c7a70705a0c305250560f0543eaa8539e3d848f8.jpg" },
    { id: "shadow_fiend", name: "Shadow Fiend", attr: "agi", img: "https://ru.dotabuff.com/assets/heroes/shadow-fiend-90e318481e82c840eafe05b7d53a05b670f380e9d6ee523f339449e355044296.jpg },
    { id: "slark", name: "Slark", attr: "agi", img: "https://ru.dotabuff.com/assets/heroes/slark-b62a1c6367b7c887926fec8164a1b7fedc25b521e9522ddbc050b5249d686b47.jpg" },
    { id: "viper", name: "Viper", attr: "agi", img: "https://ru.dotabuff.com/assets/heroes/viper-c799c38e97f666a0b02e739ae184a0666842402616db97bedf786b50897b1ba6.jpg" },
    { id: "sniper", name: "Sniper", attr: "agi", img: "https://ru.dotabuff.com/assets/heroes/sniper-89ff3b0b138d76eb0808cec070f4c3ddb75f0de711fc8d8ab8b8b9ac039ea899.jpg" },
    { id: "drow_ranger", name: "Drow Ranger", attr: "agi", img: "https://ru.dotabuff.com/assets/heroes/drow-ranger-345dd3d249fd145f7b8718fb759186066053b313cfcbe2f6f9bb8aee06c53ec1.jpg" },
    { id: "faceless_void", name: "Faceless Void", attr: "agi", img: "https://ru.dotabuff.com/assets/heroes/faceless-void-d2ede75b0c0cd423a2bd844ff3a9b94656c705f2b6c1577cedd14f265e0578b1.jpg" },
    { id: "templar_assassin", name: "Templar Assassin", attr: "agi", img: "https://ru.dotabuff.com/assets/heroes/templar-assassin-59dffc687571d6282dd71ab1e5eae130e3c3789b343d06832a0c170cd94b0322.jpg" },
    { id: "bloodseeker", name: "Bloodseeker", attr: "agi", img: "https://ru.dotabuff.com/assets/heroes/bloodseeker-ae9962eb05ac0c787046e9592696135fe5d4676328b359c8ded8fedcb7fb9dba.jpg" },
    { id: "ursa", name: "Ursa", attr: "agi", img: "https://ru.dotabuff.com/assets/heroes/ursa-3c1fb9ac3893da8832a96e2dbc253492d79c32606d0ec5ff582531e5ddd36f70.jpg" },
    { id: "riki", name: "Riki", attr: "agi", img: "https://ru.dotabuff.com/assets/heroes/riki-456b2ebdfb8a238f3a3db309e9e33be1fc327abdb31fbe2c36c54e55c0336fc5.jpg" },

    // --- INTELLIGENCE ---
    { id: "crystal_maiden", name: "Crystal Maiden", attr: "int", img: "https://ru.dotabuff.com/assets/heroes/crystal-maiden-eaf55ad0f4bbe7d2abb24a9a30ca283976055b01d8b56b3568415279dbad5388.jpg" },
    { id: "lina", name: "Lina", attr: "int", img: "https://ru.dotabuff.com/assets/heroes/lina-bda9b852c88c423b7b0152b89d7362f7f15ca04de8de942d7ba25c50fad88e31.jpg" },
    { id: "lion", name: "Lion", attr: "int", img: "https://ru.dotabuff.com/assets/heroes/lion-aa7c75a15844883581f25be8dca60efd72e7273a7dd8fa9c785c79f6bd7fdf42.jpg" },
    { id: "zeus", name: "Zeus", attr: "int", img: "https://ru.dotabuff.com/assets/heroes/zeus-270c72957e96bab2b1ecab445e0f4f62454f61a722085c83c749909b90c3912a.jpg" },
    { id: "storm_spirit", name: "Storm Spirit", attr: "int", img: "https://ru.dotabuff.com/assets/heroes/storm-spirit-a94a9031e7fc5b5679097b69ba75cb45db60ba94e22c2b2edcd033ca24b8b08d.jpg" },
    { id: "puck", name: "Puck", attr: "int", img: "https://ru.dotabuff.com/assets/heroes/puck-3604bf1b73a3d57eadba6b470bdd79b727034d4db27f461d5288480b03364987.jpg" },
    { id: "pugna", name: "Pugna", attr: "int", img: "https://ru.dotabuff.com/assets/heroes/pugna-a7537ed953d63b85fe9e6eb41d8b4d35cd103ba437e737b5eafb48fe573885b5.jpg" },
    { id: "lich", name: "Lich", attr: "int", img: "https://ru.dotabuff.com/assets/heroes/lich-ac4aa61ce719194d8909d597bb932ef9a0a6411ba93362df00d1b3b9d06206a6.jpg" },
    { id: "witch_doctor", name: "Witch Doctor", attr: "int", img: "https://ru.dotabuff.com/assets/heroes/witch-doctor-cef7c2d2b8c642c32a285586ecc571b78d458ccf0239cf6c6fe15a627e1559b5.jpg" },
    { id: "tinker", name: "Tinker", attr: "int", img: "https://ru.dotabuff.com/assets/heroes/tinker-6918f11bb007864769ddc626de0a805de1add6545fdef10661d87aa8a87c14bd.jpg" },
    { id: "skywrath_mage", name: "Skywrath Mage", attr: "int", img: "https://ru.dotabuff.com/assets/heroes/skywrath-mage-737c7eff60bcbc49e0b26edf00b5fd1630d7e860b8b17d3a2e66cce7dd0e202f.jpg" },
    { id: "necrophos", name: "Necrophos", attr: "int", img: "https://ru.dotabuff.com/assets/heroes/necrophos-44e7a6fb53edaccb1fe752979aa61084e3d7964d54fde85775a19008abdae89d.jpg" },

    // --- UNIVERSAL ---
    { id: "invoker", name: "Invoker", attr: "uni", img: "https://ru.dotabuff.com/assets/heroes/invoker-05bd5a65c506f70d476f8024e94d2af8138152228bfef9652cbf8de6c874dee6.jpg" },
    { id: "rubick", name: "Rubick", attr: "uni", img: "https://ru.dotabuff.com/assets/heroes/rubick-4f30f4875beef82cc20cac342bfcf650aabed1adcb567b5ed78821af442eaea7.jpg" },
    { id: "anti_mage", name: "Anti-Mage", attr: "uni", img: "https://ru.dotabuff.com/assets/heroes/anti-mage-fa86bcd90f43abc66cda02a553eb972bbd0ac9aa69d15307dde13571eb4f7086.jpg" },
    { id: "winter_wyvern", name: "Winter Wyvern", attr: "uni", img: "https://ru.dotabuff.com/assets/heroes/winter-wyvern-cd6fcab3fcf03594839a5b5d8fc2d3fc76421862e69237f6aab262ba1f4fe6f9.jpg" },
t    { id: "grimstroke", name: "Grimstroke", attr: "uni", img: "https://ru.dotabuff.com/assets/heroes/grimstroke-6ac4ea704c561964f109dc8d2eced935d213a91559aae06ec272ebba20ac6cd3.jpg" },
    { id: "dazzle", name: "Dazzle", attr: "uni", img: "https://ru.dotabuff.com/assets/heroes/dazzle-86cf49171e9c0d74bf71fa7f120e88279f70c3e812ec36403b93fa1507539a4e.jpg" },
    { id: "shadow_shaman", name: "Shadow Shaman", attr: "uni", img: "https://ru.dotabuff.com/assets/heroes/shadow-shaman-ccbd7f6e10fd95fdf319a0f64be3b20dccae12ccfb28acabaf70910eb93abd9b.jpg" },
    { id: "abaddon", name: "Abaddon", attr: "uni", img: "https://ru.dotabuff.com/assets/heroes/abaddon-e43afc253c19735711317750488ba7f707ae555bba5dfa2fd1c484634e294c94.jpg" },
    { id: "marci", name: "Marci", attr: "uni", img: "https://ru.dotabuff.com/assets/heroes/marci-9a0a2c4d90dc63116a5ba23439d97194915d3abd083cccc226a9b3c21fcdaa81.jpg" },
    { id: "dark_willow", name: "Dark Willow", attr: "uni", img: "https://ru.dotabuff.com/assets/heroes/dark-willow-72b9b406f55446c501688c97f7954ac9c238bd48714cc322ca190d6fc1b6dbc2.jpg" },
    { id: "vengeful_spirit", name: "Vengeful Spirit", attr: "uni", img: "https://ru.dotabuff.com/assets/heroes/vengeful-spirit-370c30a2378acbbe4af5d5bb64b2454d9e277c159fe9ed07b98ee29158a04c99.jpg" },
    { id: "enigma", name: "Enigma", attr: "uni", img: "https://ru.dotabuff.com/assets/heroes/enigma-930c4e23bc271c65dd2943bb3fe556f3f5d933f45666fceba5d11d63ad083eb4.jpg" }
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
