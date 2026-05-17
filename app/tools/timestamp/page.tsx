"use client";

import { useState, useEffect, useCallback } from "react";
import ToolLayout from "@/components/devtools/ToolLayout";
import { useLocale } from "@/components/devtools/LocaleContext";

export default function TimestampPage() {
  const { t } = useLocale();
  const [now, setNow] = useState(Math.floor(Date.now() / 1000));
  const [tsInput, setTsInput] = useState("");
  const [tsResult, setTsResult] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [dateResult, setDateResult] = useState("");
  const [copied, setCopied] = useState<"ts" | "date" | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setNow(Math.floor(Date.now() / 1000)), 1000);
    return () => clearInterval(timer);
  }, []);

  const convertTs = useCallback(() => {
    const raw = tsInput.trim();
    if (!raw) return setTsResult("");
    const num = Number(raw);
    if (isNaN(num)) return setTsResult("❌ " + t("ts.invalid"));
    const d = raw.length >= 13 ? new Date(num) : new Date(num * 1000);
    if (isNaN(d.getTime())) return setTsResult("❌ " + t("ts.invalid"));
    setTsResult(
      `📅 ${d.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "2-digit", day: "2-digit" })}\n` +
      `🕒 ${d.toLocaleTimeString("en-US")}\n` +
      `🌐 ${d.toISOString().replace("T", " ").slice(0, 19)}\n` +
      `🔢 ${t("ts.ms")}: ${d.getTime()}`
    );
  }, [tsInput, t]);

  const convertDate = useCallback(() => {
    const raw = dateInput.trim();
    if (!raw) return setDateResult("");
    const d = new Date(raw);
    if (isNaN(d.getTime())) return setDateResult("❌ " + t("ts.invalidDate"));
    setDateResult(
      `🔢 ${t("ts.sec")}: ${Math.floor(d.getTime() / 1000)}\n` +
      `🔢 ${t("ts.ms")}: ${d.getTime()}\n` +
      `🌐 ${d.toISOString().replace("T", " ").slice(0, 19)}`
    );
  }, [dateInput, t]);

  const copy = async (type: "ts" | "date", text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <ToolLayout title={t("tool.timestamp.title")} description={t("tool.timestamp.desc")}>
      <div className="space-y-6">
        <div className="p-4 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-center">
          <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">{t("ts.current")}</div>
          <div className="text-2xl font-mono font-bold text-sky-500">{now}</div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">{t("ts.toDate")}</label>
          <div className="flex gap-2">
            <input type="text" value={tsInput} onChange={(e) => setTsInput(e.target.value)}
              placeholder={t("ts.placeholder")}
              className="flex-1 px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-sky-400" />
            <button onClick={convertTs} className="px-4 py-2 rounded-lg bg-sky-500 text-white hover:bg-sky-600 transition-colors text-sm font-medium">
              {t("common.convert")}
            </button>
          </div>
          {tsResult && (
            <div className="relative mt-2 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 font-mono text-sm whitespace-pre-line">
              {tsResult}
              <button onClick={() => copy("ts", tsResult)} className="absolute top-2 right-2 px-2 py-0.5 text-xs rounded bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600">
                {copied === "ts" ? t("common.copied") : t("common.copy")}
              </button>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">{t("ts.toTs")}</label>
          <div className="flex gap-2">
            <input type="text" value={dateInput} onChange={(e) => setDateInput(e.target.value)}
              placeholder={t("ts.datePlaceholder")}
              className="flex-1 px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-sky-400" />
            <button onClick={convertDate} className="px-4 py-2 rounded-lg bg-sky-500 text-white hover:bg-sky-600 transition-colors text-sm font-medium">
              {t("common.convert")}
            </button>
          </div>
          {dateResult && (
            <div className="relative mt-2 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 font-mono text-sm whitespace-pre-line">
              {dateResult}
              <button onClick={() => copy("date", dateResult)} className="absolute top-2 right-2 px-2 py-0.5 text-xs rounded bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600">
                {copied === "date" ? t("common.copied") : t("common.copy")}
              </button>
            </div>
          )}
        </div>
      </div>
    </ToolLayout>
  );
}
