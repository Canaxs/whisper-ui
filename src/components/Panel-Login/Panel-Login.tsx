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


export default function PanelLogin() {
    return (
        <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Panel Girişi</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
            <Card>
            <CardHeader>
                <CardTitle>Panel'e Giriş Yap</CardTitle>
                <CardDescription>
                Kullanıcı adı ve şifrenizi giriniz
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="space-y-1">
                <Label htmlFor="username">Kullanıcı Adı</Label>
                <Input id="username" placeholder="Kullanıcı Adı" />
                </div>
                <div className="space-y-1">
                <Label htmlFor="password">Şifre</Label>
                <Input id="password" placeholder="Şifre" />
                </div>
            </CardContent>
            <CardFooter>
                <Button>Giriş Yap</Button>
            </CardFooter>
            </Card>
        </TabsContent>
        </Tabs>
    )
}