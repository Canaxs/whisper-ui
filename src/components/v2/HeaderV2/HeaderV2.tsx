import { getWhispersFilter, isExpiredToken } from "@/api/apiCalls";
import ToggleMenu from "@/components/ToggleMenu/ToggleMenu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, User } from "lucide-react";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { convertMenusEn, convertMenusTR } from "@/lib/menuEnum";
import Cookies from "js-cookie";
import { TfiWrite } from "react-icons/tfi";
import { Label } from "@/components/ui/label";
import { HeaderNotify } from "@/components/Header-Notify/HeaderNotify";
import { HeaderUser } from "@/components/Header-User/Header-User";
import Link from "next/link";

export default function HeaderV2() {
  const [filterText, setFilterText] = useState("");
  const [filterData, setFilterData] = useState(initialFilterData());
  const [notFound, setNotFound] = useState(false);

  const { toast } = useToast();
  const router = useRouter();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [userData, setUserData] = useState({
    username: null,
    userPoint: null,
    role: null,
  });

  const [isUser, setIsUser] = useState(false);

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
      try {
        const res = await isExpiredToken({
          authorization: Cookies.get("token"),
        });
        if (res.data) {
          Cookies.remove("token");
          Cookies.remove("username");
          Cookies.remove("userPoint");
          Cookies.remove("role");
        } else {
          uploadInformation();
        }
      } catch (error) {
        console.error("Token validation failed:", error);
      }
    }
    setIsUser(true);
  }

  useEffect(() => {
    controlInformation();
  }, []);

  function initialFilterData() {
    return {
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
    };
  }

  const filterSearch = useCallback(async (text: string) => {
    if (text.trim().length === 0) {
      setFilterData(initialFilterData());
      setNotFound(false);
      return;
    }

    try {
      const page = 0;
      const res = await getWhispersFilter({ title: text }, page);
      setFilterData(res.data);
      setNotFound(res.data.totalElements === 0);
    } catch (error) {
      console.error("Filter error:", error);
    }
  }, []);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      filterSearch(filterText);
    }, 400); // debounce süresi
  }, [filterText, filterSearch]);

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const trimmed = filterText.trim();
      if (trimmed.length === 0) {
        toast({
          variant: "destructive",
          title: "Boş arama yapılamaz",
          description: "Lütfen bir kelime giriniz.",
        });
      } else {
        toast({
          variant: "success",
          title: "Arama Sayfasına Yönlendiriliyorsunuz",
          description: `Aranan Kelime: ${trimmed}`,
        });
        router.push(`/search?t=${trimmed}`);
      }
    }
  };

  const handleMouseLeave = () => {
    if (filterText.trim() === "") {
      setFilterData(initialFilterData());
      setNotFound(false);
    }
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="lg:hidden">
            <ToggleMenu />
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Image
                src="/logo-black.png"
                alt="Söylenti"
                width={52}
                height={48}
                className="-rotate-6 hover:rotate-0 transition-all"
                title="Söylenti"
                priority
              />
            </Link>
          </div>

          {/* Search Input */}
          <div className="relative max-lg:hidden w-full lg:max-w-[450px] md:max-w-[300px] sm:max-w-[250px] max-w-[200px] mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Haber ara..."
              className="w-full pl-10 bg-gray-50/50 border-gray-200 focus:bg-white rounded-full"
              onChange={(e) => setFilterText(e.target.value)}
              onKeyDown={handleEnterKey}
            />

            {/* Filter Results Dropdown */}
            {filterText && (
              <div
                onMouseLeave={handleMouseLeave}
                className={`${
                  filterData.content.length > 0 ? "max-h-[300px]" : "h-auto"
                } absolute w-full top-[50px] rounded-b-lg z-40 bg-white shadow-xl overflow-y-auto`}
              >
                {filterData.totalElements > 0 ? (
                  filterData.content.map((item, index) => (
                    <a
                      key={index}
                      href={`kategori/${convertMenusEn(item["category"])}/${
                        item["urlName"]
                      }`}
                      className="block hover:bg-gray-100 p-1 hover:shadow-lg transition-all shadow-md"
                    >
                      <div className="h-10 grid grid-cols-7 items-center gap-1">
                        <div className="col-span-1 h-[35px] relative max-lg:hidden">
                          <Image
                            src={item["imageURL"] || "/logo-black.png"}
                            alt="Söylenti"
                            fill
                            className="object-cover rounded-sm"
                          />
                        </div>
                        <div className="col-span-6">
                          <div className="text-xs text-gray-700">
                            {convertMenusTR(
                              convertMenusEn(item["category"]) || ""
                            )}
                          </div>
                          <div className="text-sm font-medium text-gray-800 line-clamp-1">
                            {item["title"]}
                          </div>
                        </div>
                      </div>
                    </a>
                  ))
                ) : notFound ? (
                  <div className="h-[50px] flex justify-center items-center text-gray-600">
                    Haber Bulunamadı
                  </div>
                ) : null}
              </div>
            )}
          </div>

          {/* Right Buttons */}
          <div className="flex items-center space-x-3">
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
                <Link href="/account/write" className="max-sm:hidden">
                  <Button 
                    className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white font-medium px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <TfiWrite className="mr-2 size-5 group-hover:rotate-12 transition-transform duration-300" />
                    <span className="relative z-10">Yaz</span>
                    <div className="absolute -inset-1 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full blur opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
                  </Button>
                </Link>
                <HeaderNotify />
                <HeaderUser
                  username={userData.username}
                  userPoint={userData.userPoint}
                />
              </React.Fragment>
            ) : (
              <Link href="/login">
                <Button variant="ghost" size="sm" className="text-gray-600">
                  <User className="w-4 h-4" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
