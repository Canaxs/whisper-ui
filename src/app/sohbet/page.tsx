
"use client";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { Label } from "@radix-ui/react-label";
import { PiPencilSimpleLine } from "react-icons/pi";
import ChatCard from "@/components/Chat-Card/Chat-Card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react";
import Cookies from 'js-cookie'
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input";
import { createDispute, getAllDispute, getWhispersFilter } from "@/api/apiCalls";
import { convertMenusEn } from "@/lib/menuEnum";
import { Textarea } from "@/components/ui/textarea";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
import { convertDateMonth } from "@/lib/dateEnum";

export default function AllChat() {

    const [dialogOpen , setDialogOpen] = useState(false);

    const [filterText , setFilterText] = useState("");

    const [selectNew , setSelectNew] = useState(false);

    const [isToken , setIsToken] = useState(false);

    const [inputTagValue, setInputTagValue] = useState("");

    const [tags , setTags] = useState([] as string[]);

    const [notNew , setNotNew] = useState(false);

    const [description , setDescription] = useState("");

    const [page, setPage] = useState(1); 

    const [selectWhisper , setSelectWhisper] = useState({
        id: "",
        title: "",
        img: "",
        category: "",
        source: ""
    });
    
    const [filterData , setFilterData] = useState({
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
        totalPages: 0
    });

    const [disputeData , setDisputeData] = useState({
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
        totalPages: 0
    });

    const { toast } = useToast();

    useEffect(() => {
        if(Cookies.get("token")) {
            setIsToken(true);
        }
        getDisputeData();
    }, [])

    useEffect(() => {
        getDisputeData();
    }, [page])

    function dialogControl() {
        if(Cookies.get("token")) {
            setDialogOpen(true);
        }
        else {
            setDialogOpen(false);
            toast({
                variant: "destructive",
                title: "Söyleşi yazabilmek için giriş yapmanız gerekiyor",
                description: "Lütfen giriş yaptıktan sonra deneyiniz",
              })
        }
    }

    async function filterSearch() {
        let page = 0;
        const whisperFilter = {
            title : filterText
        }
        if(filterText.trim().length != 0){
            await getWhispersFilter(whisperFilter,page).then((res) => {
                setFilterData(res.data)
                if(res.data['totalElements'] === 0) {
                    setNotNew(true);
                }
                else {
                    setNotNew(false);
                }
            },(exception) => {
                console.log("Error Filter");
            });
        }
    }

    function mouseLeave() {
        if(filterText.trim().length === 0) {
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
                totalPages: 0
            });
            setNotNew(false);
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
            totalPages: 0
        });
        filterSearch();
    },[filterText])

    function whisperClick(obj) {
        toast({
            variant: "success",
            title: "Haber Başarı ile seçildi.",
            description: "Seçilen Haber: "+obj['title']
          })
          setSelectNew(true);
          const selectWhisperConst = {
            id: obj['id'],
            title: obj['title'],
            img: obj['imageURL'],
            category: obj['category'],
            source: obj['source']
          }
          setSelectWhisper(selectWhisperConst);
    }

    function closeButton() {
        setSelectNew(false);
        setDialogOpen(false);
        const clearWhisperConst = {
            id: "",
            title: "",
            img: "",
            category: "",
            source: ""
        }
        setSelectWhisper(clearWhisperConst);
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
            totalPages: 0
        });
        setFilterText("");
        setTags([]);
        setInputTagValue("");
    }

    async function submit() {
        if(description.length >= 3 && selectWhisper.id != ""){
            toast({
                variant: "waiting",
                title: "Söyleşi Oluşturuluyor",
                description: "Bekleyiniz.",
            })
            let OK = false;
            const createDisputeRequest = {
                description : description,
                whisperId: selectWhisper.id,
                tags: tags
            }
            await createDispute(createDisputeRequest , Cookies.get("token")).then((res) => {
                toast({
                    variant: "success",
                    title: "Söyleşi oluşturuldu",
                    description: "Başarıyla kayıt edildi "
                })
                OK = true;
            }, (exception) => {
                toast({
                    variant: "destructive",
                    title: "Söyleşi Oluşturulamadı",
                    description: "Tekrar deneyiniz",
                })
            }).finally(() => {
                closeButton()
                if(OK) {
                    getDisputeData();
                }
            })
        }
        else {
            toast({
                variant: "destructive",
                title: "Lütfen Boş alan bırakmayın",
                description: "Tekrar deneyiniz",
            })
        }
        
    }

    async function getDisputeData() {
        await getAllDispute(page-1).then((res) => {
            setDisputeData(res.data)
        })
    }

    function giveTheDate(date) {
        let dateLet = date.split("-",3);
        const month = convertDateMonth(dateLet[1]);
        const daySplit = dateLet[2].split("T",2);
        let day = daySplit[0];
        const dayControl = day.split("");
        
        if(dayControl[0] === "0") {
            day = dayControl[1];
        }

        return month +" "+day; 
    }

    function onChangeVirgule(value) {
        if(tags.length != 5) {
            if(value.includes(",")) {
                setTags([...tags, value.split(",")[0]]);
                setInputTagValue("");
            }
            else {
                setInputTagValue(value);
            }
        }
        else {
            toast({
                variant: "destructive",
                title: "Daha fazla etiket oluşturamazsın",
                description: "Limit Dolu",
            })
        }
    }

    

    return (
        <div className="w-full relative h-full">
            <div className="absolute max-xl:hidden w-52 border rounded-sm left-10 top-32 pl-5 pr-5 pt-2 shadow-lg">
                <h3 className="text-center">Gündemdekiler</h3>
                <hr className="mb-3 mt-3 text-black drop-shadow-md"/>
                <div className="flex flex-col">
                    { Array.from({ length: 15 }).map((_,index) =>
                        <span key={"array"+index} className="pt-2 cursor-pointer hover:scale-105 transition-all drop-shadow-md"><span className="font-medium text-gray-500 mr-1">#</span>Etiket</span>
                    )}
                </div>
            </div>
            <div className="w-full">
                <a href="/">
                    <MdOutlineKeyboardBackspace className="absolute left-2 top-2 size-10 cursor-pointer hover:scale-125 transition-all max-md:top-5 max-md:size-7 z-50" title="Anasayfa'ya Git" />
                </a>
                <div className="w-3/4 ml-[12.5%] max-sm:w-[90%] max-sm:ml-[5%] max-sm:top-10 relative top-5">
                    <div className="flex justify-between w-full items-center">
                        <div className="flex items-center">
                        <Dialog open={dialogOpen}>
                            <DialogTrigger asChild>
                                <div className={isToken ? "flex items-center hover:shadow-gray-200 hover:bg-gray-100 hover:shadow-xl transition-all cursor-pointer border border-gray-200 shadow-md p-2 rounded" : "flex items-center opacity-30 cursor-no-drop transition-all border border-gray-200 shadow-md p-2 rounded"} onClick={() => dialogControl()}>
                                    <PiPencilSimpleLine className={isToken ? "mr-1 size-7 max-sm:size-5 hover:text-black transition-all cursor-pointer" : "cursor-no-drop mr-1 size-7 max-sm:size-5"}/>
                                    <Label className={isToken ? "text-base max-sm:text-sm drop-shadow-xl cursor-pointer" : "text-base max-sm:text-sm drop-shadow-xl cursor-no-drop"}>Yaz</Label>
                                </div>
                            </DialogTrigger>
                            <DialogContent className={Cookies.get("token") ? "sm:max-w-[425px]" : "hidden"}>
                                <DialogHeader>
                                    <DialogTitle>Söyleşi Oluştur</DialogTitle>
                                    <DialogDescription>
                                        Sadece 5 adet etiket oluşturabilirsiniz.
                                    </DialogDescription>
                                </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                    <div className="grid gap-4">
                                    <Label>Söylenti Haber</Label>
                                    <Input type="text" id="search" placeholder="Haber Seç..." className={!selectNew ? "rounded-lg border shadow-md md:min-w-[80%] h-10 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-white" : "hidden"}
                                        onChange={(e) => setFilterText(e.target.value.toString())}
                                        /> 
                                        <div className={selectNew ? "hidden" : ""}>
                                            <div id="filterData" className={filterData.content.length != 0 ? "max-h-[300px] w-[88%] absolute top-[165px] rounded-b-lg z-40 bg-white shadow-xl overflow-y-scroll" : "w-[88%] h-auto absolute top-[165px] rounded-b-lg z-40 "} 
                                                onMouseLeave={() => mouseLeave()}>
                                                { filterData.totalElements > 0 ?
                                                filterData.content.map((obj, index) => 
                                                        <div className="h-10 w-full flex cursor-pointer shadow-md mt-2 items-center p-2 rounded-b-lg" key={"filter"+index} onClick={() => whisperClick(obj)}>
                                                            <div className="w-[20%]">
                                                                <img src={obj["imageURL"]} alt="Söylenti" className="w-[50px] h-[35px] max-sm:w-[30px] max-sm:h-[25px] " title="Söylenti"/>
                                                            </div>
                                                            <div className="ml-[1%] w-[75%]">
                                                                <span className="line-clamp-1 text-[10px] font-medium text-gray-700">{obj['category']}</span>
                                                                <span className="line-clamp-1 text-sm font-medium text-gray-800">{obj['title']}</span>
                                                            </div>
                                                        </div>
                                                )
                                                : 
                                                notNew ? 
                                                <div className="h-[50px] shadow-md rounded-b-lg flex justify-center items-center z-30">
                                                    <span className="text-center p-5 text-black">Haber Bulunamadı</span>
                                                </div>
                                                :
                                                <div>
                                                </div>
                                                }
                                            </div>
                                        </div>
                                        <div className={selectNew ? "" : "hidden"}>
                                            <div className="h-10 w-full flex cursor-pointer shadow-md shadow-gray-400 border border-gray-200 mt-2 items-center p-2 rounded-lg">
                                                <div className="w-[20%]">
                                                    <img src={selectWhisper.img} alt="Söylenti" className="w-[50px] h-[35px] max-sm:w-[30px] max-sm:h-[25px] " title="Söylenti"/>
                                                </div>
                                                <div className="ml-[1%] w-[75%]">
                                                    <span className="line-clamp-1 text-[10px] font-medium text-gray-700">{selectWhisper.category}</span>
                                                    <span className="line-clamp-1 text-sm font-medium text-gray-800">{selectWhisper.title}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid items-center gap-4">
                                        <Label>Yorum</Label>
                                        <Textarea className="focus-visible:ring-0 focus-visible:ring-offset-0"
                                            placeholder="Yorum Yaz"
                                          onChange={(e) => setDescription(e.target.value.toString())}>
                                        </Textarea>
                                    </div>
                                    <div className="grid items-center gap-1">
                                        <Label>Etiket</Label>
                                        <span className="text-xs text-gray-400 mb-2">(Kelimeleri girdikten sonra virgül ( , ) koymanız gerekiyor )</span>
                                        <Input type="text" className="focus-visible:ring-0 focus-visible:ring-offset-0"
                                        placeholder="Etiket Oluştur"
                                        value={inputTagValue}
                                        onChange={(e) => onChangeVirgule(e.target.value)}
                                        />
                                        <div className="mt-2 p-0">
                                            <span>Etiketler : </span>
                                            {tags.map((tag,index) => 
                                                <span className="bg-gray-100 text-gray-400 p-1 shadow-md shadow-gray-400 mr-1 rounded-md" key={"tagspan"+index}>{tag}</span>
                                            )}
                                        </div>
                                    </div>
                                    </div>
                                <DialogFooter>
                                <Button type="submit" onClick={() => submit()}>Gönder</Button>
                                <Button type="reset" className="bg-red-500 hover:bg-red-300" onClick={() => closeButton()}>İptal</Button>
                                </DialogFooter>
                            </DialogContent>
                            </Dialog>
                        </div>
                        <h1 className="drop-shadow-md text-black text-3xl m-5 max-md:text-xl max-sm:text-lg text-center">Söyleşi Alanı</h1>
                        <div className="">
                            <a href="/"><img src="../../logo-black.png" width={50} height={50} className="cursor-pointer hover:-rotate-6 transition-all" /></a>
                        </div>
                    </div>
                    {disputeData.content.length === 0 ? 
                    <div role="status" className="mr-10 flex justify-center h-[500px] items-center">
                        <svg aria-hidden="true" className="w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                    :
                    <div className="mt-14 ml-[20%] w-3/5 max-xl:w-full max-xl:ml-0">
                        {disputeData.content.map((obj , index) => 
                            <div key={"chat"+index}>
                                <ChatCard obj={obj} date={giveTheDate(obj['createdDate'])}/>
                            </div>
                        )}
                    </div>
                    }
                    <div className="mt-5">
                    <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    {page <= 1 ? <PaginationPrevious className="opacity-20 cursor-no-drop"/>
                                    : <PaginationPrevious onClick={() => setPage(page-1)} />
                                    }
                                </PaginationItem>
                                <PaginationItem>
                                        <PaginationLink className={(page-1) > 0 ? "" : "hidden"}>{page-1}</PaginationLink>
                                        <PaginationLink isActive>{page}</PaginationLink>
                                        <PaginationLink className={disputeData.totalPages > page ? "" : "hidden"}>{page+1}</PaginationLink>
                                    </PaginationItem>
                                <PaginationItem>
                                    {page >= 1  && disputeData.totalPages > page ? <PaginationNext onClick={() => setPage(page+1)}/> 
                                    : <PaginationNext className="opacity-20 cursor-no-drop" /> 
                                    }
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </div>
            </div>
        </div>
    )
}