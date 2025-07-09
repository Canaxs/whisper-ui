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
        <div className="space-y-2 p-4 lg:p-6 max-xl:border max-xl:bg-white max-xl:rounded-lg max-xl:m-5 max-xl:shadow-md bg-[#F5F5F5]">
            <h2 className="text-base lg:text-lg font-semibold mb-4 text-neutral-800">Söyleşiler</h2>
          {disputeData.content.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8">
              <svg className="animate-spin h-8 w-8 text-gray-400 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
              <span className="text-gray-500 text-sm">Yükleniyor...</span>
            </div>
          ) : (
            disputeData.content.map((obj , index) => (
              <a
                key={obj['id']}
                href={`/sohbet/soylesi/${obj['id']}`}
                role="button"
                tabIndex={0}
                className="block outline-none focus:ring-2 focus:ring-blue-200 rounded-xl"
                style={{ textDecoration: 'none' }}
              >
                <div
                  className="bg-gradient-to-br from-white via-gray-50 to-gray-100 border border-gray-200 rounded-xl p-3 shadow-sm hover:shadow-lg hover:scale-[1.03] transition-all cursor-pointer flex items-center group"
                  style={{ position: 'relative', overflow: 'hidden' }}
                >
                  {/* Thumbnail */}
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-gray-200">
                    <img src={obj['whisperImageURL'] || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
                    <div className="absolute top-1 left-1">
                      <span className="bg-gray-300 text-gray-700 text-[10px] px-2 py-0.5 rounded font-semibold tracking-tight">{convertMenusTR(convertMenusEn(obj["whisperCategory"]) || "")}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="ml-3 flex-1 min-w-0">
                    <div className="flex items-center space-x-1 mb-1">
                      <img src={"https://github.com/shadcn.png"} alt="" className="w-4 h-4 rounded-full border border-gray-300" />
                      <span className="font-semibold text-gray-800 text-xs truncate">{obj['whisperAuthorName']}</span>
                      <span className="text-gray-400 text-xs">·</span>
                      <span className="text-gray-500 text-xs">{giveTheDate(obj['createdDate'])}</span>
                    </div>
                    <h3 className="text-xs font-medium text-gray-900 truncate">{obj['description']}</h3>
                  </div>

                  {/* Arrow */}
                  <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2 group-hover:text-gray-700 transition-colors" />
                </div>
              </a>
            ))
          )}
        </div>
    )
}