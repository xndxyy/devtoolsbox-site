import type { ReactNode } from "react";
import { LocaleProvider } from "@/components/devtools/LocaleContext";

export default function ToolsLayout({ children }: { children: ReactNode }) {
  return <LocaleProvider>{children}</LocaleProvider>;
}
