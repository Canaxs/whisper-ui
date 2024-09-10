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
import { addUser } from "@/lib/features/userSlice"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useToast } from "../ui/use-toast"
import Cookies from 'js-cookie';


export default function PanelLogin() {

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    const [loginBool , setLoginBool] = useState(false);

    const dispatch = useDispatch();

    const router = useRouter();

    const { toast } = useToast();

    useEffect(() => {
        redirectIfAuthorization();
    }, [])

    function redirectIfAuthorization() {
        if(Cookies.get("role") === "ROLE_MOD" &&  Cookies.get("role") === "ROLE_ADMIN") {
            router.push("/panel/dashboard");
        }
    }


    async function loginPanel() {
        setLoginBool(true);
        const authModel = {
            username: username,
            password: password
        }
        try {
            await generateToken(authModel).then((res) => {
                if(res.data['role'].includes("ROLE_MOD")) {
                    dispatch(addUser(res.data));
                }
                else {
                    toast({
                        variant: "destructive",
                        title: "Giriş Başarısız.",
                        description: "Yetkiniz bu panele giriş yapmak için yetersiz.",
                      })
                }
            })
            toast({
                variant: "success",
                title: "Giriş Başarılı",
                description: "Hoşgeldiniz.",
            })
            router.push("/panel/dashboard");
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

    return (
        <Tabs defaultValue="login" className="w-[400px] shadow-2xl rounded bg-gradient-to-r from-gray-200 to-gray-200 max-sm:from-gray-100 max-sm:to-gray-200">
        <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Panel Girişi</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
            <Card>
            <CardHeader>
                <CardTitle className="text-gray-700 drop-shadow-lg">Panel&apos;e Giriş Yap</CardTitle>
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
                <Button className="bg-white border text-black hover:bg-black hover:text-white transition-all" onClick={() => loginPanel()}>Giriş Yap</Button>
            </CardFooter>
            </Card>
        </TabsContent>
        </Tabs>
    )
}