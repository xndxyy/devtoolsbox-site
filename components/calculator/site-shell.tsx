import Link from 'next/link'
import { calculators } from '@/lib/calculator/calculators'

const footerSections = [
  {
    title: 'Site',
    links: [
      { href: '/', label: 'Home' },
      { href: '/calculator', label: 'Calculators' },
      { href: '/calculator/about', label: 'About' },
      { href: '/calculator/contact', label: 'Contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { href: '/calculator/privacy', label: 'Privacy Policy' },
      { href: '/calculator/terms', label: 'Terms of Use' },
    ],
  },
]

export function SiteHeader() {
  return (
    <header className="border-b border-white/8 bg-[#0b1020]/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-5 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/calculator" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-600 text-lg font-black text-white shadow-lg shadow-cyan-950/30">
            $
          </div>
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300/90">
              Creator Numbers
            </div>
            <div className="text-xs text-slate-400">Fee and earnings calculators for creators</div>
          </div>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-5 text-sm text-slate-300 lg:flex">
          <Link href="/calculator" className="transition hover:text-white">
            Calculators
          </Link>
          <Link href="/calculator/about" className="transition hover:text-white">
            About
          </Link>
          <Link href="/calculator/contact" className="transition hover:text-white">
            Contact
          </Link>
          <a
            href="https://ko-fi.com/creatornumbers"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-cyan-400/30 px-4 py-2 text-cyan-200 transition hover:border-cyan-300 hover:text-white"
          >
            Support on Ko-fi
          </a>
        </nav>
      </div>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-white/8 bg-[#090e1b]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 text-sm text-slate-400 sm:px-6 lg:grid-cols-[1.8fr_1fr_1fr] lg:px-8">
        <div>
          <h2 className="mb-3 text-base font-semibold text-slate-100">Creator Numbers</h2>
          <p className="max-w-2xl leading-7">
            Free creator fee calculators for marketplaces, memberships, digital products, and freelance pricing.
            Built for fast planning, better pricing, and realistic take-home estimates.
          </p>
        </div>

        {footerSections.map((section) => (
          <div key={section.title}>
            <h2 className="mb-3 text-base font-semibold text-slate-100">{section.title}</h2>
            <ul className="space-y-2">
              {section.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto grid max-w-6xl gap-6 border-t border-white/8 px-4 py-8 text-sm text-slate-500 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
        <div>
          Popular tools:{' '}
          {calculators.slice(0, 4).map((calculator, index) => (
            <span key={calculator.slug}>
              {index > 0 ? ' · ' : ''}
              <Link href={`/calculator/${calculator.slug}`} className="transition hover:text-white">
                {calculator.name}
              </Link>
            </span>
          ))}
        </div>
        <div className="text-left lg:text-right">
          Independent planning tools for creators. Always verify current platform fees before making pricing decisions.
        </div>
      </div>
    </footer>
  )
}
