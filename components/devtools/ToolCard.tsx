"use client";

import Link from "next/link";
import { useLocale } from "@/components/devtools/LocaleContext";

interface ToolCardProps {
  titleKey: string;
  descKey: string;
  icon: string;
  href: string;
  color?: string;
}

const colorStyles: Record<string, { border: string; bg: string; text: string; shadow: string; hoverBorder: string }> = {
  blue:    { border: "border-blue-200 dark:border-blue-800/50", bg: "bg-blue-50 dark:bg-blue-950/20", text: "text-blue-600 dark:text-blue-400", shadow: "hover:shadow-blue-500/5", hoverBorder: "hover:border-blue-400" },
  violet:  { border: "border-violet-200 dark:border-violet-800/50", bg: "bg-violet-50 dark:bg-violet-950/20", text: "text-violet-600 dark:text-violet-400", shadow: "hover:shadow-violet-500/5", hoverBorder: "hover:border-violet-400" },
  emerald: { border: "border-emerald-200 dark:border-emerald-800/50", bg: "bg-emerald-50 dark:bg-emerald-950/20", text: "text-emerald-600 dark:text-emerald-400", shadow: "hover:shadow-emerald-500/5", hoverBorder: "hover:border-emerald-400" },
  pink:    { border: "border-pink-200 dark:border-pink-800/50", bg: "bg-pink-50 dark:bg-pink-950/20", text: "text-pink-600 dark:text-pink-400", shadow: "hover:shadow-pink-500/5", hoverBorder: "hover:border-pink-400" },
  amber:   { border: "border-amber-200 dark:border-amber-800/50", bg: "bg-amber-50 dark:bg-amber-950/20", text: "text-amber-600 dark:text-amber-400", shadow: "hover:shadow-amber-500/5", hoverBorder: "hover:border-amber-400" },
};

export default function ToolCard({ titleKey, descKey, icon, href, color = "blue" }: ToolCardProps) {
  const { t } = useLocale();
  const cs = colorStyles[color] || colorStyles.blue;

  return (
    <Link
      href={href}
      className={`group relative flex h-full flex-col gap-3 rounded-xl border bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg dark:bg-zinc-800/80 ${cs.border} ${cs.shadow} ${cs.hoverBorder}`}
    >
      <div className="flex flex-1 items-start gap-4">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-lg transition-transform group-hover:scale-110 ${cs.bg} ${cs.text}`}>
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-zinc-900 transition-colors group-hover:text-inherit dark:text-zinc-100">
            {t(titleKey)}
            <svg className="ml-1 inline-block h-3 w-3 text-zinc-300 transition-all group-hover:translate-x-0.5 group-hover:text-inherit dark:text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </h3>
          <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
            {t(descKey)}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-zinc-100 pt-1 text-xs font-semibold text-zinc-700 dark:border-zinc-700/50 dark:text-zinc-300">
        <span className="truncate">{t("common.open")}</span>
        <svg className="h-3 w-3 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}
