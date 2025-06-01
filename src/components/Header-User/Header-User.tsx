import { Label } from "../ui/label";
import { Button } from "@/components/ui/button";
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
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export function HeaderUser(props) {
  const router = useRouter();

  const [role, setRole] = useState("");

  useEffect(() => {
    setRole(Cookies?.get("role"));
  }, []);

  function logout() {
    Cookies.remove("token");
    Cookies.remove("username");
    Cookies.remove("userPoint");
    Cookies.remove("role");
    router.push("/login");
  }

  return (
    <div className="flex max-sm:mr-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer border">
            <AvatarImage src="/logo-black.png" alt="@shadcn" />
            <AvatarFallback>Logo</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>{props.username}</DropdownMenuLabel>
          <DropdownMenuLabel>Puan: {props.userPoint}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              {" "}
              <Link href="/account">Profil</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              {" "}
              <Link href="/account">Bildirimler</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              {" "}
              <Link href="/account/write">Paylaşım Yap</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              {" "}
              <Link href="/sohbet">Söyleşi Alanı&apos;na git</Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href="/">Yardım</Link>
          </DropdownMenuItem>
          <DropdownMenuItem disabled={role.includes("ROLE_MOD")}>
            <Link href="/panel/dashboard">Panel&apos;e Git</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => logout()} className="cursor-pointer">
            Çıkış Yap
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
