"use client";

import { useState, useCallback } from "react";
import ToolLayout from "@/components/devtools/ToolLayout";
import { useLocale } from "@/components/devtools/LocaleContext";

const BASES = [2, 8, 10, 16] as const;

function convertBase(value: string, fromBase: number, toBase: number): string {
  if (!value) return "";
  const negative = value.startsWith("-");
  const abs = negative ? value.slice(1) : value;
  const parsed = parseInt(abs, fromBase);
  if (isNaN(parsed)) return "";
  const result = parsed.toString(toBase).toUpperCase();
  return negative ? "-" + result : result;
}

const NAMES: Record<number, string> = {
  2: "Binary",
  8: "Octal",
  10: "Decimal",
  16: "Hexadecimal",
};

export default function NumberBasePage() {
  const { t } = useLocale();
  const [value, setValue] = useState("255");
  const [fromIdx, setFromIdx] = useState(2);
  const [results, setResults] = useState<Record<number, string>>({});

  const convert = useCallback(() => {
    const fromBase = BASES[fromIdx];
    const r: Record<number, string> = {};
    for (const toBase of BASES) {
      r[toBase] = convertBase(value, fromBase, toBase);
    }
    setResults(r);
  }, [value, fromIdx]);

  return (
    <ToolLayout title={t("tool.number-base.title")} description={t("tool.number-base.desc")}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">{t("nb.input")}</label>
          <input type="text" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Enter value"
            className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-sky-400" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">{t("nb.fromBase")}</label>
          <div className="flex gap-2">
            {BASES.map((b, i) => (
              <button key={b} onClick={() => setFromIdx(i)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${fromIdx === i ? "bg-sky-500 text-white" : "border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800"}`}>
                {NAMES[b]} ({b})
              </button>
            ))}
          </div>
        </div>

        <button onClick={convert} className="px-6 py-2 rounded-lg bg-sky-500 text-white hover:bg-sky-600 transition-colors text-sm font-medium">
          {t("common.convert")}
        </button>

        {results[BASES[0]] !== undefined && (
          <div className="space-y-3">
            {BASES.map((b) => (
              <div key={b} className="flex items-center gap-4 px-4 py-3 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400 w-16 shrink-0">{NAMES[b]}</span>
                <code className="flex-1 font-mono text-sm">{results[b] || "-"}</code>
              </div>
            ))}
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
