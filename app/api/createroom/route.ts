import { authOptions } from "@/app/lib/auth";
import prisma from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { tr } from "zod/locales";

function generateRoomId(userId:string){
    const mainString=userId.split("");
    let suffledString="";
    let length=mainString.length;
    while(length!==0){
        const currentIndex=Math.floor(Math.random()*length);
        suffledString+=mainString[currentIndex];
        length --
    }
    return suffledString
}


export async function  POST() {
    const session=await getServerSession(authOptions);
    if(!session){
        return NextResponse.json({
            message:"you are not loged in"
        },{status:404})
    }
    try{
        const user=await prisma.user.findFirst({
            where:{
                email:session.user?.email as string
            }
        })
        if(!user) throw new Error("something went wrong");
        const roomId=generateRoomId(user.id);
        const roomCreated=await prisma.joinroom.create({
            data:{
                roomId:roomId,
                creatorId:user.id
            }
        })

        return NextResponse.json({
            roomId:roomCreated.roomId
        },{status:200})
    }catch(e){
        return NextResponse.json({
            message:"something went wrong"
        })
    }
}