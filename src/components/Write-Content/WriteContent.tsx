
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@radix-ui/react-label"
import { Button } from "../ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

export default function WriteContent() {



    function onClickPublish() {

    }



    return( 
        <div>
            <div className=" shadow-xl rounded transition-all">
                <Input type="text" placeholder="Başlık" className="border-none h-16 focus-visible:ring-white text-5xl text-gray-900 transition-all outline-none"/>
            </div>
            <div className="h-[500px] shadow-xl mt-2 rounded transition-all">
                <Textarea placeholder="Haberinizi Yazınız..." className="border-none h-full focus-visible:ring-white text-2xl text-gray-600 transition-all outline-none"/>
            </div>
            <div className="w-full max-w-sm items-center gap-1.5 mt-5 flex">
                <Label htmlFor="picture" className="w-5/12">Resim Yükle</Label>
                <Input id="picture" type="file" />
            </div>
            <div className="shadow-xl rounded transition-all mt-5 w-2/4">
                <Input type="text" placeholder="Kaynak Belirtiniz..." className="border-none h-12 w-full focus-visible:ring-white text-base text-gray-900 transition-all outline-none"/>
            </div>
            <div className="mt-5">
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Kategori" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="SPORT">Spor</SelectItem>
                        <SelectItem value="dark">Magazin</SelectItem>
                        <SelectItem value="system">Finans</SelectItem>
                    </SelectContent>
                </Select>   
            </div>
            <div className="mt-7 border-white mb-20">
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="outline" className="text-white bg-green-600">Yayınla</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>Yayınlamak İstediğinden Emin misin ?</AlertDialogTitle>
                        <AlertDialogDescription>
                        Yapmış olduğunuz paylaşım moderatör onayından geçtikten sonra yayınlanacaktır.
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel>Vazgeç</AlertDialogCancel>
                        <AlertDialogAction className="text-white bg-green-600 hover:bg-white hover:text-green-600 transition-all" onClick={() => onClickPublish()}>Yayınla</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    )
}