// Game state management - Zustand store
// Decompiled from re.maa-ai.com's AI Life Replay

import { create } from 'zustand'
import { World, worlds } from '@/data/worlds'
import { Profession, professions } from '@/data/professions'
import { PowerFantasyTemplate, powerFantasyTemplates } from '@/data/powerfantasy'
import { PoliticalPath, politicalPaths } from '@/data/politics'
import { RomancePartner, romancePartners } from '@/data/romances'
import { Talent } from '@/data/talents'
import { GamePhase, GAME_CONFIG, genderOptions, raceOptions, customWorldRaceOptions } from '@/data/config'

// ============================================================
// Type definitions
// ============================================================

export interface AttributeState {
  key: string
  value: number
}

export interface AcquiredAttributeState {
  key: string
  value: number
  tierLabel: string
}

export interface YearEvent {
  age: number
  text: string
  choices?: EventChoice[]
  chosenIndex?: number
}

export interface EventChoice {
  text: string
  effect: string
}

export interface GameReview {
  highlights: string[]
  scores: {
    drama: number
    achievement: number
    impact: number
  }
  rating: string
  tagline: string
}

export interface GameSave {
  version: number
  phase: GamePhase
  gameMode: 'immersive' | 'quick'
  selectedWorld: string
  selectedProfession?: string
  selectedPowerFantasy?: string
  selectedPoliticalPath?: string
  selectedRomance?: string
  gender: string
  race: string
  customInfo: string
  attributes: AttributeState[]
  drawnTalents: string[]
  selectedTalents: string[]
  currentAge: number
  yearEvents: YearEvent[]
  acquiredAttributes: Record<string, number>
  background?: string
  character?: string
  lifespan: number
  ending: string
  review?: GameReview
  customWorldDescription?: string
  bufferedEvents: YearEvent[]
}

// ============================================================
// Store interface
// ============================================================

interface GameStore {
  // Game phase
  phase: GamePhase
  setPhase: (phase: GamePhase) => void

  // Game mode
  gameMode: 'immersive' | 'quick'
  setGameMode: (mode: 'immersive' | 'quick') => void

  // World selection
  selectedWorld: World | null
  selectWorld: (worldId: string) => void
  selectedProfession: Profession | null
  selectProfession: (professionId: string) => void
  selectedPowerFantasy: PowerFantasyTemplate | null
  selectPowerFantasy: (templateId: string) => void
  selectedPoliticalPath: PoliticalPath | null
  selectPoliticalPath: (pathId: string) => void
  selectedRomance: RomancePartner | null
  selectRomance: (partnerId: string) => void
  customWorldDescription: string
  setCustomWorldDescription: (desc: string) => void

  // Character info
  gender: string
  race: string
  customInfo: string
  setGender: (gender: string) => void
  setRace: (race: string) => void
  setCustomInfo: (info: string) => void

  // Attributes
  attributes: AttributeState[]
  setAttributes: (attrs: AttributeState[]) => void
  updateAttribute: (key: string, delta: number) => void
  remainingPoints: number

  // Talents
  drawnTalents: Talent[]
  selectedTalents: Talent[]
  drawTalents: () => void
  toggleTalent: (talent: Talent) => void
  redrawTalents: () => void

  // Game state
  currentAge: number
  maxAge: number
  background: string
  character: string
  yearEvents: YearEvent[]
  bufferedEvents: YearEvent[]
  isGenerating: boolean
  isDead: boolean
  lifespan: number
  ending: string

  addYearEvents: (events: YearEvent[]) => void
  bufferedAddYearEvents: (events: YearEvent[]) => void
  makeChoice: (eventIndex: number, choiceIndex: number) => void
  setBackground: (text: string) => void
  setCharacter: (text: string) => void
  setAge: (age: number) => void
  setIsGenerating: (v: boolean) => void
  setDead: (v: boolean) => void
  setLifespan: (age: number) => void
  setEnding: (ending: string) => void

  // Acquired attributes
  acquiredAttributes: Record<string, number>
  setAcquiredAttribute: (key: string, value: number) => void

  // Review
  review: GameReview | null
  setReview: (review: GameReview) => void

  // Save data
  saveToLocalStorage: () => void
  loadFromLocalStorage: () => boolean
  resetGame: () => void

  // Session
  gameSession: string | null
  setGameSession: (token: string) => void
}

// ============================================================
// Initial state
// ============================================================

