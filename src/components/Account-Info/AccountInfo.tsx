import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import NewsCard from "@/components/News-Card/NewsCard";
import { useEffect, useState } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import { getSubscribe, getUserWhispersCalls } from "@/api/apiCalls";
import { 
  User, 
  Shield, 
  TrendingUp, 
  Crown, 
  Eye, 
  Calendar,
  DollarSign,
  FileText,
  Star,
  Zap
} from "lucide-react";

export type Whisper = {
  authorName: string;
  title: string;
  description: string;
  source: string;
  category: string;
  urlName: string;
  imageURL: string;
  createdDate: string;
};

export type Subscription = {
  createdBy: string;
  createdDate: string;
  updatedBy: string;
  updatedDate: string;
  planName: string;
  writeLimit: number;
  writeLimitDef: number;
  earning: boolean;
  exclusive: boolean;
  id: number;
};

export default function AccountInfo() {
  const [userData, setUserData] = useState({
    username: "",
    userPoint: "",
    role: "",
  });

  const [subsInfo, setSubsInfo] = useState<Subscription>();

  const [whispers, setWhispers] = useState<Whisper[]>([]);

  function uploadInformation() {
    setUserData({
      username: Cookies.get("username"),
      userPoint: Cookies.get("userPoint"),
      role: Cookies.get("role"),
    });
  }

  function getSubscribeInfo() {
    getSubscribe(Cookies.get("token")).then((res) => {
      setSubsInfo(res.data);
    });
  }

  useEffect(() => {
    uploadInformation();

    const fetchData = async () => {
      try {
        const [whisperRes, subsRes] = await Promise.all([
          getUserWhispersCalls(Cookies.get("username")),
          getSubscribe(Cookies.get("token")),
        ]);

        setWhispers(whisperRes.data);
        setSubsInfo(subsRes.data);
      } catch (err) {
        console.error("Veri alınırken hata oluştu:", err);
      }
    };

    fetchData();
  }, []);

  function getUserWhispers() {
    getUserWhispersCalls(Cookies.get("username")).then((res) => {
      setWhispers(res.data);
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex max-lg:flex-col gap-4">
        <Card className="flex-1 hover:shadow-xl hover:shadow-blue-100/50 transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-lg" key={"card1"}>
          <CardHeader className="text-center pb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-2 shadow-lg">
              <User className="w-5 h-5 text-white" />
            </div>
            <CardTitle className="max-sm:text-lg text-lg line-clamp-1">Hesap Bilgileri</CardTitle>
            <CardDescription className="max-sm:text-xs text-xs line-clamp-2">
              Değiştirmek istediğiniz bilginizin üzerine çift tıklayın
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-3">
            <form>
              <div className="grid w-full items-center gap-3">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name" className="text-sm font-medium text-gray-600 flex items-center">
                    <Shield className="w-3 h-3 mr-2" />
                    Kullanıcı Adı
                  </Label>
                  <div className="p-2 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200/50">
                    <Label className="font-medium text-gray-900 cursor-pointer text-sm">
                      {userData.username}
                    </Label>
                  </div>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name" className="text-sm font-medium text-gray-600 flex items-center">
                    <Shield className="w-3 h-3 mr-2" />
                    Şifre
                  </Label>
                  <div className="p-2 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200/50">
                    <Label className="font-medium text-gray-900 cursor-pointer text-sm">
                      ********
                    </Label>
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end pt-2">
            <Image
              src="/logo-black.png"
              width={32}
              height={32}
              alt="Söylenti"
              className="opacity-60"
            />
          </CardFooter>
        </Card>
        
        <Card className="flex-1 hover:shadow-xl hover:shadow-green-100/50 transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-lg" key={"card3"}>
          <CardHeader className="text-center pb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center mx-auto mb-2 shadow-lg">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <CardTitle className="max-sm:text-lg text-lg line-clamp-1">
              Kullanıcı Bilgileri
            </CardTitle>
            <CardDescription className="max-sm:text-xs text-xs line-clamp-2">
              Puanınız, paylaşımlarınız göz önünde bulundurularak arttırılır
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-3">
            <form>
              <div className="grid w-full items-center gap-3">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name" className="text-sm font-medium text-gray-600 flex items-center">
                    <Star className="w-3 h-3 mr-2" />
                    Puan
                  </Label>
                  <div className="p-2 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200/50">
                    <Label className="font-medium text-gray-900 cursor-pointer text-sm flex items-center">
                      {userData.userPoint}
                      <Badge variant="secondary" className="ml-2 bg-gradient-to-r from-green-400 to-green-500 text-white text-xs shadow-sm">
                        <Zap className="w-3 h-3 mr-1" />
                        Aktif
                      </Badge>
                    </Label>
                  </div>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name" className="text-sm font-medium text-gray-600 flex items-center">
                    <Crown className="w-3 h-3 mr-2" />
                    Yetki Tipi
                  </Label>
                  <div className="p-2 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200/50">
                    <Label className="font-medium text-gray-900 cursor-pointer text-sm">
                      {userData.role}
                    </Label>
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end pt-2">
            <Image
              src="/logo-black.png"
              width={32}
              height={32}
              alt="Söylenti"
              className="opacity-60"
            />
          </CardFooter>
        </Card>
      </div>
      
      <div className="flex max-lg:flex-col gap-4">
        <Card className="flex-1 hover:shadow-xl hover:shadow-purple-100/50 transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-lg" key={"card2"}>
          <CardHeader className="text-center pb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-2 shadow-lg">
              <Eye className="w-5 h-5 text-white" />
            </div>
            <CardTitle className="max-sm:text-lg text-lg line-clamp-1">
              Paylaşım Bilgileri
            </CardTitle>
            <CardDescription className="max-sm:text-xs text-xs line-clamp-2">
              Kazancınız, paylaşmış olduğunuz haberlerin tıklanma sayısına göre belirlenmektedir
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-3">
            <form>
              <div className="grid w-full items-center gap-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col space-y-1.5">
                    <Label className="text-sm font-medium text-gray-600 flex items-center">
                      <Eye className="w-3 h-3 mr-2" />
                      Toplam Tıklanma
                    </Label>
                    <div className="p-2 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200/50">
                      <Label className="font-medium text-gray-900 cursor-pointer text-sm">
                        51.462
                      </Label>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label className="text-sm font-medium text-gray-600 flex items-center">
                      <TrendingUp className="w-3 h-3 mr-2" />
                      Ortalama Tıklanma
                    </Label>
                    <div className="p-2 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200/50">
                      <Label className="font-medium text-gray-900 cursor-pointer text-sm">
                        7.345
                      </Label>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col space-y-1.5">
                    <Label className="text-sm font-medium text-gray-600 flex items-center">
                      <FileText className="w-3 h-3 mr-2" />
                      Toplam Paylaşım
                    </Label>
                    <div className="p-2 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200/50">
                      <Label className="font-medium text-gray-900 cursor-pointer text-sm">
                        7
                      </Label>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label className="text-sm font-medium text-gray-600 flex items-center">
                      <Calendar className="w-3 h-3 mr-2" />
                      Aylık Ortalama
                    </Label>
                    <div className="p-2 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200/50">
                      <Label className="font-medium text-gray-900 cursor-pointer text-sm">
                        3
                      </Label>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col space-y-1.5">
                    <Label className="text-sm font-medium text-gray-600 flex items-center">
                      <DollarSign className="w-3 h-3 mr-2" />
                      Toplam Kazanç
                    </Label>
                    <div className="p-2 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200/50">
                      <Label className="font-medium text-gray-900 cursor-pointer text-sm">
                        245 TL
                      </Label>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label className="text-sm font-medium text-gray-600 flex items-center">
                      <DollarSign className="w-3 h-3 mr-2" />
                      Ortalama Kazanç
                    </Label>
                    <div className="p-2 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200/50">
                      <Label className="font-medium text-gray-900 cursor-pointer text-sm">
                        35 TL
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end pt-2">
            <Image
              src="/logo-black.png"
              width={32}
              height={32}
              alt="Söylenti"
              className="opacity-60"
            />
          </CardFooter>
        </Card>
        
        <Card className="flex-1 hover:shadow-xl hover:shadow-orange-100/50 transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-lg" key={"card1"}>
          <CardHeader className="text-center pb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center mx-auto mb-2 shadow-lg">
              <Crown className="w-5 h-5 text-white" />
            </div>
            <CardTitle className="max-sm:text-lg text-lg line-clamp-1">Üyelik Bilgileri</CardTitle>
            <CardDescription className="max-sm:text-xs text-xs line-clamp-2">
              Aktif üyelik planınız ve özellikleriniz
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-3">
            <form>
              <div className="grid w-full items-center gap-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col space-y-1.5">
                    <Label className="text-sm font-medium text-gray-600 flex items-center">
                      <Crown className="w-3 h-3 mr-2" />
                      Plan Adı
                    </Label>
                    <div className="p-2 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200/50">
                      <Label className="font-medium text-gray-900 cursor-pointer text-sm">
                        {subsInfo?.planName}
                      </Label>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label className="text-sm font-medium text-gray-600 flex items-center">
                      <Calendar className="w-3 h-3 mr-2" />
                      Yenilenme Tarihi
                    </Label>
                    <div className="p-2 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200/50">
                      <Label className="font-medium text-gray-900 cursor-pointer text-sm">
                        {subsInfo?.createdDate.split("T")[0]}
                      </Label>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col space-y-1.5">
                    <Label className="text-sm font-medium text-gray-600 flex items-center">
                      <DollarSign className="w-3 h-3 mr-2" />
                      Para Kazanma
                    </Label>
                    <div className="p-2 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200/50">
                      <Label className="font-medium text-gray-900 cursor-pointer text-sm">
                        {subsInfo?.earning ? (
                          <Badge variant="secondary" className="bg-gradient-to-r from-green-400 to-green-500 text-white text-xs shadow-sm">
                            Açık
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="bg-gradient-to-r from-red-400 to-red-500 text-white text-xs shadow-sm">
                            Kapalı
                          </Badge>
                        )}
                      </Label>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label className="text-sm font-medium text-gray-600 flex items-center">
                      <Star className="w-3 h-3 mr-2" />
                      Seçkin Hesap
                    </Label>
                    <div className="p-2 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200/50">
                      <Label className="font-medium text-gray-900 cursor-pointer text-sm">
                        {subsInfo?.exclusive ? (
                          <Badge variant="secondary" className="bg-gradient-to-r from-purple-400 to-purple-500 text-white text-xs shadow-sm">
                            Aktif
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="bg-gradient-to-r from-gray-400 to-gray-500 text-white text-xs shadow-sm">
                            Aktif Değil
                          </Badge>
                        )}
                      </Label>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col space-y-1.5">
                    <Label className="text-sm font-medium text-gray-600 flex items-center">
                      <FileText className="w-3 h-3 mr-2" />
                      Paylaşım Limiti
                    </Label>
                    <div className="p-2 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200/50">
                      <Label className="font-medium text-gray-900 cursor-pointer text-sm">
                        {subsInfo?.writeLimitDef}
                      </Label>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label className="text-sm font-medium text-gray-600 flex items-center">
                      <Zap className="w-3 h-3 mr-2" />
                      Kalan Limit
                    </Label>
                    <div className="p-2 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200/50">
                      <Label className="font-medium text-gray-900 cursor-pointer text-sm">
                        {subsInfo?.writeLimit}
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end pt-2">
            <Image
              src="/logo-black.png"
              width={32}
              height={32}
              alt="Söylenti"
              className="opacity-60"
            />
          </CardFooter>
        </Card>
      </div>
      
      <div className="mt-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
            <FileText className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">
            Paylaşımlarınız
          </h2>
        </div>
        {whispers ? (
          whispers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {whispers.map((obj, index) => (
                <div key={"whisper-" + index} className="group">
                  <Card className="overflow-hidden hover:shadow-xl hover:shadow-blue-100/50 transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-lg h-full">
                    <div className="relative">
                      <div className="aspect-video overflow-hidden">
                        <Image
                          src={obj.imageURL ? obj.imageURL : "/logo-black.png"}
                          alt={obj.title}
                          width={300}
                          height={200}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <div className="absolute top-2 right-2">
                        <Badge variant="secondary" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs shadow-lg font-medium">
                          {obj.category}
                        </Badge>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <CardContent className="p-4 flex flex-col h-full">
                      <div className="space-y-3 flex-1">
                        <div className="h-10 flex items-start">
                          <h3 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-2">
                            {obj.title}
                          </h3>
                        </div>
                        
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center space-x-1">
                            <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                              <User className="w-2 h-2 text-white" />
                            </div>
                            <span className="font-medium">{obj.authorName}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3 text-gray-400" />
                            <span>{new Date(obj.createdDate).toLocaleDateString('tr-TR')}</span>
                          </div>
                        </div>
                        
                        {obj.source && (
                          <div className="flex items-center space-x-1 text-xs text-gray-400">
                            <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                              <Eye className="w-2 h-2 text-white" />
                            </div>
                            <span className="truncate font-medium">{obj.source}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-xs text-gray-500">Aktif</span>
                          </div>
                          <div className="flex items-center space-x-1 text-xs text-gray-400">
                            <TrendingUp className="w-3 h-3" />
                            <span>Görüntüleniyor</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center w-full py-12">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <FileText className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-600 text-lg">Henüz paylaşımınız bulunmuyor.</p>
              <p className="text-gray-500 text-sm mt-2">İlk paylaşımınızı yapmak için yazma sayfasına gidin.</p>
            </div>
          )
        ) : (
          <div role="status" className="flex justify-center items-center py-12">
            <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin shadow-lg"></div>
            <span className="sr-only">Yükleniyor...</span>
          </div>
        )}
      </div>
    </div>
  );
}
