// ============================================================
// XIANXIA EVOLUTION — LORE SYSTEM v2.0
// 24 Realms • Dual Planes • Tribulation Lore
// ============================================================

// ─────────────────────────────────────────────
// REALM DEFINITIONS (24 Total: 12 Mortal + 12 Immortal)
// Each realm has: id, name, title (poetic subtitle), 
// plane ("mortal"|"immortal"), color, description
// ─────────────────────────────────────────────
const REALMS = [
  // ===== LOWER REALM (MORTAL) =====
  {
    id: 0,
    name: "Awaiting Birth",
    title: "The Void Before",
    plane: "mortal",
    color: "#888",
    description: "You have not yet drawn breath. You are neither alive nor dead — merely a thread of will suspended between one life and the next, waiting for Heaven to grant you form."
  },
  {
    id: 1,
    name: "Body Refining",
    title: "Tempering the Vessel",
    plane: "mortal",
    color: "#a89",
    description: "The lowest rung of cultivation. You strengthen flesh and bone through brutal discipline. Every scar is a lesson; every bruise, a step toward transcendence."
  },
  {
    id: 2,
    name: "Qi Condensation",
    title: "First Breath of the Dao",
    plane: "mortal",
    color: "#7ec8a0",
    description: "The world's energy answers you for the first time. A river of invisible force flows through your meridians, fragile as morning frost. Most mortals die having never felt this."
  },
  {
    id: 3,
    name: "Foundation Establishment",
    title: "Roots Beneath Stone",
    plane: "mortal",
    color: "#5fa8d3",
    description: "You have tempered your dantian into something that will not shatter easily. The Qi that once trembled now sits still as a mountain lake. Elders call this promising. Rivals call it threatening."
  },
  {
    id: 4,
    name: "Core Formation",
    title: "Heart of Still Water",
    plane: "mortal",
    color: "#a07fd4",
    description: "A golden core crystallises at the centre of your being — dense, luminous, humming with suppressed power. To reach this stage is to step outside the lifespan of ordinary men."
  },
  {
    id: 5,
    name: "Nascent Soul",
    title: "The Infant God",
    plane: "mortal",
    color: "#f0c040",
    description: "A second self is born within you — a nascent spirit, a god-seed. It watches through your eyes and does not entirely share your morals. Sects whisper prayers against cultivators at this stage."
  },
  {
    id: 6,
    name: "Soul Transformation",
    title: "Fire That Burns Inward",
    plane: "mortal",
    color: "#e05c5c",
    description: "You turn cultivation inward, burning away impurity in the soul itself. The process is agony. The old you does not survive it intact. What emerges is harder, stranger, and far more difficult to kill."
  },
  {
    id: 7,
    name: "Void Refinement",
    title: "Between Heaven and Ruin",
    plane: "mortal",
    color: "#e8e8ff",
    description: "You have partially stepped outside the laws of the mortal world. Space bends around your intent. Time hesitates at your presence. You are no longer entirely here — and that is precisely what makes you dangerous."
  },
  {
    id: 8,
    name: "Body Integration",
    title: "Flesh and Dao Unified",
    plane: "mortal",
    color: "#d4a8ff",
    description: "Your physical form and spiritual essence merge into a single, seamless vessel. Injury becomes optional. Death becomes a suggestion. You are becoming something the heavens must reckon with."
  },
  {
    id: 9,
    name: "Great Perfection",
    title: "Peak of Mortality",
    plane: "mortal",
    color: "#ffd4a8",
    description: "You have squeezed every drop of potential from the mortal coil. Your power is legendary; your name, feared. Yet a ceiling remains — invisible, absolute, and waiting to be shattered."
  },
  {
    id: 10,
    name: "Tribulation Transcendence",
    title: "Facing Heaven's Wrath",
    plane: "mortal",
    color: "#ff8888",
    description: "Heaven tests those who would leave mortality behind. Lightning, fire, heart demons — all converge to break you. Survive, and you earn the right to knock upon the gate of immortality."
  },
  {
    id: 11,
    name: "Mortal Ascension",
    title: "Threshold of Immortality",
    plane: "mortal",
    color: "#fff7a0",
    description: "You stand at the precipice. The Great Barrier looms — a wall of heavenly law separating mortal from immortal. To cross it requires not just power, but worthiness. The World-Crossing Tribulation awaits."
  },

  // ===== UPPER REALM (IMMORTAL) =====
  {
    id: 12,
    name: "False Immortal",
    title: "First Step Beyond Mortality",
    plane: "immortal",
    color: "#c8f0ff",
    description: "You have crossed the Barrier, but immortality is not yet yours. Your body is infused with Immortal Essence, yet you remain fragile. The Upper Realm is vast, ancient, and utterly indifferent to your arrival."
  },
  {
    id: 13,
    name: "True Immortal",
    title: "Essence Awakened",
    plane: "immortal",
    color: "#a8e0ff",
    description: "Your Immortal Essence stabilizes. You no longer age. You no longer fear mortal weapons. But the Dao is infinite — and you have only just begun to comprehend its depths."
  },
  {
    id: 14,
    name: "Heavenly Immortal",
    title: "Bound to the Celestial Dao",
    plane: "immortal",
    color: "#88d0ff",
    description: "Heaven acknowledges your existence. You may now walk among the clouds, command lesser spirits, and sense the flow of fate. Yet greater powers watch — and some do not welcome newcomers."
  },
  {
    id: 15,
    name: "Mystic Immortal",
    title: "Weaver of Mysteries",
    plane: "immortal",
    color: "#b8a8ff",
    description: "You grasp fragments of the Dao's hidden patterns. Spells bend to your will without incantation. Time slows in your presence. Sects send envoys; emperors seek audiences. You are becoming a force of nature."
  },
  {
    id: 16,
    name: "Golden Immortal",
    title: "Body of Eternal Light",
    plane: "immortal",
    color: "#ffd468",
    description: "Your form radiates golden luminescence — a sign that your essence has been tempered to near-perfection. Mortal eyes cannot bear to look upon you directly. You are legend made flesh."
  },
  {
    id: 17,
    name: "Zenith Gold Immortal",
    title: "Apex of Golden Dao",
    plane: "immortal",
    color: "#ffaa44",
    description: "You stand at the summit of the Golden Path. Your power rivals ancient sect founders. The heavens themselves hesitate to test you. Yet beyond this peak lies a realm few have ever glimpsed."
  },
  {
    id: 18,
    name: "Immortal Monarch",
    title: "Ruler of Sects",
    plane: "immortal",
    color: "#ff6868",
    description: "You command respect not through threat, but through presence. Sects bow; realms negotiate. Your word can start wars or end them. But with authority comes enemies — and the weight of consequence."
  },
  {
    id: 19,
    name: "Immortal Emperor",
    title: "Sovereign of Heavens",
    plane: "immortal",
    color: "#ff4488",
    description: "You have carved your name into the fabric of reality. Entire planes acknowledge your sovereignty. Yet the Dao is not a throne — it is a path, and even emperors must keep walking."
  },
  {
    id: 20,
    name: "Immortal Venerable",
    title: "Ancient Power Awakened",
    plane: "immortal",
    color: "#d444ff",
    description: "Centuries of cultivation have distilled your essence into something primordial. You remember epochs others have forgotten. The past speaks through you; the future bends to your will."
  },
  {
    id: 21,
    name: "Dao Ancestor",
    title: "One with the Primordial Dao",
    plane: "immortal",
    color: "#aa44ff",
    description: "You no longer follow the Dao — you are its voice. Creation and destruction flow through you as naturally as breath. To oppose you is to oppose existence itself."
  },
  {
    id: 22,
    name: "God-King",
    title: "Divine Authority Manifest",
    plane: "immortal",
    color: "#8844ff",
    description: "You have transcended even the concept of immortality. You are worshipped not as a cultivator, but as a deity. Your thoughts shape reality; your will defines law."
  },
  {
    id: 23,
    name: "Eternal Sovereign",
    title: "Beyond Time and Fate",
    plane: "immortal",
    color: "#ffffff",
    description: "The final horizon. You exist outside the cycles of birth and death, cause and effect. Whether this is enlightenment or solitude — that is a question only eternity can answer."
  }
];

