'use server'
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import prisma from "../lib/db";


export async function  getRoomId(formData:FormData) {
    const session= await getServerSession(authOptions);
    if(!session){
        throw new Error("you are not authenticated")
    }
    try{

        const roomId=formData.get('roomId')
        console.log("the room Id is "+roomId)
        const room= await prisma.joinroom.findUnique({
            where:{
                roomId:roomId as string
            }
        })

        if(!room) throw new Error("room does not exist");

        

        return {
            message:"found roomId successfully",
            roomId:roomId
        }

    }catch(e){

    }
}