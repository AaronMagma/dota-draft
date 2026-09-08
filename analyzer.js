// analyzer.js // Генерация контрпиков на основе вашего списка и привязок к героям из script.js
import { HERO_DATA } from './script.js';

// Собираем все реальные id-героев из вашего списка const CANONICAL_IDS = new Set(); ['Strength','Agility','Intelligence','Universal'].forEach(cat => { const arr = HERO_DATA[cat]; if (Array.isArray(arr)) arr.forEach(h => CANONICAL_IDS.add(h.id)); });

// Алиасы для приведения названий из вашего файла контрпиков к каноническим id const ALIASES = { // Strength centaur_warrunner: 'centaur', // Agility antimage: 'anti_mage', // alias // Dawnbreaker и другие уникальные названия уже в каноне, но на всякий случай: dawbreaker: 'dawnbreaker', // Intelligence keeper_of_the_light: 'keeper', kotl: 'keeper', queen_of_pain: 'queen_of_pain', shadow_fiend: 'shadow_fiend', faceless_void: 'faceless_void', // Universal arc_warden: 'arc_warden', naga_siren: 'naga_siren', windranger: 'windranger', // общие привязки на случай вариаций anti_mage: 'anti_mage', // подстановки jugg: 'juggernaut', };

// Канонические IDs по списку героев (для проверки существования) const ALL_CANONICAL = new Set(); ['Strength','Agility','Intelligence','Universal'].forEach(cat => { const arr = HERO_DATA[cat]; if (Array.isArray(arr)) arr.forEach(h => ALL_CANONICAL.add(h.id)); });

// Нормализация имени героя к каноническому id function normalizeHeroName(name) { if (!name) return ''; const raw = String(name).toLowerCase().trim();

// прямое совпадение if (ALL_CANONICAL.has(raw)) return raw;

// алиасы if (ALIASES.hasOwnProperty(raw)) return ALIASES[raw];

// замена дефисов/пробелов const withUnderscore = raw.replace(/[-\s]+/g, '_'); if (ALL_CANONICAL.has(withUnderscore)) return withUnderscore;

// неизвестный id — вернуть как есть (попробуем позже сопоставить более точно) return withUnderscore; }

// Парсер контрпиков из вашего файла // Формат в файле примерно такой: // --- STRENGTH --- // alchemist ['ancient_apparition', 'viper', 'silencer'], // ... // Мы читаем строки вида "<heroName> ['id1', 'id2', 'id3']" const CONTROPS_TEXT = ` --- STRENGTH --- alchemist ['ancient_apparition', 'viper', 'silencer'], axe ['slark', 'timbersaw', 'pugna', 'brewmaster', 'spectre'], bristleback ['viper', 'ancient_apparition', 'silencer', 'skywrath_mage', 'grimstroke'], centaur_warrunner ['ember_spirit', 'storm_spirit', 'queen_of_pain', 'void_spirit', 'lina'], chaos_knight ['spectre', 'naga_siren', 'phantom_lancer', 'morphling', 'arc_warden'], clockwerk ['mirana', 'bounty_hunter'], dawnbreaker ['weaver', 'viper', 'nyx_assassin', 'silencer'], doom ['wraith_king', 'medusa', 'terrorblade', 'luna', 'abaddon'], dragon_knight ['viper', 'huskar', 'bounty_hunter', 'weaver', 'troll_warlord'], earth_spirit ['slark', 'riki', 'clinkz', 'troll_warlord', 'windranger'], earthshaker ['spectre', 'templar_assassin', 'faceless_void', 'antimage', 'drow_ranger'], elder_titan ['puck', 'templar_assassin', 'dark_seer', 'clockwerk'], huskar ['ancient_apparition', 'outworld_destroyer', 'lich', 'shadow_shaman', 'bane'], kunkka ['ancient_apparition', 'rubick', 'keeper_of_the_light', 'death_prophet'], legion_commander ['phantom_lancer', 'naga_siren', 'broodmother', 'chaos_knight', 'lone_druid'], lifestealer ['axe', 'earthshaker', 'abyssal_underlord', 'doom', 'spirit_breaker'], lycan ['ancient_apparition', 'vengeful_spirit', 'keeper_of_the_light', 'dazzle'], mars ['gyrocopter', 'drow_ranger', 'sniper', 'windranger'], night_stalker ['lone_druid', 'meepo', 'beastmaster', 'chen', 'furion'], ogre_magi ['ancient_apparition', 'skywrath_mage', 'zuus', 'rubick'], omniknight ['invoker', 'ancient_apparition', 'viper', 'grimstroke'], phoenix ['ancient_apparition', 'ember_spirit', 'zuus', 'skywrath_mage'], primal_beast ['grimstroke', 'oracle', 'ancient_apparition', 'undying'], pudge ['drow_ranger', 'sniper', 'windranger', 'hoodwink', 'gyrocopter'], slardar ['templar_assassin', 'morphling', 'arc_warden', 'troll_warlord', 'razor'], spirit_breaker ['puck', 'storm_spirit', 'ember_spirit', 'queen_of_pain', 'tusk'], sven ['slardar', 'ancient_apparition', 'disruptor', 'death_prophet'], tidehunter ['gyrocopter', 'luna', 'drow_ranger', 'sniper', 'windranger'], timbersaw ['ancient_apparition', 'bloodseeker', 'axe', 'primal_beast'], tiny ['ursa', 'bloodseeker', 'legion_commander', 'slardar', 'bristleback'], treant_protector ['nyx_assassin', 'bounty_hunter', 'spirit_breaker', 'batrider'], tusk ['monkey_king', 'spectre', 'faceless_void', 'medusa', 'terrorblade'], underlord ['enchantress', 'broodmother', 'natures_prophet', 'furion'], undying ['rubick', 'pugna', 'ancient_apparition', 'keeper_of_the_light'], wraith_king ['pugna', 'ancient_apparition', 'grimstroke', 'oracle'],

 AGILITY