// ─────────────────────────────────────────────
// STAGE DEFINITIONS (applies to all realms)
// ─────────────────────────────────────────────
const STAGES = ["Early", "Mid", "Late", "Great Circle"];

// ─────────────────────────────────────────────
// CULTIVATE (MEDITATE) FLAVOUR LINES
// ─────────────────────────────────────────────
const CULTIVATE_LINES = [
  "You sink into stillness. The Qi of heaven and earth flows through you like a river finding its old course.",
  "Hours pass like seconds. When you surface, your dantian is fuller, and the ache in your bones is a little less familiar.",
  "The world outside falls silent. Inside, something ancient and patient begins to stir.",
  "You breathe in. The air tastes of iron and possibility. You breathe out. Dust and doubt leave with it.",
  "Your meridians burn with the effort of refinement. This is what cultivation is — not grace, but endurance.",
  "A single leaf falls outside. By the time it touches the ground, you have drawn one more thread of Qi into yourself.",
  "The technique your master once called 'crude' serves you faithfully. Perhaps one day you will find a better one. Today is not that day.",
  "Silence is a discipline. You are learning it slowly.",
  "The Qi resists. You persist. That is the entirety of the Dao, made small enough to hold in a breath.",
  "Somewhere far above, Heaven watches cultivators the way a river watches stones — without pity, without malice, simply waiting to see what endures.",
  "You feel the edges of your dantian expand, just slightly. Each session is a fraction. Fractions become realms.",
  "The meditation brings no visions, no epiphanies — just the quiet accumulation of power that will one day mean the difference between life and death.",
  "A cold clarity settles over your thoughts. You are not meditating to find peace. You are meditating to survive.",
  "The world does not care that you cultivate. But it will care what you become.",
  "Pain is data. You process it and return to the breath.",
  // Upper Realm variants
  "Immortal Essence swirls around you like mist. You draw it inward, and your very cells hum with celestial power.",
  "The Dao whispers secrets only the awakened can hear. You listen — and learn.",
  "Time loses meaning in deep meditation. When you return, centuries may have passed. Or moments. It no longer matters."
];

