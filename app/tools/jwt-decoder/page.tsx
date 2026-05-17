"use client";

import { useState, useCallback } from "react";
import ToolLayout from "@/components/devtools/ToolLayout";
import { useLocale } from "@/components/devtools/LocaleContext";

function base64UrlDecode(str: string): string {
  str = str.replace(/-/g, "+").replace(/_/g, "/");
  while (str.length % 4) str += "=";
  try {
    return decodeURIComponent(escape(atob(str)));
  } catch {
    return atob(str);
  }
}

export default function JwtDecoderPage() {
  const { t } = useLocale();
  const [input, setInput] = useState("");
  const [header, setHeader] = useState("");
  const [payload, setPayload] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState<"header" | "payload" | null>(null);

  const decode = useCallback(() => {
    setError(""); setHeader(""); setPayload("");
    if (!input.trim()) return;
    const parts = input.trim().split(".");
    if (parts.length !== 3) {
      setError("Invalid JWT: expected 3 base64-encoded segments separated by dots");
      return;
    }
    try {
      const h = base64UrlDecode(parts[0]);
      JSON.parse(h); // validate JSON
      setHeader(JSON.stringify(JSON.parse(h), null, 2));
      const p = base64UrlDecode(parts[1]);
      JSON.parse(p);
      setPayload(JSON.stringify(JSON.parse(p), null, 2));
    } catch (e) {
      setError("Failed to decode JWT: " + (e as Error).message);
    }
  }, [input]);

  const copy = async (type: "header" | "payload", text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(type); setTimeout(() => setCopied(null), 1500);
  };

  return (
    <ToolLayout title={t("tool.jwt-decoder.title")} description={t("tool.jwt-decoder.desc")}>
      <div className="space-y-4">
        <div>
          <textarea value={input} onChange={(e) => setInput(e.target.value)}
            placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIn0..."
            rows={5} className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 resize-y" />
        </div>
        <button onClick={decode} className="px-6 py-2 rounded-lg bg-sky-500 text-white hover:bg-sky-600 text-sm font-medium transition-colors">
          Decode
        </button>

        {error && <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-sm text-red-600 dark:text-red-400 font-mono">{error}</div>}

        {header && (
          <div>
            <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">
              Header <span className="text-xs text-zinc-400 font-normal">(algorithm & token type)</span>
            </label>
            <div className="relative">
              <textarea readOnly value={header} rows={4} className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-900 font-mono text-sm resize-y" />
              <button onClick={() => copy("header", header)} className="absolute top-2 right-2 px-2 py-0.5 text-xs rounded bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600">{copied === "header" ? t("common.copied") : t("common.copy")}</button>
            </div>
          </div>
        )}
        {payload && (
          <div>
            <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">
              Payload <span className="text-xs text-zinc-400 font-normal">(claims)</span>
            </label>
            <div className="relative">
              <textarea readOnly value={payload} rows={8} className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-900 font-mono text-sm resize-y" />
              <button onClick={() => copy("payload", payload)} className="absolute top-2 right-2 px-2 py-0.5 text-xs rounded bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600">{copied === "payload" ? t("common.copied") : t("common.copy")}</button>
            </div>
            {(() => {
              try {
                const claims = JSON.parse(payload);
                const lines: string[] = [];
                if (claims.exp) {
                  const exp = new Date(claims.exp * 1000);
                  lines.push(`⏰ Expiration: ${exp.toLocaleString()}${exp < new Date() ? " (EXPIRED)" : " (valid)"}`);
                }
                if (claims.iat) lines.push(`📅 Issued: ${new Date(claims.iat * 1000).toLocaleString()}`);
                if (claims.sub) lines.push(`👤 Subject: ${claims.sub}`);
                if (claims.iss) lines.push(`🏢 Issuer: ${claims.iss}`);
                return lines.length ? (
                  <div className="mt-2 p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-sm whitespace-pre-line">{lines.join("\n")}</div>
                ) : null;
              } catch { return null; }
            })()}
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
