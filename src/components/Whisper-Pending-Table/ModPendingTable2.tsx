import { deleteUser, getUsers, updateRole } from "@/api/apiCalls";
import { useEffect, useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
  } from "@/components/ui/dialog"

  import { Button } from "@/components/ui/button"
  import { Input } from "@/components/ui/input"
import { current } from "@reduxjs/toolkit";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import Cookies from 'js-cookie';
  import { useToast } from "@/components/ui/use-toast"


export type User = {
    username: string
    userPoint: string
    authorities: string[],
    password: string,
    id: number
}

export const variablePageNumber = [0,2];

export function ModPendingTable2() {

    const [currentPage , setCurrentPage] = useState<number[]>(variablePageNumber);
    const [filterCurrentPage , setFilterCurrentPage] = useState<number[]>([0,2]);
    const [data , setData] = useState<User[]>([]);
    const [dataBackup , setDataBackup] = useState<User[]>([]);
    const [selectData, setSelectData] = useState<User[]>([]);
    const [bool , setBool] = useState(false);
    const [columns , setColumns] = useState([
        {
            accessorKey: "",
            header: "",
        },
        {
            accessorKey: "id",
            header: "Id",
        },
        {
            accessorKey: "username",
            header: "Kullanıcı Adı",
        },
        {
            accessorKey: "role",
            header: "Yetki Tipi",
        },
        {
            accessorKey: "userPoint",
            header: "Puan",
        }
    ]);
    const [selectUser, setSelectUser] = useState({ id: 0 , username: "" , userPoint: "" , password: "" , authorities: [""]})
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const { toast } = useToast();

    useEffect(() => {
        uploadData();
    },[])

    async function uploadData() {
        await getUsers(Cookies.get("token")).then((res) => {
            setData(res.data);
            setDataBackup(res.data);
            setSelectData(res.data.slice(currentPage[0],currentPage[1]));
        }).finally(() => {
            setBool(true);
        })
    }

    function openPopup(popupData) {
        setSelectUser(popupData);
        setIsDialogOpen(true);
    }

    function rejectWhisper() {
        const dataFilter = data.filter((res) => res.id != selectUser.id);
        setData(dataFilter);
        setDataBackup(dataFilter);
        try {
            deleteUser(selectUser.id,Cookies.get("token"));
        }
        catch(e) {
            console.log("Error: "+e);
        }
    }

    function filterWhisper(str) {
        if(str === "") {
            setData(dataBackup);
            setSelectData(dataBackup.slice(variablePageNumber[0],variablePageNumber[1]));
        }
        else {
            const currentPageVariable = [filterCurrentPage[0] , filterCurrentPage[1]];
            setData(data.filter((res) =>  res.username.toLowerCase().includes(str.toLowerCase())));
            setSelectData(data.slice(currentPageVariable[0],currentPageVariable[1]));
        }
        
    }

    function nextData() {
        const pageVariable = currentPage[1] - currentPage[0];
        const currentPageVariable = [currentPage[0]+pageVariable , currentPage[1]+pageVariable];
        setCurrentPage(currentPageVariable);
        setSelectData(data.slice(currentPageVariable[0],currentPageVariable[1]));
    }

    function backData() {
        const pageVariable = currentPage[1] - currentPage[0];
        const currentPageVariable = [currentPage[0]-pageVariable , currentPage[1]-pageVariable];
        setCurrentPage(currentPageVariable);
        setSelectData(data.slice(currentPageVariable[0],currentPageVariable[1]));
    }

    async function updateRoles(roleStr) {
        const updateDTO = {
            role : roleStr,
            userId: selectUser.id
        } 
        await updateRole(updateDTO , Cookies.get("token")).then((res) => {
            toast({
                variant: "success",
                title: "Yetkilendirme Başarıyla Sonuçlandırıldı",
                description: "İşlem Başarılı",
              })
        },(exception) => {
            toast({
                variant: "destructive",
                title: "Yetkilendirme Yapılırken Hata oluştu",
                description: "Tekrar Deneyiniz.",
              })
        })
    }


    return (
        <div> 
            <h1 className="font-medium drop-shadow-sm">Tüm Yetkililer</h1>
            <h6 className="text-gray-600 text-xs mt-2">Görüntülemek İstediğiniz kullanıcının üzerine çift tıklayın</h6>
            <div className="mt-5">
            <Input placeholder="Başlık Filtrele..." className="max-w-sm" onChange={(e) => filterWhisper(e.target.value)}/>
            </div>
            {bool ? 
            <div className="w-full h-full border shadow-lg mt-5">
                <div className="flex justify-between border-b-1">
                    {columns.map((obj,index) => (
                        <span className={obj.header != "" ? "p-3 w-[22%] text-center" : "p-3 w-[12%] flex justify-center"} key={"index"+index}>
                        {obj.header != "" ? obj.header : <Checkbox /> }
                        </span>
                    )
                    )}
                </div>
                <div>
                    {selectData.map((obj,index) => (
                        <div key={"indexe"+index}>
                            <div className="flex justify-between cursor-pointer hover:bg-gray-300 transition-all shadow-md" onDoubleClick={() => openPopup(obj)}>
                                <div className="w-[12%] flex justify-center items-center">
                                    <Checkbox />
                                </div>
                                <span className="p-3 w-[22%] text-center">{obj.id}</span>
                                <span className="p-3 w-[22%] text-center">{obj.username}</span>
                                <span className="p-3 w-[22%] text-center">{obj.authorities[obj.authorities.length-1]}</span>
                                <span className="p-3 w-[22%] truncate text-center">{obj.userPoint}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            
            : 
                <div role="status" className="mt-10 flex justify-center items-center">
                    <svg aria-hidden="true" className="w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
             }
            <div className="flex justify-between mt-3">
                <div>
                    <span className="text-sm">{data.length} Kayıt Bulundu.</span>
                </div>
                <div>
                    <Button variant="outline" className={currentPage[0] === 0 ? "opacity-75 cursor-no-drop hover:bg-white text-sm mr-3" : "bg-gray-800 text-sm text-white mr-3"} onClick={currentPage[0] === 0 ? () => null : () => backData()}>Geri</Button>
                    <Button variant="outline" className={currentPage[1] >= data.length ? "opacity-75 cursor-no-drop text-sm hover:bg-white" : "bg-gray-800 text-sm text-white"} onClick={currentPage[1] >= data.length ? () => null : () => nextData()}>İleri</Button>
                </div>
            </div>
             <div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
                    <DialogTitle className="mt-5">Kullanıcı Bilgileri</DialogTitle>
                    <DialogDescription>
                      <div>
                        <div>
                            <span>Id:</span> {selectUser.id}
                        </div>
                        <div className="mt-2">
                            <span>Kullanıcı Adı :</span> {selectUser.username}
                        </div>
                        <div className="mt-2">
                          <span>Puan :</span> {selectUser.userPoint}
                        </div>
                      </div>
                    </DialogDescription>
                    <DialogFooter>
                      <div>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="outline" className="mr-2 bg-green-500 hover:bg-white  border hover:text-green-500 transition-all text-white">Yetki Düzenle</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                <AlertDialogTitle>Yetkilendirme Ekranı</AlertDialogTitle>
                                <AlertDialogDescription>
                                Bu Ekrandan Yetki Düzenleyebilirsiniz.
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Vazgeç</AlertDialogCancel>
                                    <AlertDialogAction className={selectUser.authorities.includes("ROLE_MOD") ? "text-white bg-red-600 hover:bg-white hover:text-rd-600 transition-all text-xs" : "hidden"} onClick={() => updateRoles("USER")}>Kullanıcı Yetkisine Düşür</AlertDialogAction>
                                    <AlertDialogAction className={selectUser.authorities.includes("ROLE_ADMIN") ? "text-white bg-red-600 hover:bg-white hover:text-red-600 transition-all text-xs mt-3" : "hidden"} onClick={() => updateRoles("MOD")}>Moderatör Yetkisine Düşür</AlertDialogAction>
                                    <AlertDialogAction className={selectUser.authorities.includes("ROLE_ADMIN") ? "hidden": "text-white bg-green-600 hover:bg-white hover:text-green-600 transition-all"} onClick={() => updateRoles("ADMIN")}>Admin&apos;e Yükselt</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>

                        <Button className=" bg-red-500 hover:bg-white border hover:text-red-500 transition-all" onClick={() => rejectWhisper()}>Sil</Button>
                      </div>
                </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>    
        </div>
    )
}