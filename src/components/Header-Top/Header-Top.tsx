import { Button } from "../ui/button";
import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import { HeaderUser } from "../Header-User/Header-User";
import { Label } from "@radix-ui/react-label";
import { TfiWrite } from "react-icons/tfi";
import { IoIosNotifications } from "react-icons/io";
import { HeaderNotify } from "../Header-Notify/HeaderNotify";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";
import { getWhispersFilter, isExpiredToken } from "@/api/apiCalls";
import { IoMdLogIn } from "react-icons/io";
import { RiUserAddFill } from "react-icons/ri";
import { BiSolidLogInCircle } from "react-icons/bi";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Input } from "../ui/input";
import { convertMenus, convertMenusEn } from "@/lib/menuEnum";
import { useToast } from "@/components/ui/use-toast";
import { IoIosArrowForward } from "react-icons/io";
import Image from "next/image";

export default function HeaderTop() {
  const [userData, setUserData] = useState({
    username: null,
    userPoint: null,
    role: null,
  });
  const [isUser, setIsUser] = useState(false);

  const { toast } = useToast();

  const [filterText, setFilterText] = useState("");

  const [notNew, setNotNew] = useState(false);

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

  const [filterOnEnter, setFilterOnEnter] = useState(false);

  const router = useRouter();

  async function uploadInformation() {
    if (Cookies.get("username") != null) {
      await setUserData({
        username: Cookies.get("username"),
        userPoint: Cookies.get("userPoint"),
        role: Cookies.get("role"),
      });
    }
  }

  async function controlInformation() {
    if (Cookies.get("token") != null) {
      const expireRequest = {
        authorization: Cookies.get("token"),
      };
      await isExpiredToken(expireRequest).then((res) => {
        if (res.data) {
          Cookies.remove("token");
          Cookies.remove("username");
          Cookies.remove("userPoint");
          Cookies.remove("role");
        } else {
          uploadInformation();
        }
      });
    }
    setIsUser(true);
  }

  async function filterSearch() {
    let page = 0;
    const whisperFilter = {
      title: filterText,
    };
    if (filterText.trim().length != 0) {
      await getWhispersFilter(whisperFilter, page).then(
        (res) => {
          setFilterData(res.data);
          if (res.data["totalElements"] === 0) {
            setNotNew(true);
          } else {
            setNotNew(false);
          }
        },
        (exception) => {
          console.log("Error Filter");
        }
      );
    }
  }

  useEffect(() => {
    setFilterData({
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
    filterSearch();
  }, [filterText]);

  useEffect(() => {
    controlInformation();
  }, []);

  function mouseLeave() {
    if (filterText.trim().length === 0) {
      setFilterData({
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
      setNotNew(false);
    }
  }

  function enterKey(e) {
    if (e.key === "Enter") {
      if (filterText.trim().length != 0) {
        toast({
          variant: "success",
          title: "Arama Sayfasına Yönlendiriliyorsunuz.",
          description: "Aranan Kelime: " + filterText.trim(),
        });
        //window.location.href = '/search?t='+filterText.trim();
        router.push("/search?t=" + filterText.trim());
      } else {
        toast({
          variant: "destructive",
          title: "Boş olarak arama yapamazsınız",
          description: "Lütfen arama kutusunu doldurun.",
        });
      }
    }
  }

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex max-lg:ml-3 relative">
          <a
            href="/"
            className="cursor-pointer mt-1 hover:-rotate-6 transition-all relative"
          >
            <Image src="/logo-black.png" alt="Söylenti" fill title="Söylenti" />
          </a>
          <div className="h-1/2 mt-[8%] w-[1px] bg-slate-300 ml-5 relative"></div>
          <div className="ml-2 mb-1 w-[100px] h-[90px]  max-sm:w-[80px] max-sm:h-[75px]">
            <Image
              src="/siyah-flag.png"
              fill
              alt="Türk Bayrağı"
              title="Türk Bayrağı"
            />
          </div>
        </div>
        <div className="items-center flex max-md:hidden">
          <div className="flex flex-col">
            <Input
              type="text"
              id="search"
              placeholder="&#128270; Haber Ara..."
              className="rounded-lg border shadow-md md:min-w-[450px] h-10 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-white"
              onChange={(e) => setFilterText(e.target.value.toString())}
              onKeyDown={(e) => enterKey(e)}
            />
            <div
              id="filterData"
              className={
                filterData.content.length != 0
                  ? "max-h-[300px] w-[450px] absolute top-[90px] rounded-b-lg z-40 bg-white shadow-xl overflow-y-scroll"
                  : "w-[450px] h-auto absolute top-[90px] rounded-b-lg z-40 "
              }
              onMouseLeave={() => mouseLeave()}
            >
              {filterData.totalElements > 0 ? (
                filterData.content.map((obj, index) => (
                  <a
                    href={
                      "kategori/" +
                      convertMenusEn(obj["category"]) +
                      "/" +
                      obj["urlName"]
                    }
                    key={"filterData" + index}
                  >
                    <div className="h-10 w-full flex cursor-pointer shadow-md mt-2 items-center p-2 rounded-b-lg">
                      <div className="w-[20%] relative">
                        <div className="w-[50px] h-[35px] max-sm:w-[30px] max-sm:h-[25px] ">
                          <Image
                            src="/logo-black.png"
                            fill
                            alt="Söylenti"
                            title="Söylenti"
                          />
                        </div>
                      </div>
                      <div className="ml-[1%] w-[75%]">
                        <span className="line-clamp-1 text-[10px] font-medium text-gray-700">
                          {obj["category"]}
                        </span>
                        <span className="line-clamp-1 text-sm font-medium text-gray-800">
                          {obj["title"]}
                        </span>
                      </div>
                    </div>
                  </a>
                ))
              ) : notNew ? (
                <div className="h-[50px] shadow-md rounded-b-lg flex justify-center items-center z-30">
                  <span className="text-center p-5 text-black">
                    Haber Bulunamadı
                  </span>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center max-md:mr-[1%]">
          {isUser === false ? (
            <div role="status" className="mr-10">
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600"
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
          ) : userData.username != null ? (
            <React.Fragment>
              <div className="flex mr-5 cursor-pointer text-gray-700 transition-all hover:scale-110">
                <a href="/account/write" className="flex max-sm:hidden">
                  <TfiWrite className="mr-2 size-5 hover:text-black transition-all" />
                  <Label className="cursor-pointer text-sm drop-shadow-xl">
                    Yaz
                  </Label>
                </a>
              </div>
              <HeaderNotify />
              <HeaderUser
                username={userData.username}
                userPoint={userData.userPoint}
              />
            </React.Fragment>
          ) : (
            //<a href="/login" className="text-sm text-slate-700 font-medium max-sm:text-[11px] max-sm:mr-2">Giriş Yap / Kayıt Ol</a>
            <a
              href="/login"
              className="flex justify-between items-center text-gray-700 hover:text-gray-950 transition-all hover:scale-105"
            >
              <BiSolidLogInCircle
                className="size-7 m-3 drop-shadow-xl"
                title="Giriş Yap"
              />
              <span
                className="text-2xl drop-shadow-xl"
                title="Giriş Yap / Kayıt Ol"
              >
                {" "}
                /{" "}
              </span>
              <RiUserAddFill
                className="size-7 m-3 drop-shadow-xl"
                title="Kayıt Ol"
              />
            </a>
          )}
        </div>
      </div>
      <div className="flex items-center justify-center mb-5 mt-1 md:hidden">
        <div className="flex flex-col w-3/4">
          <Input
            type="text"
            placeholder="&#128270; Haber Ara..."
            className="rounded-lg border shadow-md w-full h-10 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-white"
            onChange={(e) => setFilterText(e.target.value.toString())}
            onKeyDown={(e) => enterKey(e)}
          />
          <div
            id="filterData"
            className={
              filterData.content.length != 0
                ? "max-h-[300px] w-3/4 absolute top-[170px] max-sm:top-[150px] rounded-b-lg z-40 bg-white shadow-xl overflow-y-scroll"
                : "w-3/4 h-auto absolute max-sm:top-[150px] top-[170px] rounded-b-lg z-40 "
            }
            onMouseLeave={() => mouseLeave()}
          >
            {filterData.totalElements != 0 ? (
              filterData.content.map((obj, index) => (
                <a
                  href={
                    "kategori/" +
                    convertMenusEn(obj["category"]) +
                    "/" +
                    obj["urlName"]
                  }
                  key={"filterData" + index}
                >
                  <div className="h-10 w-full flex cursor-pointer shadow-md mt-2 items-center p-2 rounded-b-lg">
                    <div className="w-[20%] relative">
                      <div className="w-[50px] h-[35px] max-sm:w-[30px] max-sm:h-[25px] ">
                        <Image
                          src="/logo-black.png"
                          fill
                          alt="Söylenti"
                          title="Söylenti"
                        />
                      </div>
                    </div>
                    <div className="ml-[1%] w-[75%]">
                      <span className="line-clamp-1 text-[10px] font-medium text-gray-700">
                        {obj["category"]}
                      </span>
                      <span className="line-clamp-1 text-sm font-medium text-gray-800">
                        {obj["title"]}
                      </span>
                    </div>
                  </div>
                </a>
              ))
            ) : notNew ? (
              <div className="h-[35px] shadow-md rounded-b-lg flex justify-center items-center z-30">
                <span className="text-center text-black">Haber Bulunamadı</span>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
