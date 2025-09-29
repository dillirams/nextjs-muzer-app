import prisma from "@/app/lib/db";
import NextAuth from "next-auth"

import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
  })
],callbacks:{
  async signIn(param){
    console.log(param)
   
    try{
      const user=await prisma.user.findFirst({
        where:{
          email:param.user.email as string
        }
      })
      if(!user){
        await prisma.user.create({
          data:{
            email:param.user.email as string,
            name:param.user.name as string,
            provider:param.account?.provider as string

          }
        })
      }

    }catch(e){

    }
     return true
  }
}

})


export { handler as GET, handler as POST }