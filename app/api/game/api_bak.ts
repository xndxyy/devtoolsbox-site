// Game API route definitions
// Backend API logic - uses OpenAI-compatible API

import { NextRequest } from 'next/server'

// ============================================================
// Type definitions
// ============================================================

export interface CreateSessionRequest {
  worldLine: string
  gender?: string
  race?: string
}

export interface CreateSessionResponse {
  token: string
  expiresAt: number
}

export interface BackgroundRequest {
  worldLine: string
  talents: string[]
  attributes: Record<string, number>
  gender: string
  race: string
  customInfo?: string
  customWorldDescription?: string
  professionName?: string
  biographySummary?: string
  powerFantasyStyle?: string
  goldenFinger?: string
  coreTropes?: string[]
  politicalPathName?: string
  politicalCorePhilosophy?: string
  romancePartnerName?: string
  romancePersonality?: string
  romanceStyle?: string
}

export interface GenerateRequest {
  worldLine: string
  currentAge: number
  maxYears: number
  gameMode: 'immersive' | 'quick'
  attributes: Record<string, number>
  talents: string[]
  acquiredAttributes: Record<string, number>
  eventHistory: string[]
  gender: string
  race: string
  background: string
  choiceHistory?: ChoiceHistoryEntry[]
  customWorldDescription?: string
  professionName?: string
  biographySummary?: string
  summaryMode?: boolean
  summaryYearSpan?: number
  powerFantasyStyle?: string
  goldenFinger?: string
  coreTropes?: string[]
  politicalPathName?: string
  politicalCorePhilosophy?: string
  romancePartnerName?: string
  romancePersonality?: string
  romanceStyle?: string
}

export interface ChoiceHistoryEntry {
  age: number
  eventText: string
  chosenText: string
  effect: string
}

export interface ReviewRequest {
  worldLine: string
  lifespan: number
  ending: string
  scores: {
    drama: number
    achievement: number
    impact: number
  }
  lifeSummary: string
  yearEvents: string[]
  attributes: Record<string, number>
  talents: string[]
  gender: string
  race: string
  customWorldDescription?: string
}

// ============================================================
// AI API call wrapper
// ============================================================

const AI_API_BASE = 'https://api.deepseek.com/v1'
const AI_API_KEY = 'sk-ccff1212b5c442b09ccecb31c56fd955'
const AI_MODEL = 'deepseek-chat'

interface ChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

interface AIStreamOptions {
  messages: ChatMessage[]
  temperature?: number
  maxTokens?: number
}

export async function* streamAI(options: AIStreamOptions): AsyncGenerator<string> {
  const response = await fetch(`${AI_API_BASE}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${AI_API_KEY}`,
    },
    body: JSON.stringify({
      model: AI_MODEL,
      messages: options.messages,
      temperature: options.temperature ?? 0.8,
      max_tokens: options.maxTokens ?? 4096,
      stream: true,
    }),
  })

  if (!response.ok) {
    const errText = await response.text()
    throw new Error(`AI API Error (${response.status}): ${errText}`)
  }

  const reader = response.body?.getReader()
  if (!reader) throw new Error('No response body from AI API')

  const decoder = new TextDecoder()
  let buffer = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    buffer += decoder.decode(value, { stream: true })
    const lines = buffer.split('\n')
    buffer = lines.pop() || ''

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const data = line.slice(6).trim()
        if (data === '[DONE]') return
        try {
          const parsed = JSON.parse(data)
          const content = parsed.choices?.[0]?.delta?.content || ''
          if (content) yield content
        } catch {
          // skip malformed lines
        }
      }
    }
  }
}

// ============================================================
// Session management (simple implementation)
// ============================================================

const sessions = new Map<string, number>()

