"use client";

import { useContext } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { UserContext } from "./UserProvider";
import { useLogout } from "../Auth/useLogout";
import { useLogoutCommandCapture } from "./useLogoutCommandCapture";

export const UserPanel = () => {
  const { user } = useContext(UserContext);
  const logout = useLogout();

  useLogoutCommandCapture({
    logout() {
      logout();
    }
  })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex gap-1 items-center cursor-pointer">
          <span>Welcome,</span>
          <span>{user?.username}!</span>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt={user?.username} />
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>Log Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}