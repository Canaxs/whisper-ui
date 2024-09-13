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
  import { HiMiniChatBubbleLeftRight } from "react-icons/hi2";
  import { Button } from "@/components/ui/button"
  import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
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
  import { Textarea } from "@/components/ui/textarea"
  import Cookies from 'js-cookie'
  import { useToast } from "@/components/ui/use-toast"


export default function WhisperComment() {

    const { toast } = useToast();



  return (
    <Sheet>
        <SheetTrigger asChild>
            <HiMiniChatBubbleLeftRight className="size-10 ml-2 mt-1 cursor-pointer text-gray-300 hover:text-gray-400 transition-all hover:scale-90" />
        </SheetTrigger>
        <SheetContent side={"bottom"}>
            <SheetHeader className="text-left">
            <SheetTitle className="mb-3">
                <div onClick={Cookies.get("token") ? () => null : () =>  toast({variant: "destructive", title: "Yorum Yapamazsın.", description: "Yorum Yapmak için giriş yapmanız gerekiyor.",})}>
                    <span>Yorumlar</span>
                    <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="outline" className={Cookies.get("token") ? "absolute right-20 top-4 w-30 h-10 text-sm border bg-white text-black hover:bg-black hover:text-white transition-all max-sm:right-10" : "absolute right-20 top-4 w-30 h-10 text-sm cursor-no-drop hover:bg-white opacity-60 max-sm:right-10"}>Yorum Yaz</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className={Cookies.get("token") ? "" : "hidden"}>
                        <AlertDialogHeader>
                        <AlertDialogTitle>Yorum Yaz</AlertDialogTitle>
                        <AlertDialogDescription>
                            <div>
                                <Textarea placeholder="Bu Gönderi Hakkında Fikirlerini Paylaş..." className="h-40" />
                            </div>
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel>Vazgeç</AlertDialogCancel>
                        <AlertDialogAction className="text-white bg-green-600 hover:bg-white hover:text-green-600 transition-all">Gönder</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                </div>
            </SheetTitle>
            </SheetHeader>
                <Carousel className="w-full">
                    <CarouselContent>
                        {Array.from({ length: 20 }).map((_, index) => (
                        <CarouselItem key={index} className="basis-[16.6%] max-xl:basis-[20%] max- max-lg:basis-[33%] max-md:basis-[50%] max-sm:basis-[100%]">
                            <div className="p-1">
                            <Card>
                                <CardContent className="pt-2 pb-3 pl-2 ">
                                    <div className="flex justify-start">
                                        <div>
                                            <Avatar>
                                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                                <AvatarFallback>CN</AvatarFallback>
                                            </Avatar>
                                        </div>
                                        <div className="flex flex-col ml-2">
                                            <span className="text-sm">{index++} Name</span>
                                            <span className="text-[10px]">3 Gün Önce</span>
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-500 p-1 pt-3 max-xl:text-xs">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem dolore beatae accusamus facilis doloremque, 
                                        in quibusdam saepe, totam eum ipsa nostrum aliquid deleniti natus libero voluptatum reiciendis cumque aspernatur quae?
                                    </div>
                                </CardContent>
                            </Card>
                            </div>
                        </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
        </SheetContent>
    </Sheet>
  )
}