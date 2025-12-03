
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Globe, MessageSquare, Gamepad2, Info } from "lucide-react"

import { cn } from "@/lib/utils"
import {
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
import { IncotermsIcon } from "../icons/IncotermsIcon"
import { Separator } from "../ui/separator"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

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
        href: "/game",
        label: "¿Sabes o Estás Perdido?",
        icon: Gamepad2,
    },
    {
        href: "/incoterms",
        label: "¿Hay un Incoterm perfecto?",
        icon: IncotermsIcon,
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
        <div className={cn("px-2 py-4", state === 'collapsed' && 'px-3')}>
            <Separator className="mb-4" />
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button asChild variant="default" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                        <a href="https://drive.google.com/uc?export=download&id=1girmk0333W3jiWaYrIFteJYwKKYHOzRt" target="_blank" rel="noopener noreferrer">
                            <Info className="mr-2 h-4 w-4" />
                            {state === 'expanded' && <span>Instructivo</span>}
                        </a>
                    </Button>
                </TooltipTrigger>
                {state === 'collapsed' && (
                    <TooltipContent>
                        Instructivo
                    </TooltipContent>
                )}
            </Tooltip>
        </div>
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
