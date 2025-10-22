'use server'
import { getServerSession } from "next-auth"
import { authOptions } from "../lib/auth"
import prisma from "../lib/db";
import { revalidatePath } from "next/cache";

export async function  deleteStream(streamId:string) {
   console.log(streamId) 
   const session = await getServerSession(authOptions);
   if(!session) throw Error("you are not logged in");

   const user=await prisma.user.findFirst({
    where:{
        email:session?.user?.email as string
    }
   })

   try{
    const deleteStream=await prisma.stream.delete({
        where:{
            userId:user?.id,
            id:streamId
        }
    })
    revalidatePath("/streamboard")

    if(deleteStream){
      return {
        message:"stream deleted successfully"
      }
        
    }
    
   }catch(e){
    console.log(e)
   }
   
   
}