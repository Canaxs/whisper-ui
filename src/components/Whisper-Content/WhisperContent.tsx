import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SlLike, SlDislike } from "react-icons/sl";
import HovCard from "../Hov-Card/HovCard";
import { GrResources } from "react-icons/gr";
import { TbWriting } from "react-icons/tb";
import AbsoluteAdversiting from "../Advertising-Space/AbsoluteAdversiting";
import WhisperComment from "../Whisper-Comment/WhisperComment";
import { useEffect, useState } from "react";
import {
  controlDisLike,
  controlLike,
  dislikeWhisper,
  getUserBadges,
  likeWhisper,
  unDislikeWhisper,
  unLikeWhisper,
} from "@/api/apiCalls";
import Cookies from "js-cookie";
import { useToast } from "@/components/ui/use-toast";
import { TbCategory } from "react-icons/tb";
import { convertDateMonth } from "@/lib/dateEnum";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Calendar, Clock, Share2, Bookmark } from "lucide-react";

export type BadgeEntity = {
  id: number;
  badge: string;
  badgeURL: string;
  badgeType: string;
};

// Gradient renk kombinasyonları
const gradientColors = [
  "from-blue-50 to-purple-50",
  "from-green-50 to-teal-50", 
  "from-pink-50 to-rose-50",
  "from-yellow-50 to-orange-50",
  "from-indigo-50 to-blue-50",
  "from-emerald-50 to-cyan-50"
];

