"use client";
import { use, useEffect, useState } from "react";
import { Trash2, Heart } from "lucide-react";
import { deleteStream } from "../actions/deletestream";
import { useStreamStore } from "../store/create";

import axios from "axios";
import { tr } from "zod/locales";
import { addToMyPlaylist } from "../actions/addtomyplaylist";

enum StreamType {
  spotify,
  youtube,
}

export function GetStream({
  stream,
  variant='normal'
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
  variant:"normal"|"shared"
  
}) {
  const allStream = use(stream);
  const {setExtractedId,setYoutubeTitle,setYoutubeUrl,setAllstream, setCurrentIndex,currentIndex, setCreaterId}=useStreamStore();
  const[likedItem,setLikedItem]=useState<{[id:string]:boolean}>({})
  
  const toggleLike=(id:string)=>{
    setLikedItem((prev)=>({
      ...prev,
      [id]:!prev[id]
    }))
  }

  useEffect(()=>{
    if(allStream.length){
      //@ts-ignore
      setAllstream(allStream)
    }
  },[allStream,setAllstream])

  const handleClick=async ({item,index}:{
    item:(typeof allStream)[0],
    index:number
  })=>{
         setExtractedId(item.extractedID);
         
          setYoutubeTitle(item.title);
         setYoutubeUrl(item.url);
         setCurrentIndex(index)
         console.log("index",index)
  }

  return (
    <ul className="space-y-3">
      {allStream.map((item,index) => (
        <li onClick={()=>{handleClick({item,index})}}
          key={item.id}
          className={`flex items-center justify-between gap-3 mt-2 bg-zinc-900 hover:bg-zinc-800 transition rounded-xl p-3 shadow-sm
            ${currentIndex===index&&"border-2 border-white-500"}`}
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
            <button onClick={()=>{toggleLike(item.id)}}
              className="text-gray-400 hover:text-indigo-400 transition p-1 sm:p-2 rounded-lg"
              title="Move up"
            >
             <Heart size={18} className={`${likedItem[item.id]?"text-red-500 fill-red-500":""}`}/>
            </button>

           {variant === "normal" ? (
            <button
              className="text-gray-400 hover:text-red-400 transition p-1 sm:p-2 rounded-lg"
              title="Remove"
              onClick={async () => {
                const res = await deleteStream(item.id);
                alert(res?.message);
              }}
            >
              <Trash2 size={18} />
            </button>
          ) : (
            <button
              className="text-gray-400 hover:text-green-400 transition p-1 sm:p-2 rounded-lg"
              title="Add to my playlist"
              onClick={async () => {
              const res=  await addToMyPlaylist(item)
                alert(res.message);
              }}
            >
              ➕
            </button>
          )}


          </div>
        </li>
      ))}
    </ul>
  );
}
