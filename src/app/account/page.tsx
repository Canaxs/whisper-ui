"use client";
import AccountInfo from "@/components/Account-Info/AccountInfo";
import FooterArea from "@/components/Footer-Area/FooterArea";
import Header from "@/components/Header/Header";
import MainLayout from "@/components/v2/MainLayout/MainLayout";
import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Info() {
  return (
    <MainLayout>
      <div className="flex-1">
        <div className="grid grid-cols-1">
          <div>
            <div className="mr-2 mb-2 ml-2 mt-12">
              <h3 className="text-3xl font-bold text-neutral-600 drop-shadow-md backdrop-blur-sm px-4 py-2 w-fit ml-[1%] mb-6 max-sm:ml-[2%]">
                Hesap Paneli
              </h3>
              <AccountInfo />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
