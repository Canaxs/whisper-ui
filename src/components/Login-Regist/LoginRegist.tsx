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
import { RootState } from "@/store/store"
import { addUser } from "@/store/user-store"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TokenDTO from '@/models/TokenDTO';
import { redirect } from "next/navigation"


export default function LoginRegist() {

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    const dispatch = useDispatch();

    const { data } = useSelector((store: RootState) => store.user);


    function login() {
        const authModel = {
            username: username,
            password: password
        }
        const responseModel = {
            token : "",
            username: "",
            userPoint: "",
            role: ""
        }
        try {
            generateToken(authModel).then((res) => {
                res.data = responseModel;
                console.log("responseModel: "+res.data.token);
            })
            dispatch(addUser(responseModel));
            console.log("responseModel: "+responseModel.token);
            redirect("/account");
        }
        catch(e) {
            console.log("Login Error: "+e);
        }
    }

    return (
        <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Giriş Yap</TabsTrigger>
            <TabsTrigger value="register">Kayıt Ol</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
            <Card>
            <CardHeader>
                <CardTitle>Giriş Yap</CardTitle>
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
                <Button onClick={() => login()}>Giriş Yap</Button>
            </CardFooter>
            </Card>
        </TabsContent>
        <TabsContent value="register">
            <Card>
            <CardHeader>
                <CardTitle>Kayıt Ol</CardTitle>
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
                <Button>Kayıt Ol</Button>
            </CardFooter>
            </Card>
        </TabsContent>
        </Tabs>
    )
}