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

export default function LoginRegist() {
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
                <Input id="username" defaultValue="Kullanıcı Adı" />
                </div>
                <div className="space-y-1">
                <Label htmlFor="password">Şifre</Label>
                <Input id="password" defaultValue="Şifre" />
                </div>
            </CardContent>
            <CardFooter>
                <Button>Giriş Yap</Button>
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
                <Input id="username" type="text" />
                </div>
                <div className="space-y-1">
                <Label htmlFor="current">Mail Adresi</Label>
                <Input id="mail" type="text" />
                </div>
                <div className="space-y-1">
                <Label htmlFor="newpassword">Şifre</Label>
                <Input id="newpassword" type="password" />
                </div>
                <div className="space-y-1">
                <Label htmlFor="repeatpassword">Tekrar Şifre</Label>
                <Input id="repeatpassword" type="password" />
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