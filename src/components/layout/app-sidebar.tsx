
"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Globe, MessageSquare, Truck } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Sidebar,
  SidebarBody,
  SidebarClose,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "../ui/button"
import { useIsMobile } from "@/hooks/use-mobile"

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
    },
    {
        href: "/suppliers",
        label: "¿Sabes o Estás Perdido?",
        icon: Truck,
    }
]

export function AppSidebar() {
  const { state, toggleSidebar } = useSidebar()
  const pathname = usePathname()
  const isMobile = useIsMobile()

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2">
            <h1 className={cn("duration-200 text-lg font-semibold", state === 'collapsed' && 'opacity-0 hidden')}>LogisticX</h1>
        </div>
         <Button
            variant="ghost"
            size="icon"
            className="size-7"
            onClick={toggleSidebar}
        >
            <SidebarClose />
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarBody>
            <SidebarMenu>
            {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                <Link href={item.href} className="w-full">
                    <SidebarMenuButton
                    isActive={pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))}
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
        </SidebarBody>
      </SidebarContent>
       {!isMobile && (
        <SidebarTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="size-7 absolute top-4 left-0"
          >
            <SidebarClose className="rotate-180" />
          </Button>
        </SidebarTrigger>
      )}
    </>
  )
}
