'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '@/store/gameStore'
import WorldSelection from '@/components/WorldSelection'
import AttrAllocation from '@/components/AttrAllocation'
import TalentSelection from '@/components/TalentSelection'
import GenderRaceSelection from '@/components/GenderRaceSelection'
import GamePlay from '@/components/GamePlay'
import LifeSummary from '@/components/LifeSummary'
import { GAME_CONFIG } from '@/data/config'
import type { GamePhase } from '@/data/config'

export default function GamePage() {
  const router = useRouter()
  const phase = useGameStore((s) => s.phase)
  const setPhase = useGameStore((s) => s.setPhase)
  const selectedWorld = useGameStore((s) => s.selectedWorld)
  const resetGame = useGameStore((s) => s.resetGame)
  const loadFromLocalStorage = useGameStore((s) => s.loadFromLocalStorage)
  const attributes = useGameStore((s) => s.attributes)

  const [gamePhase, setGamePhase] = useState<GamePhase>('idle')
  const [hasSave, setHasSave] = useState(false)

  // Initialize - attempt to load save
  useEffect(() => {
    if (loadFromLocalStorage()) {
      setGamePhase(useGameStore.getState().phase)
      setHasSave(true)
    } else if (!selectedWorld) {
      setGamePhase('idle')
    } else {
      setGamePhase(phase)
    }
  }, [])

  // Sync store phase to local state
  useEffect(() => {
    setGamePhase(phase)
  }, [phase])

  const handlePhaseTransition = (nextPhase: GamePhase) => {
    setPhase(nextPhase)
    setGamePhase(nextPhase)
  }

  // Phase transitions
  const handleAttrNext = () => handlePhaseTransition('talents')
  const handleTalentNext = () => handlePhaseTransition('playing')
  const handleTalentBack = () => handlePhaseTransition('attributes')
  const handleGenderBack = () => handlePhaseTransition('talents')
  const handleGenderNext = () => {
    handlePhaseTransition('playing')
  }

  // After world selection, skip gender/race and go directly to attribute allocation
  const originalSelectWorld = useGameStore.getState().selectWorld
  const handleWorldSelected = () => {
    // selectWorld already handles phase change
    const s = useGameStore.getState()
    if (s.selectedWorld) {
      handlePhaseTransition('attributes')
    }
  }

  // Check if all selections are complete
  const allAttributesAssigned = () => {
    const remaining = GAME_CONFIG.totalAttributePoints - attributes.reduce((s, a) => s + a.value, 0)
    return remaining <= GAME_CONFIG.totalAttributePoints
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToTop()
  }, [gamePhase])

  return (
    <div className="min-h-screen bg-[#050914] text-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-4 rounded-[28px] border border-white/10 bg-white/5 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300/80">AI Life Replay</p>
            <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl">Replay a life, then support the project if you enjoy it.</h1>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-300">
              Choose a world, assign attributes, roll talents, and see how your story unfolds across different timelines.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://ko-fi.com/yuanyu20100"
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-full border border-cyan-200/30 bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-950/30 transition hover:bg-cyan-200 hover:text-slate-950"
            >
              ☕ Support on Ko-fi
            </a>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* World Selection */}
        {gamePhase === 'idle' && (
          <motion.div
            key="world-selection"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <WorldSelection />
          </motion.div>
        )}

        {/* Attribute Allocation */}
        {gamePhase === 'attributes' && (
          <motion.div
            key="attr-allocation"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <AttrAllocation onNext={handleAttrNext} />
          </motion.div>
        )}

        {/* Talent Selection */}
        {gamePhase === 'talents' && (
          <motion.div
            key="talent-selection"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <TalentSelection onNext={() => handlePhaseTransition('playing')} onBack={() => handlePhaseTransition('attributes')} />
          </motion.div>
        )}

        {/* Game Playing */}
        {gamePhase === 'playing' && (
          <motion.div
            key="game-play"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <GamePlay onReview={() => handlePhaseTransition('review')} />
          </motion.div>
        )}

        {/* Life Summary */}
        {gamePhase === 'review' && (
          <motion.div
            key="life-summary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LifeSummary onRestart={() => {
              resetGame()
              setGamePhase('idle')
            }} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
