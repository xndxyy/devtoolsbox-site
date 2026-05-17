"use client";

import { useState, useCallback } from "react";
import { format } from "sql-formatter";
import ToolLayout from "@/components/devtools/ToolLayout";
import { useLocale } from "@/components/devtools/LocaleContext";

const dialects = [
  "sql", "mysql", "postgresql", "sqlite", "mariadb",
  "mssql", "db2", "plsql", "n1ql", "bigquery",
  "redshift", "spark", "hive", "trino",
] as const;

export default function SqlFormatterPage() {
  const { t } = useLocale();
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [dialect, setDialect] = useState<string>("sql");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleFormat = useCallback(() => {
    setError("");
    try {
      const result = format(input, {
        language: dialect as any,
        tabWidth: 2,
        useTabs: false,
      });
      setOutput(result);
    } catch (e: any) {
      setError(e?.message || t("sql.error"));
      setOutput("");
    }
  }, [input, dialect, t]);

  const copy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <ToolLayout title={t("tool.sql-formatter.title")} description={t("tool.sql-formatter.desc")}>
      <div className="space-y-4">
        <div className="flex flex-wrap gap-3 items-center">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{t("sql.dialect")}</label>
          <select value={dialect} onChange={(e) => setDialect(e.target.value)}
            className="px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-sm">
            {dialects.map((d) => (
              <option key={d} value={d}>{d.toUpperCase()}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">{t("sql.input")}</label>
          <textarea value={input} onChange={(e) => setInput(e.target.value)}
            placeholder={t("sql.placeholder")}
            rows={8} className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 resize-y" />
        </div>

        <div className="flex gap-2">
          <button onClick={handleFormat} className="px-6 py-2 rounded-lg bg-sky-500 text-white hover:bg-sky-600 transition-colors text-sm font-medium">
            {t("sql.format")}
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-sm text-red-600 dark:text-red-400">{error}</div>
        )}

        {output && (
          <div>
            <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">{t("sql.output")}</label>
            <div className="relative">
              <textarea readOnly value={output} rows={8} className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-900 font-mono text-sm resize-y" />
              <button onClick={copy} className="absolute top-2 right-2 px-3 py-1 text-xs rounded bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors">
                {copied ? t("common.copied") : t("common.copy")}
              </button>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
