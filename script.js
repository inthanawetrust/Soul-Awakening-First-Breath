// ============================================================
// XIANXIA EVOLUTION — GAME ENGINE v2.0
// Dual Planes • 24 Realms • Tribulation System • Premium Features
// ============================================================

// ─────────────────────────────────────────────
// GAME STATE
// ─────────────────────────────────────────────
let gameState = {
  started: false,
  qi: 0,
  essence: 0,              // Immortal Essence (Upper Realm currency)
  maxQi: 100,
  realmIndex: 0,
  realmStage: "Early",     // "Early" | "Mid" | "Late" | "Great Circle"
  plane: "mortal",         // "mortal" | "immortal"
  age: 0,
  maxAge: 70,
  combatPower: 5,
  gold: 0,
  jade: 0,                 // Premium currency
  spiritRoot: "Unawakened",
  lineage: "None",
  foundationQuality: 1.0,  // 0.5-2.0 multiplier for tribulation success
  spiritTools: [],         // Defensive items for tribulations
  daoFragments: 0,         // For skill transcension
  isDead: false,
  isSectLeader: false,
  sect: null,              // { name, rank, vassalDisciples: [] }
  manorUpgrades: [],       // Purchased VIP upgrades
  unlockedCosmetics: [],   // Purchased visual items
  passLevel: 1,            // Heavenly Path Pass level
  passRewardsClaimed: [],  // Claimed pass rewards
  offlineBonus: 1.0,       // Multiplier for offline gains
  lastLogin: null
};

// ─────────────────────────────────────────────
// REALM MECHANICS (age limits, success chances)
// Indexed by realmIndex (0-23)
// ─────────────────────────────────────────────
const realmMechanics = [
  // Mortal Realms (0-11)
  { ageLimit: 75, success: 0.95 },   // 0 Awaiting Birth
  { ageLimit: 80, success: 0.9 },    // 1 Body Refining
  { ageLimit: 100, success: 0.8 },   // 2 Qi Condensation
  { ageLimit: 150, success: 0.7 },   // 3 Foundation Establishment
  { ageLimit: 300, success: 0.55 },  // 4 Core Formation
  { ageLimit: 600, success: 0.4 },   // 5 Nascent Soul
  { ageLimit: 1200, success: 0.3 },  // 6 Soul Transformation
  { ageLimit: 2500, success: 0.22 }, // 7 Void Refinement
  { ageLimit: 5000, success: 0.15 }, // 8 Body Integration
  { ageLimit: 10000, success: 0.1 }, // 9 Great Perfection
  { ageLimit: 20000, success: 0.06 },// 10 Tribulation Transcendence
  { ageLimit: 50000, success: 0.03 },// 11 Mortal Ascension
  
  // Immortal Realms (12-23)
  { ageLimit: 100000, success: 0.85 },  // 12 False Immortal
  { ageLimit: 200000, success: 0.75 },  // 13 True Immortal
  { ageLimit: 500000, success: 0.6 },   // 14 Heavenly Immortal
  { ageLimit: 1000000, success: 0.45 }, // 15 Mystic Immortal
  { ageLimit: 2000000, success: 0.3 },  // 16 Golden Immortal
  { ageLimit: 5000000, success: 0.2 },  // 17 Zenith Gold Immortal
  { ageLimit: 10000000, success: 0.12 },// 18 Immortal Monarch
  { ageLimit: 20000000, success: 0.07 },// 19 Immortal Emperor
  { ageLimit: 50000000, success: 0.04 },// 20 Immortal Venerable
  { ageLimit: 100000000, success: 0.02 },//21 Dao Ancestor
  { ageLimit: 999999999, success: 0.01 },//22 God-King
  { ageLimit: 9999999999, success: 0.005 }//23 Eternal Sovereign
];

// ─────────────────────────────────────────────
// DIVINE GROTTO TYPES
// ─────────────────────────────────────────────
const GROTTO_TYPES = [
  { name: "Cloud-Piercing Peak", rarity: "common", daoFragmentChance: 0.1, essenceBonus: [10, 30] },
  { name: "Abyssal Spirit Cave", rarity: "rare", daoFragmentChance: 0.35, essenceBonus: [30, 80] },
  { name: "Primordial Dao Spring", rarity: "legendary", daoFragmentChance: 0.7, essenceBonus: [80, 200] }
];

// ─────────────────────────────────────────────
// MANOR UPGRADES (VIP Features)
// ─────────────────────────────────────────────
const MANOR_UPGRADES = {
  "Spirit Spring Pond": {
    cost: 200,
    effect: "offlineQiBoost",
    value: 0.05,
    description: "A mystical pond that amplifies meditation gains by +5%"
  },
  "Jade Pillar Array": {
    cost: 350,
    effect: "breakthroughBonus",
    value: 0.08,
    description: "Ancient pillars that stabilize cultivation breakthroughs (+8% success)"
  },
  "Starlight Meditation Pavilion": {
    cost: 500,
    effect: "cultivateBoost",
    value: 0.1,
    description: "A serene pavilion that increases Qi/Essence gain by +10%"
  }
};

// ─────────────────────────────────────────────
// HEAVENLY PATH PASS REWARDS
// ─────────────────────────────────────────────
const HEAVENLY_PASS_REWARDS = [
  { level: 5, item: "Pill Recipe: Foundation Stabilizer", type: "recipe" },
  { level: 10, item: "Pet Bloodline Catalyst", type: "catalyst" },
  { level: 15, item: "Spirit Spring Pond Upgrade", type: "manor" },
  { level: 20, item: "Exclusive Aura: Phoenix Flame", type: "cosmetic" },
  { level: 25, item: "Dao Fragment x3", type: "fragment" },
  { level: 30, item: "Immortal Jade x50", type: "jade" }
];

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────
const YEAR_DURATION = 5 * 60 * 1000; // 5 minutes real time = 1 year game time
const ESSENCE_CONVERSION_RATE = 1000; // 1000 Qi = 1 Essence
let timeToNextYear = YEAR_DURATION;
let gameLoopInterval = null;

