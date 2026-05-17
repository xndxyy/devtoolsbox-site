// Game configuration constants - decompiled from re.maa-ai.com

export const GAME_CONFIG = {
  maxBaseAttribute: 10,      // Maximum initial attribute value
  totalAttributePoints: 12,  // Total initial attribute points to allocate
  talentSelectCount: 3,      // Number of talents to select
  decisionIntervalYears: [3, 5] as [number, number], // Year range for each decision interval
  aiMaxBatchYears: 10,       // Maximum years AI generates in one batch
  saveVersion: 2,            // Save file version
} as const

// Gender options
export interface GenderOption {
  label: string
  icon: string
  description: string
}

export const genderOptions: GenderOption[] = [
  { label: "Male", icon: "🧑", description: "Male body" },
  { label: "Female", icon: "👩", description: "Female body" },
  { label: "Other", icon: "🧝", description: "Beyond gender, a free spirit" },
]

// Race options (special races per world defined below)
export const raceOptions: Record<string, { label: string; icon: string; description: string }[]> = {
  modern: [
    { label: "Han Chinese", icon: "🏮", description: "Majority ethnic group of China" },
    { label: "Ethnic Minority", icon: "🎭", description: "Rich and diverse ethnic minority culture" },
    { label: "Mixed", icon: "🌍", description: "Multicultural background" },
  ],
  xianxia: [
    { label: "Mortal", icon: "👤", description: "Ordinary mortal race" },
    { label: "Spirit Body", icon: "✨", description: "Innate spiritual body, cultivates extremely fast" },
    { label: "Demon Beast", icon: "🐉", description: "Beast that cultivated into sentience" },
    { label: "Demon", icon: "👹", description: "Innate demonic body" },
  ],
  isekai: [
    { label: "Original Protagonist", icon: "⭐", description: "The main character of the original story" },
    { label: "Cannon Fodder", icon: "💀", description: "Expendable character in the story" },
    { label: "Supporting Character", icon: "🎭", description: "Supporting role in the original work" },
    { label: "Villain", icon: "😈", description: "The antagonist in the original story" },
    { label: "Extra", icon: "👤", description: "A background character with no presence" },
  ],
  palace: [
    { label: "Concubine Candidate", icon: "🌸", description: "Pure background, enters palace via selection" },
    { label: "Noble Daughter", icon: "👑", description: "Daughter of a high-ranking official" },
    { label: "Merchant's Daughter", icon: "💰", description: "Daughter of a wealthy merchant" },
    { label: "Maid-in-Waiting", icon: "🎀", description: "Starting as a palace maid" },
  ],
  magic: [
    { label: "Human", icon: "🧑", description: "Ordinary human mage" },
    { label: "Elf", icon: "🧝", description: "Long-lived, adept at magic" },
    { label: "Dwarf", icon: "⛏️", description: "Skilled smiths, magic resistant" },
    { label: "Orc", icon: "🦴", description: "Great physical strength" },
    { label: "Dragonborn", icon: "🐉", description: "Has dragon bloodline" },
  ],
  medieval: [
    { label: "Noble", icon: "👑", description: "Born into aristocracy" },
    { label: "Knight", icon: "⚔️", description: "A knight bound by honor" },
    { label: "Commoner", icon: "👤", description: "Of ordinary birth" },
    { label: "Clergyman", icon: "⛪", description: "Member of the clergy" },
    { label: "Merchant", icon: "💰", description: "A prosperous trader" },
  ],
  cyberpunk: [
    { label: "Street Kid", icon: "🔫", description: "Lowlife of the streets" },
    { label: "Corporate Agent", icon: "🏢", description: "Agent of a mega-corporation" },
    { label: "Free Hacker", icon: "💻", description: "Unbound hacker" },
    { label: "Ripperdoc", icon: "🔧", description: "Professional cyberware doctor" },
    { label: "Entertainer", icon: "🎤", description: "Performer of Night City" },
  ],
  space: [
    { label: "Earthling", icon: "🌍", description: "Human born on Earth" },
    { label: "Mars Colonist", icon: "🔴", description: "Colonist born on Mars" },
    { label: "Starfarer", icon: "🚀", description: "From a merchant dynasty" },
    { label: "Alien Hybrid", icon: "👽", description: "Has extraterrestrial blood" },
    { label: "Awakened AI", icon: "🤖", description: "A self-aware AI" },
  ],
  wasteland: [
    { label: "Vault Dweller", icon: "🏠", description: "From an underground vault" },
    { label: "Wasteland Native", icon: "🏜️", description: "Generations living in the wasteland" },
    { label: "Wanderer", icon: "🎒", description: "A roaming survivor" },
    { label: "Researcher", icon: "🔬", description: "Descendant of old-world scientists" },
    { label: "Mutant", icon: "🧬", description: "Human mutated by radiation" },
  ],
}

export const customWorldRaceOptions = [
  { label: "Common", icon: "👤", description: "The most common race" },
  { label: "Special", icon: "✨", description: "Has special abilities or background" },
]

// Game phase enum
export type GamePhase = 'idle' | 'attributes' | 'talents' | 'playing' | 'review'
