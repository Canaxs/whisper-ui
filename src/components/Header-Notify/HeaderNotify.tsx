import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { IoIosNotifications } from "react-icons/io";

export function HeaderNotify() {
    return (
        <div className="flex mr-5">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                        <label>Bildirimler</label>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80">
                    <DropdownMenuLabel>Bildirimler</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem>Söylenti , Deneme Paylaşımını Beğendi. </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Söylenti , Deneme Paylaşımını Beğendi. </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Söylenti , Deneme Paylaşımını Beğendi. </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Söylenti , Deneme Paylaşımını Beğendi. </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}