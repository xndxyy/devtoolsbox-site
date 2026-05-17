import type { Metadata } from 'next'
import { SiteFooter, SiteHeader } from '@/components/calculator/site-shell'

export const metadata: Metadata = {
  title: 'Terms of Use',
  description:
    'Read the terms of use for Creator Numbers and understand the independent planning nature of the calculators.',
  alternates: {
    canonical: '/terms',
  },
}

const termsSections = [
  {
    title: 'Independent estimator',
    body: 'Creator Numbers provides independent calculators and educational planning content. The site is not an official representative of Etsy, Gumroad, Ko-fi, Patreon, or any other platform mentioned.',
  },
  {
    title: 'No financial or legal advice',
    body: 'The calculators are provided for informational and planning purposes only. You should verify platform fee schedules, tax treatment, and legal requirements before making business decisions.',
  },
  {
    title: 'Reasonable use',
    body: 'You may use the site for personal or business planning. You may not misuse the service, attempt to disrupt availability, or present the results as official statements from third-party platforms.',
  },
  {
    title: 'Availability and accuracy',
    body: 'The site is provided on an as-is basis. Fee assumptions, examples, and explanations may change over time, and no guarantee is made that every scenario or region is fully covered.',
  },
]

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#060b16] text-slate-100">
      <SiteHeader />

      <main id="main-content" className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <section className="rounded-[34px] border border-white/10 bg-gradient-to-br from-cyan-500/12 via-blue-500/10 to-violet-500/10 p-7 sm:p-10">
          <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
            Terms of Use
          </span>
          <h1 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl">Understand how Creator Numbers should be used.</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-200">
            These terms explain the independent planning nature of the site and set expectations around calculator accuracy, platform references, and fair use.
          </p>
        </section>

        <section className="mt-10 space-y-5">
          {termsSections.map((section) => (
            <article key={section.title} className="rounded-[28px] border border-white/10 bg-white/5 p-7">
              <h2 className="text-2xl font-semibold text-white">{section.title}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">{section.body}</p>
            </article>
          ))}
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
