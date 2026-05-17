"use client";

import { useState, useRef, useCallback } from "react";
import { toPng } from "html-to-image";
import ToolLayout from "@/components/devtools/ToolLayout";
import { useLocale } from "@/components/devtools/LocaleContext";

const languages = [
  "javascript", "typescript", "python", "java", "go", "rust",
  "cpp", "csharp", "ruby", "php", "swift", "kotlin",
  "sql", "bash", "html", "css", "json", "yaml", "xml",
];

const themes = ["dark", "light"] as const;

const themeStyles = {
  dark: {
    bg: "bg-zinc-900",
    text: "text-green-400",
    header: "bg-zinc-800 text-zinc-200",
    border: "border-zinc-700",
  },
  light: {
    bg: "bg-white",
    text: "text-blue-600",
    header: "bg-zinc-100 text-zinc-700",
    border: "border-zinc-300",
  },
};

const sampleCode = {
  javascript: `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10)); // 55`,
  python: `def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print(fibonacci(10))  # 55`,
  typescript: `interface User {
  id: number;
  name: string;
  email: string;
}

const getUser = async (id: number): Promise<User> => {
  const res = await fetch(\`/api/users/\${id}\`);
  return res.json();
};`,
};

export default function CodeToImagePage() {
  const { t } = useLocale();
  const [code, setCode] = useState(sampleCode.javascript);
  const [lang, setLang] = useState("javascript");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const previewRef = useRef<HTMLDivElement>(null);
  const [exporting, setExporting] = useState(false);

  const handleLangChange = (newLang: string) => {
    setLang(newLang);
    setCode(sampleCode[newLang as keyof typeof sampleCode] || code);
  };

  const exportPng = useCallback(async () => {
    if (!previewRef.current) return;
    setExporting(true);
    try {
      const dataUrl = await toPng(previewRef.current, {
        quality: 1,
        pixelRatio: 2,
      });
      const link = document.createElement("a");
      link.download = `code-${lang}.png`;
      link.href = dataUrl;
      link.click();
    } catch {
      console.error("Export failed");
    } finally {
      setExporting(false);
    }
  }, [lang]);

  const s = themeStyles[theme];

  return (
    <ToolLayout title={t("tool.code-to-image.title")} description={t("tool.code-to-image.desc")}>
      <div className="space-y-4">
        <div className="flex flex-wrap gap-3 items-center">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{t("cti.language")}</label>
          <select value={lang} onChange={(e) => handleLangChange(e.target.value)}
            className="px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-sm">
            {languages.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>

          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-2">{t("cti.theme")}</label>
          <div className="flex rounded-lg border border-zinc-300 dark:border-zinc-600 overflow-hidden text-xs">
            {themes.map((th) => (
              <button key={th} onClick={() => setTheme(th)}
                className={`px-3 py-1.5 transition-colors ${theme === th ? "bg-sky-500 text-white" : "bg-transparent text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-700"}`}>
                {t(th === "dark" ? "cti.dark" : "cti.light")}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">{t("cti.input")}</label>
          <textarea value={code} onChange={(e) => setCode(e.target.value)}
            rows={8} spellCheck={false}
            className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 resize-y" />
        </div>

        <div className="flex gap-2">
          <button onClick={exportPng} disabled={exporting}
            className="px-6 py-2 rounded-lg bg-sky-500 text-white hover:bg-sky-600 disabled:opacity-50 transition-colors text-sm font-medium">
            {exporting ? "..." : t("cti.export")}
          </button>
        </div>

        {/* Preview */}
        <div>
          <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">{t("color.preview")}</label>
          <div ref={previewRef}
            className={`${s.bg} rounded-xl border ${s.border} overflow-hidden transition-colors`}>
            <div className={`${s.header} px-4 py-2 text-xs font-mono flex items-center gap-2 border-b ${s.border}`}>
              <span className="w-3 h-3 rounded-full bg-red-400" />
              <span className="w-3 h-3 rounded-full bg-yellow-400" />
              <span className="w-3 h-3 rounded-full bg-green-400" />
              <span className="ml-2">{lang}</span>
            </div>
            <pre className={`${s.text} p-4 text-sm font-mono overflow-x-auto whitespace-pre`}>{code}</pre>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
