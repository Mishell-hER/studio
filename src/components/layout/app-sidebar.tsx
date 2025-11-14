"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Globe, MessageSquare, SidebarClose, SidebarOpen } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "../ui/button"

const menuItems = [
    {
        href: "/",
        label: "Continentes",
        icon: Globe,
    },
    {
        href: "/forum",
        label: "Foro Comunitario",
        icon: MessageSquare,
    }
]

export function AppSidebar() {
  const { state, toggleSidebar } = useSidebar()
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
            <Button
                variant="ghost"
                size="icon"
                className="size-7"
                onClick={toggleSidebar}
            >
                {state === "expanded" ? <SidebarClose /> : <SidebarOpen />}
            </Button>
            <h1 className={cn("duration-200 text-lg font-semibold", state === 'collapsed' && 'opacity-0 hidden')}>LogisticX</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} className="w-full">
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  icon={<item.icon />}
                  tooltip={{
                    children: item.label,
                  }}
                >
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}
