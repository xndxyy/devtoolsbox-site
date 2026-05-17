"use client";

import { useState, useCallback } from "react";
import ToolLayout from "@/components/devtools/ToolLayout";
import { useLocale } from "@/components/devtools/LocaleContext";

const PRESETS = [
  { labelKey: "cron.everyMinute", cron: "* * * * *" },
  { labelKey: "cron.everyHour", cron: "0 * * * *" },
  { labelKey: "cron.dailyMidnight", cron: "0 0 * * *" },
  { labelKey: "cron.daily9am", cron: "0 9 * * *" },
  { labelKey: "cron.weeklyMonday", cron: "0 0 * * 1" },
  { labelKey: "cron.monthly1st", cron: "0 0 1 * *" },
  { labelKey: "cron.weekdays9am", cron: "0 9 * * 1-5" },
];

function describeCron(expr: string): string {
  const parts = expr.trim().split(/\s+/);
  if (parts.length !== 5) return "";
  const labels = ["minute", "hour", "day", "month", "weekday"];
  return parts
    .map((p, i) => {
      if (p === "*") return `every ${labels[i]}`;
      if (p.includes("/")) return `every ${p.split("/")[1]} ${labels[i]}`;
      if (p.includes("-")) return `${labels[i]} ${p}`;
      if (p.includes(",")) return `${labels[i]} ${p}`;
      return `${labels[i]} ${p}`;
    })
    .join(", ");
}

export default function CronPage() {
  const { t } = useLocale();
  const [minute, setMinute] = useState("0");
  const [hour, setHour] = useState("*");
  const [day, setDay] = useState("*");
  const [month, setMonth] = useState("*");
  const [weekday, setWeekday] = useState("*");
  const [copied, setCopied] = useState(false);

  const cron = `${minute} ${hour} ${day} ${month} ${weekday}`;
  const description = describeCron(cron);

  const applyPreset = useCallback((cron: string) => {
    const [m, h, d, mo, w] = cron.split(" ");
    setMinute(m);
    setHour(h);
    setDay(d);
    setMonth(mo);
    setWeekday(w);
  }, []);

  const copy = async () => {
    await navigator.clipboard.writeText(cron);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <ToolLayout title={t("tool.cron.title")} description={t("tool.cron.desc")}>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">
            {t("cron.presets")}
          </label>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.cron}
                onClick={() => applyPreset(p.cron)}
                className="px-3 py-1.5 text-sm rounded-lg border border-zinc-300 dark:border-zinc-600 hover:border-sky-400 dark:hover:border-sky-500 bg-white dark:bg-zinc-800 transition-colors"
              >
                {t(p.labelKey)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[
            { labelKey: "cron.minute", value: minute, set: setMinute, placeholder: "0-59" },
            { labelKey: "cron.hour", value: hour, set: setHour, placeholder: "0-23" },
            { labelKey: "cron.day", value: day, set: setDay, placeholder: "1-31" },
            { labelKey: "cron.month", value: month, set: setMonth, placeholder: "1-12" },
            { labelKey: "cron.weekday", value: weekday, set: setWeekday, placeholder: "0-6" },
          ].map((f) => (
            <div key={f.labelKey}>
              <label className="block text-xs font-medium mb-1 text-zinc-600 dark:text-zinc-400">
                {t(f.labelKey)}
              </label>
              <input
                type="text"
                value={f.value}
                onChange={(e) => f.set(e.target.value)}
                placeholder={f.placeholder}
                className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-sm text-center focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
            </div>
          ))}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">
            {t("cron.expression")}
          </label>
          <div className="flex gap-2">
            <code className="flex-1 px-4 py-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 text-lg font-mono text-center">
              {cron}
            </code>
            <button
              onClick={copy}
              className="px-4 py-2 rounded-lg bg-sky-500 text-white hover:bg-sky-600 transition-colors text-sm font-medium"
            >
              {copied ? t("common.copied") : t("common.copy")}
            </button>
          </div>
        </div>

        {description && (
          <div className="p-4 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-sm text-zinc-600 dark:text-zinc-400">
            {description}
          </div>
        )}

        <details className="text-sm text-zinc-500 dark:text-zinc-400">
          <summary className="cursor-pointer hover:text-zinc-700 dark:hover:text-zinc-300">
            {t("cron.syntax")}
          </summary>
          <div className="mt-2 p-4 rounded-lg bg-zinc-100 dark:bg-zinc-800 space-y-1">
            <p><code className="text-xs">*</code> {t("cron.syntax.all")}</p>
            <p><code className="text-xs">,</code> {t("cron.syntax.list")}</p>
            <p><code className="text-xs">-</code> {t("cron.syntax.range")}</p>
            <p><code className="text-xs">/</code> {t("cron.syntax.step")}</p>
            <p className="mt-2 text-xs text-zinc-400">{t("cron.syntax.order")}</p>
          </div>
        </details>
      </div>
    </ToolLayout>
  );
}
