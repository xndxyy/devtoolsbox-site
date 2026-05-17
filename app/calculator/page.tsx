import Link from 'next/link'
import type { Metadata } from 'next'
import { SiteFooter, SiteHeader } from '@/components/calculator/site-shell'
import { calculators } from '@/lib/calculator/calculators'

export const metadata: Metadata = {
  title: 'All Creator Calculators',
  description:
    'Browse all Creator Numbers calculators for Etsy, Gumroad, Ko-fi, Patreon, digital products, and freelance pricing.',
  alternates: {
    canonical: '/calculator',
  },
}

export default function CalculatorsIndexPage() {
  return (
    <div className="min-h-screen bg-[#060b16] text-slate-100">
      <SiteHeader />

      <main id="main-content" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <section className="rounded-[34px] border border-white/10 bg-gradient-to-br from-cyan-500/12 via-blue-500/10 to-violet-500/10 p-7 sm:p-10">
          <div className="max-w-4xl">
            <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
              Calculator directory
            </span>
            <h1 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl">Every calculator in one place.</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-200">
              Explore fee calculators and income planning tools built for creator businesses, digital products, memberships, and freelance services.
            </p>
          </div>
        </section>

        <section className="mt-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300/80">All tools</p>
              <h2 className="mt-2 text-3xl font-bold text-white">Choose the calculator that matches your revenue model</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-slate-400">
              Each page includes an interactive estimator, use-case examples, and FAQs.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {calculators.map((calculator) => (
              <article key={calculator.slug} className="group rounded-[28px] border border-white/10 bg-white/5 p-6 transition hover:border-cyan-300/25 hover:bg-white/[0.07]">
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200">
                    {calculator.category}
                  </span>
                </div>
                <h3 className="mt-4 text-2xl font-semibold text-white">{calculator.name}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{calculator.hero}</p>
                <p className="mt-2 text-sm leading-7 text-slate-400">{calculator.description}</p>
                <div className="mt-6">
                  <Link
                    href={`/calculator/${calculator.slug}`}
                    className="inline-flex rounded-full border border-white/12 px-4 py-2 text-sm font-medium text-slate-100 transition group-hover:border-cyan-300/40 group-hover:text-white"
                  >
                    Open calculator
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