antimage ['templar_assassin', 'nyx_assassin', 'dazzle', 'oracle', 'rubick'],
bloodseeker ['axe', 'primal_beast', 'centaur_warrunner', 'mars', 'kunkka'],
bounty_hunter ['keeper_of_the_light', 'techies', 'dark_willow', 'grimstroke', 'phoenix'],
broodmother ['ancient_apparition', 'earthshaker', 'nevermore', 'invoker', 'tiny'],
clinkz ['ancient_apparition', 'undying', 'necrophos', 'witch_doctor', 'warlock'],
drow_ranger ['bounty_hunter', 'spirit_breaker', 'axe', 'tidehunter', 'centaur_warrunner'],
ember_spirit ['ancient_apparition', 'skywrath_mage', 'zuus', 'rubick', 'disruptor'],
faceless_void ['spectre', 'earthshaker', 'magnus', 'slardar', 'dragon_knight'],
gyrocopter ['ancient_apparition', 'grimstroke', 'oracle', 'winter_wyvern'],
hoodwink ['ancient_apparition', 'rubick', 'keeper_of_the_light', 'death_prophet'],
juggernaut ['ancient_apparition', 'disruptor', 'death_prophet', 'warlock', 'enigma'],
kez ['ancient_apparition', 'keeper_of_the_light', 'silencer', 'rubick'],
lone_druid ['chen', 'enigma', 'earthshaker', 'magnus', 'beastmaster'],
luna ['vengeful_spirit', 'dazzle', 'oracle', 'abaddon', 'winter_wyvern'],
medusa ['viper', 'ancient_apparition', 'skywrath_mage', 'silencer', 'zeus'],
meepo ['earthshaker', 'enigma', 'magnus', 'void_spirit', 'ember_spirit'],
mirana ['keeper_of_the_light', 'night_stalker', 'bounty_hunter', 'viper'],
monkey_king ['earthshaker', 'enigma', 'magnus', 'tidehunter', 'centaur_warrunner'],
morphling ['ember_spirit', 'queen_of_pain', 'skywrath_mage', 'lina', 'ancient_apparition'],
naga_siren ['earthshaker', 'tidehunter', 'magnus', 'enigma', 'dark_seer'],
phantom_assassin ['axe', 'beastmaster', 'legion_commander', 'abyssal_underlord', 'spirit_breaker'],
phantom_lancer ['ancient_apparition', 'earthshaker', 'magnus', 'kunkka', 'enigma'],
razor ['chen', 'enigma', 'earthshaker', 'magnus', 'jakiro'],
riki ['ancient_apparition', 'keeper_of_the_light', 'skywrath_mage', 'rubick', 'grimstroke'],
shadow_fiend [],
slark ['bounty_hunter', 'bloodseeker', 'slardar', 'spirit_breaker', 'axe'],
sniper ['spirit_breaker', 'bounty_hunter', 'pudge', 'axe', 'centaur_warrunner'],
spectre ['ancient_apparition', 'earthshaker', 'doom', 'axe', 'magnus'],
templar_assassin ['invoker', 'ancient_apparition', 'earthshaker', 'nevermore', 'lina'],
terrorblade ['ancient_apparition', 'grimstroke', 'vengeful_spirit', 'earthshaker', 'axe'],
troll_warlord ['keeper_of_the_light', 'techies', 'dark_willow', 'grimstroke', 'phoenix'],
ursa ['winter_wyvern', 'beastmaster', 'phoenix', 'keeper_of_the_light', 'dazzle'],
vengeful_spirit ['invoker', 'ancient_apparition', 'viper', 'grimstroke'],
viper ['ancient_apparition', 'zuus', 'rubick', 'keeper_of_the_light'],
weaver ['bane', 'bloodseeker', 'skywrath_mage', 'ancient_apparition', 'silencer'],

 INTELLIGENCE
