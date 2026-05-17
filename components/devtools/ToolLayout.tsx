"use client";

import Link from "next/link";
import { useLocale } from "@/components/devtools/LocaleContext";

interface ToolLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export default function ToolLayout({ title, description, children }: ToolLayoutProps) {
  const { t } = useLocale();
  return (
    <div className="flex-1 flex flex-col">
      <div className="max-w-3xl w-full mx-auto px-4 py-8 animate-fade-in">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors group">
            <svg className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            {t("nav.back")}
          </Link>
        </div>
        <div className="relative">
          <div className="absolute -inset-x-4 -inset-y-2 bg-gradient-to-r from-sky-500/5 via-transparent to-violet-500/5 rounded-2xl blur-xl" />
          <div className="relative">
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{title}</h1>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{description}</p>
          </div>
        </div>
        <div className="mt-8">{children}</div>

        {/* Donation */}
        <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-700/50 text-center">
          <div className="max-w-sm mx-auto">
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">{t("donate.tip")}</p>
            <a href="https://ko-fi.com/yuanyu20100" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-sky-600 text-white text-sm font-semibold hover:from-sky-600 hover:to-sky-700 transition-all shadow-sm hover:shadow-md hover:shadow-sky-500/20 active:scale-[0.97]">
              <span>☕</span>
              {t("donate.button")}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
