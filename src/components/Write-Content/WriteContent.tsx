
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
import { useEffect, useState } from "react"
import { createWhisper, writeLimitDrop } from "@/api/apiCalls"
import Cookies from 'js-cookie';
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import Tiptap from "../Text-Editor/Tiptap"

export default function WriteContent() {

    const [title,setTitle] = useState("");
    const [description,setDescription] = useState<string>('');
    const [source,setSource] = useState("");
    const [category,setCategory] = useState("");
    const [image,setImage] = useState<File>();

    const { toast } = useToast();

    useEffect(() => {
        console.log("Desc: "+description);
    } , [description])



    async function onClickPublish() {
        let formData = new FormData();
        let bool = true;
        const whisperModel = {
            title: title,
            description: description,
            source: source,
            category: category
        }
        const blobImage = new Blob([image as Blob], {
            type: 'multipart/form-data'
          });
        formData.set("whisperRequest" , new Blob([JSON.stringify(whisperModel)], {type : 'application/json'}) );
        formData.set("image",blobImage);

        await createWhisper(formData,Cookies.get("token")).then((res) => {

        },(exception) => {
            bool = false;
            toast({
                variant: "destructive",
                title: "Hata Oluştu",
                description: "Haber Kayıt Edilirken Sorun Meydana Geldi Tekrar Deneyiniz.",
              })
        })
        if(!bool) {
            toast({
                variant: "destructive",
                title: "Hata Oluştu",
                description: "Haber Kayıt Edilirken Sorun Meydana Geldi Tekrar Deneyiniz.",
              })
        }
        else {
            toast({
                variant: "success",
                title: "Söylenti Haber Kayıt Edildi",
                description: ""+new Date().toLocaleDateString("tr-TR"),
              })

              writeLimitDrop(Cookies.get("token")).then((res) => {
              })

        }
    }

    function imageOnChange(e) {
        const files = (e.target as HTMLInputElement).files
        if (files && files.length > 0) {
            setImage(files[0])
        }
    }



    return( 
        <div>
            <div className=" shadow-xl rounded transition-all">
                <Input type="text" placeholder="Başlık" className="border-none h-16 focus-visible:ring-white text-5xl text-gray-900 transition-all outline-none" onChange={(e) => setTitle(e.target.value.toString())}/>
            </div>
            <div className="h-[500px] shadow-xl mt-2 rounded transition-all">
                <Tiptap content={description} onChange={(newContent: string) => setDescription(newContent)} />
            </div>
            <div className="w-full max-w-sm items-center gap-1.5 mt-5 flex">
                <Label htmlFor="picture" className="w-5/12">Resim Yükle</Label>
                <Input id="picture" accept='image/*' type="file" onChange={(e) => imageOnChange(e)}/>
            </div>
            <div className="shadow-xl rounded transition-all mt-5 w-2/4">
                <Input type="text" placeholder="Kaynak Belirtiniz..." className="border-none h-12 w-full focus-visible:ring-white text-base text-gray-900 transition-all outline-none" onChange={(e) => setSource(e.target.value.toString())}/>
            </div>
            <div className="mt-5">
                <Select onValueChange={(e) => setCategory(e)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Kategori" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="SPORT">Spor</SelectItem>
                        <SelectItem value="TECHNOLOGY">Teknoloji</SelectItem>
                        <SelectItem value="POLITICS">Politika</SelectItem>
                        <SelectItem value="FINANCE">Finans</SelectItem>
                        <SelectItem value="AGENDA">Gündem</SelectItem>
                        <SelectItem value="WORLD">Dünya</SelectItem>
                        <SelectItem value="MAGAZINE">Magazin</SelectItem>
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