"use client";

import { useState, useCallback } from "react";
import * as yaml from "js-yaml";
import ToolLayout from "@/components/devtools/ToolLayout";
import { useLocale } from "@/components/devtools/LocaleContext";

export default function YamlJsonPage() {
  const { t } = useLocale();
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"yaml2json" | "json2yaml">("yaml2json");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const convert = useCallback(() => {
    setError("");
    if (!input.trim()) return;
    try {
      if (mode === "yaml2json") {
        const parsed = yaml.load(input);
        setOutput(JSON.stringify(parsed, null, 2));
      } else {
        const parsed = JSON.parse(input);
        setOutput(yaml.dump(parsed, { indent: 2 }));
      }
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
    <ToolLayout title={t("tool.yaml-json.title")} description={t("tool.yaml-json.desc")}>
      <div className="space-y-4">
        <div className="flex gap-2">
          <button onClick={() => { setMode("yaml2json"); setError(""); }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode === "yaml2json" ? "bg-sky-500 text-white" : "border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800"}`}>
            YAML → JSON
          </button>
          <button onClick={() => { setMode("json2yaml"); setError(""); }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode === "json2yaml" ? "bg-sky-500 text-white" : "border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800"}`}>
            JSON → YAML
          </button>
        </div>
        <div>
          <textarea value={input} onChange={(e) => setInput(e.target.value)}
            placeholder={mode === "yaml2json" ? "key: value\nlist:\n  - item1\n  - item2" : '{"key": "value"}'}
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
