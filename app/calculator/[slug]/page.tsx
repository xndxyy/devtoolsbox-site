import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { CalculatorClient } from '@/components/calculator/calculator-client'
import { SiteFooter, SiteHeader } from '@/components/calculator/site-shell'
import { calculatorMap, calculators } from '@/lib/calculator/calculators'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return calculators.map((calculator) => ({ slug: calculator.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const calculator = calculatorMap[slug]

  if (!calculator) {
    return {
      title: 'Calculator not found',
    }
  }

  return {
    title: calculator.seoTitle,
    description: calculator.seoDescription,
    alternates: {
      canonical: `/calculator/${calculator.slug}`,
    },
    openGraph: {
      title: calculator.seoTitle,
      description: calculator.seoDescription,
      type: 'website',
      url: `/calculator/${calculator.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: calculator.seoTitle,
      description: calculator.seoDescription,
    },
  }
}

export default async function CalculatorPage({ params }: Props) {
  const { slug } = await params
  const calculator = calculatorMap[slug]

  if (!calculator) {
    notFound()
  }

  const related = calculators.filter((item) => item.slug !== calculator.slug).slice(0, 3)

  return (
    <div className="min-h-screen bg-[#060b16] text-slate-100">
      <SiteHeader />

      <main id="main-content" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <nav className="mb-8 text-sm text-slate-400">
          <Link href="/" className="transition hover:text-white">
            Home
          </Link>{' '}
          /{' '}
          <Link href="/calculator" className="transition hover:text-white">
            Calculators
          </Link>{' '}
          / <span className="text-slate-200">{calculator.name}</span>
        </nav>

        <section className="rounded-[34px] border border-white/10 bg-gradient-to-br from-cyan-500/12 via-blue-500/10 to-violet-500/10 p-7 sm:p-10">
          <div className="max-w-4xl">
            <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
              {calculator.category}
            </span>
            <h1 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl">{calculator.name}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-200">{calculator.hero}</p>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">{calculator.intro}</p>
          </div>
        </section>

        <section className="mt-10">
          <CalculatorClient calculator={calculator} />
        </section>

        <section className="mt-14 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="rounded-[28px] border border-white/10 bg-white/5 p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300/80">How it works</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">Formula and assumptions</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">{calculator.description}</p>
            <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-200">
              {calculator.formula.map((item) => (
                <li key={item} className="rounded-2xl border border-white/8 bg-[#0b1425] px-4 py-3">
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-[28px] border border-white/10 bg-white/5 p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-200/90">Examples</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">When creators use this calculator</h2>
            <div className="mt-6 space-y-4">
              {calculator.examples.map((example) => (
                <div key={example.title} className="rounded-2xl border border-white/8 bg-[#0b1425] p-4">
                  <h3 className="text-base font-semibold text-white">{example.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-300">{example.description}</p>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="mt-14 grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <article className="rounded-[28px] border border-white/10 bg-white/5 p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300/80">FAQ</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">Common questions</h2>
            <div className="mt-6 space-y-4">
              {calculator.faqs.map((faq) => (
                <details key={faq.question} className="rounded-2xl border border-white/8 bg-[#0b1425] p-4">
                  <summary className="cursor-pointer list-none text-base font-semibold text-white">
                    {faq.question}
                  </summary>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{faq.answer}</p>
                </details>
              ))}
            </div>
          </article>

          <aside className="space-y-6">
            <section className="rounded-[28px] border border-white/10 bg-white/5 p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-200/90">Related calculators</p>
              <h2 className="mt-3 text-2xl font-semibold text-white">Keep exploring</h2>
              <div className="mt-6 space-y-4">
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/calculator/${item.slug}`}
                    className="block rounded-2xl border border-white/8 bg-[#0b1425] p-4 transition hover:border-cyan-300/30 hover:bg-[#0e1930]"
                  >
                    <h3 className="text-base font-semibold text-white">{item.name}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-300">{item.hero}</p>
                  </Link>
                ))}
              </div>
            </section>

            <section className="rounded-[28px] border border-white/10 bg-white/5 p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300/80">Explore the library</p>
              <h2 className="mt-3 text-2xl font-semibold text-white">Need a different calculator?</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                Browse the full calculator index to compare creator platforms and pricing tools in one place.
              </p>
              <Link
                href="/calculator"
                className="mt-5 inline-flex rounded-full border border-cyan-300/30 px-5 py-3 text-sm font-semibold text-cyan-200 transition hover:border-cyan-300/50 hover:text-white"
              >
                Open all calculators
              </Link>
            </section>
          </aside>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