// ─────────────────────────────────────────────
// EXPLORE EVENT POOL (expanded for Upper Realm)
// ─────────────────────────────────────────────
const EXPLORE_EVENTS = [
  // ── Spirit Stone / Essence finds ──
  { tag: "good", plane: "mortal", msg: "Wedged between two roots, half-buried and humming faintly — a Spirit Stone. Someone lost it. Their loss." },
  { tag: "good", plane: "mortal", msg: "The ruins of a collapsed sect litter the hillside. Most of it is rubble and bones. One of the bones is clutching a Spirit Stone." },
  { tag: "good", plane: "mortal", msg: "A merchant's cart has overturned on the mountain path. The merchant is gone. The Spirit Stones are not." },
  { tag: "good", plane: "immortal", msg: "A fragment of a shattered Immortal Artifact glows softly in the grass. It pulses with residual Essence — a gift from a fallen elder." },
  { tag: "good", plane: "immortal", msg: "You discover a pool of condensed Immortal Essence, untouched for millennia. One sip revitalizes your entire being." },
  
  // ── Divine Grotto discoveries ──
  { tag: "good", plane: "immortal", msg: "A hidden entrance shimmers into view — a Divine Grotto! Within, the air thrums with primordial Dao energy." },
  
  // ── Encounters ──
  { tag: "combat", plane: "mortal", msg: "A robed figure steps onto the path and levels a blade at you. 'Your resources or your life.' You choose a third option." },
  { tag: "combat", plane: "mortal", msg: "You enter a clearing and find another cultivator already there, meditating. They open one eye. It does not go well for one of you." },
  { tag: "combat", plane: "immortal", msg: "An Immortal from a rival sect challenges your right to traverse this realm. Their aura alone could crush a mortal. You stand your ground." },
  { tag: "bad", plane: "mortal", msg: "You encounter a cultivator of greater power. They look at you the way a storm looks at a candle. You retreat. Wisely." },
  { tag: "bad", plane: "immortal", msg: "A Heavenly Immortal's gaze falls upon you. You feel your very soul being weighed. You bow deeply and withdraw — survival is its own victory." },

  // ── Lore / neutral discoveries ──
  { tag: "neutral", plane: "mortal", msg: "You find a stone stele half-swallowed by the earth. The inscription reads: 'Those who sought heaven found only its ceiling.' The author's name has been worn away." },
  { tag: "neutral", plane: "immortal", msg: "An ancient formation, still active, hums with forgotten knowledge. You cannot decipher it — not yet — but you memorize its pattern." },
  { tag: "neutral", plane: "mortal", msg: "An old hermit watches you pass from the shadow of a cave. He does not speak. His cultivation is beyond your ability to gauge. You walk faster." },
  { tag: "neutral", plane: "immortal", msg: "The ruins of a fallen Immortal Sect stretch before you. Statues of forgotten heroes gaze eternally skyward. You feel their silent judgment." },
  { tag: "neutral", plane: "mortal", msg: "You pass the graves of three cultivators. No names. No dates. Just stones, and the grass that has already half-forgiven the ground for covering them." },
  { tag: "neutral", plane: "immortal", msg: "A spirit beast watches you from the clouds — massive, ancient, utterly disinterested. It turns and disappears into the mist. You exhale." },
  
  // ── Bad luck ──
  { tag: "bad", plane: "mortal", msg: "A formation trap, old and half-decayed, triggers beneath your foot. It drains a thread of Qi before sputtering out. Whoever set it has been dead for centuries." },
  { tag: "bad", plane: "immortal", msg: "A fragment of heavenly law lashes out — a remnant of an ancient tribulation. Your Immortal Essence flickers. You stabilize it, but the warning is clear: tread carefully." },
];

