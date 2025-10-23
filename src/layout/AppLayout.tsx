import { Navbar } from "@/components/navbar";
import type { ReactNode } from "react";

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-gray-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
        {children}
      </main>
    </div>
  );
}
