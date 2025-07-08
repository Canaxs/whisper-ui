"use client";
import FooterArea from "@/components/Footer-Area/FooterArea";
import Header from "@/components/Header/Header";
import HovCard from "@/components/Hov-Card/HovCard";
import WhisperContent from "@/components/Whisper-Content/WhisperContent";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { describe } from "node:test";
import { useEffect, useState } from "react";
import { getWhisper, getPageableWhispers } from "@/api/apiCalls";
import { useRouter, useSearchParams } from "next/navigation";
import { convertMenus, convertMenusTR, MenusTR } from "@/lib/menuEnum";
import { GrResources } from "react-icons/gr";
import { TbWriting } from "react-icons/tb";
import { BiLike, BiDislike } from "react-icons/bi";
import { TbUserStar } from "react-icons/tb";
import Image from "next/image";
import MainLayout from "@/components/v2/MainLayout/MainLayout";
import Categories from "@/components/v2/Categories/Categories";
import RightSidebarTalks from "@/components/v2/RightSidebarTalks/RightSidebarTalks";
import Authors from "@/components/v2/Authors/Authors";
import { Badge } from "@/components/ui/badge";
import { Flame, Users } from "lucide-react";
import {
  Dumbbell,
  Cpu,
  Gavel,
  Banknote,
  Newspaper,
  Globe,
  Camera,
} from "lucide-react";

const menuIcons = [Dumbbell, Cpu, Gavel, Banknote, Newspaper, Globe, Camera];