function generateToken(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let token = ''
  for (let i = 0; i < 32; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return token
}

// ============================================================
// Prompt templates
// ============================================================

// Attribute key to English name mapping (shared across all worlds)
const ATTR_NAME_MAP: Record<string, string> = {
  face: 'Looks', intelligence: 'Intelligence', physique: 'Physique', family: 'Family',
  power: 'Power', wisdom: 'Wisdom', social: 'Social', resource: 'Resources',
  rootbone: 'Spirit Root', perception: 'Perception', luck: 'Luck', sect: 'Sect Foundation',
  foresight: 'Foresight', charm: 'Charm', survival: 'Survival', influence: 'Influence',
  appearance: 'Appearance', cunning: 'Cunning', favor: 'Imperial Favor', lineage: 'Lineage',
  mana: 'Mana', wisdom2: 'Wisdom', might: 'Might', bloodline: 'Bloodline',
  combat: 'Combat', strategy: 'Strategy', leadership: 'Leadership', domain: 'Domain',
  hacking: 'Hacking', cybernetic: 'Cyberware', streetRep: 'Street Reputation', corporate: 'Corporate Ties',
  piloting: 'Piloting', tech: 'Tech', diplomacy: 'Diplomacy', fleet: 'Fleet',
}

function getAttrName(key: string): string {
  return ATTR_NAME_MAP[key] || key
}

function formatAttributes(attrs: Record<string, number>): string {
  return Object.entries(attrs)
    .map(([k, v]) => `${getAttrName(k)}: ${v}`)
    .join(', ')
}

function getWorldConfig(worldLine: string): { name: string; style: string; endings: string[]; maxAge: number } {
  const worlds: Record<string, { name: string; style: string; endings: string[]; maxAge: number }> = {
    modern: {
      name: 'Modern City',
      style: 'Realistic tone focusing on education, career, romance, family, achievements, retirement. May touch on social topics (housing, entrepreneurship, AI wave). Humor leans toward social satire and self-deprecation. Characters with Physique 3+ should not die from health causes before 55. Midlife (35-55) focuses on career and family. Do not repeatedly arrange illness plots.',
      endings: ['Academic Peak', 'Business Empire', 'Space Migration', 'Digital Immortality', 'Retire in Glory', 'Legacy Through Writing'],
      maxAge: 90,
    },
    xianxia: {
      name: 'Nine Provinces Immortal Realm',
      style: 'Xianxia cultivation novel style, involving cultivation realm breakthroughs, sect conflicts, secret realm exploration, alchemy, artifact crafting, heart demon tribulations. Narrated from "you" perspective. Terms like spiritual energy, golden core, nascent soul should be naturally integrated.',
      endings: ['Ascend to Immortal Realm', 'Feather into Immortality', 'Great Power Reincarnation', 'Found a Sect', 'Become the Dao of Heaven'],
      maxAge: 130,
    },
    isekai: {
      name: 'Ink Sea Floating Life',
      style: 'Transmigration/rebirth style with self-awareness and plot knowledge. The character knows the original story direction and must balance between known plot and butterfly effects. May include comedic commentary, system elements, and plot deviations.',
      endings: ['Return to Reality', 'Become New Protagonist', 'Corrupted Boss', 'Settle in Parallel World', 'Reconcile with Original Story'],
      maxAge: 80,
    },
    palace: {
      name: 'Crimson Palace',
      style: 'Classic palace intrigue style, involving selection and ennoblement, harem rivalry, court politics, family rise and fall. Narrated from "you" perspective, emphasizing psychological description and strategic gameplay.',
      endings: ['Rule Behind the Curtain', 'Marry into Peace Alliance', 'Virtuous Empress', 'Phoenix Over the Realm'],
      maxAge: 70,
    },
    magic: {
      name: 'Arcane Continent',
      style: 'Western fantasy magic style, involving magic study, spell battles, academy life, secret realm exploration, and racial conflicts. Narrated from "you" perspective, filled with magical descriptions and fantastical colors.',
      endings: ['Dragon Knight', 'Elemental Unity', 'Archsage', 'Plane Walker'],
      maxAge: 110,
    },
    medieval: {
      name: 'Epoch of Iron and Fire',
      style: 'Medieval war epic style, focusing on military campaigns, political marriages, castle sieges, chivalry, plagues/famines, and religious conflicts. Narrated from "you" perspective, direct and powerful storytelling.',
      endings: ['Crusader Hero', 'Legendary King', 'Hermit Farmer', 'Temple Guardian', 'Overseas Kingdom'],
      maxAge: 60,
    },
    cyberpunk: {
      name: 'Night City 2099',
      style: 'Cyberpunk noir style, focusing on cybernetic enhancement, network intrusion, corporate conspiracies, street shootouts, and identity. Narrated from "you" perspective with a sense of technology and absurdity.',
      endings: ['Upload Consciousness', 'System Crash', 'Street Legend', 'Machine Transcendence'],
      maxAge: 100,
    },
    space: {
      name: 'Galactic Era',
      style: 'Space opera sci-fi style, focusing on interstellar travel, alien contact, space battles, colonial expansion, and technological singularity. Narrated from "you" perspective, epic storytelling.',
      endings: ['Interstellar Wanderer', 'Wormhole Martyr', 'Space Hermit'],
      maxAge: 110,
    },
    wasteland: {
      name: 'Wasteland',
      style: 'Post-apocalyptic survival style, focusing on resource competition, mutant creatures, survivor camps, moral choices, and civilization rebuilding. Narrated from "you" perspective, harsh but powerful storytelling with occasional dark humor.',
      endings: ['Mutant Awakening', 'New Civilization Founder', 'Oasis Guardian', 'Interstellar Escape', 'Wasteland Legend'],
      maxAge: 50,
    },
    custom: {
      name: 'Custom World',
      style: '', // dynamically filled by customWorldDescription
      endings: ['Legend', 'Mortal', 'Distant Lands', 'Retreat', 'Awakening'],
      maxAge: 100,
    },
  }

  const config = worlds[worldLine] || worlds.modern

  // For custom worlds, use the user's description as the narrative style
  if (worldLine === 'custom') {
    return {
      ...config,
      style: '', // replaced by customWorldDescription
    }
  }

  return config
}

function getAttrInterpretation(attrs: Record<string, number>): string {
  const lines: string[] = []
  for (const [key, val] of Object.entries(attrs)) {
    const name = getAttrName(key)
    if (val >= 8) lines.push(`[${name}=${val}] Top/Exceptional level — this attribute's advantage will greatly affect the character's fate. Story must highlight it. For example, high Intelligence means academic/scientific advantages, high Family means wealthy upbringing.`)
    else if (val >= 5) lines.push(`[${name}=${val}] Good level — this is the character's strength. The story should reflect corresponding conveniences or opportunities.`)
    else if (val >= 3) lines.push(`[${name}=${val}] Average level — mediocre, neither outstanding nor hindering. Mention it appropriately in the story.`)
    else lines.push(`[${name}=${val}] Weak level — this is the character's obvious weakness or flaw. The story should reflect difficulties caused by it. Areas with fewer initial points mean the character is weaker in those aspects.`)
  }
  return lines.join('\n')
}

export function buildBackgroundPrompt(req: BackgroundRequest): ChatMessage[] {
  const world = getWorldConfig(req.worldLine)
  const worldStyle = req.customWorldDescription || world.style
  const worldDescription = req.customWorldDescription
    ? `\nWorld: Custom World\n[User's World Description]: ${req.customWorldDescription}\nNarrative Style: Adapt based on user's description, maintain world consistency.`
    : `\nWorld: ${world.name}\nNarrative Style: ${world.style}`
  const attrStr = formatAttributes(req.attributes)
  const attrInterpretation = getAttrInterpretation(req.attributes)

  const systemPrompt = `You are a narrative writer skilled in crafting life stories. You will write a character's backstory in the second person "you."

${worldDescription}
Max Lifespan: ${world.maxAge} years

Character Attributes: ${attrStr}
Attribute Interpretation (directly affects character background and childhood):
${attrInterpretation}

Gender: ${req.gender || 'Not specified'}
Race: ${req.race || 'Not specified'}
Talents: ${req.talents.join(', ') || 'None'}
${req.professionName ? `\n[Career Mode] This character is destined to become ${req.professionName}.\nCareer Path Knowledge:\n${req.biographySummary}\nThe background story should reflect the character's early connection or related experiences with this career, laying the groundwork for their future path.` : ''}
${req.powerFantasyStyle ? `\n[Power Fantasy Mode] This is a ${req.powerFantasyStyle} story.\n[Golden Finger]: ${req.goldenFinger || 'None'}\nCore Tropes: ${(req.coreTropes || []).join(', ')}\nNote: The background story should hint at the protagonist's "difference" — implying they have special potential or are about to encounter an extraordinary opportunity. Their background can be ordinary or even humble (creating room for an epic rise), but their personality must have an unwillingness to settle for mediocrity.` : ''}
${req.politicalPathName ? `\n[Political Life Mode] This is a political figure's life story following the "${req.politicalPathName}" path.\nCore Philosophy: ${req.politicalCorePhilosophy || 'None'}\nReferencing real political career trajectories (biography knowledge embedded in biographySummary).\nNote: The background story should reflect the character's early exposure to society/politics — perhaps poverty made them understand people's suffering, or they encountered progressive ideas during their education, or their family background provided political enlightenment. Plant the first seed for their future political path.` : ''}
${req.romancePartnerName ? `\n[Romance Mode] This is a romantic life story about love.\n[Love Interest]: ${req.romancePartnerName}\n[Their Personality]: ${req.romancePersonality || 'Caring and gentle'}\nNote: The background story should show how the character's early experiences shaped their personality and attitude toward love. Foreshadow the future meeting with ${req.romancePartnerName} — for example, personality traits formed by childhood experiences, or expectations/fears about love created by certain events. They don't need to appear in the backstory, but set up the character as "ready to be loved" or "in need of love."` : ''}

[Causality Chain Rules — Must Strictly Follow]:
1. The character's background must be highly consistent with initial attribute point allocation — where points were invested, the story must reflect it
2. High-value attributes must correspond to the character's advantages (e.g., high Family → wealthy background; high Intelligence → naturally brilliant; high Physique → strong and healthy from childhood)
3. Uninvested or low attributes must correspond to the character's weaknesses (e.g., Physique 0 → physically weak; Family 0 → poor background; Intelligence 0 → learning difficulties)
4. Talents must directly affect the character's early experiences
5. Race and gender must affect the character's social circumstances and early experiences
6. The backstory details should make the player feel "this point allocation truly shaped this character"
7. The character's current age is 0, the story covers key experiences from birth through childhood
8. Approximately 150-200 words, use second person "you," vivid and immersive language
9. **Important: Do not mention attribute values, attribute names, or game mechanic terms in the story text** (e.g., "Looks=6", "Intelligence stat", "points"). Attributes should be naturally reflected through the character's actual experiences and behavior, not stated directly.`

  return [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: `Based on the above attributes and settings, generate a backstory for this character. Ensure point allocation, talents, gender, and race are all concretely reflected in the story, forming a complete causal logic.` },
  ]
}

