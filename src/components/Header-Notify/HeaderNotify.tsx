import React from "react";
import { getUserNotifications, readUpdate } from "@/api/apiCalls";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuPortal,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { IoIosNotifications } from "react-icons/io";
import { Bell, MessageCircle, Heart, Star, AlertCircle, CheckCircle, Clock } from "lucide-react";
import Cookies from "js-cookie";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export type NotificationDTO = {
  notificationList: [];
  unReadNotify: number;
};

export function HeaderNotify() {
  const [notificationDTO, setNotificationDTO] = useState<NotificationDTO>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectNotification, setSelectNotification] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getNotifications();
  }, []);

  function getNotifications() {
    getUserNotifications(Cookies.get("token")).then((res) => {
      setNotificationDTO(res.data);
    });
  }

  function menuItemText(text, actionInfo) {
    const smallText = text.substring(0, 10);
    return smallText + "... " + actionInfo;
  }

  function selectNotify(data) {
    setSelectNotification(data["text"] + " " + data["actionInfo"]);
    setIsDialogOpen(true);
    readUpdate(data["id"], Cookies.get("token")).then((res) => {});
  }

  function getNotificationIcon(type) {
    switch(type) {
      case 'like':
        return <Heart className="w-4 h-4 text-red-500" />;
      case 'comment':
        return <MessageCircle className="w-4 h-4 text-blue-500" />;
      case 'follow':
        return <Star className="w-4 h-4 text-yellow-500" />;
      case 'alert':
        return <AlertCircle className="w-4 h-4 text-orange-500" />;
      default:
        return <Bell className="w-3 h-3 text-gray-500" />;
    }
  }

  function getTimeAgo(timestamp: string | Date) {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return "Az önce";
    if (diffInMinutes < 60) return `${diffInMinutes} dk önce`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} saat önce`;
    return `${Math.floor(diffInMinutes / 1440)} gün önce`;
  }

  return (
    <div className="flex mr-5 max-sm:hidden">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="sm" 
            className="relative p-2 hover:bg-gray-100 rounded-full transition-all duration-200 group"
          >
            <IoIosNotifications className="size-6 text-gray-600 group-hover:text-gray-800 transition-colors" />
            
            {/* Animated Notification Badge */}
            {notificationDTO?.unReadNotify > 0 && (
              <div className="absolute -top-1 -right-1">
                <Badge 
                  variant="destructive" 
                  className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs font-bold animate-pulse"
                >
                  {notificationDTO.unReadNotify > 99 ? '99+' : notificationDTO.unReadNotify}
                </Badge>
              </div>
            )}
            
            {/* Pulse Animation for Unread Notifications */}
            {notificationDTO?.unReadNotify > 0 && (
              <div className="absolute inset-0 rounded-full bg-red-500/20 animate-ping"></div>
            )}
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent className="w-96 max-h-[500px] overflow-y-auto" align="end">
          <DropdownMenuLabel className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="font-semibold text-gray-900">Bildirimler</span>
            </div>
            {notificationDTO?.unReadNotify > 0 && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                {notificationDTO.unReadNotify} yeni
              </Badge>
            )}
          </DropdownMenuLabel>
          
          <DropdownMenuGroup className="p-2">
            {notificationDTO?.notificationList?.length > 0 ? (
              notificationDTO.notificationList.map((data, index) => (
                <DropdownMenuItem
                  key={"notify" + index}
                  className={`p-3 rounded-lg cursor-pointer transition-all duration-200 m-2 ${
                    data["isRead"] 
                      ? "hover:bg-gray-50" 
                      : "bg-blue-50 hover:bg-blue-100 border-l-4 border-blue-500"
                  }`}
                  onClick={() => selectNotify(data)}
                >
                  <div className="flex items-start space-x-3 w-full">
                    <div className="flex-shrink-0 mt-1">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs">
                          {data["text"]?.charAt(0) || "N"}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        {getNotificationIcon(data["type"] || "default")}
                        <p className={`text-sm font-medium ${
                          data["isRead"] ? "text-gray-700" : "text-gray-900"
                        }`}>
                          {menuItemText(data["text"], data["actionInfo"])}
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-500">
                          {getTimeAgo(data["createdDate"] || new Date())}
                        </span>
                        
                        {!data["isRead"] && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        )}
                      </div>
                    </div>
                  </div>
                </DropdownMenuItem>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                <Bell className="w-12 h-12 text-gray-300 mb-2" />
                <p className="text-sm font-medium">Henüz bildiriminiz yok</p>
                <p className="text-xs">Yeni aktiviteler olduğunda burada görünecek</p>
              </div>
            )}
          </DropdownMenuGroup>
          
          {notificationDTO?.notificationList?.length > 0 && (
            <div className="p-3 border-t">
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                onClick={() => {
                  // Mark all as read functionality
                  setIsOpen(false);
                }}
              >
                Tümünü okundu olarak işaretle
              </Button>
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogTitle className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-blue-600" />
            <span>Bildirim Detayı</span>
          </DialogTitle>
          <DialogDescription className="mt-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700 leading-relaxed">{selectNotification}</p>
            </div>
          </DialogDescription>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDialogOpen(false)}
            >
              Kapat
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
