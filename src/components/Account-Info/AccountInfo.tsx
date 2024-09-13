import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import NewsCard from "@/components/News-Card/NewsCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import Cookies from 'js-cookie'
import  { getUserWhispersCalls } from "@/api/apiCalls";


export type Whisper = {
    authorName: string
    title: string
    description: string
    source: string
    category: string
    urlName: string
    image: string
    createdDate: string
}

export default function AccountInfo() {

    const [userData,setUserData] = useState({
        username: "",
        userPoint: "",
        role: "",
    });

    const [whispers , setWhispers] = useState<Whisper[]>([]);

    function uploadInformation() {
         setUserData({
            username: Cookies.get("username"),
            userPoint: Cookies.get("userPoint"),
            role: Cookies.get("role"),
        })
    }

    useEffect(() => {
        uploadInformation();
        getUserWhispers();
    }, [])

    const data = useAppSelector((state) => state.user.data); 

    function getUserWhispers() {
        getUserWhispersCalls(Cookies.get("username")).then((res) => {
            console.log(res.data)
            setWhispers(res.data)
        })
    }

    return (
        <div className="mt-20">
            <div className="flex max-lg:flex-col">
                <Card className="w-1/2 m-2 h-full max-lg:w-[98%] max-lg:ml-[1%]" key={"card1"}>
                    <CardHeader className="text-center">
                        <CardTitle className="max-sm:text-xl">Hesap Bilgileri</CardTitle>
                        <CardDescription style={{marginTop: "15px"}} className="max-sm:text-xs">Değiştirmek istediğiniz bilginizin üzerine çift tıklayın</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-2.5 pt-2 pb-2">
                            <Label htmlFor="name" className="text-base max-sm:text-sm">Kullanıcı Adı</Label>
                            <Label htmlFor="name" className="font-normal cursor-pointer max-sm:text-sm">{userData.username}</Label>
                            </div>
                            <div className="flex flex-col space-y-2.5 pt-2 pb-2">
                                <Label htmlFor="name" className="text-base max-sm:text-sm">Şifre</Label>
                                <Label htmlFor="name" className="font-normal cursor-pointer max-sm:text-sm">********</Label>
                            </div>
                        </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                        <img src="../logo-black.png" width={"50px"} height={"50px"} alt="Söylenti" className="float-right"/>
                    </CardFooter>
                </Card>
                <Card className="w-1/2 m-2 max-lg:w-[98%] max-lg:ml-[1%]" key={"card3"}>
                    <CardHeader className="text-center">
                        <CardTitle className="max-sm:text-xl">Kullanıcı Bilgileri</CardTitle>
                        <CardDescription style={{marginTop: "15px"}} className="max-sm:text-xs">Puanınız , paylaşımlarınız göz önünde bulundurularak arttırılır</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-2.5 pt-2 pb-2">
                            <Label htmlFor="name" className="text-base max-sm:text-sm">Puan</Label>
                            <Label htmlFor="name" className="font-normal cursor-pointer max-sm:text-sm">{userData.userPoint}</Label>
                            </div>
                            <div className="flex flex-col space-y-2.5 pt-2 pb-2">
                            <Label htmlFor="name" className="text-base max-sm:text-sm">Yetki Tipi</Label>
                            <Label htmlFor="name" className="font-normal cursor-pointer max-sm:text-sm">{userData.role}</Label>
                            </div>
                        </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                        <img src="../logo-black.png" width={"50px"} height={"50px"} alt="Söylenti" className="float-right"/>
                    </CardFooter>
                </Card>
            </div>
            <div>
                <div className="w-full flex justify-center"> 
                    <Card className="w-1/2 m-2 max-lg:w-[98%] max-lg:ml-[1%]" key={"card2"}>
                        <CardHeader className="text-center">
                            <CardTitle className="max-sm:text-xl">Paylaşım Bilgileri</CardTitle>
                            <CardDescription style={{marginTop: "15px"}} className="max-sm:text-xs">Kazancınız, paylaşmış olduğunuz haberlerin tıklanma sayısına göre belirlenmektedir</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex justify-around w-9/12 ml-[7.5%]">
                                    <div className="flex flex-col space-y-2.5 pt-2 pb-2 w-1/2">
                                    <Label htmlFor="name" className="text-base max-sm:text-sm">Toplam Tıklanma</Label>
                                    <Label htmlFor="name" className="font-normal cursor-pointer max-sm:text-sm">51.462</Label>
                                    </div>
                                    <div className="flex flex-col space-y-2.5 pt-2 pb-2 ml-10 w-1/2 ">
                                    <Label htmlFor="name" className="text-base max-sm:text-sm">Ortalama Tıklanma</Label>
                                    <Label htmlFor="name" className="font-normal cursor-pointer max-sm:text-sm">7.345</Label>
                                    </div>
                                </div>
                                <div className="flex justify-between w-9/12 ml-[7.5%]">
                                    <div className="flex flex-col space-y-2.5 pt-2 pb-2 w-1/2">
                                    <Label htmlFor="name" className="text-base max-sm:text-sm">Toplam Paylaşım</Label>
                                <Label htmlFor="name" className="font-normal cursor-pointer max-sm:text-sm">7</Label>
                                    </div>
                                    <div className="flex flex-col space-y-2.5 pt-2 pb-2 ml-10 w-1/2">
                                    <Label htmlFor="name" className="text-base max-sm:text-sm">Aylık Ortalama Paylaşım</Label>
                                    <Label htmlFor="name" className="font-normal cursor-pointer max-sm:text-sm">3</Label>
                                    </div>
                                </div>
                                <div className="flex justify-between w-9/12 ml-[7.5%]">
                                    <div className="flex flex-col space-y-2.5 pt-2 pb-2 w-1/2">
                                    <Label htmlFor="name" className="text-base max-sm:text-sm">Toplam Kazanç</Label>
                                    <Label htmlFor="name" className="font-normal cursor-pointer max-sm:text-sm">245 TL</Label>
                                    </div>
                                    <div className="flex flex-col space-y-2.5 pt-2 pb-2 ml-10 w-1/2">
                                    <Label htmlFor="name" className="text-base max-sm:text-sm">Ortalama Kazanç</Label>
                                    <Label htmlFor="name" className="font-normal cursor-pointer max-sm:text-sm">35 TL</Label>
                                    </div>
                                </div>
                            </div>
                            </form>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <img src="../logo-black.png" width={"50px"} height={"50px"} alt="Söylenti" className="float-right"/>
                        </CardFooter>
                    </Card>
            </div>
            </div>
            <div className="mt-10">
                <span className="text-xl font-medium ml-3 text-slate-600">Paylaşımlarınız</span>
                {whispers.length != 0 ? 
                <div className="flex flex-wrap mt-8">
                    {whispers.map((obj, index) => 
                        <div key={"right-package"+index} className="w-[24%] ml-[1%] mt-3 max-lg:w-[32%] max-md:w-[49%] max-sm:w-[46%] max-sm:ml-[2%]">
                            <a href={"/user/"+obj.authorName}><NewsCard title={obj.title} img="../logo-black.png" name={obj.authorName} source={obj.source} category={obj.category} /></a>
                        </div>
                        )
                    }
                </div>
                : 
                    <div role="status" className={"mr-10 flex justify-center items-center"}>
                        <svg aria-hidden="true" className="w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                }
            </div>
        </div>
    )
}