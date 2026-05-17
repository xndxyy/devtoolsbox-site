"use client";

import { useState, useMemo } from "react";
import ToolLayout from "@/components/devtools/ToolLayout";
import { useLocale } from "@/components/devtools/LocaleContext";

interface StatusCode {
  code: number;
  title: string;
  titleZh: string;
  description: string;
  descriptionZh: string;
  category: string;
}

const statusCodes: StatusCode[] = [
  // 1xx
  { code: 100, title: "Continue", titleZh: "继续", description: "The server has received the request headers and the client should proceed to send the request body.", descriptionZh: "服务器已收到请求头，客户端应继续发送请求体。", category: "1xx" },
  { code: 101, title: "Switching Protocols", titleZh: "切换协议", description: "The requester has asked the server to switch protocols and the server has agreed.", descriptionZh: "请求者要求服务器切换协议，服务器已同意。", category: "1xx" },
  { code: 102, title: "Processing", titleZh: "处理中", description: "The server has received and is processing the request, but no response is available yet.", descriptionZh: "服务器已收到请求并正在处理，但尚未有响应。", category: "1xx" },
  { code: 103, title: "Early Hints", titleZh: "早提示", description: "Used to return some response headers before final HTTP message.", descriptionZh: "用于在最终 HTTP 消息之前返回部分响应头。", category: "1xx" },

  // 2xx
  { code: 200, title: "OK", titleZh: "成功", description: "The request has succeeded. The meaning depends on the HTTP method used.", descriptionZh: "请求成功。含义取决于 HTTP 方法。", category: "2xx" },
  { code: 201, title: "Created", titleZh: "已创建", description: "The request has been fulfilled and a new resource has been created.", descriptionZh: "请求已完成，新资源已创建。", category: "2xx" },
  { code: 202, title: "Accepted", titleZh: "已接受", description: "The request has been accepted for processing, but the processing has not been completed.", descriptionZh: "请求已接受处理，但处理尚未完成。", category: "2xx" },
  { code: 203, title: "Non-Authoritative Information", titleZh: "非权威信息", description: "The server is a transforming proxy that received a 200 OK from its origin but is returning a modified version.", descriptionZh: "服务器是转换代理，从源站收到 200 OK 但返回了修改版。", category: "2xx" },
  { code: 204, title: "No Content", titleZh: "无内容", description: "The server successfully processed the request but is not returning any content.", descriptionZh: "服务器成功处理请求，但不返回任何内容。", category: "2xx" },
  { code: 205, title: "Reset Content", titleZh: "重置内容", description: "The server requires the client to reset the document view.", descriptionZh: "服务器要求客户端重置文档视图。", category: "2xx" },
  { code: 206, title: "Partial Content", titleZh: "部分内容", description: "The server is delivering only part of the resource due to a Range header.", descriptionZh: "由于 Range 头，服务器仅传输部分资源。", category: "2xx" },

  // 3xx
  { code: 300, title: "Multiple Choices", titleZh: "多种选择", description: "The request has more than one possible response. The user or user agent should choose one.", descriptionZh: "请求有多个可能的响应，用户或用户代理应选择一个。", category: "3xx" },
  { code: 301, title: "Moved Permanently", titleZh: "永久移动", description: "The URL of the requested resource has been changed permanently. Use the new URL for future requests.", descriptionZh: "请求资源的 URL 已永久更改。后续请求应使用新 URL。", category: "3xx" },
  { code: 302, title: "Found", titleZh: "临时移动", description: "The URL of the requested resource has been changed temporarily. Keep using the original URL.", descriptionZh: "请求资源的 URL 已临时更改。后续仍应使用原 URL。", category: "3xx" },
  { code: 303, title: "See Other", titleZh: "查看其他", description: "The response can be found under a different URI and should be retrieved using GET.", descriptionZh: "响应可在其他 URI 找到，应使用 GET 方法获取。", category: "3xx" },
  { code: 304, title: "Not Modified", titleZh: "未修改", description: "The resource has not been modified since the version specified in If-Modified-Since or If-None-Match.", descriptionZh: "自 If-Modified-Since 或 If-None-Match 指定的版本以来资源未修改。", category: "3xx" },
  { code: 307, title: "Temporary Redirect", titleZh: "临时重定向", description: "The resource is temporarily available at a different URI. The method must not change.", descriptionZh: "资源临时位于不同的 URI。请求方法不得更改。", category: "3xx" },
  { code: 308, title: "Permanent Redirect", titleZh: "永久重定向", description: "The resource has been permanently moved to a different URI. The method must not change.", descriptionZh: "资源已永久移动到不同的 URI。请求方法不得更改。", category: "3xx" },

  // 4xx
  { code: 400, title: "Bad Request", titleZh: "错误请求", description: "The server cannot process the request due to a client error (e.g., malformed syntax).", descriptionZh: "因客户端错误（如语法错误），服务器无法处理请求。", category: "4xx" },
  { code: 401, title: "Unauthorized", titleZh: "未授权", description: "Authentication is required and has failed or not been provided.", descriptionZh: "需要身份验证，验证失败或未提供。", category: "4xx" },
  { code: 402, title: "Payment Required", titleZh: "需要付款", description: "Reserved for future use. Originally created for digital payment systems.", descriptionZh: "保留给将来使用。最初为数字支付系统创建。", category: "4xx" },
  { code: 403, title: "Forbidden", titleZh: "禁止访问", description: "The client does not have permission to access the resource.", descriptionZh: "客户端没有权限访问该资源。", category: "4xx" },
  { code: 404, title: "Not Found", titleZh: "未找到", description: "The server cannot find the requested resource.", descriptionZh: "服务器无法找到请求的资源。", category: "4xx" },
  { code: 405, title: "Method Not Allowed", titleZh: "方法不允许", description: "The request method is not supported for the requested resource.", descriptionZh: "请求方法不被请求的资源支持。", category: "4xx" },
  { code: 406, title: "Not Acceptable", titleZh: "不可接受", description: "The server cannot produce a response matching the Accept headers.", descriptionZh: "服务器无法生成符合 Accept 头要求的响应。", category: "4xx" },
  { code: 407, title: "Proxy Authentication Required", titleZh: "需要代理验证", description: "The client must first authenticate itself with the proxy.", descriptionZh: "客户端必须先向代理进行身份验证。", category: "4xx" },
  { code: 408, title: "Request Timeout", titleZh: "请求超时", description: "The server timed out waiting for the request.", descriptionZh: "服务器等待请求时超时。", category: "4xx" },
  { code: 409, title: "Conflict", titleZh: "冲突", description: "The request conflicts with the current state of the server.", descriptionZh: "请求与服务器的当前状态冲突。", category: "4xx" },
  { code: 410, title: "Gone", titleZh: "已删除", description: "The requested content has been permanently deleted from the server.", descriptionZh: "请求的内容已从服务器永久删除。", category: "4xx" },
  { code: 411, title: "Length Required", titleZh: "需要长度", description: "The request did not specify the length of its content, which is required.", descriptionZh: "请求未指定其内容长度，这是必需的。", category: "4xx" },
  { code: 412, title: "Precondition Failed", titleZh: "前置条件失败", description: "One or more conditions in the request headers evaluated to false.", descriptionZh: "请求头中的一个或多个条件评估为假。", category: "4xx" },
  { code: 413, title: "Payload Too Large", titleZh: "负载过大", description: "The request is larger than the server is willing or able to process.", descriptionZh: "请求体大于服务器愿意或能够处理的大小。", category: "4xx" },
  { code: 414, title: "URI Too Long", titleZh: "URI 过长", description: "The URI provided was too long for the server to process.", descriptionZh: "提供的 URI 太长，服务器无法处理。", category: "4xx" },
  { code: 415, title: "Unsupported Media Type", titleZh: "不支持的媒体类型", description: "The media format of the requested data is not supported by the server.", descriptionZh: "服务器不支持请求数据的媒体格式。", category: "4xx" },
  { code: 429, title: "Too Many Requests", titleZh: "请求过多", description: "The user has sent too many requests in a given amount of time (rate limiting).", descriptionZh: "用户在规定时间内发送了太多请求（速率限制）。", category: "4xx" },
  { code: 451, title: "Unavailable For Legal Reasons", titleZh: "因法律原因不可用", description: "The resource is unavailable due to legal reasons (e.g., censorship).", descriptionZh: "资源因法律原因不可用（如审查制度）。", category: "4xx" },

  // 5xx
  { code: 500, title: "Internal Server Error", titleZh: "服务器内部错误", description: "A generic error message when the server encounters an unexpected condition.", descriptionZh: "服务器遇到意外情况时的通用错误消息。", category: "5xx" },
  { code: 501, title: "Not Implemented", titleZh: "未实现", description: "The server does not support the functionality required to fulfill the request.", descriptionZh: "服务器不支持完成请求所需的功能。", category: "5xx" },
  { code: 502, title: "Bad Gateway", titleZh: "错误的网关", description: "The server received an invalid response from the upstream server.", descriptionZh: "服务器从上游服务器收到无效响应。", category: "5xx" },
  { code: 503, title: "Service Unavailable", titleZh: "服务不可用", description: "The server is temporarily unable to handle the request (e.g., overloaded or down for maintenance).", descriptionZh: "服务器暂时无法处理请求（如过载或维护）。", category: "5xx" },
  { code: 504, title: "Gateway Timeout", titleZh: "网关超时", description: "The server did not receive a timely response from the upstream server.", descriptionZh: "服务器未及时收到上游服务器的响应。", category: "5xx" },
  { code: 505, title: "HTTP Version Not Supported", titleZh: "HTTP 版本不支持", description: "The HTTP version used in the request is not supported by the server.", descriptionZh: "服务器不支持请求中使用的 HTTP 版本。", category: "5xx" },
  { code: 507, title: "Insufficient Storage", titleZh: "存储空间不足", description: "The server cannot store the representation needed to complete the request.", descriptionZh: "服务器无法存储完成请求所需的表示。", category: "5xx" },
  { code: 508, title: "Loop Detected", titleZh: "检测到循环", description: "The server detected an infinite loop while processing the request.", descriptionZh: "服务器在处理请求时检测到无限循环。", category: "5xx" },
];