ancient_apparition ['tiny', 'spirit_breaker', 'pudge', 'axe', 'centaur_warrunner'],
chen ['night_stalker', 'bounty_hunter', 'riki', 'naga_siren'],
crystal_maiden ['bounty_hunter', 'nyx_assassin', 'centaur_warrunner', 'spirit_breaker', 'axe'],
dark_seer ['puck', 'rubick', 'keeper_of_the_light', 'death_prophet'],
dark_willow ['juggernaut', 'faceless_void', 'sven', 'wraith_king'],
disruptor ['storm_spirit', 'ember_spirit', 'queen_of_pain', 'puck', 'riki'],
enchantress ['heroes_with_burst', 'outworld_destroyer', 'lion', 'skywrath_mage', 'lina'],
grimstroke ['juggernaut', 'faceless_void', 'sven', 'wraith_king', 'troll_warlord'],
invoker ['legion_commander', 'axe', 'centaur_warrunner', 'bristleback', 'ursa'],
jakiro ['ancient_apparition', 'rubick', 'keeper_of_the_light', 'death_prophet'],
keeper_of_the_light ['night_stalker', 'bounty_hunter', 'riki', 'naga_siren', 'clinkz'],
leshrac ['nyx_assassin', 'silencer', 'disruptor', 'rubick', 'oracle'],
lich ['ancient_apparition', 'rubick', 'keeper_of_the_light', 'death_prophet'],
lina ['lion', 'legion_commander', 'axe', 'faceless_void', 'centaur_warrunner'],
lion ['juggernaut', 'omniknight', 'legion_commander', 'faceless_void', 'troll_warlord'],
muerta ['ancient_apparition', 'zuus', 'rubick', 'keeper_of_the_light'],
necrophos ['silencer', 'axe', 'doom', 'spirit_breaker', 'legion_commander'],
oracle ['juggernaut', 'legion_commander', 'axe', 'faceless_void', 'troll_warlord'],
outworld_destroyer ['enigma', 'earthshaker', 'beastmaster', 'nyx_assassin'],
puck ['stealth_heroes', 'silencer', 'disruptor', 'doom', 'axe'],
pugna ['underlord', 'huskar', 'dragon_knight', 'wraith_king', 'life_stealer'],
queen_of_pain ['silencer', 'doom', 'axe', 'legion_commander', 'faceless_void'],
ringmaster ['ancient_apparition', 'zuus', 'rubick', 'keeper_of_the_light'],
rubick ['heroes_without_good_spells', 'slark', 'troll_warlord', 'ursa', 'spectre'],
silencer ['storm_spirit', 'queen_of_pain', 'lina', 'skywrath_mage', 'death_prophet'],
skywrath_mage ['ancient_apparition', 'zuus', 'rubick', 'keeper_of_the_light'],
storm_spirit ['silencer', 'disruptor', 'ancient_apparition', 'ember_spirit', 'lina'],
tinker ['antimage', 'ancient_apparition', 'viper', 'silencer'],
warlock ['abaddon', 'winter_wyvern', 'omniknight', 'treant_protector', 'dazzle'],
winter_wyvern ['chaos_knight', 'phantom_lancer', 'terrorblade', 'spectre', 'medusa'],
witch_doctor ['abaddon', 'winter_wyvern', 'omniknight', 'treant_protector', 'dazzle'],
zeus ['anti-mage', 'ancient_apparition', 'storm_spirit', 'ember_spirit', 'skywrath_mage'],

 UNIVERSAL