export function buildGeneratePrompt(req: GenerateRequest): ChatMessage[] {
  const world = getWorldConfig(req.worldLine)
  const worldStyle = req.customWorldDescription || world.style
  const worldDescription = req.customWorldDescription
    ? `\nWorld: Custom World\n[User's World Description]: ${req.customWorldDescription}\nNarrative Style: Adapt based on user's description, maintain world consistency.`
    : `\nWorld: ${world.name}\nNarrative Style: ${world.style}`
  const attrStr = formatAttributes(req.attributes)
  const acqStr = formatAttributes(req.acquiredAttributes)
  const attrInterpretation = getAttrInterpretation(req.attributes)

  // Build choice history description
  let choiceHistoryStr = ''
  if (req.choiceHistory && req.choiceHistory.length > 0) {
    choiceHistoryStr = 'Important choices the player previously made and their consequences:\n' +
      req.choiceHistory.map((ch, i) =>
        `[Choice ${i + 1}, age ${ch.age}] Event: ${ch.eventText}\n  → Player chose: ${ch.chosenText}\n  → Consequence: ${ch.effect}`
      ).join('\n\n')
    choiceHistoryStr += '\n\nThese choices have already changed the character\'s life trajectory. Subsequent events must follow logically from these existing choices, forming a reasonable causal chain.'
  }

  const systemPrompt = `You are a life simulation system skilled in narrative. You will generate the character's upcoming life events in the second person "you."

${worldDescription}
Max Lifespan: ${world.maxAge} years

Character Initial Attributes: ${attrStr}
Attribute Interpretation (directly affects event direction):
${attrInterpretation}

Acquired Attributes: ${acqStr}
Gender: ${req.gender || 'Not specified'}
Race: ${req.race || 'Not specified'}
Talents: ${req.talents.join(', ') || 'None'}
${req.professionName ? `\n[Career Mode] This character's profession is ${req.professionName}.\nCareer Path Knowledge (must strictly reference these stages to advance the story):\n${req.biographySummary}\nNote: Subsequent events must revolve around the character's life on their career path, including education and entry, career development, industry challenges, retirement transitions — letting the player experience the real life of this profession.` : ''}
${req.powerFantasyStyle ? `\n[Power Fantasy Mode] This is a ${req.powerFantasyStyle} story.\n[Golden Finger]: ${req.goldenFinger || 'None'}\nCore Tropes: ${(req.coreTropes || []).join(', ')}` : ''}
${req.politicalPathName ? `\n[Political Life Mode] This character follows the "${req.politicalPathName}" path.\nCore Philosophy: ${req.politicalCorePhilosophy || 'None'}\nNote: Subsequent events must revolve around the character's political life — including career advancement, policy making, crisis management, power games, elections/appointments. Let the player experience a real political career trajectory. Reference real political figures' career knowledge embedded in biographySummary.` : ''}
${req.romancePartnerName ? `\n[Romance Mode] This character is in a sweet romance with 「${req.romancePartnerName}」.\n[Their Personality]: ${req.romancePersonality || 'Caring and gentle'}\n\n[Romance Narrative Style Guide]:\n${req.romanceStyle || 'This is a romantic love story.'}\n\nImportant Narrative Rules:\n1. The core of this story is "romance" — the character's life experiences must revolve around their relationship development with 「${req.romancePartnerName}」. School/career/life events serve as the backdrop for the relationship.\n2. From meeting to knowing to loving, each stage needs detailed emotional description — heart flutter, ambiguity, confession, passionate love, adjustment, companionship.\n3. The love interest's personality traits${req.romancePersonality ? ' (' + req.romancePersonality + ')' : ''} must be consistent throughout — their words and actions must match their character design.\n4. Daily interactions should also convey sweetness — eating together, walking together, facing life's little moments side by side.\n5. Key milestones (confession/first kiss/moving in/meeting parents/proposal/wedding/having children, etc.) must be described in detail.\n6. The story can have twists and challenges, but the overall tone should be warmly healing "sweet love."` : ''}

Character Background:
${req.background}

Current Age: ${req.currentAge} years
Game Event Summary So Far:
${req.eventHistory.slice(-5).join('\n')}

${choiceHistoryStr}

[Causality Chain Rules — Must Strictly Follow]:
1. Attribute values directly affect event outcomes — characters are more likely to succeed in areas with high attributes, and more likely to fail or encounter difficulty in areas with low attributes. Point allocation must affect the story.
2. Talents must play a role in events — for example, a "Business Mind" talent should be reflected in events involving commerce/career.
3. Player choices must have visible downstream consequences — if a certain option was chosen previously, subsequent events must reasonably continue that choice's results.
4. Character background must affect events — a character from humble origins vs. a wealthy background should face different challenges and social relationships.
5. Events should have logical coherence, forming causal chains rather than random event accumulation.
6. Avoid plots that contradict the character's attributes, background, or talents.
7. If the character has made important choices (career, marriage, residence, etc.), subsequent events should continue the consequences of those choices.
8. **Important: Do not include attribute names, values, or any game mechanic terms in event text.** Do not write "Looks=6", "Intelligence stat", "Strength value" etc. Attribute effects should be shown naturally through the character's actual behavior — intelligent people speak coherently, attractive people get complimented on their looks, but don't directly state attribute values.

${req.summaryMode
  ? `Generate life events for ages ${req.currentAge}-${req.currentAge + (req.summaryYearSpan || 3) - 1} (${req.summaryYearSpan || 3} years). Note:
1. This is multi-year generation mode — generate ${req.summaryYearSpan || 3} consecutive years of events
2. For ordinary/peaceful years (stable career development, invincible period, daily cultivation), summarize in 1-2 sentences and **do not include choice branches**
3. For important milestones (breakthroughs/upgrades, major battles, key social events, major decisions, industry changes), describe in detail and provide choices
4. Use second person "you"
5. Don't end the game early, advance the normal life trajectory
6. Even in summarized years, maintain a narrative feel — don't become a dry timeline
7. choices is optional — only needed for major decision years; omit or set to null for ordinary years`
  : `Generate life events for the year${req.maxYears && req.maxYears > 1 ? `s ${req.currentAge}-${req.currentAge + req.maxYears - 1}` : ` ${req.currentAge}`}. Note:
1. ${req.maxYears && req.maxYears > 1 ? `Generate ${req.maxYears} consecutive years of stories from age ${req.currentAge} to ${req.currentAge + req.maxYears - 1}, one event per year.` : ''}**This is a real person's life** — each year must have age-appropriate life experiences. Age 3 = learning to walk and talk, age 6 = starting elementary school, age 12 = middle school, age 15 = high school, age 18 = college entrance exam, age 22 = graduating and finding a job... Don't write the same "fell while running" content every year.
2. Use second person "you," natural and fluent language, like reading a biography
3. ${req.gameMode === 'immersive'
  ? 'Events **must include** 2-3 choice branches (choices), letting the player make life-impacting decisions each year. This is the core of the immersive experience.'
  : 'Events should **only** include choice branches when encountering truly major life milestones (school choices, career transition, marriage, major crises, etc.), **most years have no choices**.'}
4. Each year's event must have new content — don't repeat similar scenes and actions from previous years. As age increases, the character's life stage and circumstances change
5. Don't end the game early, advance the normal life trajectory
6. If there are important life milestones (starting school, graduating, working, getting married, having children, promotion, etc.), describe them in more detail
7. Attribute values affect the character's performance in events, but are not the core of the event — don't write about "climbing/running/jumping in some place," instead write about the real life events that happen at this age
8. Keep each year's event description **concise** — about 40-80 words, one sentence summarizing the most important thing of the year is enough. Only a very few key years can be slightly longer (e.g., 100 words).`}

Output format${req.gameMode === 'immersive' ? ' (choices is **required**)': ' (choices is optional, omit or set to null when there is no major decision)'}:
{
  "events": [
    {
      "age": current_age,
      "text": "Event description text",
      "choices": [
        { "text": "Choice A", "effect": "Consequence description of Choice A" },
        { "text": "Choice B", "effect": "Consequence description of Choice B" },
        { "text": "Choice C", "effect": "Consequence description of Choice C" }
      ]
    }
  ]
}
${req.gameMode === 'immersive'
  ? 'Important: choices is **required**. Each event must provide 2-3 choice branches. Give players the opportunity to make life-changing decisions at every age.'
  : 'Important: choices is optional. **Do not include choices for most years.** Only provide choices when you think this age truly requires the player to make a significant decision. For ordinary years (routine, stable, no major decisions) simply omit choices or set to null.'}`

  return [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: `Generate events for age ${req.currentAge}, ensuring a reasonable causal chain with the character's attribute values, talents, background, and previous choices.` },
  ]
}

