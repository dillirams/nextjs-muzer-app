import { getServerSession } from "next-auth";
import { Addstream } from "../component/addstream";
import prisma from "../lib/db";
import { Suspense } from "react";
import { GetStream } from "../component/getstream";
import { authOptions } from "../lib/auth";
import { Appbar } from "../component/appbar";
import { Share2 } from "lucide-react";


export default async function StreamBoard() {
  const session = await getServerSession(authOptions);
  if (!session) throw Error("You are not logged in");

  
  const stream =  prisma.stream.findMany();


  return (
    
    <div className="bg-zinc-950">
        <Appbar/>
        <div className="min-h-screen  text-white flex flex-col md:flex-row">
        
      {/* Left Section - Upcoming Songs */}
      <div className="md:w-2/3 w-full p-6 border-b md:border-b-0 md:border-r border-zinc-800">
      <div className="flex justify-between items-center md:pr-3">
            <h2 className="text-xl font-semibold mb-4">Upcoming Songs</h2>
             <button className="bg-indigo-600 flex items-center gap-3 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"><Share2 />Share</button>
      </div>
        
        <div className="space-y-3 overflow-y-auto max-h-[70vh] md:max-h-[80vh]">
          <Suspense fallback={<div>Loading...</div>}>
          
            <GetStream  stream={stream} />
          </Suspense>
        </div>
      </div>

      {/* Right Section - Add Song & Now Playing */}
      <div className="md:w-1/3 w-full p-6 flex flex-col justify-between">
        <Addstream />
      </div>
    </div>
    </div>
  );
}
