"use client";

import { useState, useCallback } from "react";
import ToolLayout from "@/components/devtools/ToolLayout";
import { useLocale } from "@/components/devtools/LocaleContext";

function formatXml(xml: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, "text/xml");
  const errors = doc.getElementsByTagName("parsererror");
  if (errors.length) throw new Error(errors[0].textContent || "Invalid XML");

  const ser = new XMLSerializer();
  const str = ser.serializeToString(doc);
  let indent = 0;
  return str
    .replace(/(>)(<)(\/?)/g, "$1\n$2$3")
    .split("\n")
    .map((line) => {
      const trim = line.trim();
      if (!trim) return "";
      const isClosing = trim.startsWith("</") || trim.endsWith("/>") || trim.startsWith("<?");
      if (isClosing && !trim.startsWith("<?")) indent--;
      const result = "  ".repeat(Math.max(0, indent)) + trim;
      if (!trim.endsWith("/>") && !trim.startsWith("<?") && !trim.startsWith("</") && !trim.endsWith("-->"))
        indent++;
      return result;
    })
    .filter(Boolean)
    .join("\n");
}

function minifyXml(xml: string): string {
  return xml.replace(/>\s+</g, "><").trim();
}

export default function XmlFormatterPage() {
  const { t } = useLocale();
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const format = useCallback(() => {
    setError("");
    try { setOutput(formatXml(input)); }
    catch (e) { setError((e as Error).message); setOutput(""); }
  }, [input]);

  const minify = useCallback(() => {
    setError("");
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(input, "text/xml");
      const errors = doc.getElementsByTagName("parsererror");
      if (errors.length) throw new Error(errors[0].textContent || "Invalid XML");
      setOutput(minifyXml(input));
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
    }
  }, [input]);

  const validate = useCallback(() => {
    setError("");
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(input, "text/xml");
      const errors = doc.getElementsByTagName("parsererror");
      if (errors.length) throw new Error(errors[0].textContent || "Invalid XML");
      setOutput("✅ Valid XML");
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
    }
  }, [input]);

  const copy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true); setTimeout(() => setCopied(false), 1500);
  };

  return (
    <ToolLayout title={t("tool.xml-formatter.title")} description={t("tool.xml-formatter.desc")}>
      <div className="space-y-4">
        <div>
          <textarea value={input} onChange={(e) => { setInput(e.target.value); setError(""); }}
            placeholder="<root><item>value</item></root>"
            rows={8} className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 resize-y" />
        </div>
        <div className="flex gap-2 flex-wrap">
          <button onClick={format} className="px-4 py-2 rounded-lg bg-sky-500 text-white hover:bg-sky-600 text-sm font-medium transition-colors">{t("json.format")}</button>
          <button onClick={minify} className="px-4 py-2 rounded-lg bg-zinc-500 text-white hover:bg-zinc-600 text-sm font-medium transition-colors">{t("json.minify")}</button>
          <button onClick={validate} className="px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-600 hover:border-sky-400 text-sm font-medium bg-white dark:bg-zinc-800 transition-colors">{t("json.validate")}</button>
        </div>
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
