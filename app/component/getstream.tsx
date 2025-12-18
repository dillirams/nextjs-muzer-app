"use client";
import { use, useEffect, useState } from "react";
import { Trash2, Heart, Plus, Play, Pause } from "lucide-react";
import { deleteStream } from "../actions/deletestream";
import { useStreamStore } from "../store/create";
import { addToMyPlaylist } from "../actions/addtomyplaylist";

enum StreamType {
  spotify,
  youtube,
}

export function GetStream({
  stream,
  variant = "normal",
}: {
  stream: Promise<
    {
      id: string;
      url: string;
      active: boolean;
      extractedID: string;
      title: string;
      type: StreamType;
      thumbnails: string;
      userId: string;
    }[]
  >;
  variant: "normal" | "shared";
}) {
  const allStream = use(stream);
  const {
    setExtractedId,
    setYoutubeTitle,
    setYoutubeUrl,
    setAllstream,
    setCurrentIndex,
    currentIndex,
  } = useStreamStore();
  const [likedItem, setLikedItem] = useState<{ [id: string]: boolean }>({});

  const toggleLike = (id: string) => {
    setLikedItem((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    if (allStream.length) {
      //@ts-ignore
      setAllstream(allStream);
    }
  }, [allStream, setAllstream]);

  const handleClick = async ({
    item,
    index,
  }: {
    item: (typeof allStream)[0];
    index: number;
  }) => {
    setExtractedId(item.extractedID);
    setYoutubeTitle(item.title);
    setYoutubeUrl(item.url);
    setCurrentIndex(index);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <ul className="space-y-4">
        {allStream.map((item, index) => {
          const isActive = currentIndex === index;
          return (
            <li
              key={item.id}
              onClick={() => handleClick({ item, index })}
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
                    src={item.thumbnails}
                    alt={item.title}
                    className={`h-full w-full object-cover ${isActive ? "opacity-100" : "opacity-80 group-hover:opacity-100"}`}
                  />
                  {/* Play Overlay on Hover/Active */}
                  <div className={`absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[1px] transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                    {isActive ? <div className="w-2 h-2 md:w-3 md:h-3 bg-indigo-400 rounded-full animate-ping" /> : <Play size={20} className="text-white fill-white" />}
                  </div>
                </div>

                <div className="flex flex-col gap-1 min-w-0">
                  <h3 className={`font-semibold text-base truncate pr-4 ${isActive ? "text-indigo-200" : "text-zinc-200 group-hover:text-white"}`}>
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider">
                    {item.type === StreamType.youtube ? "YouTube" : "Spotify"}
                  </p>
                </div>
              </div>

              {/* Right: Actions */}
              <div className="flex items-center gap-2 pr-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(item.id);
                  }}
                  className={`p-2 rounded-full transition-all duration-200 hover:bg-zinc-700/50
                    ${likedItem[item.id] ? "text-pink-500 scale-110" : "text-zinc-500 hover:text-pink-400"}
                `}
                  title="Like"
                >
                  <Heart size={20} className={likedItem[item.id] ? "fill-current" : ""} />
                </button>

                {variant === "normal" ? (
                  <button
                    onClick={async (e) => {
                      e.stopPropagation();
                      const res = await deleteStream(item.id);
                      // Ideally use a toast here instead of alert
                      if (res?.message) alert(res.message);
                    }}
                    className="p-2 rounded-full text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
                    title="Remove"
                  >
                    <Trash2 size={20} />
                  </button>
                ) : (
                  <button
                    onClick={async (e) => {
                      e.stopPropagation();
                      const res = await addToMyPlaylist(item);
                      if (res.message) alert(res.message);
                    }}
                    className="p-2 rounded-full text-zinc-500 hover:text-indigo-400 hover:bg-indigo-500/10 transition-all duration-200"
                    title="Add to playlist"
                  >
                    <Plus size={20} />
                  </button>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  );
}
