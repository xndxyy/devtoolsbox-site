"use client";

import { useState, useCallback } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import ToolLayout from "@/components/devtools/ToolLayout";
import { useLocale } from "@/components/devtools/LocaleContext";

export default function MarkdownHtmlPage() {
  const { t } = useLocale();
  const [input, setInput] = useState("# Hello World\n\nThis is **markdown**.");
  const [html, setHtml] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const convert = useCallback(async () => {
    setError("");
    if (!input.trim()) { setHtml(""); return; }
    try {
      const result = await marked.parse(input);
      const sanitized = DOMPurify.sanitize(result);
      setHtml(sanitized);
    } catch (e) {
      setError((e as Error).message);
      setHtml("");
    }
  }, [input]);

  const copy = async () => {
    if (!html) return;
    await navigator.clipboard.writeText(html);
    setCopied(true); setTimeout(() => setCopied(false), 1500);
  };

  return (
    <ToolLayout title={t("tool.markdown-html.title")} description={t("tool.markdown-html.desc")}>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">Markdown</label>
            <textarea value={input} onChange={(e) => setInput(e.target.value)}
              rows={8} className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 resize-y" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">HTML Preview</label>
            <div className="w-full min-h-[18rem] px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-sm overflow-auto prose prose-sm dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: html || "<p class='text-zinc-400 italic'>Preview will appear here...</p>" }} />
          </div>
        </div>

        <div className="flex gap-2">
          <button onClick={convert} className="px-6 py-2 rounded-lg bg-sky-500 text-white hover:bg-sky-600 text-sm font-medium transition-colors">
            {t("common.convert")}
          </button>
          {html && (
            <button onClick={copy} className="px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-sm font-medium transition-colors hover:border-sky-400">
              {copied ? t("common.copied") : t("common.copy")} HTML
            </button>
          )}
        </div>

        {error && <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-sm text-red-600 dark:text-red-400 font-mono">{error}</div>}
      </div>
    </ToolLayout>
  );
}
