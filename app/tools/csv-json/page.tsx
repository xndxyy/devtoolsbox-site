"use client";

import { useState, useCallback } from "react";
import ToolLayout from "@/components/devtools/ToolLayout";
import { useLocale } from "@/components/devtools/LocaleContext";

function csvToJson(csv: string): string {
  const lines = csv.trim().split("\n");
  if (lines.length < 1) return "[]";
  const headers = lines[0].split(",").map((h) => h.trim().replace(/^"|"$/g, ""));
  const result: Record<string, string>[] = [];
  for (let i = 1; i < lines.length; i++) {
    const vals = lines[i].split(",").map((v) => v.trim().replace(/^"|"$/g, ""));
    if (vals.length === 0 || (vals.length === 1 && vals[0] === "")) continue;
    const row: Record<string, string> = {};
    headers.forEach((h, idx) => { row[h] = vals[idx] ?? ""; });
    result.push(row);
  }
  return JSON.stringify(result, null, 2);
}

function jsonToCsv(json: string): string {
  const data = JSON.parse(json);
  if (!Array.isArray(data) || data.length === 0) return "";
  const headers = Object.keys(data[0]);
  const lines = [headers.join(",")];
  for (const row of data) {
    lines.push(headers.map((h) => {
      const v = String(row[h] ?? "");
      return v.includes(",") || v.includes('"') ? `"${v.replace(/"/g, '""')}"` : v;
    }).join(","));
  }
  return lines.join("\n");
}

export default function CsvJsonPage() {
  const { t } = useLocale();
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"csv2json" | "json2csv">("csv2json");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const convert = useCallback(() => {
    setError("");
    if (!input.trim()) return;
    try {
      setOutput(mode === "csv2json" ? csvToJson(input) : jsonToCsv(input));
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
    }
  }, [input, mode]);

  const copy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true); setTimeout(() => setCopied(false), 1500);
  };

  return (
    <ToolLayout title={t("tool.csv-json.title")} description={t("tool.csv-json.desc")}>
      <div className="space-y-4">
        <div className="flex gap-2">
          <button onClick={() => { setMode("csv2json"); setError(""); }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode === "csv2json" ? "bg-sky-500 text-white" : "border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800"}`}>
            CSV → JSON
          </button>
          <button onClick={() => { setMode("json2csv"); setError(""); }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode === "json2csv" ? "bg-sky-500 text-white" : "border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800"}`}>
            JSON → CSV
          </button>
        </div>
        <div>
          <textarea value={input} onChange={(e) => setInput(e.target.value)}
            placeholder={mode === "csv2json" ? "name,age,city\nAlice,30,NYC\nBob,25,LA" : '[{"name":"Alice","age":"30"}]'}
            rows={8} className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 resize-y" />
        </div>
        <button onClick={convert} className="px-6 py-2 rounded-lg bg-sky-500 text-white hover:bg-sky-600 text-sm font-medium transition-colors">
          {t("common.convert")}
        </button>
        {error && <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-sm text-red-600 dark:text-red-400 font-mono">{error}</div>}
        {output && (
          <div>
            <div className="relative">
              <textarea readOnly value={output} rows={8} className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-900 font-mono text-sm resize-y" />
              <button onClick={copy} className="absolute top-2 right-2 px-3 py-1 text-xs rounded bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600">{copied ? t("common.copied") : t("common.copy")}</button>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
