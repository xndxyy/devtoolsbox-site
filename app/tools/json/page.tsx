"use client";

import { useState, useCallback } from "react";
import ToolLayout from "@/components/devtools/ToolLayout";
import { useLocale } from "@/components/devtools/LocaleContext";

export default function JsonPage() {
  const { t } = useLocale();
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const format = useCallback(() => {
    setError("");
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
    }
  }, [input]);

  const minify = useCallback(() => {
    setError("");
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
    }
  }, [input]);

  const validate = useCallback(() => {
    setError("");
    try {
      JSON.parse(input);
      setOutput(t("json.valid"));
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
    }
  }, [input, t]);

  const copy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <ToolLayout title={t("tool.json.title")} description={t("tool.json.desc")}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">
            {t("json.input")}
          </label>
          <textarea
            value={input}
            onChange={(e) => { setInput(e.target.value); setError(""); }}
            placeholder='{"name": "devtools", "version": 1}'
            rows={8}
            className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 resize-y"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          <button onClick={format} className="px-4 py-2 rounded-lg bg-sky-500 text-white hover:bg-sky-600 transition-colors text-sm font-medium">
            {t("json.format")}
          </button>
          <button onClick={minify} className="px-4 py-2 rounded-lg bg-zinc-500 text-white hover:bg-zinc-600 transition-colors text-sm font-medium">
            {t("json.minify")}
          </button>
          <button onClick={validate} className="px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-600 hover:border-sky-400 transition-colors text-sm font-medium bg-white dark:bg-zinc-800">
            {t("json.validate")}
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-sm text-red-600 dark:text-red-400 font-mono">
            {error}
          </div>
        )}

        {output && (
          <div>
            <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">
              {t("common.output")}
            </label>
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
