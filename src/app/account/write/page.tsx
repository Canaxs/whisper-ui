"use client";
import { getSubscribe } from "@/api/apiCalls";
import HeaderTop from "@/components/Header-Top/Header-Top";
import WriteContent from "@/components/Write-Content/WriteContent";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import MainLayout from "@/components/v2/MainLayout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Eye, FileText, Sparkles, TrendingUp, Users } from "lucide-react";

export type Subscription = {
  createdBy: string;
  createdDate: string;
  updatedBy: string;
  updatedDate: string;
  planName: string;
  writeLimit: number;
  earning: boolean;
  exclusive: boolean;
  id: number;
};

export default function Write() {
  const [subsInfo, setSubsInfo] = useState<Subscription>();

  useEffect(() => {
    getSubscribeInfo();
  }, []);

  function getSubscribeInfo() {
    getSubscribe(Cookies.get("token")).then((res) => {
      setSubsInfo(res.data);
    });
  }

  return (
    <MainLayout>
      <div className="flex-1">
        <div className="grid grid-cols-1">
          <div>
            <div className="mt-8 lg:ml-[10%] max-lg:m-5">
              {/* Hero Section - Yeni Gönderi Header */}
              <div className="w-full lg:w-4/5 mb-6">
                <Card className="relative overflow-hidden rounded-xl shadow-lg border-0 bg-gradient-to-r from-gray-700 to-gray-800">
                  <CardContent className="p-4 md:p-6">
                    {/* Mobile Layout */}
                    <div className="block md:hidden">
                      <div className="text-center mb-4">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-3">
                          <FileText className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-xl font-bold text-white mb-2">
                          Yeni Gönderi Oluştur
                        </h1>
                        <p className="text-sm text-gray-300 mb-3">
                          Haberlerinizi paylaşın ve okuyucularınıza ulaşın
                        </p>
                        <div className="flex items-center justify-center space-x-3 text-gray-400 text-xs">
                          <div className="flex items-center space-x-1 bg-white/10 backdrop-blur-sm px-2 py-1 rounded-full">
                            <Calendar className="w-3 h-3" />
                            <span>Bugün</span>
                          </div>
                          <div className="flex items-center space-x-1 bg-white/10 backdrop-blur-sm px-2 py-1 rounded-full">
                            <Eye className="w-3 h-3" />
                            <span>Taslak</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden md:flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                            <FileText className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h1 className="text-2xl font-bold text-white mb-1">
                              Yeni Gönderi Oluştur
                            </h1>
                            <p className="text-gray-300 text-sm">
                              Haberlerinizi paylaşın ve okuyucularınıza ulaşın
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 text-gray-400 text-sm">
                          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
                            <Calendar className="w-4 h-4" />
                            <span>Bugün</span>
                          </div>
                          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
                            <Eye className="w-4 h-4" />
                            <span>Taslak</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Stats Cards */}
                      <div className="hidden lg:flex items-center space-x-3">
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                          <div className="w-6 h-6 bg-green-500/20 rounded-md flex items-center justify-center mx-auto mb-1">
                            <TrendingUp className="w-3 h-3 text-green-400" />
                          </div>
                          <div className="text-white font-bold text-sm">{subsInfo?.writeLimit || 0}</div>
                          <div className="text-gray-400 text-xs">Kalan Hakkınız</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                          <div className="w-6 h-6 bg-blue-500/20 rounded-md flex items-center justify-center mx-auto mb-1">
                            <Users className="w-3 h-3 text-blue-400" />
                          </div>
                          <div className="text-white font-bold text-sm">∞</div>
                          <div className="text-gray-400 text-xs">Potansiyel Okuyucu</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {subsInfo?.writeLimit != 0 ? (
                <div className="w-full lg:w-4/5">
                  <WriteContent />
                </div>
              ) : (
                <div className="w-full mt-6 h-[400px]">
                  <Card className="h-full bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
                    <CardContent className="flex flex-col justify-center items-center h-full gap-4 p-6">
                      <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="40"
                          height="40"
                          viewBox="0 0 100 100"
                          className="text-red-500"
                        >
                          <path d="M 25.261719 16.996094 A 1.0001 1.0001 0 0 0 24.568359 17.289062 L 17.296875 24.560547 A 1.0001 1.0001 0 0 0 17.294922 25.974609 L 41.3125 50 L 17.292969 74.019531 A 1.0001 1.0001 0 0 0 17.292969 75.433594 L 24.566406 82.708984 A 1.0001 1.0001 0 0 0 25.980469 82.708984 L 50 58.689453 L 74.015625 82.710938 A 1.0001 1.0001 0 0 0 75.429688 82.710938 L 82.703125 75.439453 A 1.0001 1.0001 0 0 0 82.703125 74.025391 L 58.6875 50.001953 L 82.707031 25.982422 A 1.0001 1.0001 0 0 0 82.707031 24.568359 L 75.433594 17.292969 A 1.0001 1.0001 0 0 0 74.019531 17.292969 L 50 41.3125 L 25.982422 17.289062 A 1.0001 1.0001 0 0 0 25.261719 16.996094 z M 25.275391 19.410156 L 49.292969 43.433594 A 1.0001 1.0001 0 0 0 50.707031 43.433594 L 74.726562 19.416016 L 80.585938 25.275391 L 56.566406 49.294922 A 1.0001 1.0001 0 0 0 56.566406 50.708984 L 80.582031 74.732422 L 74.722656 80.587891 L 50.707031 56.568359 A 1.0001 1.0001 0 0 0 49.292969 56.568359 L 25.273438 80.585938 L 19.414062 74.726562 L 43.433594 50.707031 A 1.0001 1.0001 0 0 0 43.433594 49.292969 L 19.417969 25.267578 L 25.275391 19.410156 z M 25.494141 24.994141 A 0.50005 0.50005 0 0 0 25.146484 25.853516 L 26.146484 26.853516 A 0.50005 0.50005 0 1 0 26.853516 26.146484 L 25.853516 25.146484 A 0.50005 0.50005 0 0 0 25.494141 24.994141 z M 74.490234 24.996094 A 0.50005 0.50005 0 0 0 74.146484 25.146484 L 73.146484 26.146484 A 0.50005 0.50005 0 1 0 73.853516 26.853516 L 74.853516 25.853516 A 0.50005 0.50005 0 0 0 74.490234 24.996094 z M 28.494141 27.994141 A 0.50005 0.50005 0 0 0 28.146484 28.853516 L 30.146484 30.853516 A 0.50005 0.50005 0 1 0 30.853516 30.146484 L 28.853516 28.146484 A 0.50005 0.50005 0 0 0 28.494141 27.994141 z M 71.490234 27.996094 A 0.50005 0.50005 0 0 0 71.146484 28.146484 L 50 49.292969 L 32.853516 32.146484 A 0.50005 0.50005 0 0 0 32.494141 31.994141 A 0.50005 0.50005 0 0 0 32.146484 32.853516 L 49.292969 50 L 28.146484 71.146484 A 0.50005 0.50005 0 1 0 28.853516 71.853516 L 50 50.707031 L 67.146484 67.853516 A 0.50005 0.50005 0 1 0 67.853516 67.146484 L 50.707031 50 L 71.853516 28.853516 A 0.50005 0.50005 0 0 0 71.490234 27.996094 z M 69.494141 68.994141 A 0.50005 0.50005 0 0 0 69.146484 69.853516 L 71.146484 71.853516 A 0.50005 0.50005 0 1 0 71.853516 71.146484 L 69.853516 69.146484 A 0.50005 0.50005 0 0 0 69.494141 68.994141 z M 73.494141 72.994141 A 0.50005 0.50005 0 0 0 73.146484 73.853516 L 74.146484 74.853516 A 0.50005 0.50005 0 1 0 74.853516 74.146484 L 73.853516 73.146484 A 0.50005 0.50005 0 0 0 73.494141 72.994141 z M 26.490234 72.996094 A 0.50005 0.50005 0 0 0 26.146484 73.146484 L 25.146484 74.146484 A 0.50005 0.50005 0 1 0 25.853516 74.853516 L 26.853516 73.853516 A 0.50005 0.50005 0 0 0 26.490234 72.996094 z"></path>
                        </svg>
                      </div>
                      <div className="text-center space-y-2">
                        <h2 className="text-xl font-bold text-red-700">
                          Paylaşım Limitiniz Dolmuştur
                        </h2>
                        <p className="text-red-600 text-sm max-w-md">
                          Daha fazla içerik paylaşmak için paketinizi yükseltmeniz gerekmektedir.
                        </p>
                        <Button 
                          className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-medium px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                        >
                          <Sparkles className="w-4 h-4 mr-2" />
                          Paketinizi Yükseltin
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
