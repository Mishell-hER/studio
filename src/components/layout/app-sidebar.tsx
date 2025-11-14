"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Globe, LogIn, LogOut, MessageSquare, User as UserIcon } from "lucide-react"

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
import { useUser, useAuth, useFirestore } from "@/firebase"
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
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
    }
]

function UserProfile() {
    const { user, loading } = useUser();
    const auth = useAuth();
    const firestore = useFirestore();
    const { state: sidebarState } = useSidebar()

    const handleSignIn = async () => {
        if (!auth) return;
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            if (user && firestore) {
                const userRef = doc(firestore, 'users', user.uid);
                await setDoc(userRef, {
                uid: user.uid,
                name: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                role: 'normal',
                verified: false,
                continent: 'Unknown'
                }, { merge: true });
            }
        } catch (error) {
            console.error("Error during sign-in:", error);
        }
    };

    const handleSignOut = async () => {
        if (!auth) return;
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Error during sign-out:", error);
        }
    };

    if (loading) {
        return <div className="w-full h-10 bg-muted rounded-md animate-pulse" />
    }

    return user ? (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full h-auto justify-start px-3">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'Usuario'} />
                            <AvatarFallback>{user.displayName?.[0]}</AvatarFallback>
                        </Avatar>
                        <div className={cn("flex flex-col items-start duration-200", sidebarState === 'collapsed' && 'opacity-0 hidden')}>
                           <span className="text-sm font-medium leading-none truncate">{user.displayName}</span>
                           <span className="text-xs leading-none text-muted-foreground truncate">
                            {user.email}
                           </span>
                        </div>
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mb-2" align="end" forceMount>
                 <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.displayName}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Cerrar sesión</span>
                  </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    ) : (
         <SidebarMenuButton
            onClick={handleSignIn}
            icon={<LogIn />}
            className="w-full"
            tooltip={{
              children: "Iniciar Sesión",
            }}
          >
            <span>Iniciar Sesión</span>
        </SidebarMenuButton>
    )
}

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
        <div className="py-2">
            <UserProfile />
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
