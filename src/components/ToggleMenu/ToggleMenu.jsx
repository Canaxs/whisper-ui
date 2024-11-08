import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
  } from "@/components/ui/sheet";
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"
  import { Button } from "@/components/ui/button"
  import { CiMenuBurger } from "react-icons/ci";


export default function ToggleMenu() {  
    const style = { color: "black" }
    return (
        <div>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline"><CiMenuBurger style={style} /></Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                    <SheetTitle>Menüler</SheetTitle>
                    </SheetHeader>
                    <ul className="mt-10">
                        <a href="/soylenti/hakkimizda"><li className="p-3 mt-1 text-gray-500 font-sm font-medium border cursor-pointer rounded hover:text-gray-600 transition-all hover:bg-gray-300">Hakkında</li></a>
                        <a href="/soylenti/yazarlar"><li className="p-3 mt-1 text-gray-500 font-sm font-medium border cursor-pointer rounded hover:text-gray-600 transition-all hover:bg-gray-300">Popüler Yazarlar</li></a>
                        <a href="/sohbet"><li className="p-3 mt-1 text-gray-500 font-sm font-medium border cursor-pointer rounded hover:text-gray-600 transition-all hover:bg-gray-300">Söyleşi Alanı</li></a>
                        <a href="/soylenti/iletisim"><li className="p-3 mt-1 text-gray-500 font-sm font-medium border cursor-pointer rounded hover:text-gray-600 transition-all hover:bg-gray-300">İletişim</li></a>
                        <a href="/soylenti/yardim"><li className="p-3 mt-1 text-gray-500 font-sm font-medium border cursor-pointer rounded hover:text-gray-600 transition-all hover:bg-gray-300">Yardım</li></a>
                    </ul>
                </SheetContent>
            </Sheet>
        </div>
    )
}