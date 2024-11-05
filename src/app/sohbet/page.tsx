
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
            title: "Haber Başarılı ile seçildi.",
            description: "Seçilen Haber: "
          })
          setSelectNew(true);
          const selectWhisperConst = {
            id: obj['id'],
            title: obj['title'],
            img: obj['imageURL'],
            category: obj['category'],
            source: obj['source']
          }
          console.log(selectWhisperConst);
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
    }

    async function submit() {
        let OK = false;
        const createDisputeRequest = {
            description : description,
            whisperId: selectWhisper.id
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

    

    return (
        <div className="w-full relative h-full">
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
                                                                <img src={"logo-black.png"} alt="Söylenti" className="w-[50px] h-[35px] max-sm:w-[30px] max-sm:h-[25px] " title="Söylenti"/>
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
                                        <Textarea onChange={(e) => setDescription(e.target.value.toString())}>
                                        </Textarea>
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
                    <div className="mt-14 ml-[20%] w-3/5 max-xl:w-full max-xl:ml-0">
                        {disputeData.content.map((obj , index) => 
                            <div key={"chat"+index}>
                                <ChatCard obj={obj} date={giveTheDate(obj['createdDate'])}/>
                            </div>
                        )}
                    </div>
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