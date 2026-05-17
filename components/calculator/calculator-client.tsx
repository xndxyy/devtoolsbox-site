'use client'

import { useMemo, useState } from 'react'
import { calculateResult, type CalculatorDefinition } from '@/lib/calculator/calculators'

type Props = {
  calculator: CalculatorDefinition
}

function getDecimals(step: number) {
  const s = String(step)
  return s.includes('.') ? s.split('.')[1].length : 0
}

function formatNumber(value: number, decimals: number) {
  if (decimals === 0) return String(Math.round(value))
  return value.toFixed(decimals)
}

export function CalculatorClient({ calculator }: Props) {
  // Store raw string input; empty string means the user hasn't typed anything yet
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(calculator.fields.map((field) => [field.id, ''])),
  )

  // Only compute the result when every field has a non-empty, finite numeric value
  const parsed = useMemo(() => {
    const numeric: Record<string, number> = {}
    for (const field of calculator.fields) {
      const raw = values[field.id]
      if (!raw || raw.trim() === '') return null
      const n = Number(raw)
      if (!Number.isFinite(n)) return null
      numeric[field.id] = n
    }
    return numeric
  }, [calculator.fields, values])

  const result = parsed ? calculateResult(calculator.slug, parsed) : null

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.12fr)_minmax(320px,0.88fr)]">
      <section className="rounded-[28px] border border-white/10 bg-white/5 p-5 shadow-2xl shadow-black/20 sm:p-6">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300/80">Interactive estimator</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Adjust your numbers</h2>
          </div>
          <button
            type="button"
            onClick={() =>
              setValues(Object.fromEntries(calculator.fields.map((field) => [field.id, ''])))
            }
            className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:border-cyan-300/50 hover:text-white"
          >
            Reset defaults
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {calculator.fields.map((field) => (
            <label
              key={field.id}
              className="rounded-2xl border border-white/8 bg-[#0f172a]/75 p-4 transition hover:border-cyan-300/30"
            >
              <span className="block text-sm font-medium text-white">{field.label}</span>
              <span className="mt-1 block text-xs leading-6 text-slate-400">{field.help}</span>
              <div className="mt-3 flex items-center rounded-2xl border border-white/10 bg-black/20 px-3 py-3 focus-within:border-cyan-300/40">
                {field.prefix ? <span className="mr-2 text-slate-400">{field.prefix}</span> : null}
                <input
                  type="number"
                  step={field.step ?? 1}
                  min={field.min}
                  max={field.max}
                  value={values[field.id] ?? ''}
                  onChange={(event) => {
                    setValues((current) => ({
                      ...current,
                      [field.id]: event.target.value,
                    }))
                  }}
                  className="w-full bg-transparent text-base text-white outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />
                {field.suffix ? <span className="ml-2 text-slate-400">{field.suffix}</span> : null}
              </div>
            </label>
          ))}
        </div>
      </section>

      <aside className="space-y-5">
        {result ? (
          <section className="rounded-[28px] border border-cyan-400/20 bg-gradient-to-br from-cyan-500/15 via-blue-500/10 to-violet-500/15 p-6 shadow-2xl shadow-cyan-950/20">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200/90">Estimated result</p>
            <div className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">{result.mainValue}</div>
            <p className="mt-3 text-base text-cyan-100/90">{result.subValue}</p>
            <div className="mt-6 grid gap-3">
              {result.summaries.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-2xl border border-white/8 bg-[#07111f]/55 px-4 py-3"
                >
                  <span className="text-sm text-slate-300">{item.label}</span>
                  <span
                    className={[
                      'text-sm font-semibold',
                      item.tone === 'positive'
                        ? 'text-emerald-300'
                        : item.tone === 'warning'
                          ? 'text-amber-300'
                          : 'text-white',
                    ].join(' ')}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <section className="rounded-[28px] border border-white/10 bg-white/5 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200/90">Estimated result</p>
            <p className="mt-4 text-2xl font-semibold tracking-tight text-slate-400 sm:text-3xl">
              Fill in the fields above to see the estimated result
            </p>
          </section>
        )}

        <section className="rounded-[28px] border border-white/10 bg-white/5 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-200/90">Monetization note</p>
          <h3 className="mt-2 text-xl font-semibold text-white">Want to support this free tool?</h3>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            If this calculator saved you time, consider supporting the project on Ko-fi.
          </p>
          <a
            href="https://ko-fi.com/creatornumbers"
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:translate-y-[-1px]"
          >
            Open Ko-fi
          </a>
        </section>
      </aside>
    </div>
  )
}
