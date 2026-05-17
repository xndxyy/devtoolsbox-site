"use client";

import { useState, useCallback } from "react";
import ToolLayout from "@/components/devtools/ToolLayout";
import { useLocale } from "@/components/devtools/LocaleContext";

function uuidv4(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

export default function UuidPage() {
  const { t } = useLocale();
  const [count, setCount] = useState(1);
  const [uuids, setUuids] = useState<string[]>([uuidv4()]);
  const [copied, setCopied] = useState<string | null>(null);

  const generate = useCallback(() => {
    setUuids(Array.from({ length: count }, () => uuidv4()));
  }, [count]);

  const copySingle = async (uuid: string) => {
    await navigator.clipboard.writeText(uuid);
    setCopied(uuid);
    setTimeout(() => setCopied(null), 1500);
  };

  const copyAll = async () => {
    await navigator.clipboard.writeText(uuids.join("\n"));
    setCopied("__all__");
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <ToolLayout title={t("tool.uuid.title")} description={t("tool.uuid.desc")}>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{t("uuid.count")}</label>
          <select value={count} onChange={(e) => setCount(Number(e.target.value))}
            className="px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400">
            {[1, 5, 10, 20, 50, 100].map((n) => (<option key={n} value={n}>{n}</option>))}
          </select>
          <button onClick={generate} className="px-6 py-2 rounded-lg bg-sky-500 text-white hover:bg-sky-600 transition-colors text-sm font-medium">
            {t("common.generate")}
          </button>
          {uuids.length > 1 && (
            <button onClick={copyAll} className="px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-sm hover:border-sky-400 transition-colors">
              {copied === "__all__" ? t("common.copied") : t("uuid.copyAll")}
            </button>
          )}
        </div>

        <div className="space-y-2">
          {uuids.map((uuid, i) => (
            <div key={i} className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 font-mono text-sm">
              <span className="flex-1">{uuid}</span>
              <button onClick={() => copySingle(uuid)} className="px-2 py-0.5 text-xs rounded bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors">
                {copied === uuid ? t("common.copied") : t("common.copy")}
              </button>
            </div>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