abaddon ['ancient_apparition', 'viper', 'grimstroke', 'oracle'],
arc_warden ['pugna', 'ancient_apparition', 'grimstroke', 'oracle'],
bane ['juggernaut', 'omniknight', 'legion_commander', 'faceless_void'],
batrider ['ancient_apparition', 'viper', 'keeper_of_the_light', 'death_prophet'],
beastmaster ['keeper_of_the_light', 'techies', 'dark_willow', 'grimstroke'],
brewmaster ['ancient_apparition', 'viper', 'keeper_of_the_light', 'death_prophet'],
dazzle ['ancient_apparition', 'viper', 'keeper_of_the_light', 'death_prophet'],
death_prophet ['silencer', 'axe', 'legion_commander', 'faceless_void'],
enigma ['ancient_apparition', 'rubick', 'keeper_of_the_light', 'death_prophet'],
io ['rubick', 'keeper_of_the_light', 'death_prophet', 'ancient_apparition'],
magnus ['puck', 'silencer', 'disruptor', 'doom'],
marci ['ancient_apparition', 'viper', 'keeper_of_the_light', 'death_prophet'],
natures_prophet ['ancient_apparition', 'rubick', 'keeper_of_the_light', 'death_prophet'],
nyx_assassin ['keeper_of_the_light', 'techies', 'dark_willow', 'grimstroke'],
pangolier ['keeper_of_the_light', 'techies', 'dark_willow', 'grimstroke'],
sand_king ['keeper_of_the_light', 'techies', 'dark_willow', 'grimstroke'],
snapfire ['ancient_apparition', 'viper', 'keeper_of_the_light', 'death_prophet'],
techies ['chen', 'enigma', 'earthshaker', 'magnus'],
venomancer ['ancient_apparition', 'rubick', 'keeper_of_the_light', 'death_prophet'],
visage ['keeper_of_the_light', 'techies', 'dark_willow', 'grimstroke'],
void_spirit ['keeper_of_the_light', 'techies', 'dark_willow', 'grimstroke'],
windranger ['keeper_of_the_light', 'techies', 'dark_willow', 'grimstroke']`;
// Парсер строк вида: heroName ['id1', 'id2', 'id3'] function parseCountersFromText(text) { const result = {}; const lines = text.split(/\r?\n/); for (const line of lines) { const m = line.match(/^\s*([A-Za-z0-9_]+)\s*(.∗)/); if (!m) continue; const heroKey = m[1]; const inner = m[2]; const counters = []; const reg = /'([^']+)'/g; let mm; while ((mm = reg.exec(inner)) !== null) { counters.push(mm[1]); } const heroCanon = normalizeHeroName(heroKey); if (!heroCanon) continue; if (!result[heroCanon]) result[heroCanon] = []; counters.forEach(c => { const canon = normalizeHeroName(c); if (canon && !result[heroCanon].includes(canon)) result[heroCanon].push(canon); }); } return result; }

// Нормализация имён контрпиков и героев к каноническим id function ensureInCANON(data) { // data: объект { heroCanon: [c1, c2, ...] } const canonMap = {}; for (const h in data) { const hero = normalizeHeroName(h); if (!hero) continue; const arr = data[h].map(x => normalizeHeroName(x)).filter(Boolean); canonMap[hero] = Array.from(new Set(arr)); } return canonMap; }

// Дополняем контрпики на базе вашего текста const parsed = parseCountersFromText(CONTROPS_TEXT); const COUNTERS = ensureInCANON(parsed);

// Экспортируем COUNTERS и утилиту normalize export { COUNTERS };

export function normalizeHeroName(name) { if (!name) return ''; const raw = name.toLowerCase().replace(/[\s-]+/g, ''); if (CANONICAL_IDS.has(raw)) return raw; if (ALIASES.hasOwnProperty(raw)) return ALIASES[raw]; // Попробовать привести к канонике через подстановки const alt = raw.replace(/war/, ''); if (CANONICAL_IDS.has(alt)) return alt; // fallback return raw; }

// Экспортируем набор канонических id, чтобы другие модули могли проверить export const CANONICAL_IDS = ALL_CANONICAL;

// валидаторы export default { COUNTERS, normalizeHeroName };
