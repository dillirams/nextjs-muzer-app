"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation";

export function Appbar(){
    
    const session= useSession();
    const router=useRouter()
    return <div className="flex justify-around">
        <div className="font-bold text-xl">Muser</div>
        <div>
            {session.data?.user ? <button onClick={()=>{
                signOut({callbackUrl:"/"});
            }} className="bg-indigo-500 px-3 py-2 rounded-lg ">logout</button>:<button onClick={ ()=>{
                signIn("google",{
                    callbackUrl:"/streamboard",
                    prompt: "consent",
                })
                

            }} className="bg-indigo-500 px-3 py-2 rounded-lg ">signin</button> }
            
        </div>
    </div>
}