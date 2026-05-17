"use client";

import { useState, useMemo } from "react";
import ToolCard from "@/components/devtools/ToolCard";
import { useLocale } from "@/components/devtools/LocaleContext";

interface ToolDef {
  titleKey: string;
  descKey: string;
  icon: string;
  href: string;
  tags?: string[];
}

interface Category {
  icon: string;
  nameKey: string;
  descKey: string;
  color: string;
  tools: ToolDef[];
}

const categories: Category[] = [
  {
    icon: "🔄", nameKey: "home.cat.converters", descKey: "home.cat.converters.desc", color: "blue",
    tools: [
      { titleKey: "tool.xml-json.title", descKey: "tool.xml-json.desc", icon: "🔄", href: "/tools/xml-json" },
      { titleKey: "tool.yaml-json.title", descKey: "tool.yaml-json.desc", icon: "📦", href: "/tools/yaml-json" },
      { titleKey: "tool.csv-json.title", descKey: "tool.csv-json.desc", icon: "📊", href: "/tools/csv-json" },
      { titleKey: "tool.toml-json.title", descKey: "tool.toml-json.desc", icon: "⚙️", href: "/tools/toml-json" },
      { titleKey: "tool.markdown-html.title", descKey: "tool.markdown-html.desc", icon: "📝", href: "/tools/markdown-html" },
    ],
  },
  {
    icon: "🔐", nameKey: "home.cat.encoders", descKey: "home.cat.encoders.desc", color: "violet",
    tools: [
      { titleKey: "tool.base64.title", descKey: "tool.base64.desc", icon: "🔐", href: "/tools/base64" },
      { titleKey: "tool.url.title", descKey: "tool.url.desc", icon: "🔗", href: "/tools/url-codec" },
      { titleKey: "tool.html-entities.title", descKey: "tool.html-entities.desc", icon: "🏷️", href: "/tools/html-entities" },
    ],
  },
  {
    icon: "✨", nameKey: "home.cat.formatters", descKey: "home.cat.formatters.desc", color: "emerald",
    tools: [
      { titleKey: "tool.json.title", descKey: "tool.json.desc", icon: "📋", href: "/tools/json" },
      { titleKey: "tool.xml-formatter.title", descKey: "tool.xml-formatter.desc", icon: "📄", href: "/tools/xml-formatter" },
      { titleKey: "tool.sql-formatter.title", descKey: "tool.sql-formatter.desc", icon: "🗃️", href: "/tools/sql-formatter" },
      { titleKey: "tool.env.title", descKey: "tool.env.desc", icon: "🔑", href: "/tools/env-validator" },
    ],
  },
  {
    icon: "🎨", nameKey: "home.cat.design", descKey: "home.cat.design.desc", color: "pink",
    tools: [
      { titleKey: "tool.http-status.title", descKey: "tool.http-status.desc", icon: "📡", href: "/tools/http-status" },
    ],
  },
  {
    icon: "🛠️", nameKey: "home.cat.utilities", descKey: "home.cat.utilities.desc", color: "amber",
    tools: [
      { titleKey: "tool.jwt-decoder.title", descKey: "tool.jwt-decoder.desc", icon: "🎫", href: "/tools/jwt-decoder" },
      { titleKey: "tool.timestamp.title", descKey: "tool.timestamp.desc", icon: "⏱️", href: "/tools/timestamp" },
      { titleKey: "tool.cron.title", descKey: "tool.cron.desc", icon: "⏰", href: "/tools/cron" },
      { titleKey: "tool.uuid.title", descKey: "tool.uuid.desc", icon: "🆔", href: "/tools/uuid" },
      { titleKey: "tool.regex.title", descKey: "tool.regex.desc", icon: "🔍", href: "/tools/regex" },
      { titleKey: "tool.number-base.title", descKey: "tool.number-base.desc", icon: "🔢", href: "/tools/number-base" },
      { titleKey: "tool.semver.title", descKey: "tool.semver.desc", icon: "📌", href: "/tools/semver" },
    ],
  },
];

