import type { Metadata } from 'next'
import { SiteFooter, SiteHeader } from '@/components/calculator/site-shell'

export const metadata: Metadata = {
  title: 'About Creator Numbers',
  description:
    'Learn what Creator Numbers is, who it is for, and how these free creator fee calculators are designed.',
  alternates: {
    canonical: '/about',
  },
}

const principles = [
  {
    title: 'Useful before beautiful spreadsheets',
    body: 'The goal is to make pricing and fee decisions fast, without forcing creators into complex templates or sign-up walls.',
  },
  {
    title: 'Independent and lightweight',
    body: 'Creator Numbers is built as a simple planning layer, not an official platform partner or a financial advisory product.',
  },
  {
    title: 'Focused on realistic take-home pay',
    body: 'The calculators are designed around what creators actually care about: net earnings after platform cuts, payment fees, and delivery costs.',
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#060b16] text-slate-100">
      <SiteHeader />

      <main id="main-content" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <section className="rounded-[34px] border border-white/10 bg-gradient-to-br from-cyan-500/12 via-blue-500/10 to-violet-500/10 p-7 sm:p-10">
          <div className="max-w-4xl">
            <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
              About Creator Numbers
            </span>
            <h1 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl">Free planning tools for creator income decisions.</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-200">
              Creator Numbers exists to help creators, sellers, and freelancers understand their actual take-home pay before they launch a product, raise a rate, or commit to a platform.
            </p>
          </div>
        </section>

        <section className="mt-10 grid gap-5 md:grid-cols-3">
          {principles.map((item) => (
            <article key={item.title} className="rounded-[28px] border border-white/10 bg-white/5 p-6">
              <h2 className="text-xl font-semibold text-white">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">{item.body}</p>
            </article>
          ))}
        </section>

        <section className="mt-10 rounded-[28px] border border-white/10 bg-white/5 p-7">
          <h2 className="text-2xl font-semibold text-white">What this site does</h2>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            The site publishes focused calculators for creator marketplaces, support platforms, digital product storefronts, and freelance pricing. Each tool is meant to be fast, practical, and understandable even if the user is only doing a quick pricing check.
          </p>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            The explanations, examples, and FAQ sections are there to make the calculators useful both for search visitors and repeat users who return when their business model changes.
          </p>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
