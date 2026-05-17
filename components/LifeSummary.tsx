'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useGameStore } from '@/store/gameStore'
import { WorldIcon } from '@/components/WorldIcon'
import { generateReview } from '@/lib/api'
import type { GameReview } from '@/store/gameStore'

export default function LifeSummary({
  onRestart,
}: {
  onRestart: () => void
}) {
  const selectedWorld = useGameStore((s) => s.selectedWorld)
  const currentAge = useGameStore((s) => s.currentAge)
  const lifespan = useGameStore((s) => s.lifespan)
  const ending = useGameStore((s) => s.ending)
  const yearEvents = useGameStore((s) => s.yearEvents)
  const attributes = useGameStore((s) => s.attributes)
  const selectedTalents = useGameStore((s) => s.selectedTalents)
  const gender = useGameStore((s) => s.gender)
  const race = useGameStore((s) => s.race)
  const background = useGameStore((s) => s.background)
  const review = useGameStore((s) => s.review)
  const setReview = useGameStore((s) => s.setReview)
  const saveToLocalStorage = useGameStore((s) => s.saveToLocalStorage)

  const [isGenerating, setIsGenerating] = useState(!review)
  const [summaryText, setSummaryText] = useState('')
  const [highlights, setHighlights] = useState<string[]>([])
  const [scores, setScores] = useState({ drama: 0, achievement: 0, impact: 0 })
  const [rating, setRating] = useState('')
  const [tagline, setTagline] = useState('')
  const [scoreAnim, setScoreAnim] = useState(false)

  const displayRef = useRef('')

  // Generate life summary
  useEffect(() => {
    if (review) {
      setHighlights(review.highlights)
      setScores(review.scores)
      setRating(review.rating)
      setTagline(review.tagline)
      setIsGenerating(false)
      return
    }

    const attrMap: Record<string, number> = {}
    attributes.forEach((a) => { attrMap[a.key] = a.value })

    const lifeEvents = yearEvents.map((e) => `[Age ${e.age}] ${e.text}`)
    const lifeSummary = yearEvents.map((e) => e.text).join('\n')

    const finalAge = lifespan || currentAge

    generateReview(
      {
        worldLine: selectedWorld?.id || 'modern',
        lifespan: finalAge,
        ending: ending || 'Ordinary ending',
        scores: { drama: 0, achievement: 0, impact: 0 },
        lifeSummary,
        yearEvents: lifeEvents,
        attributes: attrMap,
        talents: selectedTalents.map((t) => t.name),
        gender,
        race,
      },
      (chunk) => {
        displayRef.current += chunk
        setSummaryText(displayRef.current)
      },
      (fullText) => {
        setIsGenerating(false)
        // Try to parse JSON
        try {
          const cleaned = fullText
            .replace(/```json/g, '')
            .replace(/```/g, '')
            .trim()
          const parsed = JSON.parse(cleaned)
          const newReview: GameReview = {
            highlights: parsed.highlights || [],
            scores: parsed.scores || { drama: 0, achievement: 0, impact: 0 },
            rating: parsed.rating || 'B',
            tagline: parsed.tagline || 'An ordinary life',
          }
          setReview(newReview)
          setHighlights(newReview.highlights)
          setScores(newReview.scores)
          setRating(newReview.rating)
          setTagline(newReview.tagline)

          // Auto-save
          saveToLocalStorage()

          // Animation trigger
          setTimeout(() => setScoreAnim(true), 300)
        } catch {
          // If parsing fails, use full text as summary
          setSummaryText(fullText)
          setTimeout(() => setScoreAnim(true), 300)
        }
      },
      (err) => {
        console.error('Summary generation failed:', err)
        setIsGenerating(false)
        setRating('B')
        setTagline('An ordinary life')
        setTimeout(() => setScoreAnim(true), 300)
      }
    )
  }, [])

  const getRatingColor = (r: string) => {
    if (r.startsWith('S')) return '#f59e0b'
    if (r === 'A+' || r === 'A') return '#a855f7'
    if (r === 'A-') return '#5090f0'
    if (r === 'B+') return '#4ade80'
    if (r === 'B') return '#8888aa'
    return '#666688'
  }

  const getScoreColor = (val: number) => {
    if (val >= 80) return 'linear-gradient(90deg, #f59e0b, #f0c040)'
    if (val >= 60) return 'linear-gradient(90deg, #a855f7, #7c5cbf)'
    if (val >= 40) return 'linear-gradient(90deg, #5090f0, #60a5fa)'
    if (val >= 20) return 'linear-gradient(90deg, #4ade80, #22d3ee)'
    return '#8888aa'
  }

  const getScoreEmoji = (label: string) => {
    switch (label) {
      case 'drama': return '🎭'
      case 'achievement': return '🏆'
      case 'impact': return '🌟'
      default: return '📊'
    }
  }

  const getScoreLabel = (label: string) => {
    switch (label) {
      case 'drama': return 'Drama'
      case 'achievement': return 'Achievement'
      case 'impact': return 'Impact'
      default: return label
    }
  }

  return (
    <div className="min-h-screen px-4 py-8 max-w-2xl mx-auto">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Life Summary</h1>
        <p className="text-[#8888aa]">
          <WorldIcon world={selectedWorld} imgClassName="inline-block w-5 h-5 rounded object-cover mr-1" /> {selectedWorld?.name}
        </p>
      </motion.div>

      {/* Rating tier */}
      {rating && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: 'spring' }}
          className="text-center mb-8"
        >
          <div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl"
            style={{
              background: `${getRatingColor(rating)}15`,
              border: `1px solid ${getRatingColor(rating)}40`,
            }}
          >
            <span
              className="text-4xl font-black"
              style={{ color: getRatingColor(rating) }}
            >
              {rating}
            </span>
            {tagline && (
              <span className="text-sm text-[#8888aa] max-w-[200px]">
                {tagline}
              </span>
            )}
          </div>
        </motion.div>
      )}

      {/* Character info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card mb-6"
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="font-semibold">{gender} · {race}</span>
            <div className="text-xs text-[#666688] mt-0.5">
              Lived {lifespan || currentAge} yrs · Ending: {ending || 'Unknown'}
            </div>
          </div>
          <WorldIcon world={selectedWorld} imgClassName="inline-block w-8 h-8 rounded-lg object-cover" />
        </div>
        <div className="flex flex-wrap gap-2">
          {attributes.map((attr) => {
            const def = selectedWorld?.attributes.find((a) => a.key === attr.key)
            return (
              <span key={attr.key} className="text-xs px-2 py-1 rounded-full bg-[#16213e] border border-[#2a2a4a]">
                {def?.icon} {def?.name}: {attr.value}
              </span>
            )
          })}
        </div>
        {selectedTalents.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {selectedTalents.map((t) => (
              <span key={t.id} className="text-xs px-2 py-0.5 rounded-full" style={{
                background: t.rarity === 'orange' ? 'rgba(245,158,11,0.15)' : t.rarity === 'purple' ? 'rgba(168,85,247,0.15)' : 'rgba(80,144,240,0.15)',
                color: t.rarity === 'orange' ? '#f59e0b' : t.rarity === 'purple' ? '#a855f7' : '#5090f0',
                border: `1px solid ${t.rarity === 'orange' ? 'rgba(245,158,11,0.3)' : t.rarity === 'purple' ? 'rgba(168,85,247,0.3)' : 'rgba(80,144,240,0.3)'}`,
              }}>
                {t.name}
              </span>
            ))}
          </div>
        )}
      </motion.div>

      {/* Rating bars */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="space-y-4 mb-6"
      >
        {['drama', 'achievement', 'impact'].map((key, idx) => {
          const val = scores[key as keyof typeof scores]
          return (
            <div key={key} className="card">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold flex items-center gap-2">
                  <span>{getScoreEmoji(key)}</span>
                  {getScoreLabel(key)}
                </span>
                <span
                  className="text-lg font-bold"
                  style={{ color: val >= 80 ? '#f59e0b' : val >= 60 ? '#a855f7' : '#8888aa' }}
                >
                  {scoreAnim ? val : 0}
                </span>
              </div>
              <div className="score-bar">
                <motion.div
                  className="score-bar-fill"
                  initial={{ width: 0 }}
                  animate={{ width: scoreAnim ? `${val}%` : 0 }}
                  transition={{ duration: 1.5, delay: 1 + idx * 0.3, ease: 'easeOut' }}
                  style={{ background: getScoreColor(val) }}
                />
              </div>
            </div>
          )
        })}
      </motion.div>

      {/* Highlights */}
      {highlights.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
          className="mb-6"
        >
          <h2 className="text-lg font-semibold mb-3">✨ Life Highlights</h2>
          <div className="space-y-2">
            {highlights.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2 + i * 0.2 }}
                className="card flex items-start gap-3"
              >
                <span className="text-lg mt-0.5">🌟</span>
                <p className="text-sm text-[#c0c0d0]">{h}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Life retrospective */}
      {background && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="mb-6"
        >
          <h2 className="text-lg font-semibold mb-3">📜 Full Life Review</h2>
          <div
            className="card text-sm leading-relaxed"
            style={{
              fontFamily: "'Noto Serif SC', serif",
              maxHeight: '300px',
              overflowY: 'auto',
            }}
          >
            <p className="mb-3">{background}</p>
            {yearEvents.map((event, i) => (
              <p key={i} className="mb-2">
                <span
                  className="text-xs font-bold px-1.5 py-0.5 rounded"
                  style={{
                    background: 'rgba(124, 92, 191, 0.2)',
                    color: '#a78bfa',
                  }}
                >
                  {event.age} yrs
                </span>{' '}
                {event.text}
                {event.chosenIndex !== undefined && event.choices && (
                  <span className="text-xs text-green-400 ml-1">
                    (chose「{event.choices[event.chosenIndex]?.text}」)
                  </span>
                )}
              </p>
            ))}
          </div>
        </motion.div>
      )}

      {/* AI generation placeholder */}
      {isGenerating && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-3 h-3 rounded-full bg-[#a78bfa] animate-pulse" />
            <span className="w-3 h-3 rounded-full bg-[#a78bfa] animate-pulse" style={{ animationDelay: '0.2s' }} />
            <span className="w-3 h-3 rounded-full bg-[#a78bfa] animate-pulse" style={{ animationDelay: '0.4s' }} />
          </div>
          <p className="text-sm text-[#8888aa]">Writing your life summary...</p>
          {summaryText && (
            <div className="mt-4 text-sm text-left card">
              {summaryText}
            </div>
          )}
        </motion.div>
      )}

      {/* Restart button */}
      {!isGenerating && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          className="text-center mt-8"
        >
          <button
            className="btn-primary text-lg px-10 py-4"
            onClick={onRestart}
          >
            🔄 Start a new life
          </button>
        </motion.div>
      )}
    </div>
  )
}