export default function WhisperContent(props) {
  const { toast } = useToast();

  const [likeExists, setLikeExists] = useState(false);
  const [dislikeExists, setDisLikeExists] = useState(false);
  const [badges, setBadges] = useState<BadgeEntity[]>([]);
  const [selectedGradient, setSelectedGradient] = useState("from-blue-50 to-purple-50");

  useEffect(() => {
    if (Cookies.get("username") != null) {
      controlLiked();
      controlDisliked();
    }
    getBadgesFunc();
    
    // Rastgele gradient seçimi
    const randomGradient = gradientColors[Math.floor(Math.random() * gradientColors.length)];
    setSelectedGradient(randomGradient);
  }, []);

  async function controlLiked() {
    await controlLike(props.whisper.whisperLike.id, Cookies.get("token")).then(
      (res) => {
        setLikeExists(res.data);
      }
    );
  }

  async function controlDisliked() {
    await controlDisLike(
      props.whisper.whisperLike.id,
      Cookies.get("token")
    ).then((res) => {
      setDisLikeExists(res.data);
    });
  }

  async function like() {
    if (!dislikeExists) {
      if (Cookies.get("username") != null) {
        await likeWhisper(
          props.whisper.whisperLike.id,
          Cookies.get("token")
        ).then(
          (res) => {
            setLikeExists(true);
            props.whisper.whisperLike.numberLike++;
            toast({
              variant: "success",
              title: "Bu Gönderiyi Beğendiniz",
              description: ":)",
            });
          },
          (exception) => {
            setLikeExists(false);
          }
        );
      } else {
        toast({
          variant: "destructive",
          title: "Bu gönderiyi beğenemezsiniz.",
          description: "Gönderiyi beğenmeniz için giriş yapmanız gerekiyor.",
        });
      }
    } else {
      toast({
        variant: "destructive",
        title: "Bu gönderiyi beğenemezsiniz",
        description:
          "Gönderiyi beğenmeniz için dislike işleminizi geri almanız gerekiyor.",
      });
    }
  }

  async function dislike() {
    if (!likeExists) {
      if (Cookies.get("username") != null) {
        await dislikeWhisper(
          props.whisper.whisperLike.id,
          Cookies.get("token")
        ).then(
          (res) => {
            setDisLikeExists(true);
            props.whisper.whisperLike.numberDislike++;
            toast({
              variant: "destructive",
              title: "Bu Gönderiyi Beğenmediniz",
              description: ":(",
            });
          },
          (exception) => {
            setDisLikeExists(false);
          }
        );
      } else {
        toast({
          variant: "destructive",
          title: "Bu gönderiyi beğenemezsiniz.",
          description: "Gönderiyi beğenmemeniz için giriş yapmanız gerekiyor.",
        });
      }
    } else {
      toast({
        variant: "destructive",
        title: "Bu gönderiyi beğenemezsiniz",
        description:
          "Gönderiyi beğenmeniz için beğeni işleminizi geri almanız gerekiyor.",
      });
    }
  }

  async function unlike() {
    if (Cookies.get("username") != null) {
      await unLikeWhisper(
        props.whisper.whisperLike.id,
        Cookies.get("token")
      ).then(
        (res) => {
          setLikeExists(false);
          props.whisper.whisperLike.numberLike--;
          toast({
            variant: "success",
            title: "Beğeni geri alındı.",
            description: ":(",
          });
        },
        (exception) => {
          setLikeExists(true);
        }
      );
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Beğeni geri alınırken Sorun Oluştu",
      });
    }
  }

  async function unDislike() {
    if (Cookies.get("username") != null) {
      await unDislikeWhisper(
        props.whisper.whisperLike.id,
        Cookies.get("token")
      ).then(
        (res) => {
          setDisLikeExists(false);
          props.whisper.whisperLike.numberDislike--;
          toast({
            variant: "success",
            title: "Dislike geri alındı",
            description: ":)",
          });
        },
        (exception) => {
          setDisLikeExists(true);
        }
      );
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Dislike geri alınırken sorun oluştu.",
      });
    }
  }

  function giveTheDate(date) {
    let dateLet = date.split("-", 3);
    const month = convertDateMonth(dateLet[1]);
    const daySplit = dateLet[2].split("T", 2);
    let day = daySplit[0];
    const dayControl = day.split("");

    if (dayControl[0] === "0") {
      day = dayControl[1];
    }

    return month + " " + day;
  }

  function giveTheClock(date) {
    let dateLet = date.split("T", 2);
    let time = dateLet[1].split(":", 2);
    return time[0] + ":" + time[1];
  }

  function getBadgesFunc() {
    getUserBadges(props.whisper.authorName).then(
      (res) => {
        setBadges(res.data);
      },
      (exception) => {}
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-20 py-8">
      {/* Author Card */}
      <Card className={`mb-8 bg-gradient-to-r ${selectedGradient} border-0 shadow-lg`}>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <Avatar className="w-16 h-16 border-4 border-white shadow-lg">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold">
                {props.whisper.authorName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <a 
                  href={`/user/${props.whisper.authorName}`}
                  className="text-xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 hover:scale-105 transition-all duration-300 cursor-pointer drop-shadow-sm hover:drop-shadow-lg relative group"
                >
                  {props.whisper.authorName}
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></div>
                </a>
                <div className="flex space-x-1">
                  {badges?.map((data, index) => (
                    <div key={"badge:" + index} className="relative group">
                      <Image
                        src={data.badgeURL}
                        alt={data.badge + " Rozeti"}
                        className="w-6 h-6 hover:scale-125 transition-all duration-200 rounded-full border-2 border-white shadow-sm"
                        width={24}
                        height={24}
                        style={{ objectFit: "cover" }}
                        title={data.badge + " Rozeti"}
                        priority
                      />
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                        {data.badge}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{giveTheDate(props.whisper.createdDate)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{giveTheClock(props.whisper.createdDate)}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Title Section */}
      <div className="mb-8">
        <Badge variant="secondary" className="mb-4 bg-orange-100 text-orange-700 hover:bg-orange-200">
          <TbCategory className="w-4 h-4 mr-1" />
          {props.categoryName}
        </Badge>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
          {props.whisper.title}
        </h1>
      </div>

      {/* Hero Image */}
      <div className="relative mb-8 rounded-2xl overflow-hidden shadow-2xl">
        <div className="relative w-full h-64 sm:h-80 lg:h-96">
          <Image
            src={props.whisper.imageURL || "/logo-black.png"}
            alt="Hero Image"
            fill
            className="object-cover"
            priority
            placeholder="empty"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
        </div>
        <div className="absolute top-4 right-4 flex space-x-2">
          <Button variant="secondary" size="sm" className="bg-white/90 hover:bg-white">
            <Share2 className="w-4 h-4 mr-1" />
            Paylaş
          </Button>
          <Button variant="secondary" size="sm" className="bg-white/90 hover:bg-white">
            <Bookmark className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="prose prose-lg max-w-none mb-8">
        <div
          dangerouslySetInnerHTML={{ __html: props.whisper.description }}
          className="leading-relaxed text-gray-700 text-lg"
        />
      </div>

      {/* Meta Information */}
      <Card className="mb-8 bg-gray-50 border-0">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
              <div className="p-2 bg-blue-100 rounded-lg">
                <TbWriting className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Yazar</p>
                <p className="font-semibold text-gray-900">{props.whisper.authorName}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
              <div className="p-2 bg-green-100 rounded-lg">
                <GrResources className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Kaynak</p>
                <p className="font-semibold text-gray-900">{props.whisper.source}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TbCategory className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Kategori</p>
                <p className="font-semibold text-gray-900">{props.categoryName}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interaction Bar */}
      <Card className="mb-6 border-0 shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant={likeExists ? "default" : "outline"}
                size="sm"
                onClick={likeExists ? unlike : like}
                disabled={!Cookies.get("username")}
                className={likeExists ? "bg-green-500 hover:bg-green-600" : ""}
              >
                <SlLike className={`w-4 h-4 mr-2 ${likeExists ? "text-white" : ""}`} />
                <span className={likeExists ? "text-white" : ""}>{props.whisper.whisperLike.numberLike}</span>
              </Button>
              <Button
                variant={dislikeExists ? "default" : "outline"}
                size="sm"
                onClick={dislikeExists ? unDislike : dislike}
                disabled={!Cookies.get("username")}
                className={dislikeExists ? "bg-red-500 hover:bg-red-600" : ""}
              >
                <SlDislike className={`w-4 h-4 mr-2 ${dislikeExists ? "text-white" : ""}`} />
                <span className={dislikeExists ? "text-white" : ""}>{props.whisper.whisperLike.numberDislike}</span>
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1 text-sm text-gray-500">
                <Eye className="w-4 h-4" />
                <span>000.000 Görüntülenme</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comments Section */}
      <div className="flex justify-center">
        <WhisperComment
          comment={props.whisper.whisperComment}
          whisperId={props.whisper["id"]}
        />
      </div>
    </div>
  );
}
