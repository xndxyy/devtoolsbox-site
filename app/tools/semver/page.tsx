"use client";

import { useState, useMemo } from "react";
import ToolLayout from "@/components/devtools/ToolLayout";
import { useLocale } from "@/components/devtools/LocaleContext";

// Minimal semver parser (handles common npm ranges)
function parseRange(range: string): { type: string; major: number; minor: number; patch: number; operator?: string }[] {
  const parts = range.split(/\s*\|\|\s*/);
  return parts.flatMap((part) => {
    part = part.trim();
    const conditions: { type: string; major: number; minor: number; patch: number; operator?: string }[] = [];
    const sub = part.split(/\s+/);
    let i = 0;
    const op = sub.find((s) => /^[><=!]+/.test(s)) || undefined;
    while (i < sub.length) {
      const token = sub[i];
      if (/^[\^~]/.test(token)) {
        const ver = token.replace(/^[\^~]/, "").split(".").map(Number);
        conditions.push({
          type: token.startsWith("^") ? "caret" : "tilde",
          major: ver[0] || 0,
          minor: ver[1] ?? (token.startsWith("~") ? 0 : -1),
          patch: ver[2] ?? -1,
          operator: op,
        });
      } else if (/^\d/.test(token)) {
        const parts = token.split(".");
        conditions.push({
          type: "exact",
          major: +parts[0],
          minor: parts[1] !== undefined ? +parts[1] : -1,
          patch: parts[2] !== undefined ? +parts[2] : -1,
        });
      } else if (token.includes("x") || token.includes("X") || token === "*") {
        const parts = token.split(".");
        conditions.push({
          type: "wildcard",
          major: parts[0] !== "*" ? +parts[0] : -1,
          minor: parts[1] && parts[1] !== "*" && parts[1] !== "x" && parts[1] !== "X" ? +parts[1] : -1,
          patch: -1,
        });
      } else if (/^[><=!]/.test(token)) {
        // operator + version combo, handled on next iteration
      }
      i++;
    }
    return conditions;
  });
}

function satisfies(version: string, range: string): boolean {
  const [verMajor, verMinor, verPatch] = version.split(".").map(Number);
  if (isNaN(verMajor)) return false;
  const conditions = parseRange(range);
  if (conditions.length === 0) return false;

  return conditions.some((cond) => {
    switch (cond.type) {
      case "caret": {
        // ^1.2.3 means >=1.2.3 <2.0.0
        const upperMajor = cond.major + 1;
        const upperMinor = 0;
        const upperPatch = 0;
        const lower = verMajor > cond.major || (verMajor === cond.major && (cond.minor >= 0 ? verMinor >= cond.minor : true) && (cond.patch >= 0 ? verPatch >= cond.patch : true));
        const upper = verMajor < upperMajor;
        return lower && upper;
      }
      case "tilde": {
        // ~1.2.3 means >=1.2.3 <1.3.0
        const upperMajor = cond.major;
        const upperMinor = cond.minor + 1;
        const lower = verMajor === cond.major && verMinor >= cond.minor && (cond.patch >= 0 ? verPatch >= cond.patch : true);
        const upper = verMajor === upperMajor && verMinor < upperMinor;
        return lower && upper;
      }
      case "exact":
        return verMajor === cond.major && (cond.minor < 0 || verMinor === cond.minor) && (cond.patch < 0 || verPatch === cond.patch);
      case "wildcard": {
        if (cond.major >= 0 && verMajor !== cond.major) return false;
        if (cond.minor >= 0 && verMinor !== cond.minor) return false;
        return true;
      }
      default:
        return false;
    }
  });
}

function generateVersions(range: string): { v: string; inRange: boolean }[] {
  const versions: { v: string; inRange: boolean }[] = [];
  const conditions = parseRange(range);
  if (conditions.length === 0) return [];

  // Determine version range to display
  let minMajor = 0, maxMajor = 10;

  for (const c of conditions) {
    if (c.major >= 0) {
      if (c.type === "caret") maxMajor = Math.max(maxMajor, c.major + 2);
      else maxMajor = Math.max(maxMajor, c.major + 2);
    }
  }

  // Use a set of interesting versions
  const interestingVersions = new Set<string>();
  for (const c of conditions) {
    if (c.type === "caret") {
      for (let m = Math.max(0, c.major - 1); m <= c.major + 2; m++) {
        for (let n = 0; n <= 3; n++) {
          interestingVersions.add(`${m}.${n}.0`);
          interestingVersions.add(`${m}.${n}.${n}`);
        }
      }
    } else if (c.type === "tilde") {
      for (let n = Math.max(0, c.minor - 2); n <= c.minor + 3; n++) {
        interestingVersions.add(`${c.major}.${n}.0`);
        interestingVersions.add(`${c.major}.${n}.${n}`);
      }
    } else if (c.type === "exact") {
      interestingVersions.add(`${c.major}.${c.minor >= 0 ? c.minor : 0}.${c.patch >= 0 ? c.patch : 0}`);
    } else {
      for (let m = 0; m <= 5; m++) {
        interestingVersions.add(`${m}.0.0`);
        interestingVersions.add(`${m}.1.0`);
      }
    }
  }

  // Add some standard versions
  for (const v of ["1.0.0", "1.1.0", "1.2.0", "1.2.3", "1.3.0", "2.0.0", "2.1.0", "2.2.0", "3.0.0", "4.0.0", "4.1.0", "4.2.0", "4.2.3", "4.3.0", "5.0.0", "5.1.0", "5.2.0", "6.0.0"]) {
    interestingVersions.add(v);
  }

  for (const v of interestingVersions) {
    const [m, n, p] = v.split(".").map(Number);
    if (m >= minMajor && m <= maxMajor) {
      versions.push({ v, inRange: satisfies(v, range) });
    }
  }

  return versions.sort((a, b) => {
    const [am, an, ap] = a.v.split(".").map(Number);
    const [bm, bn, bp] = b.v.split(".").map(Number);
    return am - bm || an - bn || ap - bp;
  });
}

