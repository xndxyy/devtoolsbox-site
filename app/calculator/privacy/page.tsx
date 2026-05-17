import type { Metadata } from 'next'
import { SiteFooter, SiteHeader } from '@/components/calculator/site-shell'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Read the privacy policy for Creator Numbers, including how the site handles analytics, contact email, and third-party links.',
  alternates: {
    canonical: '/privacy',
  },
}

const privacySections = [
  {
    title: 'Information you share',
    body: 'Creator Numbers does not require an account to use the calculators. If you contact the site by email, the information you send is used only to respond to your message and maintain normal communication records.',
  },
  {
    title: 'Calculator inputs',
    body: 'Calculator values are processed client-side in your browser for estimation purposes. They are not treated as submitted financial records or official tax documentation.',
  },
  {
    title: 'Third-party services',
    body: 'The site may link to third-party services such as creator platforms, payment providers, or support pages. Their privacy practices are governed by their own policies.',
  },
  {
    title: 'Policy updates',
    body: 'This policy may be updated when the site adds new features, analytics, monetization, or support channels. Material changes should be reflected on this page.',
  },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#060b16] text-slate-100">
      <SiteHeader />

      <main id="main-content" className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <section className="rounded-[34px] border border-white/10 bg-gradient-to-br from-cyan-500/12 via-blue-500/10 to-violet-500/10 p-7 sm:p-10">
          <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
            Privacy Policy
          </span>
          <h1 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl">Privacy information for Creator Numbers.</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-200">
            Creator Numbers is a lightweight independent calculator site. This page explains the basic privacy expectations for visitors and email contacts.
          </p>
        </section>

        <section className="mt-10 space-y-5">
          {privacySections.map((section) => (
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
