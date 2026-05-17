"use client";

import { useState, useMemo } from "react";
import ToolLayout from "@/components/devtools/ToolLayout";
import { useLocale } from "@/components/devtools/LocaleContext";

interface EnvEntry {
  key: string;
  value: string;
  line: number;
  type: "comment" | "empty" | "valid" | "duplicate";
}

function parseEnv(text: string): { entries: EnvEntry[]; errors: { msg: string; line: number }[] } {
  const lines = text.split("\n");
  const entries: EnvEntry[] = [];
  const errors: { msg: string; line: number }[] = [];
  const seenKeys = new Map<string, number[]>();

  lines.forEach((raw, i) => {
    const line = i + 1;
    const trimmed = raw.trim();

    if (!trimmed || trimmed.startsWith("#")) {
      entries.push({ key: trimmed, value: "", line, type: "comment" });
      return;
    }

    if (trimmed.startsWith("export ")) {
      // Handle `export KEY=VALUE` format
      const eqIdx = trimmed.indexOf("=", 7);
      if (eqIdx === -1) {
        errors.push({ msg: `Invalid export syntax at line ${line}`, line });
        return;
      }
      const key = trimmed.slice(7, eqIdx).trim();
      let value = trimmed.slice(eqIdx + 1).trim();
      // Remove surrounding quotes
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      if (!key) {
        errors.push({ msg: `Missing key at line ${line}`, line });
        return;
      }
      if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(key)) {
        errors.push({ msg: `Invalid key format: "${key}" at line ${line}`, line });
      }
      entries.push({ key, value, line, type: "valid" });
      seenKeys.set(key, [...(seenKeys.get(key) || []), line]);
      return;
    }

    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) {
      errors.push({ msg: `Missing "=" at line ${line}`, line });
      return;
    }

    const key = trimmed.slice(0, eqIdx).trim();
    let value = trimmed.slice(eqIdx + 1).trim();

    // Remove surrounding quotes
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    if (!key) {
      errors.push({ msg: `Missing key at line ${line}`, line });
      return;
    }

    if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(key)) {
      errors.push({ msg: `Invalid key format: "${key}" at line ${line}`, line });
    }

    if (!value) {
      entries.push({ key, value: "", line, type: "empty" });
    } else {
      entries.push({ key, value, line, type: "valid" });
    }

    seenKeys.set(key, [...(seenKeys.get(key) || []), line]);
  });

  // Mark duplicates
  for (const [key, lines] of seenKeys) {
    if (lines.length > 1) {
      entries.forEach((e) => {
        if (e.key === key && e.type !== "comment") e.type = "duplicate";
      });
    }
  }

  return { entries, errors };
}

function diffEnvs(a: EnvEntry[], b: EnvEntry[]) {
  const mapA = new Map(a.filter((e) => e.type !== "comment").map((e) => [e.key, e]));
  const mapB = new Map(b.filter((e) => e.type !== "comment").map((e) => [e.key, e]));
  const allKeys = new Set([...mapA.keys(), ...mapB.keys()]);
  const diff: { key: string; status: string; valA?: string; valB?: string }[] = [];

  for (const key of allKeys) {
    const entryA = mapA.get(key);
    const entryB = mapB.get(key);
    if (!entryA && entryB) {
      diff.push({ key, status: "onlyInB", valB: entryB.value });
    } else if (entryA && !entryB) {
      diff.push({ key, status: "onlyInA", valA: entryA.value });
    } else if (entryA && entryB && entryA.value !== entryB.value) {
      diff.push({ key, status: "different", valA: entryA.value, valB: entryB.value });
    } else if (entryA && entryB) {
      diff.push({ key, status: "identical", valA: entryA.value, valB: entryB.value });
    }
  }

  return diff;
}

const sampleEnv = `# App Configuration
APP_NAME=MyApp
NODE_ENV=production
PORT=3000
DATABASE_URL=postgres://localhost:5432/myapp
REDIS_URL=
API_KEY=sk-1234567890

# Feature Flags
ENABLE_FEATURE_X=true`;

