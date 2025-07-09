"use client";

import { createUser, generateToken } from "@/api/apiCalls";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { addUser } from "@/lib/features/userSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import Cookies from "js-cookie";

export default function LoginRegist() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginBool, setLoginBool] = useState(false);

  const [signUsername, setSignUsername] = useState("");
  const [signPassword, setSignPassword] = useState("");
  const [signRPassword, setSignRPassword] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();
  const { toast } = useToast();

  async function login() {
    setLoginBool(true);
    const authModel = {
      username: username,
      password: password,
    };
    try {
      await generateToken(authModel).then((res) => {
        dispatch(addUser(res.data));
      });
      toast({
        variant: "success",
        title: "Giriş Başarılı",
        description: "Hoşgeldiniz.",
      });
      // Kullanıcının plan durumunu kontrol et
      const isSubscribe = Cookies.get("isSubscribe");
      if (isSubscribe === "true") {
        router.push("/account");
      } else {
        router.push("/plan");
      }
    } catch (e) {
      setLoginBool(false);
      toast({
        variant: "destructive",
        title: "Giriş Başarısız.",
        description: "Kullanıcı Adı Veya Şifreniz Hatalı.",
      });
    }
  }

  async function signUp() {
    setLoginBool(true);
    if (signUsername.length <= 1) {
      setLoginBool(false);
      toast({
        variant: "destructive",
        title: "Lütfen düzgün kullanıcı adı giriniz.",
        description: "Tekrar deneyiniz.",
      });
    } else {
      if (signPassword === signRPassword) {
        let isCreate = false;
        const userRequest = {
          username: signUsername,
          password: signRPassword,
          authorities: ["ROLE_USER"],
        };
        await createUser(userRequest).then(
          (res) => {
            toast({
              variant: "success",
              title: "Kullanıcı Oluşturuldu",
              description: res.data["username"] + " Hoşgeldiniz.",
            });
            isCreate = true;
          },
          (exception) => {
            setLoginBool(false);
            toast({
              variant: "destructive",
              title: "Kullanıcı Adı Kullanılmakta.",
              description: "Başka bir isim deneyiniz.",
            });
          }
        );
        if (isCreate) {
          const authModel = {
            username: signUsername,
            password: signRPassword,
          };
          await generateToken(authModel).then((res) => {
            dispatch(addUser(res.data));
          });
          // Yeni kullanıcılar için plan seçimi sayfasına yönlendir
          router.push("/plan");
        }
      } else {
        setLoginBool(false);
        toast({
          variant: "destructive",
          title: "Girmiş olduğunuz şifreler uyuşmuyor",
          description: "Tekrar deneyiniz.",
        });
      }
    }
  }

  return (
    <div className="flex items-center min-h-max justify-center p-4">
      <Tabs
        defaultValue="login"
        className="w-[400px] shadow-2xl rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200/50"
      >
        <TabsList className="grid w-full grid-cols-2 bg-gray-100/50">
          <TabsTrigger
            value="login"
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200"
            disabled={loginBool}
          >
            Giriş Yap
          </TabsTrigger>
          <TabsTrigger
            value="register"
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200"
            disabled={loginBool}
          >
            Kayıt Ol
          </TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <Card className="border-0 shadow-none bg-transparent">
            {loginBool && (
              <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-10 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Loader2 className="h-8 w-8 animate-spin text-gray-600 mx-auto" />
                  <p className="text-sm text-gray-600 font-medium">
                    Giriş yapılıyor...
                  </p>
                </div>
              </div>
            )}
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-2xl font-bold text-gray-800 text-center">
                Giriş Yap
              </CardTitle>
              <CardDescription className="text-center text-gray-600">
                Kullanıcı adı ve şifrenizi giriniz
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 px-6">
              <div className="space-y-2">
                <Label
                  htmlFor="username"
                  className="text-sm font-medium text-gray-700"
                >
                  Kullanıcı Adı
                </Label>
                <Input
                  id="username"
                  placeholder="Kullanıcı Adı"
                  onChange={(e) => setUsername(e.target.value.toString())}
                  disabled={loginBool}
                  className="h-11 border-gray-200 focus:border-gray-400 focus:ring-gray-400 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Şifre
                </Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="Şifre"
                  onChange={(e) => setPassword(e.target.value.toString())}
                  disabled={loginBool}
                  className="h-11 border-gray-200 focus:border-gray-400 focus:ring-gray-400 transition-colors"
                />
              </div>
            </CardContent>

            <CardFooter className="px-6 pt-2">
              <Button
                onClick={() => login()}
                disabled={loginBool || !username || !password}
                className="w-full h-11 bg-gray-800 hover:bg-gray-900 text-white font-medium transition-all duration-200 disabled:opacity-50"
              >
                {loginBool ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Giriş yapılıyor...
                  </>
                ) : (
                  "Giriş Yap"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="register">
          <Card className="border-0 shadow-none bg-transparent">
            {loginBool && (
              <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-10 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Loader2 className="h-8 w-8 animate-spin text-gray-600 mx-auto" />
                  <p className="text-sm text-gray-600 font-medium">
                    Kayıt oluşturuluyor...
                  </p>
                </div>
              </div>
            )}
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-2xl font-bold text-gray-800 text-center">
                Kayıt Ol
              </CardTitle>
              <CardDescription className="text-center text-gray-600">
                Haydi, Sen de Söylenti Ailesine katıl !
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 px-6">
              <div className="space-y-2">
                <Label
                  htmlFor="usernameReq"
                  className="text-sm font-medium text-gray-700"
                >
                  Kullanıcı Adı
                </Label>
                <Input
                  id="usernameReq"
                  type="text"
                  placeholder="Kullanıcı Adı"
                  onChange={(e) => setSignUsername(e.target.value.toString())}
                  disabled={loginBool}
                  className="h-11 border-gray-200 focus:border-gray-400 focus:ring-gray-400 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="newpassword"
                  className="text-sm font-medium text-gray-700"
                >
                  Şifre
                </Label>
                <Input
                  id="newpassword"
                  type="password"
                  placeholder="Şifre"
                  onChange={(e) => setSignPassword(e.target.value.toString())}
                  disabled={loginBool}
                  className="h-11 border-gray-200 focus:border-gray-400 focus:ring-gray-400 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="repeatpassword"
                  className="text-sm font-medium text-gray-700"
                >
                  Tekrar Şifre
                </Label>
                <Input
                  id="repeatpassword"
                  type="password"
                  placeholder="Tekrar Şifre"
                  onChange={(e) => setSignRPassword(e.target.value.toString())}
                  disabled={loginBool}
                  className="h-11 border-gray-200 focus:border-gray-400 focus:ring-gray-400 transition-colors"
                />
              </div>
            </CardContent>

            <CardFooter className="px-6 pt-2">
              <Button
                onClick={() => signUp()}
                disabled={
                  loginBool || !signUsername || !signPassword || !signRPassword
                }
                className="w-full h-11 bg-gray-800 hover:bg-gray-900 text-white font-medium transition-all duration-200 disabled:opacity-50"
              >
                {loginBool ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Kayıt yapılıyor...
                  </>
                ) : (
                  "Kayıt Ol"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
