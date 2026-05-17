export type Locale = "zh" | "en";

type Translations = Record<string, string>;

const en: Translations = {
  // Header
  "site.title": "DevTools Box",
  "site.tagline": "Free Online Developer Tools",

  // Footer
  "footer.copyright": "DevTools Box - Free Online Developer Tools",
  "footer.donate": "Buy me a coffee",

  // Homepage
  "home.title": "Developer Toolbox",
  "home.title.highlight": "100% FREE",
  "home.subtitle":
    "23+ free online developer tools · Pure frontend · Your data stays on your device",
  "home.cat.converters": "Converters",
  "home.cat.converters.desc": "Transform between formats",
  "home.cat.encoders": "Encoders & Decoders",
  "home.cat.encoders.desc": "Encode and decode data",
  "home.cat.formatters": "Formatters & Validators",
  "home.cat.formatters.desc": "Beautify and validate",
  "home.cat.design": "Design & Reference",
  "home.cat.design.desc": "Colors, codes, and references",
  "home.cat.utilities": "Utilities",
  "home.cat.utilities.desc": "Inspect and convert values",
  "home.hero.badge": "100% Free · Private · No Registration · No Limits",
  "home.hero.feature.free": "100% Free",
  "home.hero.feature.free.desc": "All tools are free forever. No hidden charges, no premium tiers, no credit card needed.",
  "home.hero.feature.private": "Privacy First",
  "home.hero.feature.private.desc": "Every tool runs in your browser. Zero data leaves your device. No servers, no logs, no tracking.",
  "home.hero.feature.offline": "Works Offline",
  "home.hero.feature.offline.desc": "Once loaded, tools work without internet. No backend, no API calls, no latency.",
  "nav.back": "← Back to Home",

  // Tool cards
  "tool.cron.title": "Cron Expression Generator",
  "tool.cron.desc":
    "Visual Cron expression builder with presets and syntax reference",
  "tool.json.title": "JSON Formatter / Validator",
  "tool.json.desc": "Format, minify, and validate JSON data",
  "tool.base64.title": "Base64 Encoder / Decoder",
  "tool.base64.desc": "Base64 encoding and decoding with UTF-8 support",
  "tool.timestamp.title": "Timestamp Converter",
  "tool.timestamp.desc":
    "Unix timestamp to date, auto-detect seconds/milliseconds",
  "tool.url.title": "URL Encoder / Decoder",
  "tool.url.desc":
    "URL encoding and decoding for special characters and Unicode",
  "tool.uuid.title": "UUID Generator",
  "tool.uuid.desc": "Generate UUID v4 in batches",
  "tool.regex.title": "Regex Tester",
  "tool.regex.desc":
    "Online regex testing with flags and real-time matching",
  "tool.number-base.title": "Number Base Converter",
  "tool.number-base.desc":
    "Convert between binary, octal, decimal, and hexadecimal",
  "tool.html-entities.title": "HTML Entities Encoder / Decoder",
  "tool.html-entities.desc": "Escape and unescape HTML special characters",
  "tool.xml-json.title": "XML ↔ JSON Converter",
  "tool.xml-json.desc": "Convert XML to JSON and JSON to XML. Handles attributes, nested elements, and namespaces.",
  "tool.yaml-json.title": "YAML ↔ JSON Converter",
  "tool.yaml-json.desc": "Convert YAML to JSON and back. Essential for K8s, Docker Compose, CI/CD configs.",
  "tool.csv-json.title": "CSV ↔ JSON Converter",
  "tool.csv-json.desc": "Convert CSV spreadsheet data to JSON arrays and back. Handles headers and delimiters.",
  "tool.toml-json.title": "TOML ↔ JSON Converter",
  "tool.toml-json.desc": "Convert TOML config files to JSON. Works with Cargo.toml, pyproject.toml.",
  "tool.markdown-html.title": "Markdown → HTML",
  "tool.markdown-html.desc": "Convert Markdown to HTML with live preview. Supports GFM and code blocks.",
  "tool.jwt-decoder.title": "JWT Decoder",
  "tool.jwt-decoder.desc": "Decode and inspect JSON Web Tokens. View header, payload, and expiration.",
  "tool.xml-formatter.title": "XML Formatter / Validator",
  "tool.xml-formatter.desc": "Format, validate, and minify XML. Catch mismatched tags and escaping issues.",

  // Common
  "common.copy": "Copy",
  "common.copied": "Copied",
  "common.swap": "⇄ Swap",
  "common.encode": "Encode →",
  "common.decode": "Decode →",
  "common.input": "Input",
  "common.output": "Output",
  "common.error": "Error",
  "common.generate": "Generate",
  "common.convert": "Convert",
  "common.select": "Select",
  "common.open": "Open Tool",

  // Donation
  "donate.tip": "Like this tool? Support DevTools Box!",
  "donate.button": "Buy me a coffee",

  // Cron
  "cron.presets": "Presets",
  "cron.minute": "Minute",
  "cron.hour": "Hour",
  "cron.day": "Day",
  "cron.month": "Month",
  "cron.weekday": "Weekday",
  "cron.expression": "Cron Expression",
  "cron.everyMinute": "Every Minute",
  "cron.everyHour": "Every Hour",
  "cron.dailyMidnight": "Daily Midnight",
  "cron.daily9am": "Daily 9 AM",
  "cron.weeklyMonday": "Weekly Monday",
  "cron.monthly1st": "Monthly 1st",
  "cron.weekdays9am": "Weekdays 9 AM",
  "cron.syntax": "Syntax Guide",
  "cron.syntax.all": "* means all values",
  "cron.syntax.list": ", separates values (e.g. 1,3,5)",
  "cron.syntax.range": "- specifies range (e.g. 1-5)",
  "cron.syntax.step": "/ specifies step (e.g. */5 = every 5 min)",
  "cron.syntax.order": "Field order: Minute Hour Day Month Weekday",

  // JSON
  "json.format": "Format",
  "json.minify": "Minify",
  "json.validate": "Validate",
  "json.input": "Input JSON",
  "json.valid": "✅ Valid JSON",

  // Base64
  "base64.input": "Input Text",
  "base64.inputB64": "Input Base64",
  "base64.result": "Base64 Result",
  "base64.resultDecoded": "Decoded Text",
  "base64.invalid": "Invalid Base64 string",

  // Timestamp
  "ts.current": "Current Timestamp (seconds)",
  "ts.toDate": "Timestamp → Date",
  "ts.toTs": "Date → Timestamp",
  "ts.placeholder": "Enter timestamp (auto-detect s/ms)",
  "ts.datePlaceholder": "e.g. 2026-05-13 12:00:00",
  "ts.ms": "Milliseconds",
  "ts.sec": "Seconds",

  // URL
  "url.placeholder": "Enter text to encode/decode...",

  // UUID
  "uuid.count": "Count",
  "uuid.copyAll": "Copy All",

  // Regex
  "regex.pattern": "Pattern",
  "regex.flags": "Flags",
  "regex.test": "Test String",
  "regex.results": "Results: {count} match(es)",
  "regex.empty": "(empty match)",

  // Number Base
  "nb.input": "Enter value",
  "nb.fromBase": "From Base",
  "nb.binary": "Binary",
  "nb.octal": "Octal",
  "nb.decimal": "Decimal",
  "nb.hex": "Hexadecimal",

  // HTML Entities
  "html.placeholder": 'e.g. <div class="main"> &amp; sign</div>',

  // SQL Formatter
  "tool.sql-formatter.title": "SQL Formatter",
  "tool.sql-formatter.desc": "Format SQL queries with multiple dialect support",
  "sql.input": "Input SQL",
  "sql.output": "Formatted SQL",
  "sql.dialect": "Dialect",
  "sql.format": "Format",
  "sql.minify": "Minify",
  "sql.placeholder": "SELECT * FROM users WHERE id = 1 ORDER BY name ASC",
  "sql.error": "Invalid SQL",

  // Code to Image
  "tool.code-to-image.title": "Code to Image",
  "tool.code-to-image.desc": "Convert code snippets into beautiful shareable images",
  "cti.input": "Paste your code here",
  "cti.language": "Language",
  "cti.theme": "Theme",
  "cti.export": "Export PNG",
  "cti.dark": "Dark",
  "cti.light": "Light",

  // Color Converter
  "tool.color-converter.title": "Color Converter & Tools",
  "tool.color-converter.desc": "Convert between HEX, RGB, HSL. Check contrast and explore palettes.",
  "color.input": "Enter color (HEX, RGB, HSL...)",
  "color.preview": "Preview",
  "color.contrast": "Contrast Checker",
  "color.contrast.desc": "Check contrast ratio between two colors (WCAG)",
  "color.bg": "Background",
  "color.fg": "Foreground",
  "color.ratio": "Contrast Ratio",
  "color.passAA": "WCAG AA (4.5:1)",
  "color.passAAA": "WCAG AAA (7:1)",
  "color.pass": "Pass",
  "color.fail": "Fail",

  // HTTP Status Codes
  "tool.http-status.title": "HTTP Status Code Reference",
  "tool.http-status.desc": "Quick reference for all HTTP status codes with descriptions",
  "http.search": "Search status codes...",
  "http.category": "Category",

  // SemVer Visualizer
  "tool.semver.title": "SemVer Range Visualizer",
  "tool.semver.desc": "Visualize npm/pip/cargo semantic versioning ranges on an interactive timeline",
  "semver.range": "Version Range",
  "semver.version": "Version to Test",
  "semver.input": 'e.g. ^4.2.0 || ~5.1.0',
  "semver.testPlaceholder": "e.g. 4.3.1",
  "semver.satisfies": "Satisfies",
  "semver.notSatisfies": "Does not satisfy",
  "semver.inRange": "In Range",
  "semver.outOfRange": "Out of Range",
  "semver.noVersions": "No matching versions",
  "semver.example": "Example ranges",
  "semver.caret": "^1.2.3 — Compatible with 1.x.x (>=1.2.3 <2.0.0)",
  "semver.tilde": "~1.2.3 — Approximately equivalent to 1.2.3 (>=1.2.3 <1.3.0)",
  "semver.wildcard": "1.2.x — Any patch for 1.2",
  "semver.or": "|| — OR combinator",

  // .env Validator
  "tool.env.title": ".env File Validator",
  "tool.env.desc": "Validate, compare, and analyze .env files across environments",
  "env.paste": "Paste .env content",
  "env.validate": "Validate",
  "env.compare": "Compare with other environment",
  "env.issues": "Issues found",
  "env.noIssues": "No issues found",
  "env.missing": "Missing key",
  "env.extra": "Extra key",
  "env.empty": "Empty value",
  "env.duplicate": "Duplicate key",
  "env.comment": "Comment",
  "env.key": "Key",
  "env.value": "Value",
  "env.status": "Status",
  "env.envA": "Environment A (.env)",
  "env.envB": "Environment B (.env.production)",
  "env.diffTitle": "Environment Comparison",
  "env.identical": "Identical keys",
  "env.different": "Different values",
  "env.onlyInA": "Only in A",
  "env.onlyInB": "Only in B",
  "env.example": ".env Example",
};