// ─────────────────────────────────────────────
// BREAKTHROUGH MESSAGES
// ─────────────────────────────────────────────
const BREAKTHROUGH_SUCCESS = [
  (realm) => `The dam breaks. Qi floods every meridian at once and you scream without sound. When it ends, you stand in the ${realm}. The world looks different from here.`,
  (realm) => `Heaven relents. A crack runs through the ceiling of your old self and light pours through. You have entered the ${realm}. You will not be returning to who you were.`,
  (realm) => `Something inside you that was always too small finally grows to fit. ${realm} — a name you will carry until you outgrow it too.`,
  (realm) => `The breakthrough is neither graceful nor painless. But it is successful. You rise, blood on your lips and a new fire in your dantian. ${realm}. It suits you.`,
  (realm, stage) => `With the ${stage} stage stabilized, your power consolidates. ${realm} is no longer a destination — it is your new beginning.`
];

const BREAKTHROUGH_FAILURE = [
  "The Qi backlashes. Your meridians contract violently and you are thrown backward into your own skin, smaller than before. The realm holds its door shut.",
  "You push against the barrier with everything you have. The barrier does not care. It was here before you were born and will be here after. Today is not your day.",
  "A hairline fracture runs through your dantian. You feel it like a crack in cold glass. You pull back before it shatters. Humiliating. Necessary. Try again when the wound closes.",
  "The heavens test you and find you wanting. Not permanently — but for now, the door to the next realm is sealed against you. Cultivation is patience wearing the mask of ambition.",
  "Your foundation holds, but only just. The breakthrough attempt has left you shaken and your Qi reserves depleted. Retreat. Recover. Heaven is not merciful to those who rush."
];

// ─────────────────────────────────────────────
// WORLD-CROSSING TRIBULATION LORE
// ─────────────────────────────────────────────
const TRIBULATION_LINES = {
  start: [
    "⚡ THE HEAVENS ROAR! Clouds churn with violet lightning. The Great Barrier trembles. Your World-Crossing Tribulation has begun.",
    "The sky splits open. Nine bolts of heavenly lightning gather above you. This is not a test of power — it is a test of worthiness.",
    "Heaven itself has taken notice. The path to immortality demands a price: survive the Nine-Fold Lightning, or be erased from the Dao."
  ],
  wave: [
    (n) => `⚡ Wave ${n}: Lightning strikes! You endure with scars.`,
    (n) => `✨ Wave ${n}: You deflect the heavenly lightning with practiced grace!`,
    (n) => `⚡ Wave ${n}: The thunder shakes your bones, but your will does not break.`
  ],
  heartDemon: [
    "🌀 The Heart Demon emerges... It wears your face, speaks with your voice, and whispers your deepest regrets.",
    "A vision of the path not taken materializes before you. To advance, you must accept what was — and release what could have been.",
    "Your past failures rise like specters. Confront them, or be consumed by them."
  ],
  success: [
    "🌟 The lightning fades. The heavens part. A pillar of golden light descends — you have been acknowledged. Welcome, Immortal.",
    "The Great Barrier shatters like glass. Immortal Essence floods your meridians. You have transcended mortality.",
    "Heaven bows. The Upper Realm opens before you. Your name will echo through eternity."
  ],
  failure: [
    "💔 The tribulation overwhelms you. Your foundation cracks. Cultivation regression is inevitable.",
    "Heaven's judgment is final. You fall, not in death, but in setback. The path to immortality remains — but it is longer now.",
    "The lightning recedes. You survive, but the dream of ascension retreats. Gather your strength. Try again when you are worthy."
  ]
};

// ─────────────────────────────────────────────
// DEATH / REINCARNATION MESSAGES
// ─────────────────────────────────────────────
const DEATH_LINES = [
  "Time runs out. Your body fails quietly, without ceremony — a candle at the end of its wick. But the soul does not end. It turns, and begins again.",
  "The Great Cycle completes. You had a name, a realm, a small fire of power. All of it dissolves into the river of rebirth. In the current, there is no grief — only momentum.",
  "You die as most cultivators do: not in glorious battle, but simply out of time. The path was real. The footsteps remain. Another version of you will find them.",
  "Heaven reclaims what it lent you. The Qi disperses. The body stills. But somewhere in the vast dark between lives, a thread of will refuses to unravel entirely. It remembers.",
  "The hourglass empties. You have lived one life in the pursuit of something most mortals never even name. That is not nothing. It is, in fact, everything. Begin again.",
  "Death arrives not as an enemy but as a formality — the universe closing a tab. You have already left the table. The next life is already sitting down."
];