export function buildReviewPrompt(req: ReviewRequest): ChatMessage[] {
  const world = getWorldConfig(req.worldLine)
  const worldStyle = req.customWorldDescription || world.style
  const worldDescription = req.customWorldDescription
    ? `\nWorld: Custom World\n[User's World Description]: ${req.customWorldDescription}\nNarrative Style: Adapt based on user's description, maintain world consistency.`
    : `\nWorld: ${world.name}\nNarrative Style: ${world.style}`

  const systemPrompt = `You are a life evaluation system. Provide a summary evaluation for the character's complete life.

${worldDescription}

Character Final Attributes: ${JSON.stringify(req.attributes)}
Talents: ${req.talents.join(', ') || 'None'}
Gender: ${req.gender || 'Not specified'}
Race: ${req.race || 'Not specified'}
Lifespan: ${req.lifespan} years
Ending: ${req.ending}

Key Life Events:
${req.yearEvents.slice(-10).join('\n')}

Output in JSON format using the following structure:
{
  "rating": "Overall rating (SSS/SS/S/A+/A/B/C)",
  "tagline": "One insightful life summary sentence",
  "scores": {
    "drama": drama score (0-100),
    "achievement": achievement score (0-100),
    "impact": impact score (0-100)
  },
  "highlights": ["3-5 key highlight moments or turning points"]
}`

  return [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: `Evaluate this character's life.` },
  ]
}