// ─────────────────────────────────────────────
// INITIALIZATION
// ─────────────────────────────────────────────
window.onload = () => {
  loadGame();
  setupEventListeners();
  startWorldClock();
};

function setupEventListeners() {
  document.getElementById('meditate-btn').addEventListener('click', meditate);
  document.getElementById('explore-btn').addEventListener('click', explore);
  document.getElementById('breakthrough-btn').addEventListener('click', breakthrough);
  document.getElementById('grotto-btn').addEventListener('click', exploreDivineGrotto);
  document.getElementById('sect-btn').addEventListener('click', toggleSectPanel);
  document.getElementById('jade-btn').addEventListener('click', toggleJadeStore);
  document.getElementById('pass-btn').addEventListener('click', toggleHeavenlyPass);
  document.getElementById('manor-btn').addEventListener('click', toggleManorPanel);
  document.getElementById('rebirth-btn').addEventListener('click', reincarnate);
  document.getElementById('stats-btn').addEventListener('click', toggleMenu);
  document.getElementById('help-btn').addEventListener('click', toggleHelp);
  document.getElementById('menu-overlay').addEventListener('click', closeAllModals);
}

function loadGame() {
  const saved = localStorage.getItem('xianxiaSave');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      // Merge saved state with defaults (migration-safe)
      gameState = { ...gameState, ...parsed };
      // Apply manor upgrade effects
      applyManorBonuses();
      // Handle offline gains
      processOfflineGains();
      writeToLog("Welcome back, Cultivator. Your journey continues.", "system");
    } catch (e) {
      console.error("Save load error:", e);
      startBirthSequence();
    }
  } else {
    startBirthSequence();
  }
  updateUI();
}

function saveGame() {
  gameState.lastLogin = Date.now();
  localStorage.setItem('xianxiaSave', JSON.stringify(gameState));
}

// Auto-save every 30 seconds
setInterval(saveGame, 30000);

// ─────────────────────────────────────────────
// BIRTH / REINCARNATION SEQUENCE
// ─────────────────────────────────────────────
async function startBirthSequence() {
  const log = document.getElementById('log-container');
  log.innerHTML = "";
  writeToLog("🔄 The wheel of reincarnation spins...", "system");
  await delay(1500);

  // Lineage roll
  const lineageRoll = Math.random();
  if (lineageRoll > 0.9) {
    gameState.lineage = "Imperial Clan";
    gameState.gold = 1000;
    gameState.maxAge = 90;
    writeToLog("🐉 A golden dragon marks the sky. You are born to the Imperial Household.", "good");
  } else if (lineageRoll > 0.6) {
    gameState.lineage = "Great Merchant House";
    gameState.gold = 400;
    gameState.maxAge = 80;
    writeToLog("💰 Born amidst the scent of Spirit Stones and trade scrolls.", "good");
  } else if (lineageRoll > 0.25) {
    gameState.lineage = "Mortal Village";
    gameState.combatPower += 15;
    gameState.maxAge = 70;
    writeToLog("⚔️ Born in a frontier village. You were forged by hardship.", "system");
  } else {
    gameState.lineage = "Temple Foundling";
    gameState.maxQi = 180;
    gameState.maxAge = 65;
    writeToLog("📿 Left in a basket at a monk's door. Your lineage is silent.", "system");
  }
  await delay(1200);

  // Spirit Root roll
  const rootRoll = Math.random();
  if (rootRoll > 0.95) {
    gameState.spiritRoot = "Heavenly Saint Root";
    gameState.maxQi += 100;
    writeToLog("✨ The local elders tremble. You possess a Saint Grade Root!", "good");
  } else if (rootRoll > 0.7) {
    gameState.spiritRoot = "Earthly Grade Root";
    gameState.maxQi += 40;
    writeToLog("🌱 You display an exceptional affinity for the ambient Yuan Qi.", "good");
  } else {
    gameState.spiritRoot = "Mortal Grade Root";
    writeToLog("🍃 Your talent is ordinary, but your resolve remains unbroken.", "system");
  }
  await delay(1200);

  beginAscension();
}

function beginAscension() {
  gameState.started = true;
  gameState.age = 14;
  gameState.realmIndex = 0;
  gameState.realmStage = "Early";
  gameState.plane = "mortal";
  gameState.qi = 0;
  gameState.essence = 0;
  
  const startRealm = loreGetRealm(0);
  gameState.realm = startRealm.name;

  document.getElementById('action-bar').style.display = 'flex';
  writeToLog("⏳ Fourteen years pass in a breath. Your journey begins.", "system");
  
  updateUI();
  saveGame();
}

function reincarnate() {
  if (!confirm("Reincarnate? You will lose all progress but retain Heavenly Path Pass level.")) return;
  
  const passLevel = gameState.passLevel;
  const jade = gameState.jade;
  const unlockedCosmetics = [...gameState.unlockedCosmetics];
  
  // Reset core state
  gameState = {
    ...gameState,
    started: false,
    qi: 0,
    essence:  0,
    maxQi: 100,
    realmIndex: 0,
    realmStage: "Early",
    plane: "mortal",
    age: 0,
    maxAge: 70,
    combatPower: 5,
    gold: 0,
    spiritRoot: "Unawakened",
    lineage: "None",
    foundationQuality: 1.0,
    spiritTools: [],
    daoFragments: 0,
    isDead: false,
    isSectLeader: false,
    sect: null,
    manorUpgrades: [],
    passRewardsClaimed: [],
    offlineBonus: 1.0
  };
  
  // Preserve premium progress
  gameState.passLevel = passLevel;
  gameState.jade = jade;
  gameState.unlockedCosmetics = unlockedCosmetics;
  
  writeToLog("🔄 The Great Cycle turns. You begin anew, carrying only the wisdom of past lives.", "system");
  document.getElementById('log-container').innerHTML = "";
  startBirthSequence();
}

