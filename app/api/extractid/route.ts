import { authOptions } from "@/app/lib/auth";
import prisma from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req:NextRequest) {
    const session= await getServerSession(authOptions);
    if(!session)throw new Error("you are not authenticated");
    try{
         const user= await prisma.user.findFirst({
        where:{
            email:session.user?.email as string
        }
    
    })
    return NextResponse.json({
        userId:user?.id
    },{status:200})
    }catch(e){
        console.log(e)
    }
   
}