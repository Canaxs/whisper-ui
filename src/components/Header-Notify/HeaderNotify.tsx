import React from "react";
import { getUserNotifications, readUpdate } from "@/api/apiCalls";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react";
  import { IoIosNotifications } from "react-icons/io";
  import Cookies from 'js-cookie'
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
  } from "@/components/ui/dialog"


export type NotificationDTO = {
    notificationList: [],
    unReadNotify: number
}

export function HeaderNotify() {

    const [notificationDTO, setNotificationDTO] = useState<NotificationDTO>();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectNotification , setSelectNotification] = useState("");

    useEffect(() => {
        getNotifications();
    },[])

    function getNotifications() {
        getUserNotifications(Cookies.get("token")).then((res) => {
            setNotificationDTO(res.data)
        })
    }

    function menuItemText(text,actionInfo) {
        const smallText = text.substring(0,10);
        return smallText + "... " +actionInfo;
    } 

    function selectNotify(data) {
        setSelectNotification(data['text']+" "+data['actionInfo']);
        setIsDialogOpen(true);
        readUpdate(data['id'],Cookies.get("token")).then((res) => {
        })
    }


    return (
        <div className="flex mr-5 max-sm:hidden">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                        <div className="cursor-pointer relative">
                            {notificationDTO?.unReadNotify != 0 &&
                            <div className="absolute flex items-center drop-shadow-lg shadow-gray-400 justify-center bottom-5 right-0 p-2 w-3 h-3 bg-blue-500 text-white rounded-xl">
                                <span className="text-xs">{notificationDTO?.unReadNotify}</span>
                            </div>
                            }
                            <IoIosNotifications className="size-7 mr-2 text-gray-400 hover:text-gray-700 transition-all"/>
                        </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80">
                    <DropdownMenuLabel>Bildirimler</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        {notificationDTO?.notificationList.map((data,index) => (
                            <React.Fragment key={"notify"+index}>
                                <DropdownMenuItem className={data['isRead'] ? "cursor-pointer hover:drop-shadow transition-all" : "cursor-pointer hover:drop-shadow transition-all bg-gray-200"} onClick={() => selectNotify(data)}>{menuItemText(data['text'],data['actionInfo'])}</DropdownMenuItem>
                                <DropdownMenuSeparator />
                            </React.Fragment>
                        ))}
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
                    <DialogTitle className="mt-5">Bildirim Ekranı</DialogTitle>
                    <DialogDescription>
                      <div>
                        <div className="mt-2">
                          <span className="drop-shadow">{selectNotification}</span>
                        </div>
                      </div>
                    </DialogDescription>
                    <DialogFooter>
                </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}