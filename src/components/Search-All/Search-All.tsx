"use client";

import { getWhispersFilter } from "@/api/apiCalls";
import FooterArea from "@/components/Footer-Area/FooterArea";
import Header from "@/components/Header/Header";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import SearchCompo from "@/components/Search-Comp/Search-Compo";
import MainLayout from "../v2/MainLayout/MainLayout";
import Categories from "../v2/Categories/Categories";
import RightSidebarTalks from "../v2/RightSidebarTalks/RightSidebarTalks";
import Authors from "../v2/Authors/Authors";

export default function SearchAll() {
  const [filterData, setFilterData] = useState({
    content: [],
    last: false,
    empty: false,
    first: false,
    number: 0,
    numberOfElements: 0,
    pageable: {},
    size: 0,
    sort: {},
    totalElements: 0,
    totalPages: 0,
  });

  const [notData, setNotData] = useState(false);

  const searchParams = useSearchParams();

  useEffect(() => {
    getFilterData();
  }, [searchParams]);

  async function getFilterData() {
    let page = 0;
    const whisperFilter = {
      title: searchParams.get("t"),
    };
    await getWhispersFilter(whisperFilter, page).then(
      (res) => {
        setFilterData(res.data);
        if (res.data["content"].length === 0) {
          setNotData(true);
        }
      },
      (exception) => {
        setNotData(true);
      }
    );
  }

  return (
    <MainLayout>
      <div className="flex-1">
        <div className="grid grid-cols-1 xl:grid-cols-10">
          <div className="xl:col-span-8">
            <div className="mt-5 mb-2 flex justify-center w-full">
              <h3 className="text-3xl font-bold text-neutral-600 drop-shadow-md backdrop-blur-sm px-4 py-2 w-fit ml-[1%] mb-6 max-sm:ml-[2%]">
                Aranan Kelime: {searchParams.get("t")}
              </h3>
            </div>
            <SearchCompo
              p={searchParams.get("p")}
              t={searchParams.get("t")}
              notData={notData}
              filterData={filterData}
              {...filterData}
            />
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
