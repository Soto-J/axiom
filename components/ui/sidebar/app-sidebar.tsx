"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const firstSection = [
  {
    // icon: IoHomeOutline,
    label: "Home",
    href: "/",
    // roles: ["guest", "user", "staff", "admin"],
  },
  {
    // icon: BarChart3,
    label: "Schedule",
    href: "/schedule",
    // roles: ["guest", "user", "staff", "admin"],
  },
  {
    // icon: SlCalender,
    label: "Check List",
    href: "/check-list",
    // roles: ["guest", "user", "staff", "admin"],
  },
];

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar id="main-sidebar" variant="inset">
      <SidebarHeader className="flex items-center justify-center">
        <Image
          src="/axiom-logo.png"
          alt="Axiom Logo"
          width={150}
          height={150}
        />
      </SidebarHeader>

      <Separator className="via-secondary/60 my-4 h-px bg-linear-to-r from-transparent to-transparent" />

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {firstSection.map(({ href, label }) => (
              <SidebarMenuItem key={href}>
                <SidebarMenuButton asChild isActive={pathname === href}>
                  <Link
                    href={href}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-4 py-3 transition-colors duration-200",
                      "text-muted-foreground",
                    )}
                  >
                    <span className="font-semibold tracking-tight">
                      {label}
                    </span>

                    {pathname === href && (
                      <ChevronRight
                        className="text-primary ml-auto"
                        size={16}
                      />
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <Separator className="via-secondary/60 my-4 h-px bg-linear-to-r from-transparent to-transparent" />

        <SidebarGroup></SidebarGroup>
      </SidebarContent>

      <Separator className="via-secondary/60 my-4 h-px bg-linear-to-r from-transparent to-transparent" />

      <SidebarFooter>Footer</SidebarFooter>
    </Sidebar>
  );
}
