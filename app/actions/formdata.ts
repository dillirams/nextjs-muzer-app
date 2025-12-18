'use server'

import { getServerSession } from "next-auth"
import prisma from "../lib/db";
import { error } from "console";
import { yo } from "zod/v4/locales";
import { revalidatePath } from "next/cache";
import WebSocket from 'ws';





const BACKEND_URL="ws://localhost:8080"

const Youtube_regex= RegExp(/^https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([A-Za-z0-9_-]{11})(?:&.*)?$/)

export async function addStream(formData:FormData, dream:Boolean) {

   


    const session=await getServerSession();

    const user=await prisma.user.findFirst({
        where:{
            email:session?.user?.email as string
        }
    })
    if(!user)throw new Error("not authenticated")
    
    const youtubeUrl=formData.get('url') as string;
    console.log(youtubeUrl)
    const isYoutubeUrl=Youtube_regex.test(youtubeUrl as string);
    if(!isYoutubeUrl)throw new Error("enter right youtube url");
    const extractedID=youtubeUrl.split("?v=")[1];
    console.log(extractedID)

    async function getVideoDetail(apiKey:string, videoId:string) {

           const url= `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics,status,player&id=${videoId}&key=${apiKey}`;
        
           const res=await fetch(url);
           const data=await res.json();
           
           return data
        }

     const videoDetail=await getVideoDetail(process.env.API_KEY as string,extractedID);
        console.log(videoDetail)
        console.log("the thumbnails are")
        console.log( videoDetail.items[0].snippet.thumbnails.medium)
        const title=videoDetail.items[0].snippet.title;
        const thumbnails=videoDetail.items[0].snippet.thumbnails.medium.url

        if(dream){
           //chat();
           return{
            url:youtubeUrl,
            extractedID:extractedID,
            title: title,
            thumbnails:thumbnails
           }

        }else{
            const stream =await prisma.stream.create({
            data:{
                userId:user.id,
                url:youtubeUrl,
                type:"youtube",
                extractedID:extractedID,
                title:title,
                email:session?.user?.email as string,
                thumbnails:thumbnails 
            }
        })

        revalidatePath('/streamboard')

        if(stream){
            return {
                message:"stream created successfully",
                stream:stream
            }
        } 

        }

        

        
    
}