"use client";
import AbsoluteAdversiting from "@/components/Advertising-Space/AbsoluteAdversiting";
import FooterArea from "@/components/Footer-Area/FooterArea";
import Header from "@/components/Header/Header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { usePathname } from "next/navigation";

import { getUser, getUserWhispersCalls } from "@/api/apiCalls";
import { useEffect, useState } from "react";
import NewsCard from "@/components/News-Card/NewsCard";
import { FiUser } from "react-icons/fi";
import { GiNorthStarShuriken } from "react-icons/gi";
import { LuUserCog } from "react-icons/lu";
import { SlBadge } from "react-icons/sl";
import Image from "next/image";
import MainLayout from "@/components/v2/MainLayout/MainLayout";
import Categories from "@/components/v2/Categories/Categories";
import RightSidebarTalks from "@/components/v2/RightSidebarTalks/RightSidebarTalks";
import Authors from "@/components/v2/Authors/Authors";
import { 
  User, 
  Star, 
  Shield, 
  Award, 
  FileText, 
  TrendingUp,
  Calendar,
  Eye
} from "lucide-react";

export type UserDto = {
  username: string;
  userPoint: number;
  authorities: string;
  badges: [];
};

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

export default function UserPage() {
  const pathname = usePathname();

  const [userDto, setUserDto] = useState<UserDto>();

  const [whispers, setWhispers] = useState<Whisper[]>([]);

  useEffect(() => {
    getUserPage();
    getUserWhispers();
  }, []);

  async function getUserPage() {
    await getUser(pathname.substring(6)).then(
      (res) => {
        setUserDto(res.data);
      },
      (exception) => {}
    );
  }

  async function getUserWhispers() {
    await getUserWhispersCalls(pathname.substring(6)).then((res) => {
      setWhispers(res.data);
    });
  }

  return (
    <MainLayout>
      <div className="flex-1">
        <div className="grid grid-cols-1 xl:grid-cols-10">
          <div className="xl:col-span-8">
            <div className="mt-8 m-5">
              {/* Hero Section */}
              <div className="w-full mb-8">
                <Card className="relative overflow-hidden rounded-2xl shadow-2xl border-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10"></div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-500/20 to-transparent rounded-full blur-2xl"></div>
                  
                  <CardContent className="relative p-6 md:p-8">
                    <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                      {/* Avatar Section */}
                      <div className="relative">
                        <div className="relative">
                          <Avatar className="h-32 w-32 md:h-40 md:w-40 border-4 border-white/20 shadow-2xl">
                            <AvatarImage
                              src="https://github.com/shadcn.png"
                              alt={userDto?.username}
                            />
                            <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-indigo-400 to-purple-400 text-white">
                              {userDto?.username?.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          {/* Online Status */}
                          <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-400 border-4 border-white rounded-full shadow-lg"></div>
                        </div>
                      </div>

                      {/* User Info Section */}
                      <div className="flex-1 text-center md:text-left">
                        <div className="mb-4">
                          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                            {userDto?.username}
                          </h1>
                          <p className="text-purple-200 text-lg">
                            Aktif Kullanıcı
                          </p>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                              <Star className="w-4 h-4 text-white" />
                            </div>
                            <div className="text-white font-bold text-lg">{userDto?.userPoint || 0}</div>
                            <div className="text-purple-200 text-xs">Toplam Puan</div>
                          </div>
                          
                          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                              <FileText className="w-4 h-4 text-white" />
                            </div>
                            <div className="text-white font-bold text-lg">{whispers.length}</div>
                            <div className="text-purple-200 text-xs">Paylaşım</div>
                          </div>
                          
                          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                              <TrendingUp className="w-4 h-4 text-white" />
                            </div>
                            <div className="text-white font-bold text-lg">{userDto?.badges?.length || 0}</div>
                            <div className="text-purple-200 text-xs">Rozet</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* User Details Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* User Info Card */}
                <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <h2 className="text-xl font-bold text-gray-800">Kullanıcı Bilgileri</h2>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <User className="w-4 h-4 text-blue-600" />
                          </div>
                          <span className="font-medium text-gray-700">Kullanıcı Adı</span>
                        </div>
                        <span className="font-bold text-gray-900">{userDto?.username}</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                            <Star className="w-4 h-4 text-yellow-600" />
                          </div>
                          <span className="font-medium text-gray-700">Puan</span>
                        </div>
                        <Badge variant="secondary" className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold">
                          {userDto?.userPoint || 0}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                            <Shield className="w-4 h-4 text-purple-600" />
                          </div>
                          <span className="font-medium text-gray-700">Rol</span>
                        </div>
                        <Badge variant="secondary" className="bg-gradient-to-r from-purple-400 to-purple-500 text-white font-bold">
                          {userDto?.authorities}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Badges Card */}
                <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                        <Award className="w-5 h-5 text-white" />
                      </div>
                      <h2 className="text-xl font-bold text-gray-800">Rozetler</h2>
                    </div>
                    
                    {userDto?.badges && userDto.badges.length > 0 ? (
                      <div className="grid grid-cols-2 gap-3">
                        {userDto.badges.map((data, index) => (
                          <div
                            key={"badge:" + index}
                            className="group relative p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg hover:shadow-md transition-all duration-300 transform hover:scale-105"
                          >
                            <div className="flex items-center space-x-3">
                              <Image
                                src={data["badgeURL"]}
                                alt={data["badge"] + " Rozeti"}
                                className="rounded-lg shadow-sm"
                                width={32}
                                height={32}
                                style={{ objectFit: "cover" }}
                                title={data["badge"] + " Rozeti"}
                                priority
                                placeholder="empty"
                              />
                              <div>
                                <p className="font-medium text-sm text-gray-800">{data["badge"]}</p>
                                <p className="text-xs text-gray-500">Rozet</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Award className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-600">Henüz rozet kazanılmamış</p>
                        <p className="text-gray-500 text-sm mt-2">Aktif olun ve rozetler kazanın!</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Paylaşımlar Section */}
              <div className="mb-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                    <FileText className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    Paylaşımları
                  </h2>
                </div>
                
                {whispers.length > 0 ? (
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
                              {/* Gradient Overlay */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            <div className="absolute top-2 right-2">
                              <Badge variant="secondary" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs shadow-lg font-medium">
                                {obj.category}
                              </Badge>
                            </div>
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </div>
                          <CardContent className="p-4 flex flex-col h-full">
                            <div className="space-y-3 flex-1">
                              {/* Fixed Height Title */}
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
                            
                            {/* Bottom Action Bar */}
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
                    <p className="text-gray-600 text-lg">Henüz paylaşım bulunmuyor.</p>
                    <p className="text-gray-500 text-sm mt-2">Bu kullanıcının henüz paylaşımı yok.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="space-y-2 xl:col-span-2 bg-[#F5F5F5] max-xl:bg-white min-h-screen">
            <Categories />
            <RightSidebarTalks />
            <Authors />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
