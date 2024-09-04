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
        <div className="flex mr-5 max-sm:hidden">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                        <div className="cursor-pointer">
                            <IoIosNotifications className="size-7 mr-2 text-gray-400 hover:text-gray-700 transition-all"/>
                        </div>
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