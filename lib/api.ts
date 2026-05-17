// Frontend API wrapper - SSE stream parsing

// ============================================================
// SSE streaming request
// ============================================================

export async function streamRequest(
  url: string,
  body: any,
  onChunk: (text: string) => void,
  onDone: (fullText: string) => void,
  onError: (error: string) => void,
  signal?: AbortSignal
): Promise<void> {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal,
    })

    if (!response.ok) {
      const errText = await response.text()
      onError(`API error (${response.status}): ${errText}`)
      return
    }

    const reader = response.body?.getReader()
    if (!reader) {
      onError('Unable to read response stream')
      return
    }

    const decoder = new TextDecoder()
    let buffer = ''
    let fullText = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() || ''

      for (const line of lines) {
        const trimmed = line.trim()
        if (!trimmed || !trimmed.startsWith('data: ')) continue

        const data = trimmed.slice(6).trim()
        if (data === '[DONE]') {
          onDone(fullText)
          return
        }

        try {
          const parsed = JSON.parse(data)
          if (parsed.text) {
            fullText += parsed.text
            onChunk(parsed.text)
          } else if (parsed.error) {
            onError(parsed.error)
            return
          }
        } catch {
          // skip malformed JSON lines in SSE
        }
      }
    }

    onDone(fullText)
  } catch (err: any) {
    if (err.name === 'AbortError') return
    onError(err.message || 'Network request failed')
  }
}

// ============================================================
// Game API calls
// ============================================================

export interface GameEventData {
  age: number
  text: string
  choices?: { text: string; effect: string }[]
}

export interface BackgroundData {
  text: string
}

export interface ReviewData {
  rating: string
  tagline: string
  scores: { drama: number; achievement: number; impact: number }
  highlights: string[]
}

export async function createSession(worldLine: string): Promise<{ token: string; expiresAt: number }> {
  const response = await fetch('/api/game/session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ worldLine }),
  })
  if (!response.ok)    throw new Error('Failed to create session')
  return response.json()
}

export async function generateBackground(
  params: {
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
  },
  onChunk: (text: string) => void,
  onDone: (fullText: string) => void,
  onError: (error: string) => void,
  signal?: AbortSignal
): Promise<void> {
  return streamRequest('/api/game/background', params, onChunk, onDone, onError, signal)
}

export async function generateEvents(
  params: {
    worldLine: string
    currentAge: number
    maxYears: number
    attributes: Record<string, number>
    talents: string[]
    acquiredAttributes: Record<string, number>
    eventHistory: string[]
    gender: string
    race: string
    background: string
    customWorldDescription?: string
    choiceHistory?: { age: number; eventText: string; chosenText: string; effect: string }[]
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
  },
  onChunk: (text: string) => void,
  onDone: (fullText: string) => void,
  onError: (error: string) => void,
  signal?: AbortSignal
): Promise<void> {
  return streamRequest('/api/game/generate', params, onChunk, onDone, onError, signal)
}

export async function generateReview(
  params: {
    worldLine: string
    lifespan: number
    ending: string
    scores: { drama: number; achievement: number; impact: number }
    lifeSummary: string
    yearEvents: string[]
    attributes: Record<string, number>
    talents: string[]
    gender: string
    race: string
  },
  onChunk: (text: string) => void,
  onDone: (fullText: string) => void,
  onError: (error: string) => void,
  signal?: AbortSignal
): Promise<void> {
  return streamRequest('/api/game/review', params, onChunk, onDone, onError, signal)
}
