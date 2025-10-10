import { getServerSession } from "next-auth";
import { Addstream } from "../component/addstream";
import prisma from "../lib/db";
import { Suspense } from "react";
import { GetStream } from "../component/getstream";

export default async function StreamBoard(){
    const session= await getServerSession();
    console.log("the session is")
    console.log(session)
    if(!session) throw Error("you are not logged in")
    const stream=prisma.stream.findMany();
     return (
        <>
        <Suspense fallback={<div>Loading...</div>}>
                <GetStream stream={stream}/>
            </Suspense>

        <Addstream/>
        </>
            
        )
}