const categories = ["1xx", "2xx", "3xx", "4xx", "5xx"];

const categoryLabels: Record<string, string> = {
  "1xx": "Informational",
  "2xx": "Successful",
  "3xx": "Redirection",
  "4xx": "Client Error",
  "5xx": "Server Error",
};

const categoryLabelsZh: Record<string, string> = {
  "1xx": "信息",
  "2xx": "成功",
  "3xx": "重定向",
  "4xx": "客户端错误",
  "5xx": "服务器错误",
};

const categoryAccents: Record<string, string> = {
  "1xx": "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800",
  "2xx": "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
  "3xx": "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800",
  "4xx": "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800",
  "5xx": "bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800",
};

export default function HttpStatusPage() {
  const { t, locale } = useLocale();
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return statusCodes.filter((s) => {
      if (activeCat && s.category !== activeCat) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          s.code.toString().includes(q) ||
          s.title.toLowerCase().includes(q) ||
          s.titleZh.includes(search)
        );
      }
      return true;
    });
  }, [search, activeCat]);

  return (
    <ToolLayout title={t("tool.http-status.title")} description={t("tool.http-status.desc")}>
      <div className="space-y-4">
        {/* Search */}
        <input value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder={t("http.search")}
          className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400" />

        {/* Category filter */}
        <div className="flex gap-2 flex-wrap">
          <button onClick={() => setActiveCat(null)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${!activeCat ? "bg-sky-500 text-white border-sky-500" : "bg-white dark:bg-zinc-800 border-zinc-300 dark:border-zinc-600 text-zinc-600 dark:text-zinc-400 hover:border-sky-400"}`}>
            All
          </button>
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveCat(activeCat === cat ? null : cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${activeCat === cat ? "bg-sky-500 text-white border-sky-500" : "bg-white dark:bg-zinc-800 border-zinc-300 dark:border-zinc-600 text-zinc-600 dark:text-zinc-400 hover:border-sky-400"}`}>
              {cat} {locale === "zh" ? categoryLabelsZh[cat] : categoryLabels[cat]}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((s) => (
            <div key={s.code}
              className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:shadow-sm transition-shadow">
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${categoryAccents[s.category]}`}>
                  {s.code}
                </span>
                <span className={`text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded ${categoryAccents[s.category]}`}>
                  {s.category}
                </span>
              </div>
              <div className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
                {locale === "zh" ? s.titleZh : s.title}
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                {locale === "zh" ? s.descriptionZh : s.description}
              </p>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-sm text-zinc-400">{t("common.error")}</div>
        )}
      </div>
    </ToolLayout>
  );
}
