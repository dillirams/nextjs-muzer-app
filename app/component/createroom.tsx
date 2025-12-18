"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import axios from "axios"
import { Check, Copy, Key } from "lucide-react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { joinRoomWs } from "../actions/joinroomWs"
import { useStreamStore } from "../store/create"


export function CreateRoom() {

    const [roomId, setRoomId]=useState("");
    const [copied, setCopied]= useState(false)
    const router=useRouter();
    const {wss, setWss}= useStreamStore();

    const session = useSession();

    if (!session) throw new Error("you are not authenticated");

    async function createRoom() {
        try {
            const res = await axios.post("api/createroom");
          
            setRoomId(res.data.roomId);
        } catch (e) {
            console.error("Failed to create room", e);
        }
    }

    async function handleCopy() {
        await navigator.clipboard.writeText(roomId);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    }
    
    useEffect(()=>{
       
        createRoom()
    },[])

   

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2" variant="outline">Create Room</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-2">
                <label className="text-xs text-zinc-500 font-medium uppercase tracking-wider ml-1">
                    Room ID
                </label>
                <div className="flex items-center bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden transition-colors focus-within:border-indigo-500/50 focus-within:ring-1 focus-within:ring-indigo-500/50">
                    <div className="pl-3 text-zinc-500">
                        <Key className="w-4 h-4" />
                    </div>
                    <input
                        type="text"
                        value={roomId || "Generating..."}
                        readOnly
                        className="flex-1 bg-transparent border-none text-sm text-zinc-300 px-3 py-3 focus:ring-0 outline-none font-mono truncate"
                    />
                    <button
                        onClick={handleCopy}
                        disabled={!roomId}
                        className="px-4 py-3 bg-zinc-900 hover:bg-zinc-800 border-l border-zinc-800 text-zinc-400 hover:text-white transition-all flex items-center gap-2 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {copied ? (
                            <Check className="w-4 h-4 text-green-400" />
                        ) : (
                            <Copy className="w-4 h-4" />
                        )}
                    </button>
                </div>
               <div className="flex justify-around">
                <Button className="bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-2 rounded-full px-6 shadow-lg shadow-indigo-500/20 transition-all hover:scale-105">cancel </Button>
                <Button onClick={()=>{
                  const res=  joinRoomWs(roomId)
                  console.log(res.wss)
                  setWss(res.wss)
                    router.push('/room')
                }} className="bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-2 rounded-full px-6 shadow-lg shadow-indigo-500/20 transition-all hover:scale-105">Enter Room</Button>
                

               </div>
            </div>

        
      </PopoverContent>
    </Popover>
  )
}
