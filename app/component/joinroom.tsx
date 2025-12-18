"use client"


import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, Loader2, Plus, Users } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { addStream } from "../actions/formdata"
import { useSession } from "next-auth/react"
import { useRef, useState } from "react"
import { getRoomId } from "../actions/roomdata"
import { useRouter } from "next/navigation"
import { joinRoomWs } from "../actions/joinroomWs"
import { useStreamStore } from "../store/create"

export function JoinRoom() {

     const session = useSession();
     
      const [loading, setLoading] = useState(false);
      const formRef = useRef<HTMLFormElement>(null);
      const router= useRouter();
      const {setWss}= useStreamStore()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2" variant="outline">
        <Users />
        joinroom</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="bg-zinc-900 border border-zinc-800/50 backdrop-blur-xl p-6 rounded-2xl shadow-xl">
        <div className="flex flex-col space-y-1 mb-6">
          <h2 className="text-xl font-bold text-white">Join Room</h2>
          <p className="text-sm text-zinc-400">Paste room Id to join room and vibe together.</p>
        </div>

        <form
          ref={formRef}
          action={async (formData) => {
            setLoading(true);

            
        
            try {
              const res = await getRoomId(formData);
              console.log(res?.message)
              if (res?.message) {
                // Ideally use a toast here
                alert(res.message);
                const res1=joinRoomWs(res.roomId as string);
                setWss(res1.wss)
              }
              formRef.current?.reset();
            } catch (err) {
              
            } finally {
              setLoading(false);
            }
             router.push('/room')
          }}
          className="flex flex-col space-y-4"
        >
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Link className="h-5 w-5 text-zinc-500 group-focus-within:text-indigo-500 transition-colors" />
            </div>
            <input
              type="text"
              name="roomId"
              placeholder="enter roomId"
              className="block w-full pl-10 pr-4 py-3 bg-zinc-950/50 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all shadow-inner"
              required
            />
          </div>


          <button 
            type="submit"
            disabled={loading}
            className="relative w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white py-3 rounded-xl font-semibold shadow-lg shadow-indigo-500/20 transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Adding...<div className="grid gap-4">
         
        </div>
              </>
            ) : (
              <>
             
                Join Room
              </>
            )}
          </button>
        </form>
      </div>
      </PopoverContent>
    </Popover>
  )
}
