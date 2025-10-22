"use client";
import { use } from "react";
import { Trash2, ArrowUp } from "lucide-react";
import { deleteStream } from "../actions/deletestream";
import { useStreamStore } from "../store/create";

enum StreamType {
  spotify,
  youtube,
}

export function GetStream({
  stream,
}: {
  stream: Promise<{
    id: string;
    url: string;
    active: boolean;
    extractedID: string;
    title: string;
    type: StreamType;
    thumbnails: string;
    userId: string;
  }[]>;
}) {
  const allStream = use(stream);
  const {setExtractedId,setYoutubeTitle}=useStreamStore();

  return (
    <ul className="space-y-3">
      {allStream.map((item) => (
        <li onClick={()=>{
          setExtractedId(item.extractedID);
          setYoutubeTitle(item.title)
        }}
          key={item.id}
          className="flex items-center justify-between gap-3 bg-zinc-900 hover:bg-zinc-800 transition rounded-xl p-3 shadow-sm"
        >
          {/* Left: Thumbnail + Title */}
          <div className="flex items-center gap-3 w-[70%] sm:w-[75%] md:w-[80%] overflow-hidden">
            <div className="min-w-[48px] min-h-[48px] w-12 h-12 bg-zinc-800 rounded-md flex-shrink-0 overflow-hidden">
              <img
                src={item.thumbnails}
                alt={item.title}
                className="h-full w-full object-cover"
              />
            </div>

            <p className="font-medium text-sm sm:text-base truncate text-gray-200">
              {item.title}
            </p>
          </div>

          {/* Right: Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              className="text-gray-400 hover:text-indigo-400 transition p-1 sm:p-2 rounded-lg"
              title="Move up"
            >
              <ArrowUp size={18} />
            </button>

            <button
              className="text-gray-400 hover:text-red-400 transition p-1 sm:p-2 rounded-lg"
              title="Remove" onClick={async()=>{
               const res= await deleteStream(item.id);
               alert(res?.message)
              }}
            >
              <Trash2 size={18} />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
