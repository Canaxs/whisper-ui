"use client";
import AccountInfo from "@/components/Account-Info/AccountInfo";
import FooterArea from "@/components/Footer-Area/FooterArea";
import Header from "@/components/Header/Header";
import MainLayout from "@/components/v2/MainLayout/MainLayout";
import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent } from "@/components/ui/card";
import { User, Settings } from "lucide-react";

export default function Info() {
  return (
    <MainLayout>
      <div className="flex-1">
        <div className="grid grid-cols-1">
          <div>
            <div className="m-10">
              {/* Hero Section - Hesap Paneli Header */}
              <div className="w-full lg:w-4/5 mb-6">
                <Card className="relative overflow-hidden rounded-xl shadow-lg border-0 bg-gradient-to-r from-blue-600 to-indigo-700">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h1 className="text-2xl font-bold text-white mb-1">
                          Hesap Paneli
                        </h1>
                        <p className="text-blue-100 text-sm">
                          Hesap bilgilerinizi görüntüleyin ve yönetin
                        </p>
                      </div>
                      <div className="ml-auto">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                          <Settings className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <AccountInfo />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