// ─────────────────────────────────────────────
// ASCEND (PRE-ATTEMPT) FLAVOUR
// ─────────────────────────────────────────────
const ASCEND_ATTEMPT_LINES = [
  "You gather every thread of Qi in your dantian, pull it inward, and push — against the barrier, against yourself, against the ceiling Heaven built to keep mortals small.",
  "This is the moment every cultivator fears and craves in equal measure. You close your eyes. You push.",
  "The technique requires absolute will. You supply it, teeth clenched, veins burning, the world narrowing to a single point of intent.",
  "You have prepared for this. You have cultivated, suffered, and endured. Now comes the reckoning.",
  "The barrier between realms is not stone or steel — it is the resistance of the Dao itself, testing whether you deserve to stand one step higher. You answer."
];

// ─────────────────────────────────────────────
// HELPER UTILITIES
// ─────────────────────────────────────────────

/** Pick a random item from an array */
function loreRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/** Cycle index tracker so cultivate lines don't repeat too soon */
let _cultivateIndex = Math.floor(Math.random() * CULTIVATE_LINES.length);
function nextCultivateLine() {
  const line = CULTIVATE_LINES[_cultivateIndex];
  _cultivateIndex = (_cultivateIndex + 1) % CULTIVATE_LINES.length;
  return line;
}

/** Get realm data by name or index */
function getRealmData(nameOrIndex) {
  if (typeof nameOrIndex === "number")
    return REALMS[nameOrIndex] || REALMS[0];
  return REALMS.find((r) => r.name === nameOrIndex) || REALMS[0];
}

/** Get stage description */
function getStageDescription(stage) {
  const descriptions = {
    "Early": "Your power is fresh, untested. The realm's secrets remain partially veiled.",
    "Mid": "You have grown accustomed to this realm's rhythms. Your foundation stabilizes.",
    "Late": "Mastery approaches. You sense the next horizon, though the path remains unclear.",
    "Great Circle": "You have extracted all this realm can offer. The threshold to ascension trembles before you."
  };
  return descriptions[stage] || descriptions["Early"];
}

// ─────────────────────────────────────────────
// PUBLIC API
// ─────────────────────────────────────────────

function loreCultivate() { return nextCultivateLine(); }

function loreExplore(plane = "mortal") {
  // Filter events by plane, fallback to any if none match
  const filtered = EXPLORE_EVENTS.filter(e => e.plane === plane || !e.plane);
  return loreRandom(filtered.length ? filtered : EXPLORE_EVENTS);
}

function loreAscendAttempt() { return loreRandom(ASCEND_ATTEMPT_LINES); }

function loreBreakthroughSuccess(newRealmName, stage) {
  const fn = loreRandom(BREAKTHROUGH_SUCCESS);
  return fn(newRealmName, stage);
}

function loreBreakthroughFailure() { return loreRandom(BREAKTHROUGH_FAILURE); }

function loreDeath() { return loreRandom(DEATH_LINES); }

function loreGetRealm(nameOrIndex) { return getRealmData(nameOrIndex); }

function loreGetStage(stage) { return getStageDescription(stage); }

function loreTribulation(type, param) {
  const lines = TRIBULATION_LINES[type] || [];
  const fn = loreRandom(lines);
  return typeof fn === 'function' ? fn(param) : fn;
}

function loreRenderInnerEye(realmIndex, stage) {
  const realm = getRealmData(realmIndex);
  const list = document.getElementById("extra-stats");
  if (!list) return;

  const existing = list.querySelector(".lore-realm-block");
  if (existing) existing.remove();

  const block = document.createElement("li");
  block.className = "lore-realm-block";
  block.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
      <span class="lore-realm-title">✦ ${realm.title} ✦</span>
      <span style="font-size:0.6rem;color:${realm.color};text-transform:uppercase;letter-spacing:1px;">${stage || 'Early'}</span>
    </div>
    <div class="lore-realm-desc">${realm.description}</div>
    <div style="margin-top:10px;font-size:0.7rem;color:#555;font-style:normal;">
      ${getStageDescription(stage || 'Early')}
    </div>
  `;
  list.prepend(block);
}