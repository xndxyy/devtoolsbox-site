import type { Metadata } from 'next'
import { SiteFooter, SiteHeader } from '@/components/calculator/site-shell'

export const metadata: Metadata = {
  title: 'Contact Creator Numbers',
  description:
    'Contact Creator Numbers for feedback, calculator suggestions, or corrections.',
  alternates: {
    canonical: '/contact',
  },
}

const contactReasons = [
  'Suggest a new calculator idea or creator platform to cover.',
  'Report a fee assumption that needs updating.',
  'Share feedback about usability, clarity, or missing edge cases.',
]

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#060b16] text-slate-100">
      <SiteHeader />

      <main id="main-content" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <section className="rounded-[34px] border border-white/10 bg-gradient-to-br from-cyan-500/12 via-blue-500/10 to-violet-500/10 p-7 sm:p-10">
          <div className="max-w-4xl">
            <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
              Contact
            </span>
            <h1 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl">Feedback, corrections, and calculator ideas are welcome.</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-200">
              Creator Numbers is designed as a lightweight independent toolset. If you find outdated fee assumptions or want a new calculator, get in touch by email.
            </p>
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="rounded-[28px] border border-white/10 bg-white/5 p-7">
            <h2 className="text-2xl font-semibold text-white">Best reasons to reach out</h2>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-300">
              {contactReasons.map((item) => (
                <li key={item} className="rounded-2xl border border-white/8 bg-[#0b1425] px-4 py-3">
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <aside className="rounded-[28px] border border-white/10 bg-white/5 p-7">
            <h2 className="text-2xl font-semibold text-white">Email</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              For general feedback and corrections, email:
            </p>
            <a
              href="mailto:20070702lovelife@gmail.com"
              className="mt-5 inline-flex rounded-full bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:translate-y-[-1px] hover:bg-cyan-200"
            >
              20070702lovelife@gmail.com
            </a>
            <p className="mt-5 text-sm leading-7 text-slate-400">
              A simple email workflow keeps the site lightweight for launch. No account system or backend form is required.
            </p>
          </aside>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
