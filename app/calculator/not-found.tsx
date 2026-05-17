import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteFooter, SiteHeader } from '@/components/calculator/site-shell'

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you requested could not be found on Creator Numbers.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#060b16] text-slate-100">
      <SiteHeader />

      <main id="main-content" className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <section className="rounded-[34px] border border-white/10 bg-gradient-to-br from-cyan-500/12 via-blue-500/10 to-violet-500/10 p-7 text-center sm:p-10">
          <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
            404
          </span>
          <h1 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl">
            That page doesn&apos;t exist.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-200">
            The link may be outdated, or the calculator might have moved. Start from the homepage or browse the full calculator library.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:translate-y-[-1px]"
            >
              Go home
            </Link>
            <Link
              href="/calculator"
              className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-300/40 hover:text-white"
            >
              Browse calculators
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
