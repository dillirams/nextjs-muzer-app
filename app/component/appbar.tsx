"use client"

import { signIn, signOut, useSession } from "next-auth/react"

export function Appbar(){
    const session= useSession();
    return <div className="flex justify-around">
        <div className="font-bold text-xl">Muser</div>
        <div>
            {session.data?.user ? <button onClick={()=>{
                signOut();
            }} className="bg-indigo-500 px-3 py-2 rounded-lg ">logout</button>:<button onClick={()=>{
                signIn();
            }} className="bg-indigo-500 px-3 py-2 rounded-lg ">signin</button> }
            
        </div>
    </div>
}