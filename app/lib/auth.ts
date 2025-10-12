import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/app/lib/db";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret:process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn(param) {
      try {
        const user = await prisma.user.findFirst({
          where: { email: param.user.email as string },
        });

        if (!user) {
          await prisma.user.create({
            data: {
              email: param.user.email as string,
              name: param.user.name as string,
              provider: param.account?.provider as string,
            },
          });
        }
      } catch (e) {
        console.error(e);
      }

      return true;
    },
  },
 
};
