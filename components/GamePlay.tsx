'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '@/store/gameStore'
import { generateBackground, generateEvents } from '@/lib/api'
import type { YearEvent } from '@/store/gameStore'
import type { ChoiceHistoryEntry } from '@/app/api/game/api'
import { WorldIcon } from '@/components/WorldIcon'

export default function GamePlay({
  onReview,
}: {
  onReview: () => void
}) {
  const selectedWorld = useGameStore((s) => s.selectedWorld)
  const selectedProfession = useGameStore((s) => s.selectedProfession)
  const selectedPowerFantasy = useGameStore((s) => s.selectedPowerFantasy)
  const selectedPoliticalPath = useGameStore((s) => s.selectedPoliticalPath)
  const selectedRomance = useGameStore((s) => s.selectedRomance)
  const gender = useGameStore((s) => s.gender)
  const race = useGameStore((s) => s.race)
  const customInfo = useGameStore((s) => s.customInfo)
  const attributes = useGameStore((s) => s.attributes)
  const selectedTalents = useGameStore((s) => s.selectedTalents)
  const acquiredAttributes = useGameStore((s) => s.acquiredAttributes)
  const setBackground = useGameStore((s) => s.setBackground)
  const background = useGameStore((s) => s.background)
  const customWorldDescription = useGameStore((s) => s.customWorldDescription)
  const currentAge = useGameStore((s) => s.currentAge)
  const setAge = useGameStore((s) => s.setAge)
  const maxAge = useGameStore((s) => s.maxAge)
  const yearEvents = useGameStore((s) => s.yearEvents)
  const addYearEvents = useGameStore((s) => s.addYearEvents)
  const setDead = useGameStore((s) => s.setDead)
  const isDead = useGameStore((s) => s.isDead)
  const setIsGenerating = useGameStore((s) => s.setIsGenerating)
  const isGenerating = useGameStore((s) => s.isGenerating)
  const setEnding = useGameStore((s) => s.setEnding)
  const saveToLocalStorage = useGameStore((s) => s.saveToLocalStorage)

  const [displayBg, setDisplayBg] = useState('')
  const [isGeneratingBg, setIsGeneratingBg] = useState(true)
  const [currentDisplay, setCurrentDisplay] = useState('')
  const [, setCurrentEventIdx] = useState(0)
  const [choiceHistory, setChoiceHistory] = useState<ChoiceHistoryEntry[]>([])
  const [lastClickedEventIdx, setLastClickedEventIdx] = useState(-1)

  const abortRef = useRef<AbortController | null>(null)
  const displayRef = useRef('')
  const bottomRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom
  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }, [])

  // Generate background story
  useEffect(() => {
    if (background) {
      setIsGeneratingBg(false)
      return
    }

    const controller = new AbortController()
    abortRef.current = controller

    const attrMap: Record<string, number> = {}
    attributes.forEach((a) => { attrMap[a.key] = a.value })

    generateBackground(
      {
        worldLine: selectedWorld?.id || 'modern',
        talents: selectedTalents.map((t) => t.name),
        attributes: attrMap,
        gender,
        race,
        customInfo: customInfo || undefined,
        customWorldDescription: customWorldDescription || undefined,
        professionName: selectedProfession?.name || undefined,
        biographySummary: (selectedProfession?.biographySummary || selectedPoliticalPath?.biographySummary) || undefined,
        powerFantasyStyle: selectedPowerFantasy?.name || undefined,
        goldenFinger: selectedPowerFantasy?.goldenFinger || undefined,
        coreTropes: selectedPowerFantasy?.coreTropes || undefined,
        politicalPathName: selectedPoliticalPath?.name || undefined,
        politicalCorePhilosophy: selectedPoliticalPath?.corePhilosophy || undefined,
        romancePartnerName: selectedRomance?.name || undefined,
        romancePersonality: selectedRomance?.personality || undefined,
        romanceStyle: selectedRomance?.romanceStyle || undefined,
      },
      (chunk) => {
        displayRef.current += chunk
        setDisplayBg(displayRef.current)
      },
      (fullText) => {
        setBackground(fullText)
        setDisplayBg(fullText)
        setIsGeneratingBg(false)
        setAge(0)
        handleGenerateEvents(0, controller.signal)
      },
      (err) => {
        console.error('Background generation failed:', err)
        setIsGeneratingBg(false)
        setAge(0)
        handleGenerateEvents(0)
      },
      controller.signal
    )

    return () => controller.abort()
  }, [])

  // Generate game events
  const handleGenerateEvents = useCallback(
    async (fromAge: number, signal?: AbortSignal) => {
      if (!signal) {
        abortRef.current = new AbortController()
        signal = abortRef.current?.signal
      }

      setIsGenerating(true)
      setCurrentDisplay('')

      const attrMap: Record<string, number> = {}
      attributes.forEach((a) => { attrMap[a.key] = a.value })

      const historyText = yearEvents.map((e) => {
        const choiceInfo = e.chosenIndex !== undefined && e.choices
          ? ` [chose: ${e.choices[e.chosenIndex].text}]`
          : ''
        return `[Age ${e.age}] ${e.text}${choiceInfo}`
      })

      generateEvents(
        {
          worldLine: selectedWorld?.id || 'modern',
          currentAge: fromAge,
          maxYears: 10,
          attributes: attrMap,
          talents: selectedTalents.map((t) => t.name),
          acquiredAttributes,
          eventHistory: historyText,
          gender,
          race,
          background,
          choiceHistory: choiceHistory,
          customWorldDescription: customWorldDescription || undefined,
          professionName: selectedProfession?.name || undefined,
          biographySummary: (selectedProfession?.biographySummary || selectedPoliticalPath?.biographySummary) || undefined,
          powerFantasyStyle: selectedPowerFantasy?.name || undefined,
          goldenFinger: selectedPowerFantasy?.goldenFinger || undefined,
          coreTropes: selectedPowerFantasy?.coreTropes || undefined,
          summaryMode: selectedPowerFantasy ? fromAge >= selectedPowerFantasy.summaryStartAge : undefined,
          summaryYearSpan: selectedPowerFantasy?.summaryYearSpan || undefined,
          politicalPathName: selectedPoliticalPath?.name || undefined,
          politicalCorePhilosophy: selectedPoliticalPath?.corePhilosophy || undefined,
          romancePartnerName: selectedRomance?.name || undefined,
          romancePersonality: selectedRomance?.personality || undefined,
          romanceStyle: selectedRomance?.romanceStyle || undefined,
        },
        (chunk) => {
          setCurrentDisplay((prev) => prev + chunk)
        },
        (fullText) => {
          setCurrentDisplay('')
          setIsGenerating(false)
          try {
            const cleaned = fullText
              .replace(/```json/g, '')
              .replace(/```/g, '')
              .trim()
            const parsed = JSON.parse(cleaned)
            if (parsed.events && Array.isArray(parsed.events)) {
              const events: YearEvent[] = parsed.events.map((ev: any) => ({
                age: ev.age || fromAge,
                text: ev.text || '',
                choices: ev.choices && ev.choices.length > 0
                  ? ev.choices.map((c: any) => ({
                      text: typeof c === 'string' ? c : c.text || '',
                      effect: c.effect || '',
                    }))
                  : undefined,
              }))
              addYearEvents(events)
              const lastAge = events[events.length - 1]?.age || fromAge
              setAge(lastAge)
              setLastClickedEventIdx(-1)
              scrollToBottom()
            }
          } catch {
            const fallback: YearEvent = {
              age: fromAge,
              text: fullText,
            }
            addYearEvents([fallback])
            setAge(fromAge + 5)
            setLastClickedEventIdx(-1)
            scrollToBottom()
          }
        },
        (err) => {
          console.error('Event generation failed:', err)
          setIsGenerating(false)
          setAge(fromAge + 5)
          setLastClickedEventIdx(-1)
        },
        signal
      )
    },
    [
      selectedWorld,
      attributes,
      selectedTalents,
      acquiredAttributes,
      gender,
      race,
      background,
      yearEvents,
      choiceHistory,
      setAge,
      setIsGenerating,
      addYearEvents,
      scrollToBottom,
    ]
  )

  // Handle choices
  const handleChoice = (eventIndex: number, choiceIndex: number) => {
    const store = useGameStore.getState()
    store.makeChoice(eventIndex, choiceIndex)

    const event = yearEvents[eventIndex]
    if (event && event.choices) {
      const choice = event.choices[choiceIndex]
      setChoiceHistory((prev) => [
        ...prev,
        {
          age: event.age,
          eventText: event.text,
          chosenText: choice.text,
          effect: choice.effect || '',
        },
      ])
    }

    saveToLocalStorage()
    scrollToBottom()

    // Auto advance to next age after making a choice
    const nextAge = currentAge + 1
    if (nextAge >= maxAge) {
      setAge(maxAge)
      setDead(true)
      setEnding('Natural death')
      saveToLocalStorage()
      setTimeout(() => onReview(), 1500)
      return
    }

    setLastClickedEventIdx(eventIndex)
    handleGenerateEvents(nextAge)
  }

  // Click event card to advance to the next story
  const handleEventClick = (eventIndex: number) => {
    // Ignore clicks while generating
    if (isGenerating || isGeneratingBg) return

    // Only clickable on the latest event card
    if (eventIndex !== yearEvents.length - 1) return

    const event = yearEvents[eventIndex]

    // If there are choices and none chosen yet, can't advance
    if (event.choices && event.chosenIndex === undefined) return

    // Prevent re-clicking the same event that already triggered generation
    if (lastClickedEventIdx === eventIndex) return

    const nextAge = currentAge + 1
    if (nextAge >= maxAge) {
      // Reached maximum age
      setAge(maxAge)
      setDead(true)
      setEnding('Natural death')
      saveToLocalStorage()
      setTimeout(() => onReview(), 1500)
      return
    }

    setLastClickedEventIdx(eventIndex)
    handleGenerateEvents(nextAge)
    scrollToBottom()
  }

  // Death event
  const handleDeath = () => {
    setDead(true)
    const deathEvent: YearEvent = {
      age: currentAge,
      text: `At ${currentAge} years old, your life has reached its end.`,
    }
    addYearEvents([deathEvent])
    saveToLocalStorage()

    setTimeout(() => {
      onReview()
    }, 2000)
  }

  // Check if event card is clickable
  const isEventClickable = (eventIndex: number) => {
    if (isGenerating || isGeneratingBg) return false
    if (eventIndex !== yearEvents.length - 1) return false
    const event = yearEvents[eventIndex]
    if (event.choices && event.chosenIndex === undefined) return false
    if (lastClickedEventIdx === eventIndex) return false
    return true
  }

  const getAttrColor = (val: number) => {
    if (val >= 7) return '#f59e0b'
    if (val >= 4) return '#4ade80'
    return '#8888aa'
  }

  return (
    <div className="min-h-screen px-4 py-6 max-w-3xl mx-auto">
      {/* Character info header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-4 p-3 card"
        style={{ borderColor: 'var(--border-accent)' }}
      >
        <div className="flex items-center gap-3">
          <WorldIcon world={selectedWorld} imgClassName="inline-block w-8 h-8 rounded-lg object-cover" />
          <div>
            <span className="font-semibold">{selectedPowerFantasy ? selectedPowerFantasy.name : selectedPoliticalPath ? selectedPoliticalPath.name : selectedProfession ? selectedProfession.name : selectedRomance ? `Romance with 「${selectedRomance.name}」` : selectedWorld?.name}</span>
            {selectedProfession && (
              <div className="text-[10px] text-[#666688]">Based on · Modern City</div>
            )}
            {selectedPowerFantasy && (
              <div className="text-[10px] text-[#ff6f00]">🔥 Power Fantasy · {selectedPowerFantasy.goldenFinger.slice(0, 20)}...</div>
            )}
            {selectedPoliticalPath && (
              <div className="text-[10px] text-[#1565c0]">🏛️ {selectedPoliticalPath.corePhilosophy.slice(0, 24)}...</div>
            )}
            {selectedRomance && (
              <div className="text-[10px] text-[#ec407a]">💕 {selectedRomance.name} · {selectedRomance.personality.slice(0, 20)}...</div>
            )}
            <div className="text-xs text-[#666688]">
              {gender} · {race} · {currentAge} yrs / {maxAge} yrs
            </div>
          </div>
        </div>
        <div className="flex gap-2 text-xs">
          {attributes.map((attr) => {
            const def = selectedWorld?.attributes.find((a) => a.key === attr.key)
            return (
              <span key={attr.key} style={{ color: getAttrColor(attr.value) }}>
                {def?.icon}{attr.value}
              </span>
            )
          })}
        </div>
      </motion.div>

      {/* Background story display */}
      {displayBg && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 p-4 card"
          style={{
            borderColor: 'rgba(167, 139, 250, 0.3)',
            background: 'rgba(167, 139, 250, 0.05)',
            fontFamily: "'Noto Serif SC', serif",
          }}
        >
          <div className="text-xs text-[#a78bfa] mb-2">📜 Background Story</div>
          <div className="text-sm leading-relaxed">
            {displayBg}
            {isGeneratingBg && <span className="typewriter" />}
          </div>
        </motion.div>
      )}

      {/* Event stream */}
      <div className="space-y-3">
        {yearEvents.map((event, idx) => {
          const clickable = isEventClickable(idx)
          const isLast = idx === yearEvents.length - 1
          const hasChoicePending = event.choices && event.chosenIndex === undefined

          return (
            <motion.div
              key={`${event.age}-${idx}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`event-card ${clickable ? 'cursor-pointer hover:border-[#a78bfa] hover:shadow-lg hover:shadow-purple-900/20' : ''} ${isLast && !hasChoicePending && !isGenerating ? 'ring-1 ring-purple-500/30' : ''}`}
              onClick={() => clickable && handleEventClick(idx)}
              style={{
                transition: 'all 0.2s ease',
                ...(clickable ? { borderColor: 'rgba(167, 139, 250, 0.3)' } : {}),
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{
                    background: 'rgba(124, 92, 191, 0.2)',
                    color: '#a78bfa',
                  }}
                >
                  {event.age} yrs
                </span>
                {event.chosenIndex !== undefined && (
                  <span className="text-xs text-green-400">✓ Chosen</span>
                )}
                {clickable && (
                  <span className="text-xs text-purple-400 ml-auto animate-pulse">Click to continue ▶</span>
                )}
              </div>

              <p className="text-sm leading-relaxed mb-3">{event.text}</p>

              {/* Selected choice display */}
              {event.chosenIndex !== undefined && event.choices && (
                <div className="mt-2 p-2 rounded-lg bg-green-900/10 border border-green-900/20">
                  <span className="text-xs text-green-400">
                    You chose: {event.choices[event.chosenIndex].text}
                  </span>
                  {event.choices[event.chosenIndex].effect && (
                    <span className="block text-xs text-green-300/70 mt-0.5">
                      ↳ {event.choices[event.chosenIndex].effect}
                    </span>
                  )}
                </div>
              )}

              {/* Choice branches */}
              {event.choices && event.chosenIndex === undefined && isLast && (
                <div className="space-y-2 mt-3 pt-3 border-t border-[#2a2a4a]">
                  <p className="text-xs text-[#8888aa] mb-2">What will you do?</p>
                  {event.choices.map((choice, ci) => (
                    <button
                      key={ci}
                      className="choice-btn w-full"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleChoice(idx, ci)
                      }}
                    >
                      <span className="text-[#a78bfa] mr-2">{['A', 'B', 'C'][ci]}.</span>
                      {choice.text}
                      {choice.effect && (
                        <span className="block text-xs text-[#666688] mt-0.5 ml-5">
                          {choice.effect}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          )
        })}

        {/* SSE streaming generation placeholder */}
        {isGenerating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="event-card"
          >
            {currentDisplay ? (
              <p className="text-sm leading-relaxed">{currentDisplay}</p>
            ) : (
              <div className="flex items-center gap-2 text-[#8888aa]">
                <span className="w-2 h-2 rounded-full bg-[#a78bfa] animate-pulse" />
                <span className="w-2 h-2 rounded-full bg-[#a78bfa] animate-pulse" style={{ animationDelay: '0.2s' }} />
                <span className="w-2 h-2 rounded-full bg-[#a78bfa] animate-pulse" style={{ animationDelay: '0.4s' }} />
                <span className="text-xs ml-1">Fate is weaving...</span>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Bottom action area - simplified to just save and end */}
      {!isGenerating && !isGeneratingBg && !isDead && yearEvents.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 space-y-3"
        >
          {/* Hint text - inform user to click card to continue */}
          <div className="text-center text-xs text-[#555577] mb-2">
            💡 Click the latest event card to continue your story
          </div>

          {currentAge + 1 >= maxAge && !isDead && (
            <button
              className="btn-primary w-full text-lg py-4"
              onClick={() => {
                setAge(maxAge)
                setDead(true)
                setEnding('Natural death')
                saveToLocalStorage()
                setTimeout(() => onReview(), 1500)
              }}
            >
              ⏳ Live out the rest...
            </button>
          )}

          <div className="flex gap-3">
            <button
              className="btn-ghost flex-1 btn-sm"
              onClick={() => {
                saveToLocalStorage()
                alert('Game saved!')
              }}
            >
              💾 Save
            </button>
            <button
              className="btn-ghost flex-1 btn-sm"
              style={{ borderColor: 'rgba(248, 113, 113, 0.3)', color: '#f87171' }}
              onClick={() => {
                if (confirm('Are you sure you want to end your character\'s life?')) {
                  setEnding('Chose to end it')
                  setDead(true)
                  handleDeath()
                }
              }}
            >
              ✖ End life
            </button>
          </div>
        </motion.div>
      )}

      <div ref={bottomRef} />
    </div>
  )
}
