"use client";

import { useState, useCallback } from "react";
import ToolLayout from "@/components/devtools/ToolLayout";
import { useLocale } from "@/components/devtools/LocaleContext";

export default function Base64Page() {
  const { t } = useLocale();
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const process = useCallback(() => {
    setError("");
    try {
      if (mode === "encode") {
        setOutput(btoa(unescape(encodeURIComponent(input))));
      } else {
        setOutput(decodeURIComponent(escape(atob(input))));
      }
    } catch {
      setError(mode === "decode" ? t("base64.invalid") : t("common.error"));
      setOutput("");
    }
  }, [input, mode, t]);

  const copy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const swap = () => {
    const tmp = input;
    setInput(output);
    setOutput(tmp);
    setError("");
  };

  return (
    <ToolLayout title={t("tool.base64.title")} description={t("tool.base64.desc")}>
      <div className="space-y-4">
        <div className="flex gap-2">
          <button onClick={() => { setMode("encode"); setError(""); }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode === "encode" ? "bg-sky-500 text-white" : "border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800"}`}>
            {t("common.encode")}
          </button>
          <button onClick={() => { setMode("decode"); setError(""); }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode === "decode" ? "bg-sky-500 text-white" : "border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800"}`}>
            {t("common.decode")}
          </button>
          <button onClick={swap} className="px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-sm hover:border-sky-400 transition-colors">
            {t("common.swap")}
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">
            {mode === "encode" ? t("base64.input") : t("base64.inputB64")}
          </label>
          <textarea value={input} onChange={(e) => setInput(e.target.value)}
            placeholder={mode === "encode" ? "Text to encode..." : "Base64 to decode..."}
            rows={8} className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 resize-y" />
        </div>

        <button onClick={process} className="px-6 py-2 rounded-lg bg-sky-500 text-white hover:bg-sky-600 transition-colors text-sm font-medium">
          {mode === "encode" ? t("common.encode") : t("common.decode")}
        </button>

        {error && (
          <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-sm text-red-600 dark:text-red-400">{error}</div>
        )}

        {output && (
          <div>
            <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">
              {mode === "encode" ? t("base64.result") : t("base64.resultDecoded")}
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