const zh: Translations = {
  "site.title": "开发者工具箱",
  "site.tagline": "免费在线开发工具",
  "footer.copyright": "开发者工具箱 - 免费在线开发工具",
  "home.title": "开发者工具箱",
  "home.title.highlight": "完全免费",
  "home.subtitle": "23+ 款免费在线开发工具 · 纯前端 · 数据不上传服务器",
  "home.cat.converters": "数据转换",
  "home.cat.converters.desc": "格式互转与变换",
  "home.cat.encoders": "编码解码",
  "home.cat.encoders.desc": "数据编码和解码",
  "home.cat.formatters": "格式化校验",
  "home.cat.formatters.desc": "美化与验证",
  "home.cat.design": "设计参考",
  "home.cat.design.desc": "颜色、编码和参考",
  "home.cat.utilities": "实用工具",
  "home.cat.utilities.desc": "检查和转换数值",
  "footer.donate": "请我喝杯咖啡",

  "home.hero.badge": "完全免费 · 隐私安全 · 无需注册 · 无限制",
  "home.hero.feature.free": "完全免费",
  "home.hero.feature.free.desc": "所有工具永久免费使用。无隐藏收费，无付费层级，无需信用卡。",
  "home.hero.feature.private": "隐私安全",
  "home.hero.feature.private.desc": "全部在浏览器本地运行。数据零上传，无服务器，无日志，无追踪。",
  "home.hero.feature.offline": "离线可用",
  "home.hero.feature.offline.desc": "加载后断网也能用。无需后端，无需 API，零等待。",
  "nav.back": "← 返回首页",

  "tool.cron.title": "Cron 表达式生成器",
  "tool.cron.desc": "可视化生成 Cron 表达式，支持常用预设和语法说明",
  "tool.json.title": "JSON 格式化 / 校验",
  "tool.json.desc": "JSON 格式化、压缩、校验，支持大段 JSON 数据",
  "tool.base64.title": "Base64 编解码",
  "tool.base64.desc": "Base64 编码与解码，支持中文和 UTF-8",
  "tool.timestamp.title": "时间戳转换",
  "tool.timestamp.desc": "Unix 时间戳与日期时间互转，毫秒/秒自动识别",
  "tool.url.title": "URL 编解码",
  "tool.url.desc": "URL 编码与解码，处理特殊字符和中文",
  "tool.uuid.title": "UUID 生成器",
  "tool.uuid.desc": "批量生成 UUID v4，支持一次生成多个",
  "tool.regex.title": "正则表达式测试",
  "tool.regex.desc": "在线正则测试，支持常用 flags，实时匹配高亮",
  "tool.number-base.title": "进制转换",
  "tool.number-base.desc": "2/8/10/16 进制互转，支持整数和小数",
  "tool.html-entities.title": "HTML 实体编解码",
  "tool.html-entities.desc": "HTML 特殊字符转义与反转义",
  "tool.xml-json.title": "XML ↔ JSON 转换",
  "tool.xml-json.desc": "XML 与 JSON 互转，支持属性、嵌套元素和命名空间",
  "tool.yaml-json.title": "YAML ↔ JSON 转换",
  "tool.yaml-json.desc": "YAML 与 JSON 互转，用于 K8s、Docker Compose、CI/CD 配置",
  "tool.csv-json.title": "CSV ↔ JSON 转换",
  "tool.csv-json.desc": "CSV 表格数据与 JSON 数组互转，支持表头和分隔符",
  "tool.toml-json.title": "TOML ↔ JSON 转换",
  "tool.toml-json.desc": "TOML 配置文件与 JSON 互转，支持 Cargo.toml 等",
  "tool.markdown-html.title": "Markdown → HTML",
  "tool.markdown-html.desc": "Markdown 转 HTML，支持实时预览、GFM 和代码块",
  "tool.jwt-decoder.title": "JWT 解码器",
  "tool.jwt-decoder.desc": "解析和查看 JSON Web Token，查看 Header、Payload 和过期时间",
  "tool.xml-formatter.title": "XML 格式化 / 校验",
  "tool.xml-formatter.desc": "XML 格式化、压缩、校验，检测标签匹配和转义问题",

  "common.copy": "复制",
  "common.copied": "已复制",
  "common.swap": "⇄ 互换",
  "common.encode": "编码 →",
  "common.decode": "解码 →",
  "common.input": "输入",
  "common.output": "输出",
  "common.error": "错误",
  "common.generate": "生成",
  "common.convert": "转换",
  "common.select": "选择",
  "common.open": "打开工具",

  // Donation
  "donate.tip": "觉得好用？支持一下开发者工具箱！",
  "donate.button": "请我喝杯咖啡",

  "cron.presets": "常用预设",
  "cron.minute": "分钟",
  "cron.hour": "小时",
  "cron.day": "日",
  "cron.month": "月",
  "cron.weekday": "星期",
  "cron.expression": "Cron 表达式",
  "cron.everyMinute": "每分钟",
  "cron.everyHour": "每小时",
  "cron.dailyMidnight": "每天凌晨",
  "cron.daily9am": "每天早9点",
  "cron.weeklyMonday": "每周一凌晨",
  "cron.monthly1st": "每月1号",
  "cron.weekdays9am": "工作日早9点",
  "cron.syntax": "Cron 语法说明",
  "cron.syntax.all": "* 表示所有值",
  "cron.syntax.list": ", 分隔多个值（如 1,3,5）",
  "cron.syntax.range": "- 表示范围（如 1-5）",
  "cron.syntax.step": "/ 表示步进（如 */5 每5分钟）",
  "cron.syntax.order": "字段顺序：分钟 小时 日 月 星期",

  "json.format": "格式化",
  "json.minify": "压缩",
  "json.validate": "校验",
  "json.input": "输入 JSON",
  "json.valid": "✅ JSON 格式正确",

  "base64.input": "输入文本",
  "base64.inputB64": "输入 Base64",
  "base64.result": "Base64 结果",
  "base64.resultDecoded": "解码结果",
  "base64.invalid": "无效的 Base64 字符串",

  "ts.current": "当前时间戳（秒）",
  "ts.toDate": "时间戳 → 日期",
  "ts.toTs": "日期 → 时间戳",
  "ts.placeholder": "输入时间戳（自动识别秒/毫秒）",
  "ts.datePlaceholder": "如 2026-05-13 12:00:00",
  "ts.ms": "毫秒",
  "ts.sec": "秒",

  "url.placeholder": "输入要编码/解码的文本...",

  "uuid.count": "生成数量",
  "uuid.copyAll": "复制全部",

  "regex.pattern": "正则表达式",
  "regex.flags": "Flags",
  "regex.test": "测试文本",
  "regex.results": "匹配结果: {count} 处",
  "regex.empty": "(空字符串)",

  "nb.input": "输入数值",
  "nb.fromBase": "输入进制",
  "nb.binary": "二进制",
  "nb.octal": "八进制",
  "nb.decimal": "十进制",
  "nb.hex": "十六进制",

  "html.placeholder": '如 <div class="main"> &amp; 符</div>',

  // SQL Formatter
  "tool.sql-formatter.title": "SQL 格式化",
  "tool.sql-formatter.desc": "格式化 SQL 查询语句，支持多种数据库方言",
  "sql.input": "输入 SQL",
  "sql.output": "格式化结果",
  "sql.dialect": "数据库类型",
  "sql.format": "格式化",
  "sql.minify": "压缩",
  "sql.placeholder": "SELECT * FROM users WHERE id = 1 ORDER BY name ASC",
  "sql.error": "SQL 语法错误",

  // Code to Image
  "tool.code-to-image.title": "代码转图片",
  "tool.code-to-image.desc": "将代码片段转换为美观的可分享图片",
  "cti.input": "在此粘贴代码",
  "cti.language": "语言",
  "cti.theme": "主题",
  "cti.export": "导出 PNG",
  "cti.dark": "深色",
  "cti.light": "浅色",

  // Color Converter
  "tool.color-converter.title": "颜色转换工具",
  "tool.color-converter.desc": "HEX / RGB / HSL 互转，对比度检查，配色方案",
  "color.input": "输入颜色 (HEX, RGB, HSL...)",
  "color.preview": "预览",
  "color.contrast": "对比度检查",
  "color.contrast.desc": "检查两种颜色的对比度（WCAG 标准）",
  "color.bg": "背景色",
  "color.fg": "前景色",
  "color.ratio": "对比度",
  "color.passAA": "WCAG AA (4.5:1)",
  "color.passAAA": "WCAG AAA (7:1)",
  "color.pass": "通过",
  "color.fail": "未通过",

  // HTTP Status Codes
  "tool.http-status.title": "HTTP 状态码查询",
  "tool.http-status.desc": "快速查询所有 HTTP 状态码含义及说明",
  "http.search": "搜索状态码...",
  "http.category": "分类",

  // SemVer Visualizer
  "tool.semver.title": "SemVer 版本号可视化",
  "tool.semver.desc": "可视化查看 npm/pip/cargo 语义化版本范围，交互式时间轴",
  "semver.range": "版本范围",
  "semver.version": "测试版本号",
  "semver.input": "如 ^4.2.0 || ~5.1.0",
  "semver.testPlaceholder": "如 4.3.1",
  "semver.satisfies": "满足",
  "semver.notSatisfies": "不满足",
  "semver.inRange": "在范围内",
  "semver.outOfRange": "超出范围",
  "semver.noVersions": "无匹配版本",
  "semver.example": "常用范围示例",
  "semver.caret": "^1.2.3 — 兼容 1.x.x (>=1.2.3 <2.0.0)",
  "semver.tilde": "~1.2.3 — 近似等于 1.2.3 (>=1.2.3 <1.3.0)",
  "semver.wildcard": "1.2.x — 任意 patch 版本",
  "semver.or": "|| — 或运算组合",

  // .env Validator
  "tool.env.title": ".env 文件校验器",
  "tool.env.desc": "校验、对比和分析不同环境的 .env 配置文件",
  "env.paste": "粘贴 .env 内容",
  "env.validate": "校验",
  "env.compare": "与环境对比",
  "env.issues": "发现的问题",
  "env.noIssues": "未发现问题",
  "env.missing": "缺少的变量",
  "env.extra": "多余的变量",
  "env.empty": "空值",
  "env.duplicate": "重复键",
  "env.comment": "注释",
  "env.key": "变量名",
  "env.value": "值",
  "env.status": "状态",
  "env.envA": "环境 A (.env)",
  "env.envB": "环境 B (.env.production)",
  "env.diffTitle": "环境对比",
  "env.identical": "值相同",
  "env.different": "值不同",
  "env.onlyInA": "仅 A 有",
  "env.onlyInB": "仅 B 有",
  "env.example": ".env 示例",
};

const MAP: Record<Locale, Translations> = { en, zh };

export function t(key: string, locale: Locale, vars?: Record<string, string>): string {
  let val = MAP[locale][key];
  if (val === undefined) val = MAP.en[key] ?? key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      val = val.replace(`{${k}}`, v);
    }
  }
  return val;
}

export const LOCALE_LABELS: Record<Locale, string> = {
  zh: "中文",
  en: "English",
};
