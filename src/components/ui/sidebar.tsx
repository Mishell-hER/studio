"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip"
import { TooltipProvider } from "@radix-ui/react-tooltip"

const sidebarVariants = cva(
  "fixed z-50 flex h-screen flex-col border-r bg-background transition-all duration-300 ease-in-out",
  {
    variants: {
      state: {
        expanded: "w-64",
        collapsed: "w-16",
      },
    },
    defaultVariants: {
      state: "expanded",
    },
  }
)

const sidebarTriggerVariants = cva(
  "absolute top-4 transition-all duration-300 ease-in-out",
  {
    variants: {
      state: {
        expanded: "left-56",
        collapsed: "left-12",
      },
    },
    defaultVariants: {
      state: "expanded",
    },
  }
)

const sidebarHeaderVariants = cva("flex h-16 items-center justify-between", {
  variants: {
    state: {
      expanded: "px-4",
      collapsed: "px-5",
    },
  },
  defaultVariants: {
    state: "expanded",
  },
})

const sidebarMenuButtonVariants = cva(
  "inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      state: {
        expanded: "h-10 justify-start gap-3 px-4 py-2",
        collapsed: "size-10 justify-center",
      },
      isActive: {
        true: "bg-accent text-accent-foreground",
        false: "hover:bg-accent hover:text-accent-foreground",
      },
    },
    defaultVariants: {
      state: "expanded",
      isActive: false,
    },
  }
)

type SidebarContextType = {
  state: "expanded" | "collapsed"
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContextType | undefined>(
  undefined
)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

type SidebarProviderProps = {
  children: React.ReactNode
}

function Sidebar({ children }: SidebarProviderProps) {
  const [state, setState] = React.useState<"expanded" | "collapsed">(
    "expanded"
  )

  const toggleSidebar = () => {
    setState(state === "expanded" ? "collapsed" : "expanded")
  }

  return (
    <TooltipProvider>
      <SidebarContext.Provider value={{ state, toggleSidebar }}>
        <div className={cn("hidden", "md:block", sidebarVariants({ state }))}>
          {children}
        </div>
        <div className={cn("block md:hidden")}>
          {/* Mobile sidebar can be implemented here with a sheet */}
        </div>
      </SidebarContext.Provider>
    </TooltipProvider>
  )
}

const SidebarTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & { asChild?: boolean }
>(({ className, asChild, ...props }, ref) => {
  const { state } = useSidebar()
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      ref={ref}
      className={cn(sidebarTriggerVariants({ state }), className)}
      {...props}
    />
  )
})
SidebarTrigger.displayName = "SidebarTrigger"

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { state } = useSidebar()
  return (
    <div
      ref={ref}
      className={cn(sidebarHeaderVariants({ state }), className)}
      {...props}
    />
  )
})
SidebarHeader.displayName = "SidebarHeader"

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex h-full flex-col", className)}
      {...props}
    />
  )
})
SidebarContent.displayName = "SidebarContent"

const SidebarBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("flex-1", className)} {...props} />
})
SidebarBody.displayName = "SidebarBody"

const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => {
  const { state } = useSidebar()
  return (
    <ul
      ref={ref}
      className={cn("flex flex-col gap-1", state === "expanded" ? "px-2" : "px-3", className)}
      {...props}
    />
  )
})
SidebarMenu.displayName = "SidebarMenu"

const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => {
  return <li ref={ref} className={cn("flex", className)} {...props} />
})
SidebarMenuItem.displayName = "SidebarMenuItem"

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    isActive?: boolean
    icon?: React.ReactNode
    tooltip?: {
      children: React.ReactNode
      props?: React.ComponentProps<typeof TooltipContent>
    }
  }
>(({ className, isActive, icon, tooltip, children, ...props }, ref) => {
  const { state } = useSidebar()
  const button = (
    <button
      ref={ref}
      className={cn(
        sidebarMenuButtonVariants({ state, isActive }),
        className
      )}
      {...props}
    >
      {icon && <div className="size-5 shrink-0">{icon}</div>}
      <div
        className={cn(
          "duration-200",
          state === "collapsed" && "absolute left-full ml-3 opacity-0"
        )}
      >
        {children}
      </div>
    </button>
  )

  if (state === "collapsed") {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent {...tooltip?.props}>{tooltip?.children}</TooltipContent>
      </Tooltip>
    )
  }

  return button
})

SidebarMenuButton.displayName = "SidebarMenuButton"

const SidebarClose = React.forwardRef<
  SVGSVGElement,
  React.SVGProps<SVGSVGElement>
>((props, ref) => {
  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
})
SidebarClose.displayName = "SidebarClose"

export {
  Sidebar,
  SidebarTrigger,
  SidebarHeader,
  SidebarContent,
  SidebarBody,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarClose,
  useSidebar,
}
