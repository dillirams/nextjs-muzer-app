"use client"

import { useStreamStore } from "../store/create"
import LiteYouTubeEmbed from 'react-lite-youtube-embed';

import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';



export function NowPlaying(){
    const {extractedId, youtubeTitle}=useStreamStore();
    
    return (
         <div className="border-t border-zinc-800 mt-6 pt-4 ">
        <h2 className="text-lg font-semibold mb-2">Now Playing</h2>
        <div className="bg-zinc-900 rounded-lg p-4 text-center text-gray-400">
           <LiteYouTubeEmbed 
        id={`${extractedId}`}
        title={`${youtubeTitle}`}
    />
        </div>
        <button className="mt-3 w-full bg-purple-600 hover:bg-purple-700 text-white rounded-lg py-2 font-medium transition">
          Play Next
        </button>
      </div>
    )
}