"use client"
import { useSession } from "next-auth/react"
import { addStream } from "../actions/formdata"
import { useState } from "react";
import { GetStream } from "./getstream";
export function Addstream(){
    const session=useSession();
    console.log(session)
    const [error, setError]=useState<string|null>();
    const [stream, setStream]=useState<string|null>()
    return <div className="h-screen w-screen flex justify-center items-center">
        
        <form action={async (formData)=>{
            try{
              const res=  await addStream(formData);
              alert(res?.message)
              setStream(res?.stream.title)
            
            }catch(errr){

                setError((errr instanceof Error ? errr.message : "An unknown error occurred"))
            }
        }} className="border p-2 h-100 w-100 rounded-xl ">
            <div>{stream}</div>
      <input type="url" name="url" placeholder="url" className="px-3 py-2 shadow-xl/30 rounded-lg m-1" />
      {error?<p className="text-red-400">{error}</p>:"" }
    
      <button className="bg-indigo-500 hover:bg-indigo-800 text-white text-bold rounded-lg p-2" type="submit">Create</button>
    </form>
    </div>
}