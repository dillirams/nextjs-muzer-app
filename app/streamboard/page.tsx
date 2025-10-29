import { getServerSession } from "next-auth";
import { Addstream } from "../component/addstream";
import prisma from "../lib/db";
import { Suspense } from "react";
import { GetStream } from "../component/getstream";
import { authOptions } from "../lib/auth";
import { Appbar } from "../component/appbar";
import { Share2 } from "lucide-react";
import { SharePopover } from "../component/share";
import { NowPlaying } from "../component/playing";


export default async function StreamBoard({searchParams}:{searchParams:{sharedFrom?:string}}) {
  const session = await getServerSession(authOptions);
  if (!session) throw Error("You are not logged in");

  
    

  
  const myStreams =  prisma.stream.findMany({
    where:{
      email:session.user?.email
    }
  });

  const friendStreams=searchParams.sharedFrom?prisma.stream.findMany({
    where:{userId:searchParams.sharedFrom}
  }):null;


  return (
    
    <div className="bg-zinc-950">
      <Appbar />
      <div className="min-h-screen text-white flex flex-col md:flex-row">
        {/* LEFT: Upcoming Songs (Your Playlist) */}
        <div className={`p-6 border-b md:border-b-0 ${friendStreams ? "md:w-1/2 border-r" : "md:w-2/3"} border-zinc-800`}>
          <div className="flex justify-between items-center md:pr-3">
            <h2 className="text-xl font-semibold mb-4">Your Upcoming Songs</h2>
            <SharePopover />
          </div>

          <div className="space-y-3 overflow-y-auto max-h-[70vh] md:max-h-[80vh]">
            <Suspense fallback={<div>Loading...</div>}>
              <GetStream stream={myStreams} />
            </Suspense>
          </div>
        </div>

        {/* RIGHT: Friend’s Playlist (if sharedFrom exists) */}
        {friendStreams && (
          <div className="md:w-1/2 w-full p-6 border-zinc-800">
            <h2 className="text-xl font-semibold mb-4 text-indigo-400">Friend’s Playlist</h2>
            <Suspense fallback={<div>Loading shared playlist...</div>}>
              <GetStream stream={friendStreams} variant="shared" />
        
            </Suspense>
            
            <NowPlaying/>
          </div>
          
        )}

        {/* If not shared, show Addstream section */}
        {!friendStreams && (
          <div className="md:w-1/3 w-full p-6 flex flex-col justify-between">
            <Addstream />
          </div>
        )}
      </div>
    </div>
  );
}
