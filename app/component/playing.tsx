"use client";

import { useEffect, useState } from "react";
import { useStreamStore } from "../store/create";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import { SkipForward, Music, Disc } from "lucide-react";

export function NowPlaying() {
  const { extractedId, youtubeTitle, playNext } = useStreamStore();

  if (!extractedId) {
    return (
      <div className="mt-6 bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-4 backdrop-blur-sm shadow-lg min-h-[300px]">
        <div className="p-4 bg-zinc-800/50 rounded-full animate-pulse">
          <Disc className="w-12 h-12 text-zinc-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-zinc-300">No Song Playing</h3>
          <p className="text-zinc-500 text-sm">Select a song from the list to start listening.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 flex flex-col gap-4">
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
        <div className="aspect-video w-full">
          <LiteYouTubeEmbed
            id={extractedId}
            title={youtubeTitle || "Now Playing"}
            wrapperClass="yt-lite"
            playerClass="play-btn"
          />
        </div>

        <div className="p-4 flex items-center justify-between bg-zinc-950/50 backdrop-blur-md border-t border-zinc-800">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="p-2 bg-indigo-500/20 rounded-lg">
              <Music className="w-5 h-5 text-indigo-400 animate-pulse" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs text-indigo-400 font-medium uppercase tracking-wider">Now Playing</span>
              <h3 className="text-sm font-semibold text-white truncate">{youtubeTitle || "Unknown Track"}</h3>
            </div>
          </div>

          <button
            onClick={playNext}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg font-medium transition-all text-sm border border-zinc-700 hover:border-zinc-600 whitespace-nowrap"
          >
            <SkipForward className="w-4 h-4" />
            Next
          </button>
        </div>
      </div>
    </div>
  );
}