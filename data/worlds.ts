// Deployment trigger
// 9 preset worlds + custom worlds handled by backend

export interface Attribute {
  key: string
  name: string
  icon: string
  description: string
}

export interface AcquiredAttributeTier {
  min: number
  label: string
}

export interface AcquiredAttribute {
  key: string
  name: string
  icon: string
  description: string
  initialValue: number
  tiers: AcquiredAttributeTier[]
}

export interface World {
  id: string
  name: string
  description: string
  theme: string
  themeColor: string
  icon: string
  tagline: string
  era: string
  maxAge: number
  eventStyle: string
  specialEndings: string[]
  attributes: Attribute[]
  acquiredAttributes: AcquiredAttribute[]
  locked: boolean
  unlockMethod: string
  aiGenerated: boolean
  imageIcon?: string
}

export const worlds: World[] = [
  {
    id: "modern",
    name: "Modern City",
    description: "An ordinary life in the 21st century. School, career, love, mortgage — this crappy life, can't stand it for another second.",
    theme: "modern",
    themeColor: "#4a6fa5",
    icon: "🏙️",
    imageIcon: "/images/worlds/现代都市.png",
    tagline: "This crappy life, can't stand another second",
    era: "Contemporary China",
    maxAge: 90,
    eventStyle: "Realistic tone, focusing on education, employment, romance, family, career achievements, retirement. May touch on social hot topics (housing prices, entrepreneurship, AI wave), with social satire and self-deprecating humor. ⚠️ Characters with Physique 3+ should not die from health causes before age 55 (violation = narrative failure); midlife (35-55) focuses on career and family development, avoid repeated cancer/serious illness/ICU plots; illness stories max 1 main storyline per lifetime. When character's career or social influence reaches a high level, naturally consider triggering transcendent endings.",
    specialEndings: ["Academic Peak", "Business Empire", "Space Migration", "Digital Immortality", "Retire in Glory", "Legacy Through Writing"],
    attributes: [
      { key: "looks", name: "Looks", icon: "✨", description: "Physical appearance, affects social and romantic interactions" },
      { key: "intelligence", name: "Intelligence", icon: "🧠", description: "Learning ability and cognitive level" },
      { key: "constitution", name: "Physique", icon: "💪", description: "Physical fitness, affects health and lifespan" },
      { key: "wealth", name: "Family Wealth", icon: "💰", description: "Family economic conditions and social resources" },
    ],
    acquiredAttributes: [
      {
        key: "money", name: "Money", icon: "💰", description: "Personal net worth, starting from scratch",
        initialValue: 0,
        tiers: [
          { min: 0, label: "Penniless" }, { min: 1, label: "Living Paycheck to Paycheck" },
          { min: 4, label: "Comfortable" }, { min: 7, label: "Middle Class" },
          { min: 10, label: "Wealthy" }, { min: 14, label: "Millionaire" },
          { min: 18, label: "Financially Free" },
        ],
      },
      {
        key: "career", name: "Career", icon: "📈", description: "Career achievements, promotions, entrepreneurship, industry influence",
        initialValue: 0,
        tiers: [
          { min: 0, label: "Unemployed" }, { min: 1, label: "Employee" },
          { min: 4, label: "Key Member" }, { min: 7, label: "Manager" },
          { min: 10, label: "Executive" }, { min: 14, label: "Industry Leader" },
          { min: 18, label: "Legendary Figure" },
        ],
      },
      {
        key: "social", name: "Network", icon: "👥", description: "Breadth and quality of social connections",
        initialValue: 0,
        tiers: [
          { min: 0, label: "Lone Wolf" }, { min: 1, label: "A Few Acquaintances" },
          { min: 4, label: "Many Friends" }, { min: 7, label: "Well Connected" },
          { min: 10, label: "Well-Rounded" }, { min: 14, label: "Influential" },
          { min: 18, label: "Omnipotent Connections" },
        ],
      },
    ],
    locked: false, unlockMethod: "free", aiGenerated: false,
  },
  {
    id: "xianxia",
    name: "Nine Provinces Immortal Realm",
    description: "Eastern xianxia cultivation world: a realm brimming with spiritual energy. From mortal to ascension — Qi Refining, Foundation Establishment, Golden Core, Nascent Soul — survive the heavenly tribulation and ascend to immortality.",
    theme: "xianxia",
    themeColor: "#b8862e",
    icon: "⚔️",
    imageIcon: "/images/worlds/九州仙域.png",
    tagline: "Qi refining, foundations building, tribulation passing, ascending to immortality",
    era: "Primordial Immortal Realm",
    maxAge: 130,
    eventStyle: "Xianxia novel style, involving cultivation realm breakthroughs, sect conflicts, secret realm exploration, alchemy and artifact crafting, heart demon tribulations. Narrated from \"you\" perspective. Terms like spiritual energy, golden core, nascent soul should be naturally integrated.",
    specialEndings: ["Ascend to Immortal Realm", "Feather into Immortality", "Great Power Reincarnation", "Found a Sect", "Become the Dao of Heaven"],
    attributes: [
      { key: "root", name: "Spirit Root", icon: "🦴", description: "Spiritual root quality, foundation of cultivation speed" },
      { key: "comprehension", name: "Comprehension", icon: "👁️", description: "Ability to understand dao techniques and break through realms" },
      { key: "luck", name: "Fortune", icon: "🍀", description: "Luck for opportunities and encounters" },
      { key: "sect", name: "Sect Foundation", icon: "🏛️", description: "Strength and resources of your cultivation sect" },
    ],
    acquiredAttributes: [
      {
        key: "cultivation", name: "Cultivation", icon: "⚡", description: "Cultivation realm, from Qi Refining to Tribulation Transcendence",
        initialValue: 0,
        tiers: [
          { min: 0, label: "Mortal" }, { min: 1, label: "Qi Refining" },
          { min: 4, label: "Foundation Establishment" }, { min: 7, label: "Golden Core" },
          { min: 10, label: "Nascent Soul" }, { min: 14, label: "Divine Transformation" },
          { min: 18, label: "Great Vehicle" },
        ],
      },
      {
        key: "spiritStones", name: "Spirit Stones", icon: "💎", description: "Currency and cultivation resources of the immortal realm",
        initialValue: 0,
        tiers: [
          { min: 0, label: "Broke" }, { min: 1, label: "Barely Getting By" },
          { min: 4, label: "Some Savings" }, { min: 7, label: "Well Off" },
          { min: 10, label: "Local Tycoon" }, { min: 14, label: "Sect Treasury" },
          { min: 18, label: "Richer Than the Sect" },
        ],
      },
      {
        key: "karma", name: "Karma", icon: "☯️", description: "Karma and destiny, affects tribulation difficulty",
        initialValue: 0,
        tiers: [
          { min: 0, label: "Karma Clear" }, { min: 1, label: "Slightly Entangled" },
          { min: 4, label: "Deep in Karma" }, { min: 7, label: "Heavy Karma" },
          { min: 10, label: "Heaven's Favorite" }, { min: 14, label: "Child of Fortune" },
          { min: 18, label: "Heaven's Avatar" },
        ],
      },
    ],
    locked: false, unlockMethod: "free", aiGenerated: false,
  },
  {
    id: "isekai",
    name: "Ink Sea Floating Life",
    description: "Transmigrated into a novel: you wake up as a cannon fodder character in a book you once read. You know the plot twists and death flags — this time, rewrite your fate.",
    theme: "isekai",
    themeColor: "#6b5b8a",
    icon: "📖",
    imageIcon: "/images/worlds/墨海浮生.png",
    tagline: "Cannon fodder awakens, defying fate to rewrite destiny",
    era: "Alternate Fantasy World",
    maxAge: 80,
    eventStyle: "Transmigration/rebirth style, with self-awareness and plot knowledge. The character knows the original story's direction and must balance between known plot and butterfly effects. Narrated from \"you\" perspective. May include comedic commentary, system elements, plot deviations.",
    specialEndings: ["Return to Reality", "Become the New Protagonist", "Corrupted Boss", "Settle in Parallel World", "Reconcile with the Original Story"],
    attributes: [
      { key: "prophecy", name: "Foresight", icon: "🔮", description: "Knowledge of the original plot" },
      { key: "charm", name: "Charm", icon: "✨", description: "The character's attractiveness" },
      { key: "survival", name: "Survival", icon: "🛡️", description: "Ability to survive crises" },
      { key: "influence", name: "Influence", icon: "🌟", description: "Ability to change the plot direction" },
    ],
    acquiredAttributes: [
      {
        key: "wealth", name: "Assets", icon: "💰", description: "Wealth accumulated in the other world",
        initialValue: 0,
        tiers: [
          { min: 0, label: "Penniless" }, { min: 1, label: "A Few Coins" },
          { min: 4, label: "Some Wealth" }, { min: 7, label: "Rich" },
          { min: 10, label: "Kingdom's Wealth" }, { min: 14, label: "World's Richest" },
          { min: 18, label: "Eternal Fortune" },
        ],
      },
      {
        key: "allies", name: "Influence", icon: "⚔️", description: "Your support network and faction power",
        initialValue: 0,
        tiers: [
          { min: 0, label: "Alone" }, { min: 1, label: "A Few Friends" },
          { min: 4, label: "Some Reputation" }, { min: 7, label: "Considerable Power" },
          { min: 10, label: "Regional Power" }, { min: 14, label: "Court Minister" },
          { min: 18, label: "Ruler of All" },
        ],
      },
      {
        key: "rewrite", name: "Rewrite Rate", icon: "📝", description: "Degree of deviation from original plot",
        initialValue: 0,
        tiers: [
          { min: 0, label: "Following the Script" }, { min: 1, label: "Minor Adjustments" },
          { min: 4, label: "Side Quest Deviation" }, { min: 7, label: "Plot Branching" },
          { min: 10, label: "Main Story Rebuild" }, { min: 14, label: "World Reshaping" },
          { min: 18, label: "Author Would Be Confused" },
        ],
      },
    ],
    locked: false, unlockMethod: "free", aiGenerated: false,
  },
  {
    id: "palace",
    name: "Crimson Palace",
    description: "Ancient palace intrigue world: red walls, yellow tiles, deep bell tolls. Enter the palace through selection, scheme every step — in this game of chess, are you a piece or the player?",
    theme: "palace",
    themeColor: "#b24a6f",
    icon: "👑",
    imageIcon: "/images/worlds/朱门深宫.png",
    tagline: "Beyond the red walls, who rises and who falls",
    era: "Alternate Ancient Dynasty",
    maxAge: 70,
    eventStyle: "Classic palace intrigue style, involving selection and ennoblement, harem rivalry, court politics, family rise and fall. Narrated from \"you\" perspective, emphasizing psychological description and strategic gameplay.",
    specialEndings: ["Rule Behind the Curtain", "Marry into Peace Alliance", "Virtuous Empress", "Phoenix Over the Realm"],
    attributes: [
      { key: "beauty", name: "Beauty", icon: "🌸", description: "Outer appearance and bearing" },
      { key: "scheme", name: "Cunning", icon: "🧩", description: "Scheming and depth" },
      { key: "favor", name: "Imperial Favor", icon: "💎", description: "Emperor's grace and trust" },
      { key: "family", name: "Family Standing", icon: "🏯", description: "Maternal family power and background" },
    ],
    acquiredAttributes: [
      {
        key: "rank", name: "Rank", icon: "👑", description: "Harem rank and status",
        initialValue: 0,
        tiers: [
          { min: 0, label: "Commoner" }, { min: 1, label: "Promise" },
          { min: 4, label: "Noble Lady" }, { min: 7, label: "Consort" },
          { min: 10, label: "Imperial Consort" }, { min: 14, label: "Noble Consort" },
          { min: 18, label: "Empress" },
        ],
      },
      {
        key: "treasure", name: "Private Funds", icon: "💰", description: "Personal wealth and savings",
        initialValue: 0,
        tiers: [
          { min: 0, label: "Destitute" }, { min: 1, label: "Living on Tips" },
          { min: 4, label: "Some Savings" }, { min: 7, label: "Well Off" },
          { min: 10, label: "Loaded" }, { min: 14, label: "Harem's Richest" },
          { min: 18, label: "The Treasury is Mine" },
        ],
      },
      {
        key: "clique", name: "Faction", icon: "👥", description: "Loyalists and alliance strength",
        initialValue: 0,
        tiers: [
          { min: 0, label: "Lone Wolf" }, { min: 1, label: "One or Two Loyalists" },
          { min: 4, label: "Some Influence" }, { min: 7, label: "Growing Wings" },
          { min: 10, label: "Harem Powerhouse" }, { min: 14, label: "Court Faction" },
          { min: 18, label: "Controls the Six Palaces" },
        ],
      },
    ],
    locked: false, unlockMethod: "free", aiGenerated: false,
  },
  {
    id: "magic",
    name: "Arcane Continent",
    description: "A world filled with arcane arts and mystery. Magic academies, elemental forces, ancient ruins — you are a sorcerer.",
    theme: "magic",
    themeColor: "#4a7fb5",
    icon: "🪄",
    imageIcon: "/images/worlds/奥术大陆.png",
    tagline: "Arcane above all, power is king",
    era: "Age of Magic",
    maxAge: 120,
    eventStyle: "Western fantasy magic style, involving magic study, spell battles, academy life, secret realm exploration, racial conflicts. Narrated from \"you\" perspective, filled with magical descriptions and fantastical colors.",
    specialEndings: ["Dragon Knight", "Elemental Unity", "Archsage", "Plane Walker"],
    attributes: [
      { key: "magic", name: "Magic Power", icon: "✨", description: "Innate magical talent" },
      { key: "wisdom", name: "Wisdom", icon: "🧠", description: "Ability to understand and learn magic" },
      { key: "physique", name: "Physique", icon: "💪", description: "Physical fitness and magical capacity" },
      { key: "bloodline", name: "Bloodline", icon: "🔮", description: "Purity of magical bloodline" },
    ],
    acquiredAttributes: [
      {
        key: "spellRank", name: "Spells", icon: "⚡", description: "Mastered magic level",
        initialValue: 0,
        tiers: [
          { min: 0, label: "Magic Apprentice" }, { min: 1, label: "Junior Mage" },
          { min: 4, label: "Intermediate Mage" }, { min: 7, label: "Senior Mage" },
          { min: 10, label: "Archmage" }, { min: 14, label: "Archmagus" },
          { min: 18, label: "God of Magic" },
        ],
      },
      {
        key: "gold", name: "Gold Coins", icon: "💰", description: "Universal currency",
        initialValue: 0,
        tiers: [
          { min: 0, label: "Broke" }, { min: 1, label: "Barely Getting By" },
          { min: 4, label: "Comfortable" }, { min: 7, label: "Wealthy" },
          { min: 10, label: "Rich" }, { min: 14, label: "Continent's Richest" },
          { min: 18, label: "Tower Full of Gold" },
        ],
      },
      {
        key: "prestige", name: "Prestige", icon: "🌟", description: "Fame in the magic world",
        initialValue: 0,
        tiers: [
          { min: 0, label: "Unknown" }, { min: 1, label: "Emerging" },
          { min: 4, label: "Somewhat Known" }, { min: 7, label: "Well Known" },
          { min: 10, label: "Famous Far and Wide" }, { min: 14, label: "Continental Legend" },
          { min: 18, label: "Legendary Icon" },
        ],
      },
    ],
    locked: false, unlockMethod: "free", aiGenerated: false,
  },
  {
    id: "medieval",
    name: "Epoch of Iron and Fire",
    description: "A smoke-filled medieval world of swords and shields, iron and blood — conquer or be destroyed, that is the question.",
    theme: "medieval",
    themeColor: "#8b4513",
    icon: "⚔️",
    imageIcon: "/images/worlds/铁与火的纪元.png",
    tagline: "Smoke fills the air, swords point in all directions",
    era: "Middle Ages",
    maxAge: 65,
    eventStyle: "Medieval war epic style, focusing on military campaigns, political marriages, castle sieges, chivalry, plagues/famines, religious conflicts. Narrated from \"you\" perspective, direct and powerful storytelling.",
    specialEndings: ["Crusader Hero", "Legendary King", "Hermit Farmer", "Temple Guardian", "Overseas Kingdom"],
    attributes: [
      { key: "combat", name: "Combat", icon: "⚔️", description: "Personal combat ability" },
      { key: "strategy", name: "Strategy", icon: "🧠", description: "Strategic wisdom and leadership" },
      { key: "charisma", name: "Charisma", icon: "👑", description: "Command ability and personal prestige" },
      { key: "domain", name: "Domain", icon: "🏰", description: "Territory and resources under rule" },
    ],
    acquiredAttributes: [
      {
        key: "military", name: "Military", icon: "🪖", description: "Army size under your command",
        initialValue: 0,
        tiers: [
          { min: 0, label: "General Without an Army" }, { min: 1, label: "Scattered Troops" },
          { min: 4, label: "Century" }, { min: 7, label: "Thousand-Man Army" },
          { min: 10, label: "Ten-Thousand Legion" }, { min: 14, label: "Allied Lords" },
          { min: 18, label: "Million Man Army" },
        ],
      },
      {
        key: "gold", name: "Gold", icon: "💰", description: "Military and domain wealth",
        initialValue: 0,
        tiers: [
          { min: 0, label: "Destitute" }, { min: 1, label: "Barely Eating" },
          { min: 4, label: "Some Supplies" }, { min: 7, label: "Well Stocked" },
          { min: 10, label: "Full Treasury" }, { min: 14, label: "Rival King's Wealth" },
          { min: 18, label: "Mountains of Gold" },
        ],
      },
      {
        key: "authority", name: "Authority", icon: "👑", description: "Prestige and control over your realm",
        initialValue: 0,
        tiers: [
          { min: 0, label: "Nobody" }, { min: 1, label: "Local Lord" },
          { min: 4, label: "Respected Ruler" }, { min: 7, label: "Powerful Monarch" },
          { min: 10, label: "High King" }, { min: 14, label: "Emperor" },
          { min: 18, label: "Legendary Sovereign" },
        ],
      },
    ],
    locked: false, unlockMethod: "free", aiGenerated: false,
  },
  {
    id: "cyberpunk",
    name: "Night City 2099",
    description: "Neon lights, chrome implants, corporate wars. In this cyberpunk future, everyone is chasing the legend — one more upgrade, one more deal, one more chance.",
    theme: "cyberpunk",
    themeColor: "#ff0066",
    icon: "🌃",
    imageIcon: "/images/worlds/夜之城2099.png",
    tagline: "Glitches and ghosts in the neon-lit metropolis",
    era: "2099 Cyber Future",
    maxAge: 75,
    eventStyle: "Cyberpunk style, with corporate espionage, black-market deals, cybernetic enhancements, digital consciousness, street rebellion, and high-tech low-life scenarios. Dark humor and dystopian themes.",
    specialEndings: ["Corporate Legend", "Street King", "Digital Ghost", "Rebel Leader", "Beyond the Blackwall"],
    attributes: [
      { key: "tech", name: "Tech Affinity", icon: "💻", description: "Technical skill and hacking ability" },
      { key: "reflexes", name: "Reflexes", icon: "⚡", description: "Combat reflexes and reaction speed" },
      { key: "streetCredit", name: "Street Cred", icon: "⭐", description: "Reputation on the street" },
      { key: "cyberware", name: "Cyberware", icon: "🔧", description: "Cybernetic enhancement level" },
    ],
    acquiredAttributes: [
      {
        key: "eddies", name: "Eddies", icon: "💰", description: "Cash in Night City",
        initialValue: 0,
        tiers: [
          { min: 0, label: "Broke" }, { min: 1, label: "Street Rat" },
          { min: 4, label: "Getting By" }, { min: 7, label: "Well Off" },
          { min: 10, label: "Corporate Level" }, { min: 14, label: "Fixer Status" },
          { min: 18, label: "Legend Riche" },
        ],
      },
      {
        key: "influence", name: "Influence", icon: "⚡", description: "Power and reach in Night City",
        initialValue: 0,
        tiers: [
          { min: 0, label: "Nobody" }, { min: 1, label: "Known Face" },
          { min: 4, label: "Respected Player" }, { min: 7, label: "City Influencer" },
          { min: 10, label: "District Boss" }, { min: 14, label: "Corporate Power" },
          { min: 18, label: "Night City Legend" },
        ],
      },
      {
        key: "chrome", name: "Chrome", icon: "⚙️", description: "Quality of installed cyberware",
        initialValue: 0,
        tiers: [
          { min: 0, label: "All Natural" }, { min: 1, label: "Street Chrome" },
          { min: 4, label: "Quality Implants" }, { min: 7, label: "Military Grade" },
          { min: 10, label: "Prototype Tech" }, { min: 14, label: "Experimental" },
          { min: 18, label: "Beyond Human" },
        ],
      },
    ],
    locked: false, unlockMethod: "free", aiGenerated: false,
  },
  {
    id: "space",
    name: "Stellar Era",
    description: "The age of interstellar colonization. Humanity has spread across the galaxy, but the frontier is vast and unforgiving. Trade, explore, and build your legacy among the stars.",
    theme: "space",
    themeColor: "#1a237e",
    icon: "🚀",
    imageIcon: "/images/worlds/太空纪元.png",
    tagline: "The final frontier awaits",
    era: "2130 Interstellar Era",
    maxAge: 150,
    eventStyle: "Sci-fi space opera style, with interstellar travel, alien encounters, space station life, corporate colonization, terraforming, and political struggles across star systems.",
    specialEndings: ["Fleet Admiral", "Alien Diplomat", "Terraforming Pioneer", "AI Overlord", "Galactic Explorer"],
    attributes: [
      { key: "adaptability", name: "Adaptability", icon: "🧬", description: "Adaptation to space environments" },
      { key: "command", name: "Command", icon: "🎯", description: "Leadership under pressure" },
      { key: "knowledge", name: "Knowledge", icon: "📚", description: "Scientific and technical expertise" },
      { key: "connections", name: "Connections", icon: "🌐", description: "Influence across star systems" },
    ],
    acquiredAttributes: [
      {
        key: "credits", name: "Credits", icon: "💰", description: "Interstellar currency",
        initialValue: 0,
        tiers: [
          { min: 0, label: "Broke" }, { min: 1, label: "Crew Member" },
          { min: 4, label: "Officer Pay" }, { min: 7, label: "Captain's Share" },
          { min: 10, label: "Corporate Executive" }, { min: 14, label: "System Baron" },
          { min: 18, label: "Galactic Tycoon" },
        ],
      },
      {
        key: "fleet", name: "Fleet", icon: "🚀", description: "Ships and resources under command",
        initialValue: 0,
        tiers: [
          { min: 0, label: "Drifter" }, { min: 1, label: "One Ship" },
          { min: 4, label: "Small Flotilla" }, { min: 7, label: "Trade Fleet" },
          { min: 10, label: "Battle Group" }, { min: 14, label: "System Fleet" },
          { min: 18, label: "Galactic Armada" },
        ],
      },
      {
        key: "territory", name: "Territory", icon: "🌍", description: "Controlled star systems and colonies",
        initialValue: 0,
        tiers: [
          { min: 0, label: "No Fixed Address" }, { min: 1, label: "Space Station" },
          { min: 4, label: "Asteroid Base" }, { min: 7, label: "Colony" },
          { min: 10, label: "Planet" }, { min: 14, label: "Star System" },
          { min: 18, label: "Sector Dominion" },
        ],
      },
    ],
    locked: false, unlockMethod: "free", aiGenerated: false,
  },
  {
    id: "wasteland",
    name: "Wasteland Chronicle",
    description: "The world ended in fire. Now only ruins remain — mutant creatures, desperate survivors, and ancient technology buried beneath the ashes. Can you survive and build something new?",
    theme: "wasteland",
    themeColor: "#6d4c41",
    icon: "☢️",
    imageIcon: "/images/worlds/废土纪元.png",
    tagline: "After the fire, only the strong endure",
    era: "Post-Apocalyptic 2287",
    maxAge: 55,
    eventStyle: "Post-apocalyptic survival style, with radiation zones, mutant threats, scavenging, settlement building, faction wars, and rediscovering pre-war technology. Gritty, dark, with moments of human warmth.",
    specialEndings: ["Settlement Leader", "Wasteland Messiah", "Ancient Vault Explorer", "Rebuild Civilization", "Mutant King"],
    attributes: [
      { key: "survival", name: "Survival", icon: "🎒", description: "Ability to find food, water, and shelter" },
      { key: "combat", name: "Combat", icon: "🔫", description: "Fighting skills and weapon handling" },
      { key: "charisma", name: "Charisma", icon: "💬", description: "Persuasion and leadership" },
      { key: "knowledge", name: "Knowledge", icon: "🔬", description: "Pre-war tech and medical knowledge" },
    ],
    acquiredAttributes: [
      {
        key: "supplies", name: "Supplies", icon: "📦", description: "Rations, ammo, and medical supplies",
        initialValue: 0,
        tiers: [
          { min: 0, label: "Starving" }, { min: 1, label: "Scavenging Day by Day" },
          { min: 4, label: "Stocked Up" }, { min: 7, label: "Well Supplied" },
          { min: 10, label: "Bunker Levels" }, { min: 14, label: "Settlement Reserve" },
          { min: 18, label: "Pre-War Vault" },
        ],
      },
      {
        key: "settlement", name: "Settlement", icon: "🏘️", description: "Size and development of your community",
        initialValue: 0,
        tiers: [
          { min: 0, label: "Lone Wanderer" }, { min: 1, label: "Small Camp" },
          { min: 4, label: "Outpost" }, { min: 7, label: "Fortified Town" },
          { min: 10, label: "Thriving Settlement" }, { min: 14, label: "City State" },
          { min: 18, label: "New Civilization" },
        ],
      },
      {
        key: "reputation", name: "Reputation", icon: "⭐", description: "Standing among wasteland factions",
        initialValue: 0,
        tiers: [
          { min: 0, label: "Unknown" }, { min: 1, label: "Survivor" },
          { min: 4, label: "Respected" }, { min: 7, label: "Faction Ally" },
          { min: 10, label: "Regional Power" }, { min: 14, label: "Wasteland Legend" },
          { min: 18, label: "Myth" },
        ],
      },
    ],
    locked: false, unlockMethod: "free", aiGenerated: false,
  },
  {
    id: "custom",
    name: "Custom World",
    description: "Create your own world. Describe the setting, rules, and style — and AI will bring it to life.",
    theme: "custom",
    themeColor: "#9c27b0",
    icon: "🌌",
    tagline: "Your world, your rules",
    era: "Custom",
    maxAge: 100,
    eventStyle: "Custom world. The AI will follow your description to generate events and stories.",
    specialEndings: [],
    attributes: [
      { key: "attr1", name: "Attribute 1", icon: "⭐", description: "Custom attribute 1" },
      { key: "attr2", name: "Attribute 2", icon: "⭐", description: "Custom attribute 2" },
      { key: "attr3", name: "Attribute 3", icon: "⭐", description: "Custom attribute 3" },
      { key: "attr4", name: "Attribute 4", icon: "⭐", description: "Custom attribute 4" },
    ],
    acquiredAttributes: [],
    locked: false, unlockMethod: "free", aiGenerated: true,
  },
]
