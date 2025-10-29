import { create,  } from "zustand";

interface StreamState{
    extractedId: string|null;
    createrId:string|null;
    youtubeTitle: string|null;
    youtubeUrl:string|null;
    allStreams:any[],
    currentIndex:number
    setExtractedId:(id:string)=>void;
    setCreaterId:(id:string)=>void;
    setYoutubeTitle:(title:string)=>void;
    setYoutubeUrl:(url:string)=>void;
    setAllstream:(stream:[])=>void;
    setCurrentIndex:(index:number)=>void
     playNext:()=>void
}

export const useStreamStore=create<StreamState>((set,get)=>({
    extractedId:null,
    createrId:null,
    youtubeTitle:null,
    youtubeUrl:null,
    allStreams:[],
    currentIndex:0,
    setExtractedId: (id) => set({ extractedId: id }),
    setCreaterId:(id)=>set({createrId:id}),
    setYoutubeTitle: (title) => set({ youtubeTitle: title }),
   setYoutubeUrl:(url)=>set({youtubeUrl:url}),
   setAllstream:(stream)=>set({allStreams:stream}),
   setCurrentIndex:(index)=>set({currentIndex:index}),
  

  playNext:()=>{
    const {allStreams, currentIndex,setExtractedId,setYoutubeTitle,setYoutubeUrl}=get();
    const nextIndex=(currentIndex+1)%allStreams.length;
    const nextItem=allStreams[nextIndex];

    if(nextItem){
      set({currentIndex:nextIndex}),
      setExtractedId(nextItem.extractedId);
      setYoutubeTitle(nextItem.title);
      setYoutubeUrl(nextItem.url)
    }
  }

}))