export default function Docs({
  params,
}: {
  params: {
    slug: string[];
  };
}) {
  const [whisper, setWhisper] = useState({
    authorName: null,
    title: null,
    description: null,
    source: null,
    category: null,
    urlName: null,
    imageURL: null,
    createdDate: null,
    whisperLike: {
      id: null,
      numberLike: null,
      numberDislike: null,
    },
    whisperComment: [],
  });

  const [whispers, setWhispers] = useState({
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

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (params.slug.length === 1) {
      pageSearch();
    } else {
      getWhisper(params.slug[1]).then(
        (res) => {
          if (res.data.category === convertMenusTR(params.slug[0])) {
            setWhisper(res.data);
          } else {
            router.push("/404");
          }
        },
        (exception) => {
          router.push("/404");
        }
      );
    }
  }, []);

  function numberNext() {
    let num = searchParams.get("s");
    if (isNumber(num)) {
      return JSON.parse(num!) + 1;
    }
  }

  function numberBack() {
    let num = searchParams.get("s");
    if (isNumber(num)) {
      return JSON.parse(num!) - 1;
    }
  }

  function numberRet() {
    let num = searchParams.get("s");
    if (isNumber(num)) {
      return JSON.parse(num!);
    }
  }

  function isNumber(value) {
    return !isNaN(value);
  }

  async function pageSearch() {
    if (searchParams.get("s") != null) {
      const searchParamsPage = searchParams.get("s");
      const categoryName = params.slug[0];
      const response = await getPageableWhispers(
        convertMenus(categoryName),
        searchParamsPage
      );
      setWhispers(response.data);
    } else {
      const categoryName = params.slug[0];
      const response = await getPageableWhispers(convertMenus(categoryName), 0);
      setWhispers(response.data);
    }
  }

  if (params.slug.length === 1) {
    const menuOrder = Object.values(MenusTR).filter((v) => v !== "__LENGTH");
    const index = menuOrder.indexOf(params.slug[0]);
    const IconComponent = menuIcons[index] || Camera;
    return (
      <MainLayout>
        <div className="flex-1">
          <div className="grid grid-cols-1 xl:grid-cols-10">
            <div className="xl:col-span-8">
              <div className="mb-6 mt-5 mx-2 sm:mx-5">
                <div className="flex flex-col sm:flex-row items-center justify-between p-3 sm:p-4 hover:shadow-lg hover:bg-gray-50 transition-all bg-white rounded-xl shadow-md border border-gray-100">
                  <div className="flex items-center gap-3 mb-3 sm:mb-0">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div>
                      <h1 className="text-lg sm:text-xl font-bold text-gray-900">
                        {convertMenusTR(params.slug[0])}
                      </h1>
                      <p className="text-xs sm:text-sm text-gray-500">
                        En güncel {convertMenusTR(params.slug[0])} haberleri
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge
                      variant="secondary"
                      className="bg-orange-100 text-orange-700 text-xs"
                    >
                      <Flame className="w-3 h-3 mr-1" />
                      Trend
                    </Badge>
                    <Badge variant="outline" className="text-gray-600 text-xs">
                      <Users className="w-3 h-3 mr-1" />
                      2.4k
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="w-full">
                <div className="mt-10 mx-auto mb-4 max-w-5xl px-2 sm:px-4">
                  {whispers.content?.length != 0 ? (
                    <div className="flex flex-col gap-6">
                      {whispers.content?.map((content, index) => (
                        <a
                          className="page-card"
                          href={
                            "/kategori/" +
                            params.slug[0] +
                            "/" +
                            content["urlName"]
                          }
                          key={index}
                        >
                          <Card className="w-full min-w-[90vw] max-w-2xl mx-auto mb-2 shadow-xl hover:shadow-2xl hover:shadow-black transition-all relative gap-0 py-0 border-0 rounded-2xl overflow-hidden">
                            <div className="circle1 absolute bottom-0 m-auto flex justify-center items-center">
                              <span
                                className="drop-shadow-xl font-medium text-black hidden line-clamp-2 ml-5 mr-5"
                                dangerouslySetInnerHTML={{
                                  __html: content["description"],
                                }}
                              ></span>
                            </div>
                            <CardContent className="p-0">
                              <div className="flex flex-col sm:flex-row w-full h-full">
                                <div className="relative w-full sm:w-2/5 h-48 sm:h-40 flex-shrink-0">
                                  <Image
                                    src={content["imageURL"] || "/logo-black.png"}
                                    alt="Image"
                                    fill
                                    className="rounded-l-2xl object-cover"
                                    style={{ objectFit: "cover" }}
                                  />
                                  <div className="absolute z-10 w-full h-full rounded-l-2xl" style={{ backgroundColor: "rgba(0,0,0,.3)" }}></div>
                                </div>
                                <div className="flex flex-col justify-between p-4 w-full">
                                  <span className="text-orange-500 font-semibold text-xs mb-1">{params.slug[0].toUpperCase()}</span>
                                  <span className="text-lg sm:text-2xl text-gray-900 font-bold line-clamp-2 mb-2">{content["title"]}</span>
                                  <div className="flex flex-col gap-1">
                                    <div className="flex items-center text-gray-700">
                                      <TbWriting className="size-4 mr-2" />
                                      <span className="text-xs font-medium">{content["authorName"]}</span>
                                    </div>
                                    <div className="flex items-center text-gray-500">
                                      <GrResources className="size-4 mr-2" />
                                      <span className="text-xs">{content["source"]}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </a>
                      ))}
                    </div>
                  ) : (
                    <div
                      role="status"
                      className="mr-10 flex justify-center h-[500px] items-center"
                    >
                      <svg
                        aria-hidden="true"
                        className="w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                  )}
                  <div className="mt-10">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          {searchParams.get("s") == null || numberRet() <= 0 ? (
                            <PaginationPrevious className="opacity-20 cursor-no-drop" />
                          ) : (
                            <PaginationPrevious
                              href={
                                "/kategori/" +
                                params.slug[0] +
                                "?s=" +
                                numberBack()
                              }
                            />
                          )}
                        </PaginationItem>
                        <PaginationItem>
                          {searchParams.get("s") == null || numberRet() == 0 ? (
                            ""
                          ) : (
                            <PaginationLink
                              className="cursor-pointer m-1"
                              href={
                                "/kategori/" +
                                params.slug[0] +
                                "?s=" +
                                numberBack()
                              }
                            >
                              {numberRet()}
                            </PaginationLink>
                          )}
                          <PaginationLink isActive>
                            {searchParams.get("s") == null ? 1 : numberNext()}
                          </PaginationLink>
                          {numberRet() < whispers.totalPages - 1 ? (
                            <PaginationLink
                              className="cursor-pointer m-1"
                              href={
                                "/kategori/" +
                                params.slug[0] +
                                "?s=" +
                                numberNext()
                              }
                            >
                              {numberNext() + 1}
                            </PaginationLink>
                          ) : (
                            ""
                          )}
                        </PaginationItem>
                        <PaginationItem>
                          {numberRet() < whispers.totalPages - 1 ? (
                            <PaginationNext
                              href={
                                "/kategori/" +
                                params.slug[0] +
                                "?s=" +
                                numberNext()
                              }
                            />
                          ) : (
                            <PaginationNext className="opacity-20 cursor-no-drop" />
                          )}
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4 xl:space-y-2 xl:col-span-2 max-xl:bg-gray-50 bg-[#F5F5F5] min-h-screen max-xl:rounded-lg max-xl:m-2 max-xl:shadow-md">
              <Categories />
              <RightSidebarTalks />
              <Authors />
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="flex-1">
        <div className="grid grid-cols-1 xl:grid-cols-10">
          <div className="xl:col-span-8">
            {whisper.authorName != null ? (
              <WhisperContent
                whisper={whisper}
                categoryName={convertMenusTR(params.slug[0])}
              />
            ) : (
              <div
                role="status"
                className="mr-10 flex justify-center h-[500px] items-center"
              >
                <svg
                  aria-hidden="true"
                  className="w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            )}
          </div>
          <div className="space-y-4 xl:space-y-2 xl:col-span-2 max-xl:bg-gray-50 bg-[#F5F5F5] min-h-screen max-xl:rounded-lg max-xl:m-2 max-xl:shadow-md">
            <Categories />
            <RightSidebarTalks />
            <Authors />
          </div>
        </div>
      </div>
    </MainLayout>
    /*
    <div>
      <div className="lg:w-[98%] 2xl:w-[65%] pt-1 lg:ml-[1%] 2xl:ml-[17%]">
        <Header />
        {whisper.authorName != null ? (
          <WhisperContent
            whisper={whisper}
            categoryName={convertMenusTR(params.slug[0])}
          />
        ) : (
          <div
            role="status"
            className="mr-10 flex justify-center h-[500px] items-center"
          >
            <svg
              aria-hidden="true"
              className="w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        )}
      </div>
      <FooterArea />
    </div>
    */
  );
}