const initialState = {
  phase: 'idle' as GamePhase,
  gameMode: 'immersive' as 'immersive' | 'quick',
  selectedWorld: null as World | null,
  selectedProfession: null as Profession | null,
  selectedPowerFantasy: null as PowerFantasyTemplate | null,
  selectedPoliticalPath: null as PoliticalPath | null,
  selectedRomance: null as RomancePartner | null,
  customWorldDescription: '',
  gender: '',
  race: '',
  customInfo: '',
  attributes: [] as AttributeState[],
  drawnTalents: [] as Talent[],
  selectedTalents: [] as Talent[],
  currentAge: 0,
  maxAge: 90,
  background: '',
  character: '',
  yearEvents: [] as YearEvent[],
  bufferedEvents: [] as YearEvent[],
  isGenerating: false,
  isDead: false,
  lifespan: 0,
  ending: '',
  acquiredAttributes: {} as Record<string, number>,
  review: null as GameReview | null,
  gameSession: null as string | null,
}

// ============================================================
// Utility: get current tier label from attribute value
// ============================================================

function getTierLabel(tiers: { min: number; label: string }[], value: number): string {
  let label = tiers[0]?.label || ''
  for (const tier of tiers) {
    if (value >= tier.min) label = tier.label
  }
  return label
}

