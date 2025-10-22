import { create } from "zustand";

interface StreamState{
    extractedId: string|null;
    youtubeTitle: string|null;
    setExtractedId:(id:string)=>void;
    setYoutubeTitle:(title:string)=>void
}

export const useStreamStore=create<StreamState>((set)=>({
    extractedId:null,
    youtubeTitle:null,
    setExtractedId: (id) => set({ extractedId: id }),
  setYoutubeTitle: (title) => set({ youtubeTitle: title })
}))