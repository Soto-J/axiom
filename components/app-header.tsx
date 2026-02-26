"use client";

import { ThemeToggle } from "./theme-toggle";
import { SidebarTrigger, useSidebar } from "./ui/sidebar";

export default function AppHeader() {
  const { state } = useSidebar();

  return (
    <header className="from-muted/50 via-background/70 to-muted border-border/50 relative mb-12 flex items-center justify-between gap-x-4 border-b bg-linear-to-r px-4 py-3 shadow-sm shadow-black/5 backdrop-blur-md dark:shadow-white/5">
      <SidebarTrigger
        variant="outline"
        className="border-sidebar-border/70 hover:border-sidebar-primary/50 hover:bg-sidebar-accent/10 hover:shadow-sidebar-primary/10 focus-visible:border-sidebar-primary focus-visible:ring-sidebar-primary/20 size-9 transition-all duration-200 hover:scale-[1.02] hover:shadow-md active:scale-[0.98]"
        aria-expanded={state === "expanded"}
        aria-controls="main-sidebar"
        aria-label={`${state === "collapsed" ? "Expand" : "Collapse"} sidebar navigation`}
      />

      <ThemeToggle />
    </header>
  );
}
