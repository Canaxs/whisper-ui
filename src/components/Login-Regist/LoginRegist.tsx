import { createUser, generateToken } from "@/api/apiCalls"
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
import { useToast } from "@/components/ui/use-toast"


export default function LoginRegist() {

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [loginBool , setLoginBool] = useState(false);

    const [signUsername , setSignUsername] = useState(""); 
    const [signPassword , setSignPassword] = useState(""); 
    const [signRPassword , setSignRPassword] = useState(""); 

    const dispatch = useDispatch();

    const router = useRouter();

    const { data } = useSelector((store: RootState) => store.user);

    const { toast } = useToast();


    async function login() {
        setLoginBool(true);
        const authModel = {
            username: username,
            password: password
        }
        try {
            await generateToken(authModel).then((res) => {
                dispatch(addUser(res.data));
            })
            toast({
                variant: "success",
                title: "Giriş Başarılı",
                description: "Hoşgeldiniz.",
              })
            router.push("/account");
        }
        catch(e) {
            setLoginBool(false);
            toast({
                variant: "destructive",
                title: "Giriş Başarısız.",
                description: "Kullanıcı Adı Veya Şifreniz Hatalı.",
              })
        }
    }

    async function signUp() {
        setLoginBool(true);
        if(signUsername.length <= 1) {
            setLoginBool(false);
            toast({
                variant: "destructive",
                title: "Lütfen düzgün kullanıcı adı giriniz.",
                description: "Tekrar deneyiniz.",
              })
        }
        else {
            if(signPassword === signRPassword) {
                let isCreate = false;
                const userRequest = {
                    username: signUsername,
                    password: signRPassword,
                    authorities: ["ROLE_USER"]
                }
                await createUser(userRequest).then((res) => {
                    toast({
                        variant: "success",
                        title: "Kullanıcı Oluşturuldu",
                        description: res.data["username"]+" Hoşgeldiniz.",
                    })
                    isCreate = true;
                }, (exception) => {
                    setLoginBool(false);
                    toast({
                        variant: "destructive",
                        title: "Kullanıcı Adı Kullanılmakta.",
                        description: "Başka bir isim deneyiniz.",
                    })
                })
                if(isCreate) {
                    const authModel = {
                        username: signUsername,
                        password: signRPassword
                    }
                    await generateToken(authModel).then((res) => {
                        dispatch(addUser(res.data));
                    })
                    router.push("/account");
                }
            }
            else {
                setLoginBool(false);
                toast({
                    variant: "destructive",
                    title: "Girmiş olduğunuz şifreler uyuşmuyor",
                    description: "Tekrar deneyiniz.",
                })
            }
        }
    }

    return (
        <Tabs defaultValue="login" className="w-[400px] shadow-2xl rounded bg-gradient-to-r from-gray-200 to-gray-200 max-sm:from-gray-100 max-sm:to-gray-200">
        <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Giriş Yap</TabsTrigger>
            <TabsTrigger value="register">Kayıt Ol</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
            <Card className={loginBool ? "before:content-[''] before:bg-gray-500 before:h-[340px] before:w-[400px] before:absolute before:opacity-60" : ""}>
            <CardHeader>
                <CardTitle className="text-gray-700 drop-shadow-lg">Giriş Yap</CardTitle>
                <CardDescription>
                Kullanıcı adı ve şifrenizi giriniz
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                    <div role="status" className={loginBool ? "mr-10 flex justify-center items-center absolute w-[340px]" : "hidden"}>
                        <svg aria-hidden="true" className="w-20 h-20 text-white animate-spin dark:text-gray-600 fill-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="username">Kullanıcı Adı</Label>
                        <Input id="username" placeholder="Kullanıcı Adı" onChange={(e) => setUsername(e.target.value.toString())}/>
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="password">Şifre</Label>
                        <Input type="password" id="password" placeholder="Şifre" onChange={(e) => setPassword(e.target.value.toString())}/>
                    </div>
            </CardContent>
            <CardFooter>
                <Button onClick={() => login()} className="bg-white border text-black hover:bg-black hover:text-white transition-all">Giriş Yap</Button>
            </CardFooter>
            </Card>
        </TabsContent>
        <TabsContent value="register">
            <Card className={loginBool ? "before:content-[''] before:bg-gray-500 before:h-[400px] before:w-[400px] before:absolute before:opacity-60" : ""}>
            <CardHeader>
                <CardTitle className="text-gray-700 drop-shadow-lg">Kayıt Ol</CardTitle>
                <CardDescription>
                Haydi, Sen de Söylenti Ailesine katıl !
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                    <div role="status" className={loginBool ? "mr-10 flex justify-center items-center absolute w-[340px]" : "hidden"}>
                        <svg aria-hidden="true" className="w-20 h-20 text-white animate-spin dark:text-gray-600 fill-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                <div className="space-y-1">
                <Label htmlFor="current">Kullanıcı Adı</Label>
                <Input id="usernameReq" type="text" placeholder="Kullanıcı Adı" onChange={(e) => setSignUsername(e.target.value.toString())}/>
                </div>
                <div className="space-y-1">
                <Label htmlFor="newpassword">Şifre</Label>
                <Input id="newpassword" type="password" placeholder="Şifre" onChange={(e) => setSignPassword(e.target.value.toString())}/>
                </div>
                <div className="space-y-1">
                <Label htmlFor="repeatpassword">Tekrar Şifre</Label>
                <Input id="repeatpassword" type="password" placeholder="Tekrar Şifre" onChange={(e) => setSignRPassword(e.target.value.toString())}/>
                </div>
            </CardContent>
            <CardFooter>
                <Button className="bg-white border text-black hover:bg-black hover:text-white transition-all" onClick={() => signUp()}>Kayıt Ol</Button>
            </CardFooter>
            </Card>
        </TabsContent>
        </Tabs>
    )
}