const colorConfig: Record<string, { border: string; bg: string; text: string; glow: string }> = {
  blue:    { border: "border-blue-500/20",  bg: "bg-blue-500/5",   text: "text-blue-600 dark:text-blue-400", glow: "group-hover:shadow-blue-500/10" },
  violet:  { border: "border-violet-500/20", bg: "bg-violet-500/5", text: "text-violet-600 dark:text-violet-400", glow: "group-hover:shadow-violet-500/10" },
  emerald: { border: "border-emerald-500/20",bg: "bg-emerald-500/5",text: "text-emerald-600 dark:text-emerald-400", glow: "group-hover:shadow-emerald-500/10" },
  pink:    { border: "border-pink-500/20",   bg: "bg-pink-500/5",  text: "text-pink-600 dark:text-pink-400", glow: "group-hover:shadow-pink-500/10" },
  amber:   { border: "border-amber-500/20",  bg: "bg-amber-500/5", text: "text-amber-600 dark:text-amber-400", glow: "group-hover:shadow-amber-500/10" },
};

export default function ToolsHomePage() {
  const { t, locale } = useLocale();
  const [search, setSearch] = useState("");

  const filteredCategories = useMemo(() => {
    if (!search.trim()) return categories;
    const q = search.toLowerCase();
    return categories
      .map((cat) => ({
        ...cat,
        tools: cat.tools.filter(
          (tool) =>
            t(tool.titleKey).toLowerCase().includes(q) ||
            t(tool.descKey).toLowerCase().includes(q) ||
            tool.href.includes(q)
        ),
      }))
      .filter((cat) => cat.tools.length > 0);
  }, [search, t]);

  return (
    <main className="flex-1 w-full bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="relative mx-auto max-w-6xl px-4 py-24 text-center sm:py-32">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-emerald-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            {t("home.hero.badge")}
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
            {locale === "zh" ? "开发者工具箱" : "Developer"}
            <span className="mt-2 block">
              {locale === "zh" ? (
                <>
                  完全<span className="bg-gradient-to-r from-emerald-300 via-green-400 to-teal-400 bg-clip-text text-transparent">免费</span>
                </>
              ) : (
                <>
                  <span className="bg-gradient-to-r from-emerald-300 via-green-400 to-teal-400 bg-clip-text text-transparent">Toolbox</span>
                  {" "}— 100% Free
                </>
              )}
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-slate-400 sm:text-lg">
            {t("home.subtitle")}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-400">✦</span> 18 {locale === "zh" ? "款工具" : "Tools"}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-400">✦</span> {locale === "zh" ? "纯前端" : "Client-side"}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-400">✦</span> {locale === "zh" ? "数据不上传" : "Zero Upload"}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-400">✦</span> {locale === "zh" ? "中英双语" : "中/EN"}
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-8 mb-12 max-w-5xl px-4">
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl bg-zinc-200 shadow-sm dark:bg-zinc-700 sm:grid-cols-3">
          <div className="bg-white p-5 text-center dark:bg-zinc-800">
            <div className="mb-1 text-2xl">💰</div>
            <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{t("home.hero.feature.free")}</div>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{t("home.hero.feature.free.desc")}</p>
          </div>
          <div className="bg-white p-5 text-center dark:bg-zinc-800">
            <div className="mb-1 text-2xl">🔒</div>
            <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{t("home.hero.feature.private")}</div>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{t("home.hero.feature.private.desc")}</p>
          </div>
          <div className="bg-white p-5 text-center dark:bg-zinc-800">
            <div className="mb-1 text-2xl">📡</div>
            <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{t("home.hero.feature.offline")}</div>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{t("home.hero.feature.offline.desc")}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-8">
        <div className="relative mx-auto max-w-md">
          <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={locale === "zh" ? "搜索工具..." : "Search tools..."}
            className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-10 pr-4 text-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-emerald-400/50 dark:border-zinc-700 dark:bg-zinc-800"
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        {filteredCategories.length === 0 && (
          <div className="py-16 text-center">
            <div className="mb-3 text-4xl">🔍</div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">{locale === "zh" ? "没有找到匹配的工具" : "No tools found"}</p>
          </div>
        )}

        {filteredCategories.map((cat) => {
          const cc = colorConfig[cat.color];
          return (
            <div key={cat.nameKey} className="mb-10 last:mb-0">
              <div className="mb-4 flex items-center gap-3">
                <div className={`flex h-9 w-9 items-center justify-center rounded-lg text-lg ${cc.bg} ${cc.text}`}>
                  {cat.icon}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{t(cat.nameKey)}</h2>
                  <p className="text-xs text-zinc-400">{t(cat.descKey)}</p>
                </div>
                <span className="ml-auto rounded-full border border-zinc-200 bg-zinc-100 px-2 py-0.5 text-xs text-zinc-400 dark:border-zinc-700 dark:bg-zinc-800">
                  {cat.tools.length}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {cat.tools.map((tool) => (
                  <div key={tool.href} className="h-full">
                    <ToolCard {...tool} color={cat.color} />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
}
