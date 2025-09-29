import prisma from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import zod from 'zod'

const requestBody= zod.object({
    streamId:zod.string()
})

export default async function POST(req:NextRequest) {
    const session=await getServerSession();
    const data=await req.json();

    const user=await prisma.user.findFirst({
        where:{
            email:session?.user?.email as string
        }
    })
    if(!user){
        return NextResponse.json({
            message:"user not authenticated"
        },{
            status:400
        })
    }

    try{
        const inputValidation=requestBody.safeParse(data);
    if(!inputValidation){
        return NextResponse.json({
            message:"invalid streamId format"
        },{
            status:403
        })
    }else{
        await prisma.upvotes.create({
            data:{
                streamId:data.streamId,
                userId:user.id
            }
        })
    }
    }catch(e){
        return NextResponse.json({
            message:"something went wrong",
            error:e
        },{
            status:4000
        })
    }
}