// ─────────────────────────────────────────────
// WORLD CLOCK & OFFLINE SYSTEM
// ─────────────────────────────────────────────
function startWorldClock() {
  if (gameLoopInterval) clearInterval(gameLoopInterval);
  
  gameLoopInterval = setInterval(() => {
    if (gameState.isDead) return;
    
    timeToNextYear -= 1000;
    if (timeToNextYear <= 0) {
      gameState.age++;
      timeToNextYear = YEAR_DURATION;
      
      if (gameState.age >= gameState.maxAge) {
        die(loreDeath());
        return;
      }
      updateUI();
    }
    updateTimerDisplay();
  }, 1000);
}

function updateTimerDisplay() {
  const mins = Math.floor(timeToNextYear / 60000);
  const secs = Math.floor((timeToNextYear % 60000) / 1000);
  const el = document.getElementById('time-countdown');
  if (el) el.innerText = `Cycle Ends: ${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function processOfflineGains() {
  if (!gameState.lastLogin) return;
  
  const timeOfflineMs = Date.now() - gameState.lastLogin;
  const timeOfflineMinutes = Math.floor(timeOfflineMs / 60000);
  
  if (timeOfflineMinutes < 1) return;
  
  const gains = calculateOfflineGains(timeOfflineMinutes);
  
  if (gains.qi > 0) {
    gameState.qi = Math.min(gameState.maxQi, gameState.qi + gains.qi);
    writeToLog(`🌙 While you were away (${timeOfflineMinutes}m), you gained +${Math.floor(gains.qi)} Qi.`, "system-minor");
  }
  if (gains.essence > 0) {
    gameState.essence += gains.essence;
    writeToLog(`🌙 While you were away, you gathered +${gains.essence} Immortal Essence.`, "system-minor");
  }
}

function calculateOfflineGains(timeOfflineMinutes) {
  const spiritualDensity = getSpiritualDensity(); // 1.0-10.0 scale
  const petBonus = 0; // gameState.activePet?.qiBonus || 0; // Future: pet system
  const planeMultiplier = gameState.plane === "immortal" ? 10 : 1;
  const baseRate = 5 * planeMultiplier;
  
  // Apply manor bonuses
  let totalMultiplier = gameState.offlineBonus;
  if (gameState.manorUpgrades.includes("Spirit Spring Pond")) {
    totalMultiplier += MANOR_UPGRADES["Spirit Spring Pond"].value;
  }
  
  const totalGain = (timeOfflineMinutes * baseRate) * (spiritualDensity + petBonus) * totalMultiplier;
  
  if (gameState.plane === "immortal") {
    return { essence: Math.floor(totalGain / ESSENCE_CONVERSION_RATE), qi: 0 };
  }
  return { qi: Math.floor(totalGain), essence: 0 };
}

function getSpiritualDensity() {
  // Base density increases with realm
  const base = 1 + (gameState.realmIndex * 0.3);
  // Bonus for being at Great Circle stage
  const stageBonus = gameState.realmStage === "Great Circle" ? 1.5 : 1;
  // Cap at 10.0
  return Math.min(10, base * stageBonus);
}

// ─────────────────────────────────────────────
// CORE ACTIONS
// ─────────────────────────────────────────────
function meditate() {
  if (gameState.isDead) return;
  
  const baseGain = 10 + (gameState.realmIndex * 5);
  const spiritRootBonus = gameState.spiritRoot === "Heavenly Saint Root" ? 15 : 0;
  const stageBonus = STAGES.indexOf(gameState.realmStage) * 2;
  const planeMultiplier = gameState.plane === "immortal" ? 10 : 1;
  
  // Apply manor bonus
  let totalGain = (baseGain + spiritRootBonus + stageBonus) * planeMultiplier;
  if (gameState.manorUpgrades.includes("Starlight Meditation Pavilion")) {
    totalGain *= (1 + MANOR_UPGRADES["Starlight Meditation Pavilion"].value);
  }
  
  if (gameState.plane === "immortal") {
    const essenceGain = Math.floor(totalGain / ESSENCE_CONVERSION_RATE);
    if (essenceGain > 0) {
      gameState.essence += essenceGain;
      writeToLog(`You absorb ${essenceGain} Immortal Essence.`, "system-minor");
    }
  } else {
    gameState.qi = Math.min(gameState.maxQi, gameState.qi + totalGain);
    writeToLog(loreCultivate());
    writeToLog(`(+${Math.floor(totalGain)} Qi)`, "system-minor");
  }
  
  updateUI();
  saveGame();
}

function explore() {
  if (gameState.isDead) return;
  
  const event = loreExplore(gameState.plane);
  
  // Handle event outcomes
  if (event.tag === "good") {
    const treasure = Math.floor(Math.random() * 20) + 5;
    if (gameState.plane === "immortal") {
      const essenceFind = Math.floor(treasure / 10);
      gameState.essence += essenceFind;
      writeToLog(event.msg, "good");
      writeToLog(`(+${essenceFind} Immortal Essence)`, "system-minor");
    } else {
      gameState.gold += treasure;
      writeToLog(event.msg, "good");
      writeToLog(`(+${treasure} Gold)`, "system-minor");
    }
  } else if (event.tag === "combat") {
    triggerCombat();
    writeToLog(event.msg, "system");
  } else if (event.tag === "bad") {
    writeToLog(event.msg, "bad");
    // Small chance of Qi/Essence loss
    if (Math.random() < 0.3) {
      if (gameState.plane === "immortal") {
        const loss = Math.floor(gameState.essence * 0.1);
        gameState.essence -= loss;
        writeToLog(`(-${loss} Immortal Essence)`, "bad");
      } else {
        const loss = Math.floor(gameState.qi * 0.1);
        gameState.qi -= loss;
        writeToLog(`(-${loss} Qi)`, "bad");
      }
    }
  } else {
    writeToLog(event.msg);
  }
  
  updateUI();
  saveGame();
}

function breakthrough() {
  if (gameState.isDead) return;
  
  const currentMechanics = realmMechanics[Math.min(gameState.realmIndex, realmMechanics.length - 1)];
  
  // Check if at Great Circle and ready for realm advancement
  if (gameState.realmStage === "Great Circle" && gameState.qi >= gameState.maxQi) {
    // Special case: World-Crossing Tribulation at Mortal Ascension → False Immortal
    if (gameState.realmIndex === 11 && gameState.plane === "mortal") {
      startWorldCrossingTribulation();
      return;
    }
    
    // Standard realm advancement
    attemptRealmAscension();
    return;
  }
  
  // Stage advancement check
  if (gameState.qi >= gameState.maxQi) {
    advanceStage();
  } else {
    writeToLog("Your foundation is insufficient for ascension.", "system");
  }
  
  updateUI();
  saveGame();
}

function advanceStage() {
  const stages = ["Early", "Mid", "Late", "Great Circle"];
  const currentIndex = stages.indexOf(gameState.realmStage);
  
  if (currentIndex < stages.length - 1) {
    gameState.realmStage = stages[currentIndex + 1];
    writeToLog(`Your cultivation stabilizes at ${gameState.realmStage} stage.`, "system-minor");
    // Small Qi refund on stage up
    gameState.qi = Math.floor(gameState.maxQi * 0.2);
  }
}

function attemptRealmAscension() {
  writeToLog(loreAscendAttempt(), "system");
  
  // Calculate success chance
  let baseChance = realmMechanics[Math.min(gameState.realmIndex + 1, realmMechanics.length - 1)].success;
  const stageBonus = STAGES.indexOf(gameState.realmStage) * 0.05;
  
  // Apply manor bonus
  if (gameState.manorUpgrades.includes("Jade Pillar Array")) {
    baseChance += MANOR_UPGRADES["Jade Pillar Array"].value;
  }
  
  const finalChance = Math.min(0.95, baseChance + stageBonus);
  
  if (Math.random() < finalChance) {
    // Success
    gameState.realmIndex = Math.min(23, gameState.realmIndex + 1);
    gameState.realmStage = "Early";
    
    // Plane transition check
    if (gameState.realmIndex === 12) {
      gameState.plane = "immortal";
      gameState.maxQi = 10000; // Reset Qi scale for Immortal realm
      writeToLog("🌟 You have entered the Upper Realm! Immortal Essence now fuels your cultivation.", "system");
    }
    
    const newRealm = loreGetRealm(gameState.realmIndex);
    gameState.realm = newRealm.name;
    gameState.maxAge = realmMechanics[gameState.realmIndex].ageLimit;
    gameState.combatPower *= 2.2;
    gameState.qi = 0;
    gameState.maxQi *= 1.5;
    
    writeToLog(loreBreakthroughSuccess(newRealm.name, gameState.realmStage), "system");
  } else {
    // Failure
    gameState.qi = Math.floor(gameState.qi * 0.4);
    writeToLog(loreBreakthroughFailure(), "bad");
  }
}

// ─────────────────────────────────────────────
// WORLD-CROSSING TRIBULATION (Realm 11 → 12)
// ─────────────────────────────────────────────
async function startWorldCrossingTribulation() {
  if (gameState.realmIndex !== 11 || gameState.realmStage !== "Great Circle") return;
  
  writeToLog(loreTribulation("start"), "system");
  document.querySelectorAll('.action-btn').forEach(b => b.disabled = true);
  
  // Calculate base success chance
  let successChance = 0.3 + (gameState.foundationQuality * 0.15);
  const toolBonus = gameState.spiritTools.length * 0.08;
  successChance = Math.min(0.95, successChance + toolBonus);
  
  // Nine waves of lightning
  for (let wave = 1; wave <= 9; wave++) {
    await delay(1200);
    const waveDifficulty = wave * 0.08;
    const waveRoll = Math.random();
    
    if (waveRoll > successChance - waveDifficulty) {
      writeToLog(loreTribulation("wave", wave), "bad");
      gameState.foundationQuality = Math.max(0.5, gameState.foundationQuality * 0.96);
    } else {
      writeToLog(loreTribulation("wave", wave), "good");
    }
    updateUI();
  }
  
  // Heart Demon Trial
  await heartDemonTrial();
  
  // Final resolution
  const finalRoll = Math.random();
  const finalThreshold = successChance * gameState.foundationQuality;
  
  if (finalRoll < finalThreshold) {
    completeAscension();
  } else {
    failAscension();
  }
  
  document.querySelectorAll('.action-btn').forEach(b => b.disabled = false);
}

async function heartDemonTrial() {
  writeToLog(loreTribulation("heartDemon"), "system");
  await delay(1800);
  
  // Simple auto-resolution with flavor (can expand to UI choices later)
  const choices = [
    { text: "Accept your regrets", successMod: 0.15 },
    { text: "Overcome through will", successMod: 0.10 },
    { text: "Seek enlightenment", successMod: 0.20 }
  ];
  
  const choice = choices[Math.floor(Math.random() * choices.length)];
  writeToLog(`You choose: "${choice.text}"`, "system-minor");
  
  // Apply modifier to foundation quality temporarily
  gameState.foundationQuality += choice.successMod;
  await delay(1000);
}

function completeAscension() {
  gameState.plane = "immortal";
  gameState.realmIndex = 12; // False Immortal
  gameState.realmStage = "Early";
  gameState.qi = 0;
  gameState.maxQi = 10000;
  gameState.foundationQuality = Math.max(0.8, gameState.foundationQuality);
  
  writeToLog(loreTribulation("success"), "system");
  writeToLog(`✨ Welcome to the Upper Realm, ${gameState.realm}.`, "good");
  
  // Server announcement simulation
  writeToLog("📢 A new Immortal has ascended! The heavens acknowledge your name.", "system");
  
  updateUI();
  saveGame();
}

function failAscension() {
  writeToLog(loreTribulation("failure"), "bad");
  writeToLog("💔 Cultivation regression: -2 realms, foundation weakened.", "bad");
  
  gameState.realmIndex = Math.max(0, gameState.realmIndex - 2);
  gameState.realmStage = "Early";
  gameState.qi = Math.floor(gameState.maxQi * 0.3);
  gameState.foundationQuality = Math.max(0.5, gameState.foundationQuality * 0.85);
  
  const currentRealm = loreGetRealm(gameState.realmIndex);
  gameState.realm = currentRealm.name;
  
  updateUI();
  saveGame();
}

// ─────────────────────────────────────────────
// DIVINE GROTTOES (Upper Realm Only)
// ─────────────────────────────────────────────
function exploreDivineGrotto() {
  if (gameState.plane !== "immortal") {
    writeToLog("Divine Grottoes exist only in the Upper Realm.", "system");
    return;
  }
  
  const grotto = GROTTO_TYPES[Math.floor(Math.random() * GROTTO_TYPES.length)];
  writeToLog(`You enter the ${grotto.name}...`, "system");
  
  // Chance to find Dao Fragment
  if (Math.random() < grotto.daoFragmentChance) {
    gameState.daoFragments = (gameState.daoFragments || 0) + 1;
    writeToLog(`✨ You discover a Dao Fragment! Skills can now be transcended.`, "good");
  }
  
  // Essence reward
  const [min, max] = grotto.essenceBonus;
  const essenceFind = Math.floor(Math.random() * (max - min + 1)) + min;
  gameState.essence += essenceFind;
  writeToLog(`You gather ${essenceFind} Immortal Essence from the environment.`, "good");
  
  // Rare chance for spirit tool
  if (Math.random() < 0.15) {
    gameState.spiritTools.push(`Tribulation Charm ${gameState.spiritTools.length + 1}`);
    writeToLog(`🔮 You find a protective spirit tool: ${gameState.spiritTools[gameState.spiritTools.length - 1]}`, "good");
  }
  
  updateUI();
  saveGame();
}

// ─────────────────────────────────────────────
// SECT ASCENDANCE SYSTEM
// ─────────────────────────────────────────────
function toggleSectPanel() {
  if (gameState.plane !== "immortal" && !gameState.isSectLeader) {
    writeToLog("Only Immortals may found or lead Ascended Sects.", "system");
    return;
  }
  
  const panel = document.getElementById('sect-panel');
  if (!panel) return;
  
  panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
  
  if (panel.style.display === 'block') {
    renderSectPanel();
  }
}

function renderSectPanel() {
  const panel = document.getElementById('sect-panel-content');
  if (!panel) return;
  
  if (!gameState.sect && gameState.plane === "immortal") {
    panel.innerHTML = `
      <h4>Found an Ascended Sect</h4>
      <p>Establish your own sect that spans both realms.</p>
      <input type="text" id="sect-name-input" placeholder="Sect Name" style="width:100%;padding:8px;margin:10px 0;background:#111;border:1px solid #333;color:#fff;">
      <button onclick="createAscendedSect()" class="action-btn" style="width:100%;">Create Sect</button>
    `;
  } else if (gameState.sect) {
    panel.innerHTML = `
      <h4>${gameState.sect.name}</h4>
      <p><strong>Rank:</strong> ${gameState.sect.rank}</p>
      <p><strong>Vassal Disciples:</strong> ${gameState.sect.vassalDisciples?.length || 0}</p>
      <p><strong>Passive Bonus:</strong> +${Math.round((gameState.offlineBonus - 1) * 100)}% offline gains</p>
      <button onclick="recruitVassal()" class="action-btn" style="margin-top:10px;width:100%;">Recruit Vassal Disciple</button>
    `;
  } else {
    panel.innerHTML = `<p>Reach the Upper Realm to unlock Sect Ascendance.</p>`;
  }
}

function createAscendedSect() {
  const nameInput = document.getElementById('sect-name-input');
  const sectName = nameInput?.value?.trim() || "Heavenly Dawn Sect";
  
  gameState.sect = {
    name: sectName,
    founded: gameState.age,
    rank: "Emerging",
    vassalDisciples: [],
    realmSpan: ["mortal", "immortal"]
  };
  gameState.isSectLeader = true;
  gameState.offlineBonus = (gameState.offlineBonus || 1) + 0.05;
  
  writeToLog(`🏯 The Ascended Sect "${sectName}" is established!`, "system");
  writeToLog("You may now recruit Vassal Disciples from the Lower Realm.", "system-minor");
  
  renderSectPanel();
  updateUI();
  saveGame();
}

function recruitVassal() {
  if (!gameState.isSectLeader) return;
  
  const names = ["Ling", "Wei", "Xia", "Jian", "Mei", "Kai", "Yun", "Feng"];
  const realms = ["Body Refining", "Qi Condensation", "Foundation Establishment"];
  const discipleName = names[Math.floor(Math.random() * names.length)];
  const discipleRealm = realms[Math.floor(Math.random() * realms.length)];
  
  gameState.sect.vassalDisciples.push({
    name: discipleName,
    realm: discipleRealm,
    contribution: 0
  });
  
  gameState.offlineBonus += 0.02;
  
  writeToLog(`👤 ${discipleName} joins as a Vassal Disciple from the ${discipleRealm} realm.`, "good");
  writeToLog(`📈 Sect passive bonus increased to +${Math.round((gameState.offlineBonus - 1) * 100)}%.`, "system-minor");
  
  renderSectPanel();
  updateUI();
  saveGame();
}

// ─────────────────────────────────────────────
// PREMIUM FEATURES
// ─────────────────────────────────────────────
function toggleJadeStore() {
  const modal = document.getElementById('jade-store');
  if (!modal) return;
  modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
  document.getElementById('menu-overlay').style.display = modal.style.display;
  
  if (modal.style.display === 'block') {
    renderJadeStore();
  }
}

function renderJadeStore() {
  const grid = document.getElementById('store-grid');
  if (!grid) return;
  
  const items = [
    { id: 'celestial-robe', name: 'Celestial Robe', desc: 'Ethereal visual skin', price: 50, type: 'skin' },
    { id: 'dragon-trail', name: 'Dragon Aura Trail', desc: 'Golden particle effects', price: 75, type: 'aura' },
    { id: 'realm-hop', name: 'Realm Hop Charm', desc: 'Instant travel between realms', price: 100, type: 'utility' },
    { id: 'phoenix-wing', name: 'Phoenix Wing Backpiece', desc: 'Majestic cosmetic accessory', price: 120, type: 'skin' }
  ];
  
  grid.innerHTML = items.map(item => `
    <div class="store-item ${gameState.unlockedCosmetics.includes(item.id) ? 'owned' : ''}" 
         onclick="${gameState.unlockedCosmetics.includes(item.id) ? '' : `purchaseCosmetic('${item.id}', ${item.price})`}">
      <div class="item-preview">${item.type === 'skin' ? '👘' : item.type === 'aura' ? '🐉' : '🌀'}</div>
      <h4>${item.name}</h4>
      <p>${item.desc}</p>
      <span class="price">${gameState.unlockedCosmetics.includes(item.id) ? '✓ Owned' : `${item.price} 🪙`}</span>
    </div>
  `).join('');
}

function purchaseCosmetic(itemId, price) {
  if (gameState.jade < price) {
    writeToLog("Insufficient Immortal Jade.", "bad");
    return;
  }
  
  gameState.jade -= price;
  gameState.unlockedCosmetics.push(itemId);
  writeToLog(`✨ Purchased: ${itemId.replace('-', ' ')}`, "good");
  
  renderJadeStore();
  updateUI();
  saveGame();
}

function toggleHeavenlyPass() {
  const modal = document.getElementById('heavenly-pass');
  if (!modal) return;
  modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
  document.getElementById('menu-overlay').style.display = modal.style.display;
  
  if (modal.style.display === 'block') {
    renderHeavenlyPass();
  }
}

function renderHeavenlyPass() {
  const list = document.getElementById('pass-rewards');
  if (!list) return;
  
  list.innerHTML = HEAVENLY_PASS_REWARDS.map(reward => {
    const claimed = gameState.passRewardsClaimed.includes(reward.level);
    const available = gameState.passLevel >= reward.level && !claimed;
    
    return `
      <div class="pass-reward ${claimed ? 'claimed' : available ? 'available' : ''}">
        <span class="pass-level">Lv.${reward.level}</span>
        <span class="pass-item">${reward.item}</span>
        ${available ? `<button onclick="claimPassReward(${reward.level})" class="claim-btn">Claim</button>` : ''}
        ${claimed ? `<span class="claimed-badge">✓</span>` : ''}
      </div>
    `;
  }).join('');
  
  document.getElementById('pass-current-level').innerText = gameState.passLevel;
}

function claimPassReward(level) {
  const reward = HEAVENLY_PASS_REWARDS.find(r => r.level === level);
  if (!reward || gameState.passRewardsClaimed.includes(level)) return;
  
  switch(reward.type) {
    case "recipe": 
      // Future: recipe system
      writeToLog(`📜 Recipe unlocked: ${reward.item}`, "good");
      break;
    case "catalyst": 
      gameState.daoFragments = (gameState.daoFragments || 0) + 1;
      writeToLog(`🔮 Pet Catalyst acquired!`, "good");
      break;
    case "manor": 
      if (!gameState.manorUpgrades.includes("Spirit Spring Pond")) {
        gameState.manorUpgrades.push("Spirit Spring Pond");
        applyManorBonuses();
        writeToLog(`🏡 Manor upgraded: ${reward.item}`, "good");
      }
      break;
    case "cosmetic": 
      if (!gameState.unlockedCosmetics.includes(reward.item)) {
        gameState.unlockedCosmetics.push(reward.item);
        writeToLog(`✨ Cosmetic unlocked: ${reward.item}`, "good");
      }
      break;
    case "fragment": 
      gameState.daoFragments = (gameState.daoFragments || 0) + 3;
      writeToLog(`✨ Dao Fragments x3 acquired!`, "good");
      break;
    case "jade": 
      gameState.jade += 50;
      writeToLog(`💎 Immortal Jade x50 acquired!`, "good");
      break;
  }
  
  gameState.passRewardsClaimed.push(level);
  renderHeavenlyPass();
  updateUI();
  saveGame();
}

function toggleManorPanel() {
  const panel = document.getElementById('manor-panel');
  if (!panel) return;
  panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
  
  if (panel.style.display === 'block') {
    renderManorPanel();
  }
}

function renderManorPanel() {
  const content = document.getElementById('manor-content');
  if (!content) return;
  
  content.innerHTML = Object.entries(MANOR_UPGRADES).map(([name, upgrade]) => {
    const owned = gameState.manorUpgrades.includes(name);
    return `
      <div class="manor-upgrade ${owned ? 'owned' : ''}">
        <h4>${name}</h4>
        <p>${upgrade.description}</p>
        <p><strong>Effect:</strong> ${upgrade.effect === 'offlineQiBoost' ? '+5% offline gains' : upgrade.effect === 'breakthroughBonus' ? '+8% breakthrough success' : '+10% cultivation gain'}</p>
        ${owned 
          ? '<span class="owned-badge">✓ Owned</span>' 
          : `<button onclick="purchaseManorUpgrade('${name}')" class="action-btn" ${gameState.jade < upgrade.cost ? 'disabled' : ''}>Purchase (${upgrade.cost} 🪙)</button>`
        }
      </div>
    `;
  }).join('');
}

function purchaseManorUpgrade(upgradeName) {
  const upgrade = MANOR_UPGRADES[upgradeName];
  if (!upgrade || gameState.jade < upgrade.cost) {
    writeToLog("Insufficient Immortal Jade.", "bad");
    return;
  }
  
  gameState.jade -= upgrade.cost;
  gameState.manorUpgrades.push(upgradeName);
  applyManorBonuses();
  
  writeToLog(`🏡 Manor upgraded: ${upgradeName}`, "good");
  renderManorPanel();
  updateUI();
  saveGame();
}

function applyManorBonuses() {
  gameState.offlineBonus = 1.0; // Reset base
  
  if (gameState.manorUpgrades.includes("Spirit Spring Pond")) {
    gameState.offlineBonus += MANOR_UPGRADES["Spirit Spring Pond"].value;
  }
  // Add other bonus applications here as needed
}

// ─────────────────────────────────────────────
// COMBAT SYSTEM
// ─────────────────────────────────────────────
function triggerCombat() {
  const enemyStr = (gameState.realmIndex + 1) * 22;
  const roll = Math.floor(Math.random() * enemyStr);
  
  const combatEvents = EXPLORE_EVENTS.filter(e => e.tag === "combat" && (!e.plane || e.plane === gameState.plane));
  writeToLog(loreRandom(combatEvents.length ? combatEvents : EXPLORE_EVENTS).msg, "system");
  
  if (gameState.combatPower >= roll) {
    gameState.combatPower += 6;
    writeToLog("⚔️ Victory. Your battle intent sharpens. (+6 Combat Power)", "good");
  } else {
    // Non-lethal defeat for balance
    gameState.qi = Math.floor(gameState.qi * 0.5);
    writeToLog("💥 Defeated. You retreat, wounded but alive. (-50% Qi)", "bad");
  }
}

// ─────────────────────────────────────────────
// DEATH SYSTEM
// ─────────────────────────────────────────────
function die(reason) {
  gameState.isDead = true;
  writeToLog(reason, "death");
  
  const realmDisplay = document.getElementById('realm-display');
  const subtitle = document.getElementById('realm-subtitle');
  if (realmDisplay) realmDisplay.innerText = "Deceased";
  if (subtitle) {
    subtitle.innerText = "";
    subtitle.style.color = "";
  }
  
  document.querySelectorAll('.action-btn').forEach(b => b.disabled = true);
  document.getElementById('rebirth-btn').style.display = 'flex';
  
  updateUI();
  saveGame();
}

// ─────────────────────────────────────────────
// UI UPDATES
// ─────────────────────────────────────────────
function updateUI() {
  // Realm display
  const realmDisplay = document.getElementById('realm-display');
  const subtitle = document.getElementById('realm-subtitle');
  const planeBadge = document.getElementById('plane-badge');
  
  if (!gameState.isDead && realmDisplay) {
    const realm = loreGetRealm(gameState.realmIndex);
    realmDisplay.innerText = realm.name;
    
    if (subtitle) {
      subtitle.innerText = `${gameState.realmStage} • ${realm.title}`;
      subtitle.style.color = realm.color;
    }
    
    // Plane badge
    if (planeBadge) {
      planeBadge.innerText = gameState.plane.toUpperCase();
      planeBadge.className = `plane-badge ${gameState.plane}`;
      planeBadge.style.display = 'block';
    }
  }
  
  // Resource displays
  const qiEl = document.getElementById('qi-count');
  const essenceEl = document.getElementById('essence-count');
  
  if (qiEl) {
    qiEl.innerText = `${Math.floor(gameState.qi)} / ${Math.floor(gameState.maxQi)}`;
    qiEl.style.display = gameState.plane === "mortal" ? 'block' : 'none';
  }
  if (essenceEl) {
    essenceEl.innerText = `${Math.floor(gameState.essence)} Essence`;
    essenceEl.style.display = gameState.plane === "immortal" ? 'block' : 'none';
  }
  
  // Qi bar
  const qiFill = document.getElementById('qi-fill');
  if (qiFill) {
    const current = gameState.plane === "immortal" ? gameState.essence : gameState.qi;
    const max = gameState.plane === "immortal" ? Math.ceil(gameState.maxQi / ESSENCE_CONVERSION_RATE) : gameState.maxQi;
    qiFill.style.width = `${Math.min(100, (current / max) * 100)}%`;
  }
  
  // Age bar
  const ageCount = document.getElementById('age-count');
  const ageFill = document.getElementById('age-fill');
  if (ageCount) ageCount.innerText = `${gameState.age} / ${gameState.maxAge}`;
  if (ageFill) {
    const percent = (gameState.age / gameState.maxAge) * 100;
    ageFill.style.width = `${percent}%`;
    ageFill.style.background = (gameState.maxAge - gameState.age <= 5) ? "var(--karma-red)" : "";
  }
  
  // Stage indicators
  updateStageIndicators();
  
  // Premium currency
  const jadeEl = document.getElementById('jade-count');
  if (jadeEl) jadeEl.innerText = gameState.jade;
  
  // Button states
  const breakthroughBtn = document.getElementById('breakthrough-btn');
  if (breakthroughBtn) {
    const isReady = gameState.qi >= gameState.maxQi && !gameState.isDead;
    const isGreatCircle = gameState.realmStage === "Great Circle";
    breakthroughBtn.disabled = !isReady;
    breakthroughBtn.classList.toggle('ready', isReady && isGreatCircle);
  }
  
  // Grotto button (Immortal only)
  const grottoBtn = document.getElementById('grotto-btn');
  if (grottoBtn) {
    grottoBtn.style.display = gameState.plane === "immortal" ? 'flex' : 'none';
  }
  
  // Update Inner Eye if open
  if (document.getElementById('side-menu')?.style.right === "0px") {
    loreRenderInnerEye(gameState.realmIndex, gameState.realmStage);
  }
}

function updateStageIndicators() {
  const container = document.getElementById('stage-indicators');
  if (!container) return;
  
  const stages = ["Early", "Mid", "Late", "Great Circle"];
  const currentIndex = stages.indexOf(gameState.realmStage);
  
  container.innerHTML = stages.map((stage, i) => 
    `<div class="stage-dot ${i <= currentIndex ? 'active' : ''}" title="${stage}"></div>`
  ).join('');
}

// ─────────────────────────────────────────────
// LOGGING SYSTEM
// ─────────────────────────────────────────────
function writeToLog(text, type = "") {
  const entry = document.createElement('div');
  entry.className = `log-entry ${type}`;
  
  let icon = "";
  if (type === "system") icon = '⚙️ ';
  if (type === "good") icon = '✨ ';
  if (type === "bad") icon = '⚠️ ';
  if (type === "death") icon = '💀 ';
  if (type === "system-minor") icon = '• ';
  
  entry.innerHTML = `<span class="age-tag">Y${gameState.age}</span>${icon}${text}`;
  
  const log = document.getElementById('log-container');
  if (log) {
    log.appendChild(entry);
    log.scrollTop = log.scrollHeight;
    
    // Limit log entries for performance
    while (log.children.length > 200) {
      log.removeChild(log.firstChild);
    }
  }
}

// ─────────────────────────────────────────────
// MODAL / MENU SYSTEM
// ─────────────────────────────────────────────
function toggleMenu() {
  const menu = document.getElementById('side-menu');
  const overlay = document.getElementById('menu-overlay');
  const open = menu?.style.right === "0px";
  
  if (menu) menu.style.right = open ? "-450px" : "0px";
  if (overlay) overlay.style.display = open ? "none" : "block";
  
  if (!open && menu) {
    // Render stat list
    const statsEl = document.getElementById('extra-stats');
    if (statsEl) {
      statsEl.innerHTML = `
        <li><span>Origin</span> ${gameState.lineage}</li>
        <li><span>Spirit Root</span> ${gameState.spiritRoot}</li>
        <li><span>Gold</span> ${gameState.gold}</li>
        <li><span>Combat</span> ${Math.floor(gameState.combatPower)}</li>
        ${gameState.plane === "immortal" ? `<li><span>Essence</span> ${Math.floor(gameState.essence)}</li>` : ''}
        ${gameState.daoFragments > 0 ? `<li><span>Dao Fragments</span> ${gameState.daoFragments}</li>` : ''}
        ${gameState.isSectLeader ? `<li><span>Sect</span> ${gameState.sect?.name}</li>` : ''}
      `;
      
      // Inject realm lore
      loreRenderInnerEye(gameState.realmIndex, gameState.realmStage);
    }
  }
}

function toggleHelp() {
  const modal = document.getElementById('help-modal');
  const overlay = document.getElementById('menu-overlay');
  const showing = modal?.style.display === 'block';
  
  if (modal) modal.style.display = showing ? 'none' : 'block';
  if (overlay) overlay.style.display = showing ? 'none' : 'block';
}

function closeAllModals() {
  const modals = ['help-modal', 'jade-store', 'heavenly-pass', 'side-menu'];
  modals.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      if (id === 'side-menu') el.style.right = '-450px';
      else el.style.display = 'none';
    }
  });
  const overlay = document.getElementById('menu-overlay');
  if (overlay) overlay.style.display = 'none';
}

// ─────────────────────────────────────────────
// UTILITY FUNCTIONS
// ─────────────────────────────────────────────
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Expose functions to global scope for HTML onclick handlers
window.meditate = meditate;
window.explore = explore;
window.breakthrough = breakthrough;
window.exploreDivineGrotto = exploreDivineGrotto;
window.toggleSectPanel = toggleSectPanel;
window.createAscendedSect = createAscendedSect;
window.recruitVassal = recruitVassal;
window.toggleJadeStore = toggleJadeStore;
window.purchaseCosmetic = purchaseCosmetic;
window.toggleHeavenlyPass = toggleHeavenlyPass;
window.claimPassReward = claimPassReward;
window.toggleManorPanel = toggleManorPanel;
window.purchaseManorUpgrade = purchaseManorUpgrade;
window.reincarnate = reincarnate;
window.toggleMenu = toggleMenu;
window.toggleHelp = toggleHelp;
window.closeAllModals = closeAllModals;