const examples = [
  { label: "^1.2.3", range: "^1.2.3" },
  { label: "~1.2.3", range: "~1.2.3" },
  { label: "1.2.x", range: "1.2.x" },
  { label: "^1.0.0 || ~2.0.0", range: "^1.0.0 || ~2.0.0" },
  { label: ">=1.0.0 <2.0.0", range: ">=1.0.0 <2.0.0" },
  { label: "4.x", range: "4.x" },
];

export default function SemverPage() {
  const { t, locale } = useLocale();
  const [range, setRange] = useState("^4.2.0 || ~5.1.0");
  const [testVersion, setTestVersion] = useState("4.3.1");

  const versions = useMemo(() => generateVersions(range), [range]);
  const testResult = useMemo(() => {
    if (!testVersion) return null;
    try {
      return satisfies(testVersion, range);
    } catch {
      return null;
    }
  }, [testVersion, range]);

  const inRange = versions.filter((v) => v.inRange);
  const outRange = versions.filter((v) => !v.inRange);

  return (
    <ToolLayout title={t("tool.semver.title")} description={t("tool.semver.desc")}>
      <div className="space-y-6">
        {/* Range input */}
        <div>
          <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">{t("semver.range")}</label>
          <input value={range} onChange={(e) => setRange(e.target.value)}
            placeholder={t("semver.input")}
            className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-sky-400" />
        </div>

        {/* Test version */}
        <div>
          <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">{t("semver.version")}</label>
          <div className="flex gap-3 items-center">
            <input value={testVersion} onChange={(e) => setTestVersion(e.target.value)}
              placeholder={t("semver.testPlaceholder")}
              className="flex-1 px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-sky-400" />
            {testResult !== null && (
              <div className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold ${testResult ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800" : "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800"}`}>
                <span>{testResult ? "✓" : "✗"}</span>
                <span>{testResult ? t("semver.satisfies") : t("semver.notSatisfies")}</span>
              </div>
            )}
          </div>
        </div>

        {/* Visual timeline */}
        <div>
          <label className="block text-sm font-medium mb-3 text-zinc-700 dark:text-zinc-300">
            {locale === "zh" ? "版本范围可视化" : "Range Visualization"}
            <span className="text-xs text-zinc-400 ml-2 font-normal">
              ({inRange.length} {locale === "zh" ? "个版本在范围内" : "versions in range"})
            </span>
          </label>

          {versions.length > 0 && (
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-4 overflow-x-auto">
              {/* Color bar */}
              <div className="flex h-8 rounded-lg overflow-hidden mb-4">
                {versions.map((v, i) => (
                  <div key={v.v}
                    className={`flex-1 min-w-[2px] transition-colors ${v.inRange ? "bg-emerald-400" : "bg-zinc-200 dark:bg-zinc-700"}`}
                    title={`${v.v} - ${v.inRange ? "In range" : "Out of range"}`} />
                ))}
              </div>

              {/* Version labels */}
              <div className="flex gap-1 flex-wrap">
                {versions.map((v) => {
                  const isTest = v.v === testVersion;
                  return (
                    <button key={v.v} onClick={() => setTestVersion(v.v)}
                      className={`px-2 py-1 rounded text-xs font-mono transition-all cursor-pointer ${
                        isTest
                          ? "bg-sky-500 text-white ring-2 ring-sky-300 scale-110"
                          : v.inRange
                            ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                            : "bg-zinc-50 dark:bg-zinc-800 text-zinc-400 border border-zinc-200 dark:border-zinc-700"
                      }`}>
                      {v.v}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {versions.length === 0 && (
            <div className="p-8 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-center text-sm text-zinc-400">
              {t("semver.noVersions")}
            </div>
          )}
        </div>

        {/* Examples */}
        <div>
          <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">{t("semver.example")}</label>
          <div className="flex flex-wrap gap-2">
            {examples.map((ex) => (
              <button key={ex.label} onClick={() => setRange(ex.range)}
                className="px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs font-mono hover:border-sky-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                {ex.label}
              </button>
            ))}
          </div>
          <div className="mt-3 space-y-1 text-xs text-zinc-400 leading-relaxed">
            <p><code className="text-zinc-600 dark:text-zinc-300">^1.2.3</code> — {t("semver.caret")}</p>
            <p><code className="text-zinc-600 dark:text-zinc-300">~1.2.3</code> — {t("semver.tilde")}</p>
            <p><code className="text-zinc-600 dark:text-zinc-300">1.2.x</code> — {t("semver.wildcard")}</p>
            <p><code className="text-zinc-600 dark:text-zinc-300">||</code> — {t("semver.or")}</p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
