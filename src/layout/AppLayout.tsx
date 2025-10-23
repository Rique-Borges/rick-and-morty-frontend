import { Navbar } from "@/components/navbar";
import type { ReactNode } from "react";

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col animate-fade-in">
      <Navbar />
      <main className="flex-1 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20"></div>
        <div className="relative z-10">
          {children}
        </div>
      </main>
    </div>
  );
}
