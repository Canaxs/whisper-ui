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


export default function AccountInfo() {

    const [userData,setUserData] = useState({
        username: "",
        userPoint: "",
        role: "",
    });

    function uploadInformation() {
        setUserData({
            username: Cookies.get("username"),
            userPoint: Cookies.get("userPoint"),
            role: Cookies.get("role"),
        })
    }

    useEffect(() => {
        uploadInformation();
    }, [])

    const data = useAppSelector((state) => state.user.data); 

    return (
        <div className="mt-20">
            <div className="flex max-lg:flex-col">
                <Card className="w-1/2 m-2 h-full max-lg:w-[98%] max-lg:ml-[1%]" key={"card1"}>
                    <CardHeader className="text-center">
                        <CardTitle>Hesap Bilgileri</CardTitle>
                        <CardDescription style={{marginTop: "15px"}}>Değiştirmek istediğiniz bilginizin üzerine çift tıklayın</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-2.5 pt-2 pb-2">
                            <Label htmlFor="name" className="text-base">Kullanıcı Adı</Label>
                            <Label htmlFor="name" className="font-normal cursor-pointer">{userData.username}</Label>
                            </div>
                            <div className="flex flex-col space-y-2.5 pt-2 pb-2">
                            <Label htmlFor="name" className="text-base">Şifre</Label>
                            <Label htmlFor="name" className="font-normal cursor-pointer">********</Label>
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
                        <CardTitle>Kullanıcı Bilgileri</CardTitle>
                        <CardDescription style={{marginTop: "15px"}}>Puanınız , paylaşımlarınız göz önünde bulundurularak arttırılır</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-2.5 pt-2 pb-2">
                            <Label htmlFor="name" className="text-base">Puan</Label>
                            <Label htmlFor="name" className="font-normal cursor-pointer">{userData.userPoint}</Label>
                            </div>
                            <div className="flex flex-col space-y-2.5 pt-2 pb-2">
                            <Label htmlFor="name" className="text-base">Yetki Tipi</Label>
                            <Label htmlFor="name" className="font-normal cursor-pointer">{userData.role}</Label>
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
                            <CardTitle>Paylaşım Bilgileri</CardTitle>
                            <CardDescription style={{marginTop: "15px"}}>Kazancınız, paylaşmış olduğunuz haberlerin tıklanma sayısına göre belirlenmektedir</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex justify-around w-9/12 ml-[7.5%]">
                                    <div className="flex flex-col space-y-2.5 pt-2 pb-2 w-1/2">
                                    <Label htmlFor="name" className="text-base">Toplam Tıklanma</Label>
                                    <Label htmlFor="name" className="font-normal cursor-pointer">51.462</Label>
                                    </div>
                                    <div className="flex flex-col space-y-2.5 pt-2 pb-2 ml-10 w-1/2 ">
                                    <Label htmlFor="name" className="text-base">Ortalama Tıklanma</Label>
                                    <Label htmlFor="name" className="font-normal cursor-pointer">7.345</Label>
                                    </div>
                                </div>
                                <div className="flex justify-between w-9/12 ml-[7.5%]">
                                    <div className="flex flex-col space-y-2.5 pt-2 pb-2 w-1/2">
                                    <Label htmlFor="name" className="text-base">Toplam Paylaşım</Label>
                                <Label htmlFor="name" className="font-normal cursor-pointer">7</Label>
                                    </div>
                                    <div className="flex flex-col space-y-2.5 pt-2 pb-2 ml-10 w-1/2">
                                    <Label htmlFor="name" className="text-base">Aylık Ortalama Paylaşım</Label>
                                    <Label htmlFor="name" className="font-normal cursor-pointer">3</Label>
                                    </div>
                                </div>
                                <div className="flex justify-between w-9/12 ml-[7.5%]">
                                    <div className="flex flex-col space-y-2.5 pt-2 pb-2 w-1/2">
                                    <Label htmlFor="name" className="text-base">Toplam Kazanç</Label>
                                    <Label htmlFor="name" className="font-normal cursor-pointer">245 TL</Label>
                                    </div>
                                    <div className="flex flex-col space-y-2.5 pt-2 pb-2 ml-10 w-1/2">
                                    <Label htmlFor="name" className="text-base">Ortalama Kazanç</Label>
                                    <Label htmlFor="name" className="font-normal cursor-pointer">35 TL</Label>
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
                <div className="flex flex-wrap mt-8">
                    {Array.from({ length: 5 }).map((_, index) => 
                        <div key={"right-package"+index} className="w-[24%] ml-[1%] mt-3 max-lg:w-[32%] max-md:w-[49%]">
                            <NewsCard title={"Söylenti"} img="../logo-black.png" name={"deneme"} />
                        </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}