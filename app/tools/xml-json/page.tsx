"use client";

import { useState, useCallback } from "react";
import ToolLayout from "@/components/devtools/ToolLayout";
import { useLocale } from "@/components/devtools/LocaleContext";

function xmlToJson(xml: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, "text/xml");
  const errors = doc.getElementsByTagName("parsererror");
  if (errors.length) throw new Error(errors[0].textContent || "Invalid XML");
  function walk(node: Element): unknown {
    const obj: Record<string, unknown> = {};
    const attrs: Record<string, string> = {};
    for (let i = 0; i < node.attributes.length; i++) {
      attrs[node.attributes[i].name] = node.attributes[i].value;
    }
    if (Object.keys(attrs).length) obj["@attributes"] = attrs;
    const children = node.children;
    if (children.length === 0 && !node.textContent?.trim()) {
      return null;
    }
    if (children.length === 0) {
      const text = node.textContent?.trim() ?? "";
      if (Object.keys(attrs).length) { obj["#text"] = text; return obj; }
      return text;
    }
    const text = node.textContent?.trim() ?? "";
    if (text && children.length) {
      obj["#text"] = text;
    }
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      const key = child.tagName;
      const val = walk(child);
      if (obj[key] === undefined) { obj[key] = val; }
      else if (!Array.isArray(obj[key])) { obj[key] = [obj[key], val]; }
      else { (obj[key] as unknown[]).push(val); }
    }
    return obj;
  }
  const root = doc.documentElement;
  return JSON.stringify({ [root.tagName]: walk(root) }, null, 2);
}

function jsonToXml(jsonStr: string): string {
  const obj = JSON.parse(jsonStr);
  function build(obj: unknown, name?: string): string {
    if (obj === null || obj === undefined) return "";
    if (typeof obj === "string" || typeof obj === "number" || typeof obj === "boolean")
      return name ? `<${name}>${String(obj)}</${name}>` : String(obj);
    if (Array.isArray(obj))
      return obj.map((v) => build(v, name)).join("\n");
    const entries = Object.entries(obj as Record<string, unknown>);
    let attrs = "";
    let hasText = false;
    let textVal = "";
    let result = "";
    for (const [k, v] of entries) {
      if (k === "@attributes" && typeof v === "object" && v !== null) {
        for (const [ak, av] of Object.entries(v as Record<string, string>))
          attrs += ` ${ak}="${av}"`;
      } else if (k === "#text") { hasText = true; textVal = String(v); }
      else result += build(v, k);
    }
    if (!name) return result;
    if (hasText) return `<${name}${attrs}>${textVal}</${name}>`;
    if (!result) return `<${name}${attrs} />`;
    return `<${name}${attrs}>\n${result}\n</${name}>`;
  }
  return build(obj);
}

export default function XmlJsonPage() {
  const { t } = useLocale();
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"xml2json" | "json2xml">("xml2json");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const convert = useCallback(() => {
    setError("");
    if (!input.trim()) return;
    try {
      setOutput(mode === "xml2json" ? xmlToJson(input) : jsonToXml(input));
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
    <ToolLayout title={t("tool.xml-json.title")} description={t("tool.xml-json.desc")}>
      <div className="space-y-4">
        <div className="flex gap-2">
          <button onClick={() => { setMode("xml2json"); setError(""); }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode === "xml2json" ? "bg-sky-500 text-white" : "border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800"}`}>
            XML → JSON
          </button>
          <button onClick={() => { setMode("json2xml"); setError(""); }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode === "json2xml" ? "bg-sky-500 text-white" : "border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800"}`}>
            JSON → XML
          </button>
        </div>
        <div>
          <textarea value={input} onChange={(e) => setInput(e.target.value)}
            placeholder={mode === "xml2json" ? "<root><item>value</item></root>" : '{"root": {"item": "value"}}'}
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
