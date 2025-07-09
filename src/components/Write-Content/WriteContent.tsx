import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@radix-ui/react-label"
import { Button } from "../ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
import { 
  Type, 
  FileText, 
  Image as ImageIcon, 
  Link as LinkIcon, 
  Tag, 
  Send, 
  Eye,
  Clock,
  CheckCircle
} from "lucide-react"

export default function WriteContent() {

    const [title,setTitle] = useState("");
    const [description,setDescription] = useState<string>('');
    const [source,setSource] = useState("");
    const [category,setCategory] = useState("");
    const [image,setImage] = useState<File>();
    const [imagePreview, setImagePreview] = useState<string>("");

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
            // Preview için URL oluştur
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target?.result as string);
            };
            reader.readAsDataURL(files[0]);
        }
    }

    return( 
        <div className="space-y-4">
            {/* Title Input */}
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-0">
                <CardContent className="p-4">
                    <div className="flex items-center space-x-3 mb-2">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <Type className="w-4 h-4 text-blue-600" />
                        </div>
                        <Label className="text-sm font-medium text-gray-700">Başlık</Label>
                    </div>
                    <Input 
                        type="text" 
                        placeholder="Haberinizin başlığını yazın..." 
                        className="border-none h-14 focus-visible:ring-0 text-2xl lg:text-3xl font-bold text-gray-900 transition-all outline-none bg-transparent placeholder:text-gray-400" 
                        onChange={(e) => setTitle(e.target.value.toString())}
                    />
                </CardContent>
            </Card>

            {/* Content Editor */}
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-0">
                <CardContent className="p-4">
                    <div className="flex items-center space-x-3 mb-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                            <FileText className="w-4 h-4 text-green-600" />
                        </div>
                        <Label className="text-sm font-medium text-gray-700">İçerik</Label>
                    </div>
                    <div className="h-[400px] rounded-lg border border-gray-200">
                        <Tiptap content={description} onChange={(newContent: string) => setDescription(newContent)} />
                    </div>
                </CardContent>
            </Card>

            {/* Image Upload */}
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-0">
                <CardContent className="p-4">
                    <div className="flex items-center space-x-3 mb-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                            <ImageIcon className="w-4 h-4 text-purple-600" />
                        </div>
                        <Label className="text-sm font-medium text-gray-700">Görsel</Label>
                    </div>
                    
                    <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                            <Input 
                                id="picture" 
                                accept='image/*' 
                                type="file" 
                                onChange={(e) => imageOnChange(e)}
                                className="flex-1"
                            />
                            {image && (
                                <Badge variant="secondary" className="bg-green-100 text-green-700">
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    Yüklendi
                                </Badge>
                            )}
                        </div>
                        
                        {imagePreview && (
                            <div className="relative w-24 h-24 rounded-lg overflow-hidden border-2 border-gray-200">
                                <img 
                                    src={imagePreview} 
                                    alt="Preview" 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Source and Category - Side by Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Source Input */}
                <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-0">
                    <CardContent className="p-4">
                        <div className="flex items-center space-x-3 mb-2">
                            <div className="p-2 bg-orange-100 rounded-lg">
                                <LinkIcon className="w-4 h-4 text-orange-600" />
                            </div>
                            <Label className="text-sm font-medium text-gray-700">Kaynak</Label>
                        </div>
                        <Input 
                            type="text" 
                            placeholder="Haber kaynağını belirtin..." 
                            className="border-none h-10 focus-visible:ring-0 text-base text-gray-900 transition-all outline-none bg-transparent placeholder:text-gray-400" 
                            onChange={(e) => setSource(e.target.value.toString())}
                        />
                    </CardContent>
                </Card>

                {/* Category Select */}
                <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-0">
                    <CardContent className="p-4">
                        <div className="flex items-center space-x-3 mb-2">
                            <div className="p-2 bg-indigo-100 rounded-lg">
                                <Tag className="w-4 h-4 text-indigo-600" />
                            </div>
                            <Label className="text-sm font-medium text-gray-700">Kategori</Label>
                        </div>
                        <Select onValueChange={(e) => setCategory(e)}>
                            <SelectTrigger className="w-full border-gray-200 h-10">
                                <SelectValue placeholder="Kategori seçin" />
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
                    </CardContent>
                </Card>
            </div>

            {/* Publish Button */}
            <div className="flex items-center justify-between pt-4 pb-16">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>Önizleme</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>Moderasyon süreci</span>
                    </div>
                </div>
                
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button 
                            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
                        >
                            <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                            Yayınla
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>Yayınlamak İstediğinden Emin misin?</AlertDialogTitle>
                        <AlertDialogDescription>
                        Yapmış olduğunuz paylaşım moderatör onayından geçtikten sonra yayınlanacaktır.
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel>Vazgeç</AlertDialogCancel>
                        <AlertDialogAction 
                            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white transition-all" 
                            onClick={() => onClickPublish()}
                        >
                            Yayınla
                        </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    )
}