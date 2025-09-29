import prisma from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import zod, { string } from 'zod'

const requestInput=zod.object({
    creatorId:zod.string(),
    url:zod.string()
})

const Youtube_regex= RegExp(/^https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([A-Za-z0-9_-]{11})(?:&.*)?$/)

export async function POST(req:NextRequest) {
    const data=await req.json()
    console.log(data)
    
    try{
        const inputValidation=  requestInput.safeParse(data);

        if(!inputValidation.success){
          return  NextResponse.json({
                message:"error id"
            },{
                status:403
            })
            
        }
        
        const isYoutube=Youtube_regex.test(data.url);
        if(!isYoutube){
            return NextResponse.json({
                message:"wrong url format"
            },{
                status:403
            })
        }

        const extractedID=data.url.split("?v=")[1];

        const stream =await prisma.stream.create({
            data:{
                userId:data.creatorId,
                url:data.url,
                type:"youtube",
                extractedID:extractedID
            }
        })

    return NextResponse.json({ message: "Stream created", stream });
} catch(e) {
    console.error(e);
    return NextResponse.json(
        { message: "Internal server error" },
        { status: 500 }
    );
}

}

export async function GET(req:NextRequest) {
    const creatorId=req.nextUrl.searchParams.get("creatorId") as string;
    const stream=await prisma.stream.findMany({
        where:{
           userId:creatorId 
        }
    })
    return NextResponse.json({
        stream:stream
    })
}