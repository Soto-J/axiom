import { ReactNode } from "react";

import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TRPCReactProvider } from "@/lib/trpc/client";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <TRPCReactProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <TooltipProvider>
          <SidebarProvider>{children}</SidebarProvider>
        </TooltipProvider>
      </ThemeProvider>
    </TRPCReactProvider>
  );
}