// ============================================================
// Create Store
// ============================================================

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialState,

  get remainingPoints() {
    const sum = get().attributes.reduce((acc, a) => acc + a.value, 0)
    return GAME_CONFIG.totalAttributePoints - sum
  },

  // This getter won't auto-work in zustand, we override it
  // Note: zustand doesn't support getters, will be computed in components

  setPhase: (phase) => set({ phase }),

  setGameMode: (mode) => set({ gameMode: mode }),

  selectWorld: (worldId) => {
    const world = worlds.find((w) => w.id === worldId)
    if (!world) return

    // Reset character attributes
    const attrs = world.attributes.map((a) => ({
      key: a.key,
      value: 0,
    }))

    // Reset acquired attributes
    const acquiredAttrs: Record<string, number> = {}
    world.acquiredAttributes.forEach((a) => {
      acquiredAttrs[a.key] = a.initialValue
    })

    set({
      selectedWorld: world,
      maxAge: world.maxAge,
      attributes: attrs,
      acquiredAttributes: acquiredAttrs,
      gender: '',
      race: '',
      selectedTalents: [],
      drawnTalents: [],
      yearEvents: [],
      bufferedEvents: [],
      currentAge: 0,
      background: '',
      character: '',
      isDead: false,
      lifespan: 0,
      ending: '',
      review: null,
      gameSession: null,
      phase: 'attributes',
    })
  },

  setCustomWorldDescription: (desc) => set({ customWorldDescription: desc }),

  selectProfession: (professionId) => {
    const profession = professions.find((p) => p.id === professionId)
    if (!profession) return

    // Use Modern City as base world
    const world = worlds.find((w) => w.id === 'modern')
    if (!world) return

    const attrs = world.attributes.map((a) => ({
      key: a.key,
      value: 0,
    }))

    const acquiredAttrs: Record<string, number> = {}
    world.acquiredAttributes.forEach((a) => {
      acquiredAttrs[a.key] = a.initialValue
    })

    set({
      selectedProfession: profession,
      selectedWorld: world,
      maxAge: Math.min(world.maxAge, profession.maxAge),
      attributes: attrs,
      acquiredAttributes: acquiredAttrs,
      gender: '',
      race: '',
      selectedTalents: [],
      drawnTalents: [],
      yearEvents: [],
      bufferedEvents: [],
      currentAge: 0,
      background: '',
      character: '',
      isDead: false,
      lifespan: 0,
      ending: '',
      review: null,
      gameSession: null,
      phase: 'attributes',
    })
  },

  selectPowerFantasy: (templateId) => {
    const template = powerFantasyTemplates.find((t) => t.id === templateId)
    if (!template) return

    // Use Modern City as base world
    const world = worlds.find((w) => w.id === 'modern')
    if (!world) return

    const attrs = world.attributes.map((a) => ({
      key: a.key,
      value: 0,
    }))

    const acquiredAttrs: Record<string, number> = {}
    world.acquiredAttributes.forEach((a) => {
      acquiredAttrs[a.key] = a.initialValue
    })

    set({
      selectedPowerFantasy: template,
      selectedProfession: null,
      selectedPoliticalPath: null,
      selectedWorld: world,
      maxAge: template.maxAge,
      attributes: attrs,
      acquiredAttributes: acquiredAttrs,
      gender: '',
      race: '',
      selectedTalents: [],
      drawnTalents: [],
      yearEvents: [],
      bufferedEvents: [],
      currentAge: 0,
      background: '',
      character: '',
      isDead: false,
      lifespan: 0,
      ending: '',
      review: null,
      gameSession: null,
      phase: 'attributes',
    })
  },

  selectPoliticalPath: (pathId) => {
    const path = politicalPaths.find((p) => p.id === pathId)
    if (!path) return

    const world = worlds.find((w) => w.id === 'modern')
    if (!world) return

    const attrs = world.attributes.map((a) => ({
      key: a.key,
      value: 0,
    }))

    const acquiredAttrs: Record<string, number> = {}
    world.acquiredAttributes.forEach((a) => {
      acquiredAttrs[a.key] = a.initialValue
    })

    set({
      selectedPoliticalPath: path,
      selectedProfession: null,
      selectedPowerFantasy: null,
      selectedWorld: world,
      maxAge: path.maxAge,
      attributes: attrs,
      acquiredAttributes: acquiredAttrs,
      gender: '',
      race: '',
      selectedTalents: [],
      drawnTalents: [],
      yearEvents: [],
      bufferedEvents: [],
      currentAge: 0,
      background: '',
      character: '',
      isDead: false,
      lifespan: 0,
      ending: '',
      review: null,
      gameSession: null,
      phase: 'attributes',
    })
  },

  selectRomance: (partnerId) => {
    const partner = romancePartners.find((p) => p.id === partnerId)
    if (!partner) return

    const world = worlds.find((w) => w.id === 'modern')
    if (!world) return

    const attrs = world.attributes.map((a) => ({
      key: a.key,
      value: 0,
    }))

    const acquiredAttrs: Record<string, number> = {}
    world.acquiredAttributes.forEach((a) => {
      acquiredAttrs[a.key] = a.initialValue
    })

    set({
      selectedRomance: partner,
      selectedProfession: null,
      selectedPowerFantasy: null,
      selectedPoliticalPath: null,
      selectedWorld: world,
      maxAge: Math.min(world.maxAge, partner.maxAge),
      attributes: attrs,
      acquiredAttributes: acquiredAttrs,
      gender: '',
      race: '',
      selectedTalents: [],
      drawnTalents: [],
      yearEvents: [],
      bufferedEvents: [],
      currentAge: 0,
      background: '',
      character: '',
      isDead: false,
      lifespan: 0,
      ending: '',
      review: null,
      gameSession: null,
      phase: 'attributes',
    })
  },

  setGender: (gender) => {
    set({ gender })
    // Also set default race for the selected world
    const world = get().selectedWorld
    if (world) {
      const races = raceOptions[world.id] || customWorldRaceOptions
      if (!get().race) {
        set({ race: races[0]?.label || '' })
      }
    }
  },

  setRace: (race) => set({ race }),
  setCustomInfo: (info) => set({ customInfo: info }),

  setAttributes: (attrs) => set({ attributes: attrs }),

  updateAttribute: (key, delta) => {
    const attrs = get().attributes
    const idx = attrs.findIndex((a) => a.key === key)
    if (idx === -1) return

    const current = attrs[idx].value
    const newVal = current + delta
    const sum = attrs.reduce((s, a) => s + a.value, 0)

    // Constraint check
    if (delta > 0) {
      // Increase
      if (sum >= GAME_CONFIG.totalAttributePoints) return
      if (newVal > GAME_CONFIG.maxBaseAttribute) return
    } else {
      // Decrease
      if (newVal < 0) return
    }

    const newAttrs = [...attrs]
    newAttrs[idx] = { ...newAttrs[idx], value: newVal }
    set({ attributes: newAttrs })
  },

  drawTalents: () => {
    const { talents: allTalents } = require('@/data/talents')
    // Randomly draw 3 talents
    const shuffled = [...allTalents].sort(() => Math.random() - 0.5)
    const drawn = shuffled.slice(0, 3)
    set({ drawnTalents: drawn, selectedTalents: [] })
  },

  toggleTalent: (talent) => {
    const selected = get().selectedTalents
    const isSelected = selected.some((t) => t.id === talent.id)

    if (isSelected) {
      // Deselect
      set({ selectedTalents: selected.filter((t) => t.id !== talent.id) })
    } else {
      // Select (max 3)
      if (selected.length >= GAME_CONFIG.talentSelectCount) return
      // Mutex check
      if (talent.mutexGroup) {
        const hasConflict = selected.some(
          (t) => t.mutexGroup && t.mutexGroup === talent.mutexGroup
        )
        if (hasConflict) return
      }
      set({ selectedTalents: [...selected, talent] })
    }
  },

  redrawTalents: () => {
    get().drawTalents()
  },

  addYearEvents: (events) => {
    const existing = get().yearEvents
    set({ yearEvents: [...existing, ...events] })
  },

  bufferedAddYearEvents: (events) => {
    const existing = get().bufferedEvents
    set({ bufferedEvents: [...existing, ...events] })
  },

  makeChoice: (eventIndex, choiceIndex) => {
    const events = get().yearEvents
    if (eventIndex >= events.length) return
    const event = events[eventIndex]
    if (!event.choices || choiceIndex >= event.choices.length) return

    const updated = [...events]
    updated[eventIndex] = { ...event, chosenIndex: choiceIndex }
    set({ yearEvents: updated })

    // Update acquired attributes
    const choice = event.choices[choiceIndex]
    if (choice.effect) {
      // Effect description may contain attribute change info, handled by AI
      // Actual attribute changes are embedded when backend generates
    }
  },

  setBackground: (text) => set({ background: text }),
  setCharacter: (text) => set({ character: text }),
  setAge: (age) => set({ currentAge: age }),
  setIsGenerating: (v) => set({ isGenerating: v }),
  setDead: (v) => set({ isDead: v }),
  setLifespan: (age) => set({ lifespan: age }),
  setEnding: (ending) => set({ ending }),

  setAcquiredAttribute: (key, value) => {
    const attrs = { ...get().acquiredAttributes }
    attrs[key] = value
    set({ acquiredAttributes: attrs })
  },

  setReview: (review) => set({ review }),

  setGameSession: (token) => set({ gameSession: token }),

  saveToLocalStorage: () => {
    const state = get()
    const save: GameSave = {
      version: GAME_CONFIG.saveVersion,
      phase: state.phase,
      gameMode: state.gameMode,
      selectedWorld: state.selectedWorld?.id || '',
      selectedProfession: state.selectedProfession?.id || undefined,
      selectedPowerFantasy: state.selectedPowerFantasy?.id || undefined,
      selectedPoliticalPath: state.selectedPoliticalPath?.id || undefined,
      selectedRomance: state.selectedRomance?.id || undefined,
      gender: state.gender,
      race: state.race,
      customInfo: state.customInfo,
      attributes: state.attributes,
      drawnTalents: state.drawnTalents.map((t) => t.id),
      selectedTalents: state.selectedTalents.map((t) => t.id),
      currentAge: state.currentAge,
      yearEvents: state.yearEvents,
      acquiredAttributes: state.acquiredAttributes,
      background: state.background,
      character: state.character,
      lifespan: state.lifespan,
      ending: state.ending,
      review: state.review || undefined,
      customWorldDescription: state.customWorldDescription,
      bufferedEvents: state.bufferedEvents,
    }
    try {
      localStorage.setItem('ai-life-save', JSON.stringify(save))
    } catch (e) {
      console.error('Save failed:', e)
    }
  },

  loadFromLocalStorage: () => {
    try {
      const raw = localStorage.getItem('ai-life-save')
      if (!raw) return false

      const save: GameSave = JSON.parse(raw)
      if (!save.version || save.version < 2) return false

      const world = worlds.find((w) => w.id === save.selectedWorld)
      if (!world) return false

      const profession = save.selectedProfession
        ? professions.find((p) => p.id === save.selectedProfession) || null
        : null

      const powerFantasy = save.selectedPowerFantasy
        ? powerFantasyTemplates.find((p) => p.id === save.selectedPowerFantasy) || null
        : null

      const politicalPath = save.selectedPoliticalPath
        ? politicalPaths.find((p) => p.id === save.selectedPoliticalPath) || null
        : null

      const romance = save.selectedRomance
        ? romancePartners.find((p) => p.id === save.selectedRomance) || null
        : null

      const { talents: allTalents } = require('@/data/talents')

      const drawn = allTalents.filter((t: Talent) => save.drawnTalents.includes(t.id))
      const selected = allTalents.filter((t: Talent) => save.selectedTalents.includes(t.id))

      set({
        phase: save.phase,
        gameMode: save.gameMode || 'immersive',
        selectedWorld: world,
        selectedProfession: profession,
        selectedPowerFantasy: powerFantasy,
        selectedPoliticalPath: politicalPath,
        selectedRomance: romance,
        gender: save.gender,
        race: save.race,
        customInfo: save.customInfo,
        attributes: save.attributes,
        drawnTalents: drawn,
        selectedTalents: selected,
        currentAge: save.currentAge,
        maxAge: world.maxAge,
        yearEvents: save.yearEvents,
        bufferedEvents: save.bufferedEvents || [],
        acquiredAttributes: save.acquiredAttributes || {},
        background: save.background || '',
        character: save.character || '',
        lifespan: save.lifespan || 0,
        ending: save.ending || '',
        review: save.review || null,
        customWorldDescription: save.customWorldDescription || '',
        isDead: save.phase === 'review',
        isGenerating: false,
      })
      return true
    } catch (e) {
      console.error('Load save failed:', e)
      return false
    }
  },

  resetGame: () => {
    set({ ...initialState })
    try {
      localStorage.removeItem('ai-life-save')
    } catch {}
  },
}))

// Hook for calculating remaining attribute points
export function useRemainingPoints() {
  const attrs = useGameStore((s) => s.attributes)
  const sum = attrs.reduce((acc, a) => acc + a.value, 0)
  return GAME_CONFIG.totalAttributePoints - sum
}
