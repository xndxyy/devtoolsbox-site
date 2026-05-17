"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import ToolLayout from "@/components/devtools/ToolLayout";
import { useLocale } from "@/components/devtools/LocaleContext";

export default function RegexPage() {
  const { t } = useLocale();
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState({ g: true, i: false, m: false, s: false, u: false });
  const [testStr, setTestStr] = useState("");
  const [matches, setMatches] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [matchCount, setMatchCount] = useState(0);

  const testRegex = useCallback(() => {
    setError("");
    if (!pattern) { setMatches([]); setMatchCount(0); return; }
    const flagStr = Object.entries(flags).filter(([, v]) => v).map(([k]) => k).join("");
    try {
      const re = new RegExp(pattern, flagStr);
      const found: string[] = [];
      let count = 0;
      if (flags.g) {
        let m;
        while ((m = re.exec(testStr)) !== null) {
          found.push(m[0]);
          count++;
          if (m.index === re.lastIndex) re.lastIndex++;
        }
      } else {
        const m = re.exec(testStr);
        if (m) { found.push(m[0]); count = 1; }
      }
      setMatches(found);
      setMatchCount(count);
    } catch (e) {
      setError((e as Error).message);
      setMatches([]);
      setMatchCount(0);
    }
  }, [pattern, flags, testStr]);

  useEffect(() => { testRegex(); }, [testRegex]);

  return (
    <ToolLayout title={t("tool.regex.title")} description={t("tool.regex.desc")}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">{t("regex.pattern")}</label>
          <input type="text" value={pattern} onChange={(e) => setPattern(e.target.value)}
            placeholder={"e.g. \\d+ or ([a-z]+)"}
            className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-sky-400" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">{t("regex.flags")}</label>
          <div className="flex gap-3">
            {(["g", "i", "m", "s", "u"] as const).map((f) => (
              <label key={f} className="flex items-center gap-1.5 text-sm cursor-pointer">
                <input type="checkbox" checked={flags[f]} onChange={() => setFlags((p) => ({ ...p, [f]: !p[f] }))}
                  className="rounded border-zinc-300 text-sky-500 focus:ring-sky-400" />
                <code className="text-zinc-600 dark:text-zinc-400">{f}</code>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">{t("regex.test")}</label>
          <textarea value={testStr} onChange={(e) => setTestStr(e.target.value)} placeholder="Enter test string..."
            rows={8} className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 resize-y" />
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-sm text-red-600 dark:text-red-400 font-mono">{error}</div>
        )}

        {!error && pattern && (
          <div className="p-4 rounded-lg bg-zinc-100 dark:bg-zinc-800">
            <div className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">
              {t("regex.results", { count: String(matchCount) })}
            </div>
            {matches.length > 0 && (
              <div className="max-h-48 overflow-y-auto space-y-1">
                {matches.map((m, i) => (
                  <div key={i} className="px-3 py-1.5 rounded bg-white dark:bg-zinc-700 font-mono text-sm break-all">
                    <span className="text-zinc-400 mr-2">#{i + 1}</span>
                    {m.length > 0 ? m : <span className="text-zinc-400 italic">{t("regex.empty")}</span>}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
