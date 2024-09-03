"use client"
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { UserPanel } from "@/features/User/UserPanel";
import { useRef, useState } from "react";
import { useHeaderNavigationCommandCapture } from "./useHeaderNavigationCommandCapture";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const preventHover = (event: any) => {
  const e = event as Event
  e.preventDefault()
}

export const Header = () => {
  const menuRef = useRef<HTMLButtonElement | null>(null);
  const menuContentRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);

  useHeaderNavigationCommandCapture({
    menu1() {
      // debugger
      if(!menuRef.current || !menuContentRef.current) {
        return
      }
      // menuRef.current.dataset.state = 'open'
      // menuContentRef.current.dataset.state = 'open'
      menuRef.current.click()
    }
  });

  return (
    <div className="w-full h-16 px-10 flex justify-between items-center bg-[#deebfb]">
      <Image
        src="/logo-no-background.svg"
        alt="Logo"
        width={100}
        height={24}
        priority
      />
      <NavigationMenu onValueChange={(value) => {
        if(value !== 'menu_1') {
          setOpen(false);
        }
      }} >
        <NavigationMenuList>
          <NavigationMenuItem value="menu_1">
            <NavigationMenuTrigger onClick={() => setOpen(true)} ref={menuRef} onPointerMove={preventHover} onPointerLeave={preventHover}>Menu 1</NavigationMenuTrigger>
            <NavigationMenuContent ref={menuContentRef} forceMount className={cn({
              'hidden': !open
            })}>
              <ul className="md:w-[400px] lg:w-[500px]">
                <li >
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-1 no-underline outline-none focus:shadow-md"
                      href="/page1"
                    >
                      <div className="mb-2 mt-4 text-lg font-medium">
                        Page 1
                      </div>
                    </a>
                  </NavigationMenuLink>
                </li>
                <li >
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-1 no-underline outline-none focus:shadow-md"
                      href="/page2"
                    >
                      <div className="mb-2 mt-4 text-lg font-medium">
                        Page 2
                      </div>
                    </a>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem value="menu_2">
            <Link href="/page3" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Page 3
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <UserPanel />
    </div>
  )
}