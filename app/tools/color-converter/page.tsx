"use client";

import { useState, useMemo } from "react";
import ToolLayout from "@/components/devtools/ToolLayout";
import { useLocale } from "@/components/devtools/LocaleContext";

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const m = hex.replace("#", "").trim();
  if (m.length === 3) {
    const [r, g, b] = m.split("").map((c) => parseInt(c + c, 16));
    return { r, g, b };
  }
  if (m.length === 6) {
    const r = parseInt(m.slice(0, 2), 16);
    const g = parseInt(m.slice(2, 4), 16);
    const b = parseInt(m.slice(4, 6), 16);
    if (isNaN(r) || isNaN(g) || isNaN(b)) return null;
    return { r, g, b };
  }
  return null;
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) * 60; break;
      case g: h = ((b - r) / d + 2) * 60; break;
      case b: h = ((r - g) / d + 4) * 60; break;
    }
  }
  return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslToRgb(h: number, s: number, l: number) {
  s /= 100; l /= 100;
  const fn = (n: number) => {
    const k = (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  };
  return { r: Math.round(fn(0) * 255), g: Math.round(fn(8) * 255), b: Math.round(fn(4) * 255) };
}

function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");
}

function parseColor(input: string): { r: number; g: number; b: number } | null {
  const s = input.trim();

  // HEX
  if (s.startsWith("#")) {
    return hexToRgb(s);
  }

  // RGB
  const rgbMatch = s.match(/rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i);
  if (rgbMatch) {
    return { r: +rgbMatch[1], g: +rgbMatch[2], b: +rgbMatch[3] };
  }

  // HSL
  const hslMatch = s.match(/hsl\s*\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*\)/i);
  if (hslMatch) {
    return hslToRgb(+hslMatch[1], +hslMatch[2], +hslMatch[3]);
  }

  // Plain numbers as RGB
  const nums = s.split(/[,\s]+/).map(Number);
  if (nums.length === 3 && nums.every((n) => !isNaN(n) && n >= 0 && n <= 255)) {
    return { r: nums[0], g: nums[1], b: nums[2] };
  }

  return null;
}

function luminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function contrastRatio(r1: number, g1: number, b1: number, r2: number, g2: number, b2: number): number {
  const l1 = luminance(r1, g1, b1);
  const l2 = luminance(r2, g2, b2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

export default function ColorConverterPage() {
  const { t } = useLocale();
  const [input, setInput] = useState("#3b82f6");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [fgColor, setFgColor] = useState("#1f2937");

  const parsed = useMemo(() => parseColor(input), [input]);

  const results = useMemo(() => {
    if (!parsed) return null;
    const hex = rgbToHex(parsed.r, parsed.g, parsed.b);
    const hsl = rgbToHsl(parsed.r, parsed.g, parsed.b);
    return { hex, rgb: `${parsed.r}, ${parsed.g}, ${parsed.b}`, hsl: `${hsl.h}°, ${hsl.s}%, ${hsl.l}%` };
  }, [parsed]);

  const bgParsed = useMemo(() => parseColor(bgColor), [bgColor]);
  const fgParsed = useMemo(() => parseColor(fgColor), [fgColor]);

  const contrast = useMemo(() => {
    if (!bgParsed || !fgParsed) return null;
    const ratio = contrastRatio(bgParsed.r, bgParsed.g, bgParsed.b, fgParsed.r, fgParsed.g, fgParsed.b);
    return {
      ratio: ratio.toFixed(2),
      aa: ratio >= 4.5,
      aaa: ratio >= 7,
      aaLarge: ratio >= 3,
    };
  }, [bgParsed, fgParsed]);

  return (
    <ToolLayout title={t("tool.color-converter.title")} description={t("tool.color-converter.desc")}>
      <div className="space-y-6">
        {/* Color Input */}
        <div>
          <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">{t("color.input")}</label>
          <div className="flex gap-3">
            <input value={input} onChange={(e) => setInput(e.target.value)}
              placeholder="#3b82f6"
              className="flex-1 px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-sky-400" />
            <input type="color" value={parsed ? rgbToHex(parsed.r, parsed.g, parsed.b) : "#000000"}
              onChange={(e) => setInput(e.target.value)}
              className="w-12 h-12 rounded-lg border border-zinc-300 dark:border-zinc-600 cursor-pointer" />
          </div>
        </div>

        {/* Results */}
        {results && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800">
              <div className="text-xs text-zinc-400 uppercase tracking-wide mb-1">HEX</div>
              <code className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{results.hex}</code>
            </div>
            <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800">
              <div className="text-xs text-zinc-400 uppercase tracking-wide mb-1">RGB</div>
              <code className="text-lg font-bold text-zinc-900 dark:text-zinc-100">rgb({results.rgb})</code>
            </div>
            <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800">
              <div className="text-xs text-zinc-400 uppercase tracking-wide mb-1">HSL</div>
              <code className="text-lg font-bold text-zinc-900 dark:text-zinc-100">hsl({results.hsl})</code>
            </div>
          </div>
        )}

        {/* Color Preview */}
        <div>
          <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">{t("color.preview")}</label>
          <div className="h-24 rounded-xl border border-zinc-300 dark:border-zinc-600 transition-colors"
            style={{ backgroundColor: parsed ? rgbToHex(parsed.r, parsed.g, parsed.b) : "#cccccc" }} />
        </div>

        {/* Contrast Checker */}
        <div className="border-t border-zinc-200 dark:border-zinc-700 pt-6">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-1">{t("color.contrast")}</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">{t("color.contrast.desc")}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-300">{t("color.bg")}</label>
              <div className="flex gap-2">
                <input value={bgColor} onChange={(e) => setBgColor(e.target.value)}
                  placeholder="#ffffff"
                  className="flex-1 px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-sky-400" />
                <input type="color" value={bgParsed ? rgbToHex(bgParsed.r, bgParsed.g, bgParsed.b) : "#ffffff"}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-10 h-10 rounded border border-zinc-300 dark:border-zinc-600 cursor-pointer" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-300">{t("color.fg")}</label>
              <div className="flex gap-2">
                <input value={fgColor} onChange={(e) => setFgColor(e.target.value)}
                  placeholder="#1f2937"
                  className="flex-1 px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-sky-400" />
                <input type="color" value={fgParsed ? rgbToHex(fgParsed.r, fgParsed.g, fgParsed.b) : "#1f2937"}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="w-10 h-10 rounded border border-zinc-300 dark:border-zinc-600 cursor-pointer" />
              </div>
            </div>
          </div>

          {contrast && (
            <>
              <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-700 mb-3 transition-colors"
                style={{ backgroundColor: bgParsed ? rgbToHex(bgParsed.r, bgParsed.g, bgParsed.b) : "#fff", color: fgParsed ? rgbToHex(fgParsed.r, fgParsed.g, fgParsed.b) : "#000" }}>
                <p className="text-lg font-bold">Sample Text</p>
                <p className="text-sm opacity-80">The quick brown fox jumps over the lazy dog.</p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-center">
                  <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{contrast.ratio}:1</div>
                  <div className="text-xs text-zinc-400 mt-1">{t("color.ratio")}</div>
                </div>
                <div className={`p-4 rounded-xl border text-center ${contrast.aa ? "border-emerald-300 bg-emerald-50 dark:bg-emerald-900/20" : "border-red-300 bg-red-50 dark:bg-red-900/20"}`}>
                  <div className="text-2xl font-bold" style={{ color: contrast.aa ? "#059669" : "#dc2626" }}>{contrast.aa ? t("color.pass") : t("color.fail")}</div>
                  <div className="text-xs text-zinc-500 mt-1">{t("color.passAA")}</div>
                </div>
                <div className={`p-4 rounded-xl border text-center ${contrast.aaa ? "border-emerald-300 bg-emerald-50 dark:bg-emerald-900/20" : "border-red-300 bg-red-50 dark:bg-red-900/20"}`}>
                  <div className="text-2xl font-bold" style={{ color: contrast.aaa ? "#059669" : "#dc2626" }}>{contrast.aaa ? t("color.pass") : t("color.fail")}</div>
                  <div className="text-xs text-zinc-500 mt-1">{t("color.passAAA")}</div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </ToolLayout>
  );
}
