"use client"

import { useEffect, useState } from "react";
import { useStreamStore } from "../store/create"
import LiteYouTubeEmbed from 'react-lite-youtube-embed';

import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
import axios from "axios";



export  function NowPlaying(){
  const [stream, setStream]=useState()
    const {extractedId, youtubeTitle, youtubeUrl,playNext}=useStreamStore();
    console.log(extractedId)
    console.log("the url is ")
    console.log(youtubeUrl)


    
    return (
         <div className="border-t border-zinc-800 mt-6 pt-4 ">
        <h2 className="text-lg font-semibold mb-2">Now Playing</h2>
        <div className="bg-zinc-900 rounded-lg p-4 text-center text-gray-400 boundary">
           <LiteYouTubeEmbed 
        id={`${extractedId}`}
        title={`${youtubeTitle}`}
     />{/*</div><iframe className="w-full h-full"
             src={`https://www.youtube.com/embed/${extractedId}?autoplay=1`} allow="autoplay">
             </iframe>*/}
        </div>
        <div>
          {youtubeUrl && <audio controls className="w-full mt-2">
            <source
              src={youtubeUrl}
              type="audio/webm"
            />
            Your browser does not support audio.
          </audio> }
          
        </div>
        <button onClick={playNext} className="mt-3 w-full bg-purple-600 hover:bg-purple-700 text-white rounded-lg py-2 font-medium transition">
          Play Next
        </button>
      </div>
    )
}