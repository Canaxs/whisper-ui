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

export default function AccountInfo() {
    return (
        <div className="mt-20">
            <div className="flex max-lg:flex-col">
                <Card className="w-1/2 m-2 h-full max-lg:w-[98%] max-lg:ml-[1%]">
            <CardHeader className="text-center">
                <CardTitle>Hesap Bilgileri</CardTitle>
                <CardDescription style={{marginTop: "15px"}}>Değiştirmek istediğiniz bilginizin üzerine çift tıklayın</CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-2.5 pt-2 pb-2">
                    <Label htmlFor="name" className="text-base">Name</Label>
                    <Label htmlFor="name" className="font-normal cursor-pointer">Söylenti</Label>
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
                <Card className="w-1/2 m-2 max-lg:w-[98%] max-lg:ml-[1%]">
            <CardHeader className="text-center">
                <CardTitle>Kullanıcı Bilgileri</CardTitle>
                <CardDescription style={{marginTop: "15px"}}>Puanınız , paylaşımlarınız göz önünde bulundurularak arttırılır</CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-2.5 pt-2 pb-2">
                    <Label htmlFor="name" className="text-base">Puan</Label>
                    <Label htmlFor="name" className="font-normal cursor-pointer">2.500</Label>
                    </div>
                    <div className="flex flex-col space-y-2.5 pt-2 pb-2">
                    <Label htmlFor="name" className="text-base">Yetki Tipi</Label>
                    <Label htmlFor="name" className="font-normal cursor-pointer">Kullanıcı</Label>
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
                <Card className="w-1/2 m-2 max-lg:w-[98%] max-lg:ml-[1%]">
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
                    {Array.from({ length: 5 }).map((_, index) => <NewsCard title={"Söylenti"} img="../logo-black.png" keyNumber={index} name={"deneme "+index} />)}
                </div>
            </div>
        </div>
    )
}