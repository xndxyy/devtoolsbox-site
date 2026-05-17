import Link from "next/link"

const sections = [
  {
    href: "/tools/base64",
    eyebrow: "DevTools Box",
    title: "Developer tools that run fully in your browser",
    description:
      "JSON, YAML, Base64, Regex, Cron, SQL, color, code-to-image and more — fast client-side utilities with zero upload.",
    cta: "Open tools",
    accent: "from-emerald-400/20 via-cyan-400/10 to-sky-500/20",
  },
  {
    href: "/calculator",
    eyebrow: "Creator Numbers",
    title: "Fee and earnings calculators for creators",
    description:
      "Estimate what you actually keep on Etsy, Gumroad, Ko-fi, Patreon, digital products, and freelance work.",
    cta: "Open calculators",
    accent: "from-cyan-400/20 via-blue-500/10 to-violet-500/20",
  },
  {
    href: "/game",
    eyebrow: "AI Life Replay",
    title: "Play the upgraded life-replay game",
    description:
      "Choose a world, roll talents, replay a life path, and support the project if you enjoy the experience.",
    cta: "Enter game",
    accent: "from-fuchsia-400/20 via-violet-500/10 to-cyan-500/20",
  },
]

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#050914] text-slate-100">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.14),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.14),_transparent_28%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <span className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">
            devtoolsbox.site
          </span>
          <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            One domain, three products: tools, calculators, and an AI life replay game.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            This portal brings together DevTools Box, Creator Numbers, and AI Life Replay under a single home base so visitors can jump straight to the experience they need.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-12 sm:px-6 lg:px-8">
        {sections.map((section) => (
          <article
            key={section.href}
            className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-8 transition hover:border-cyan-300/25 hover:bg-white/[0.07]"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${section.accent} opacity-80`} />
            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200/85">{section.eyebrow}</p>
                <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">{section.title}</h2>
                <p className="mt-4 text-base leading-8 text-slate-200">{section.description}</p>
              </div>
              <div>
                <Link
                  href={section.href}
                  className="inline-flex rounded-full border border-slate-950/70 bg-yellow-300 px-6 py-3 text-sm font-extrabold text-slate-950 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] transition hover:translate-y-[-1px] hover:bg-yellow-200"
                >
                  {section.cta}
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}
