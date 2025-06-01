import { getAllDispute, getDisputeRightSidebar } from "@/api/apiCalls";
import { convertDateMonth } from "@/lib/dateEnum";
import { convertMenusEn, convertMenusTR } from "@/lib/menuEnum";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function RightSidebarTalks() {

    const [page, setPage] = useState(1); 

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

        async function getDisputeData() {
            await getDisputeRightSidebar(page-1).then((res) => {
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

    useEffect(() => {
        getDisputeData();
    }, [])

    return (
        <div className="space-y-2 p-4 lg:p-6 max-xl:border max-xl:bg-white max-xl:rounded-lg max-xl:m-5 max-xl:shadow-md">
            <h2 className="text-base lg:text-lg font-semibold mb-4 text-neutral-800">Söyleşiler</h2>
          {disputeData.content.map((obj , index) => (
            <div
              key={obj['id']}
              className="bg-white rounded-lg p-2 shadow-[2px_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[4px_4px_12px_rgba(0,0,0,0.1)] transition-shadow cursor-pointer flex items-center"
            >
              {/* Thumbnail */}
              <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                <img src={obj['whisperImageURL'] || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
                <div className="absolute top-1 left-1">
                  <span className="bg-red-600 text-white text-[10px] px-1 py-0.5 rounded">{convertMenusTR(convertMenusEn(obj["whisperCategory"]) || "")}</span>
                </div>
              </div>

              {/* Content */}
              <div className="ml-3 flex-1 min-w-0">
                <div className="flex items-center space-x-1 mb-1">
                  <img src={"https://github.com/shadcn.png"} alt="" className="w-4 h-4 rounded-full" />
                  <span className="font-medium text-gray-900 text-xs truncate">{obj['whisperAuthorName']}</span>
                  <span className="text-gray-500 text-xs">·</span>
                  <span className="text-gray-500 text-xs">{giveTheDate(obj['createdDate'])}</span>
                </div>
                <h3 className="text-xs font-medium text-gray-900 truncate">{obj['description']}</h3>
              </div>

              {/* Arrow */}
              <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" />
            </div>
          ))}
        </div>
    )
}