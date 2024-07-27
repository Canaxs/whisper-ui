import { generateToken } from "@/api/apiCalls"
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { RootState } from "@/lib/store";
import { addUser } from "@/lib/features/userSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TokenDTO from '@/models/TokenDTO';
import { useRouter } from 'next/navigation'


export default function LoginRegist() {

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    const dispatch = useDispatch();

    const router = useRouter();

    const { data } = useSelector((store: RootState) => store.user);


    async function login() {
        const authModel = {
            username: username,
            password: password
        }
        try {
            await generateToken(authModel).then((res) => {
                dispatch(addUser(res.data));
            })
            router.push("/account");
        }
        catch(e) {
            console.log("Login Error: "+e);
        }
    }

    return (
        <Tabs defaultValue="login" className="w-[400px] shadow-2xl rounded">
        <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Giriş Yap</TabsTrigger>
            <TabsTrigger value="register">Kayıt Ol</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
            <Card>
            <CardHeader>
                <CardTitle className="text-gray-700 drop-shadow-lg">Giriş Yap</CardTitle>
                <CardDescription>
                Kullanıcı adı ve şifrenizi giriniz
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="space-y-1">
                <Label htmlFor="username">Kullanıcı Adı</Label>
                <Input id="username" placeholder="Kullanıcı Adı" onChange={(e) => setUsername(e.target.value.toString())}/>
                </div>
                <div className="space-y-1">
                <Label htmlFor="password">Şifre</Label>
                <Input id="password" placeholder="Şifre" onChange={(e) => setPassword(e.target.value.toString())}/>
                </div>
            </CardContent>
            <CardFooter>
                <Button onClick={() => login()} className="bg-white border text-black hover:bg-black hover:text-white transition-all">Giriş Yap</Button>
            </CardFooter>
            </Card>
        </TabsContent>
        <TabsContent value="register">
            <Card>
            <CardHeader>
                <CardTitle className="text-gray-700 drop-shadow-lg">Kayıt Ol</CardTitle>
                <CardDescription>
                Haydi, Sen de Söylenti Ailesine katıl !
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="space-y-1">
                <Label htmlFor="current">Kullanıcı Adı</Label>
                <Input id="usernameReq" type="text" placeholder="Kullanıcı Adı"/>
                </div>
                <div className="space-y-1">
                <Label htmlFor="current">Mail Adresi</Label>
                <Input id="mail" type="text" placeholder="Mail Adresi"/>
                </div>
                <div className="space-y-1">
                <Label htmlFor="newpassword">Şifre</Label>
                <Input id="newpassword" type="password" placeholder="Şifre"/>
                </div>
                <div className="space-y-1">
                <Label htmlFor="repeatpassword">Tekrar Şifre</Label>
                <Input id="repeatpassword" type="password" placeholder="Tekrar Şifre"/>
                </div>
            </CardContent>
            <CardFooter>
                <Button className="bg-white border text-black hover:bg-black hover:text-white transition-all">Kayıt Ol</Button>
            </CardFooter>
            </Card>
        </TabsContent>
        </Tabs>
    )
}