const sampleEnvProd = `# App Configuration
APP_NAME=MyApp
NODE_ENV=production
PORT=8080
DATABASE_URL=postgres://prod-host:5432/myapp
REDIS_URL=redis://prod:6379
STRIPE_KEY=pk_live_xxx

# Feature Flags
ENABLE_FEATURE_X=false
ENABLE_FEATURE_Y=true`;

type Tab = "validate" | "compare";

export default function EnvValidatorPage() {
  const { t, locale } = useLocale();
  const [tab, setTab] = useState<Tab>("validate");
  const [envA, setEnvA] = useState(sampleEnv);
  const [envB, setEnvB] = useState(sampleEnvProd);
  const [copied, setCopied] = useState(false);

  const resultA = useMemo(() => parseEnv(envA), [envA]);
  const resultB = useMemo(() => parseEnv(envB), [envB]);

  const diff = useMemo(() => {
    if (tab !== "compare") return [];
    return diffEnvs(resultA.entries, resultB.entries);
  }, [resultA.entries, resultB.entries, tab]);

  const issuesA = useMemo(() => resultA.entries.filter((e) => e.type === "empty" || e.type === "duplicate"), [resultA.entries]);

  const copy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <ToolLayout title={t("tool.env.title")} description={t("tool.env.desc")}>
      <div className="space-y-4">
        {/* Tabs */}
        <div className="flex gap-1 rounded-xl border border-zinc-200 dark:border-zinc-700 p-1 bg-zinc-100 dark:bg-zinc-800 w-fit">
          {(["validate", "compare"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === t ? "bg-white dark:bg-zinc-700 shadow-sm text-zinc-900 dark:text-zinc-100" : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"}`}>
              {t === "validate" ? (locale === "zh" ? "校验" : "Validate") : (locale === "zh" ? "对比" : "Compare")}
            </button>
          ))}
        </div>

        {tab === "validate" && (
          <>
            <div>
              <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">{t("env.paste")}</label>
              <textarea value={envA} onChange={(e) => setEnvA(e.target.value)}
                rows={8} spellCheck={false}
                className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 resize-y" />
            </div>

            {/* Issues */}
            {resultA.errors.length > 0 && (
              <div className="p-4 rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
                <div className="text-sm font-semibold text-red-600 dark:text-red-400 mb-2">{t("env.issues")} ({resultA.errors.length})</div>
                {resultA.errors.map((e, i) => (
                  <div key={i} className="text-xs text-red-500 font-mono mb-1">Line {e.line}: {e.msg}</div>
                ))}
              </div>
            )}

            {issuesA.length > 0 && (
              <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20">
                <div className="text-sm font-semibold text-amber-600 dark:text-amber-400 mb-2">⚠ {t("env.issues")} ({issuesA.length})</div>
                {issuesA.filter((e) => e.type === "empty").map((e) => (
                  <div key={`e-${e.line}`} className="text-xs text-amber-600 dark:text-amber-400 font-mono mb-1">
                    Line {e.line}: <span className="font-semibold">{e.key}</span> — {t("env.empty")}
                  </div>
                ))}
                {issuesA.filter((e) => e.type === "duplicate").map((e) => (
                  <div key={`d-${e.line}`} className="text-xs text-amber-600 dark:text-amber-400 font-mono mb-1">
                    Line {e.line}: <span className="font-semibold">{e.key}</span> — {t("env.duplicate")}
                  </div>
                ))}
              </div>
            )}

            {resultA.errors.length === 0 && issuesA.length === 0 && (
              <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-sm font-semibold">
                ✅ {t("env.noIssues")}
              </div>
            )}

            {/* Key list */}
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 overflow-hidden">
              <div className="grid grid-cols-[auto_1fr_auto] gap-x-4 gap-y-1 p-4 bg-zinc-50 dark:bg-zinc-800/50 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                <span>{t("env.key")}</span>
                <span>{t("env.value")}</span>
                <span>{t("env.status")}</span>
              </div>
              <div className="divide-y divide-zinc-100 dark:divide-zinc-700/50">
                {resultA.entries.map((e, i) => (
                  <div key={i} className="grid grid-cols-[auto_1fr_auto] gap-x-4 gap-y-1 px-4 py-2 text-xs font-mono">
                    {e.type === "comment" ? (
                      <span className="col-span-3 text-zinc-400">{e.key}</span>
                    ) : (
                      <>
                        <span className={`${e.type === "duplicate" ? "text-amber-500" : "text-zinc-800 dark:text-zinc-200"} truncate max-w-[200px]`}>
                          {e.key}
                        </span>
                        <span className="text-zinc-500 truncate max-w-[300px]">{e.value || <span className="italic text-zinc-300 dark:text-zinc-600">{t("env.empty")}</span>}</span>
                        <span>
                          {e.type === "empty" && <span className="text-amber-500">⚠ {t("env.empty")}</span>}
                          {e.type === "duplicate" && <span className="text-amber-500">⚠ {t("env.duplicate")}</span>}
                          {e.type === "valid" && <span className="text-emerald-500">✓</span>}
                        </span>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {tab === "compare" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">{t("env.envA")}</label>
                <textarea value={envA} onChange={(e) => setEnvA(e.target.value)}
                  rows={8} spellCheck={false}
                  className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-sky-400 resize-y" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">{t("env.envB")}</label>
                <textarea value={envB} onChange={(e) => setEnvB(e.target.value)}
                  rows={8} spellCheck={false}
                  className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-sky-400 resize-y" />
              </div>
            </div>

            {/* Diff Summary */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: t("env.identical"), count: diff.filter((d) => d.status === "identical").length, color: "text-emerald-500" },
                { label: t("env.different"), count: diff.filter((d) => d.status === "different").length, color: "text-amber-500" },
                { label: t("env.onlyInA"), count: diff.filter((d) => d.status === "onlyInA").length, color: "text-blue-500" },
                { label: t("env.onlyInB"), count: diff.filter((d) => d.status === "onlyInB").length, color: "text-violet-500" },
              ].map((s) => (
                <div key={s.label} className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-center">
                  <div className={`text-2xl font-bold ${s.color}`}>{s.count}</div>
                  <div className="text-xs text-zinc-500 mt-1">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Diff Table */}
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 overflow-hidden">
              <div className="grid grid-cols-[auto_1fr_1fr] gap-4 p-3 bg-zinc-50 dark:bg-zinc-800/50 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                <span>{t("env.key")}</span>
                <span>{t("env.envA")}</span>
                <span>{t("env.envB")}</span>
              </div>
              <div className="divide-y divide-zinc-100 dark:divide-zinc-700/50 max-h-80 overflow-y-auto">
                {diff.map((d) => (
                  <div key={d.key} className={`grid grid-cols-[auto_1fr_1fr] gap-4 px-3 py-2 text-xs font-mono ${
                    d.status === "identical" ? "bg-white dark:bg-zinc-800" :
                    d.status === "different" ? "bg-amber-50 dark:bg-amber-900/10" :
                    d.status === "onlyInA" ? "bg-blue-50 dark:bg-blue-900/10" :
                    "bg-violet-50 dark:bg-violet-900/10"
                  }`}>
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200 truncate max-w-[150px]">{d.key}</span>
                    <span className={`truncate max-w-[200px] ${d.status === "onlyInA" ? "text-blue-500" : d.status === "different" ? "text-amber-600" : d.status === "identical" ? "text-emerald-600" : "text-zinc-300"}`}>
                      {d.valA ?? "—"}
                    </span>
                    <span className={`truncate max-w-[200px] ${d.status === "onlyInB" ? "text-violet-500" : d.status === "different" ? "text-amber-600" : d.status === "identical" ? "text-emerald-600" : "text-zinc-300"}`}>
                      {d.valB ?? "—"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </ToolLayout>
  );
}
