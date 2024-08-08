import { Label } from "../ui/label";
import { Button } from "@/components/ui/button"
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
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  import Cookies from 'js-cookie'
import { useRouter } from "next/router";


export function HeaderUser(props) {

    const router = useRouter();


    function logout() {
        Cookies.remove("token");
        Cookies.remove("username");
        Cookies.remove("userPoint");
        Cookies.remove("role");
        router.push(window.location.href);
    }

    return (
        <div className="flex">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                        <Avatar className="cursor-pointer border">
                            <AvatarImage src="../logo-black.png" alt="@shadcn" />
                            <AvatarFallback>Logo</AvatarFallback>
                        </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>{props.username}</DropdownMenuLabel>
                    <DropdownMenuLabel>Puan: {props.userPoint}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem> <a href="/account">Profil</a></DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem><a href="/">Yardım</a></DropdownMenuItem>
                    <DropdownMenuItem disabled><a href="/">Söylenti</a></DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => logout()}>Çıkış Yap</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}