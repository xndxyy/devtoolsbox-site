'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '@/store/gameStore'
import type { Talent } from '@/data/talents'

export default function TalentSelection({
  onNext,
  onBack,
}: {
  onNext: () => void
  onBack: () => void
}) {
  const drawnTalents = useGameStore((s) => s.drawnTalents)
  const selectedTalents = useGameStore((s) => s.selectedTalents)
  const drawTalents = useGameStore((s) => s.drawTalents)
  const toggleTalent = useGameStore((s) => s.toggleTalent)

  const [drawAnimation, setDrawAnimation] = useState(false)
  const [remainingDraws, setRemainingDraws] = useState(3)

  useEffect(() => {
    if (drawnTalents.length === 0) {
      handleDraw()
    }
  }, [])

  const handleDraw = useCallback(() => {
    if (remainingDraws <= 0) return
    setDrawAnimation(true)
    drawTalents()
    setRemainingDraws((r) => r - 1)
    setTimeout(() => setDrawAnimation(false), 500)
  }, [remainingDraws, drawTalents])

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'orange': return { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.4)', text: '#f59e0b', label: 'Legendary' }
      case 'purple': return { bg: 'rgba(168, 85, 247, 0.15)', border: 'rgba(168, 85, 247, 0.4)', text: '#a855f7', label: 'Epic' }
      case 'blue': return { bg: 'rgba(80, 144, 240, 0.15)', border: 'rgba(80, 144, 240, 0.4)', text: '#5090f0', label: 'Rare' }
      default: return { bg: 'rgba(192, 192, 208, 0.1)', border: 'rgba(192, 192, 208, 0.2)', text: '#c0c0d0', label: 'Common' }
    }
  }

  const isSelected = (talent: Talent) => selectedTalents.some((t) => t.id === talent.id)
  const canSelect = selectedTalents.length < 3
  const hasMutexConflict = (talent: Talent) => {
    if (!talent.mutexGroup) return false
    return selectedTalents.some((t) => t.mutexGroup && t.mutexGroup === talent.mutexGroup)
  }

  return (
    <div className="min-h-screen px-4 py-8 max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <h1 className="text-2xl font-bold mb-2">Choose talents</h1>
        <p className="text-sm text-[#8888aa]">
          Selected {selectedTalents.length}/3 &nbsp;|&nbsp; Remaining redraws: {remainingDraws}
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={drawnTalents.map((t) => t.id).join(',')}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="space-y-3"
        >
          {drawnTalents.map((talent, idx) => {
            const colors = getRarityColor(talent.rarity)
            const selected = isSelected(talent)
            const conflict = hasMutexConflict(talent)

            return (
              <motion.div
                key={talent.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`talent-card ${selected ? 'selected' : ''}`}
                style={{
                  borderColor: selected ? colors.border : undefined,
                  background: selected ? colors.bg : undefined,
                }}
                onClick={() => {
                  if (conflict) return
                  if (selected) {
                    toggleTalent(talent)
                  } else if (canSelect) {
                    toggleTalent(talent)
                  }
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <span className="font-semibold">{talent.name}</span>
                      <span
                        className="rounded-full border px-2 py-0.5 text-xs"
                        style={{
                          background: colors.bg,
                          color: colors.text,
                          borderColor: colors.border,
                        }}
                      >
                        {colors.label}
                      </span>
                    </div>
                    <p className="text-sm text-[#cbd5e1]">{talent.description}</p>
                    {talent.effects && talent.effects.length > 0 && (
                      <div className="mt-2 space-y-0.5">
                        {talent.effects.map((eff: any, i: number) => (
                          <p key={i} className="text-xs text-slate-400">
                            {eff.type === 'passive' ? 'Passive' : 'Active'}: {eff.description}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="ml-3 flex items-center">
                    {selected ? (
                      <span className="text-xl text-green-400">✓</span>
                    ) : (
                      <span className={`text-2xl font-bold ${canSelect && !conflict ? 'text-cyan-300' : 'text-slate-500'}`}>
                        +
                      </span>
                    )}
                  </div>
                </div>
                {conflict && (
                  <p className="mt-1 text-xs text-red-400">This talent conflicts with one you already selected.</p>
                )}
              </motion.div>
            )
          })}
        </motion.div>
      </AnimatePresence>

      <div className="mt-6 space-y-3">
        <div className="flex gap-3">
          <button
            className="btn-ghost flex-1"
            onClick={handleDraw}
            disabled={remainingDraws <= 0 || drawAnimation}
            style={{ opacity: remainingDraws <= 0 ? 0.4 : 1 }}
          >
            🎲 Redraw ({remainingDraws})
          </button>
          <button
            className="btn-primary flex-1"
            onClick={onNext}
            disabled={selectedTalents.length === 0}
            style={{ opacity: selectedTalents.length === 0 ? 0.55 : 1 }}
          >
            Confirm selection →
          </button>
        </div>

        <div className="text-center">
          <button className="btn-ghost btn-sm text-xs text-slate-200" onClick={onBack}>
            ← Back to world selection
          </button>
        </div>

        {selectedTalents.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card mt-6 p-4"
            style={{ borderColor: 'var(--border-accent)' }}
          >
            <h3 className="mb-2 text-sm font-semibold text-[#a78bfa]">Selected talents</h3>
            <div className="flex flex-wrap gap-2">
              {selectedTalents.map((t) => {
                const colors = getRarityColor(t.rarity)
                return (
                  <span
                    key={t.id}
                    className="rounded-full border px-2.5 py-1 text-xs"
                    style={{
                      background: colors.bg,
                      color: colors.text,
                      borderColor: colors.border,
                    }}
                  >
                    {t.name}
                    <button
                      className="ml-1.5 opacity-70 hover:opacity-100"
                      onClick={() => toggleTalent(t)}
                    >
                      ×
                    </button>
                  </span>
                )
              })}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
