"use client"

import { useEffect, useState } from "react"
import { useStreamStore } from "../store/create"
import { Play } from "lucide-react"


export function RoomMessage() {
  const [roomMessage, setRoomMessage] = useState<string[]>([])
  const wss = useStreamStore((s) => s.wss)
  const {setExtractedId,setYoutubeTitle,setYoutubeUrl,setCurrentIndex}=useStreamStore()

  useEffect(() => {
    if (!wss) return

   const handleMessage = (event: MessageEvent) => {
  const parsed = JSON.parse(event.data)
  setRoomMessage((prev) => [...prev, parsed])
}


    wss.onmessage = handleMessage

    return () => {
      // cleanup (important!)
      wss.onmessage = null
    }
  }, [wss])
console.log("the room data is ")

  if (roomMessage.length > 0) {
   roomMessage.forEach(e=>{
    console.log(e.payload.title)
   })
  
}

const handleClick = async ({
    item,
    index,
  }: {
    item: (typeof roomMessage);
    index: number;
  }) => {
    setExtractedId(item.payload.extractedID);
    setYoutubeTitle(item.payload.title);
    setYoutubeUrl(item.payload.url);
    setCurrentIndex(index);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <ul className="space-y-4">
        {roomMessage.map((item, index) => {
          const isActive = index;
          return (
            <li
              key={index}
              onClick={() =>handleClick({item, index})}
              className={`group relative flex items-center justify-between gap-4 p-3 rounded-2xl transition-all duration-300 cursor-pointer border
              ${isActive
                  ? "bg-indigo-900/20 border-indigo-500/50 shadow-[0_0_20px_rgba(99,102,241,0.15)]"
                  : "bg-zinc-900/40 border-zinc-800 hover:bg-zinc-800/60 hover:border-zinc-700"
                }
            `}
            >
              {/* Active Indicator */}
              {isActive && (
                <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-12 bg-indigo-500 rounded-r-full shadow-[0_0_10px_#6366f1]" />
              )}

              {/* Left: Thumbnail + Info */}
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden shadow-lg flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={item.payload.thumbnails}
                    alt={item.payload.title}
                    className={`h-full w-full object-cover ${isActive ? "opacity-100" : "opacity-80 group-hover:opacity-100"}`}
                  />
                  {/* Play Overlay on Hover/Active */}
                  <div className={`absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[1px] transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                    {isActive ? <div className="w-2 h-2 md:w-3 md:h-3 bg-indigo-400 rounded-full animate-ping" /> : <Play size={20} className="text-white fill-white" />}
                  </div>
                </div>

                <div className="flex flex-col gap-1 min-w-0">
                  <h3 className={`font-semibold text-base truncate pr-4 ${isActive ? "text-indigo-200" : "text-zinc-200 group-hover:text-white"}`}>
                    {item.payload.title}
                  </h3>
                  
                </div>
              </div>

              {/* Right: Actions */}
             
            </li>
          )
        })}
      </ul>
    </div>
  );
}


