"use server";

import { authOptions } from "@/app/lib/auth";
import prisma from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export async function addToMyPlaylist(item: any) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("You are not authenticated");

  const user = await prisma.user.findFirst({
    where: { email: session.user?.email as string },
  });

  if (!user) throw new Error("User not found");

  await prisma.stream.create({
    data: {
      userId: user.id,
      url: item.url,
      type: "youtube",
      extractedID: item.extractedID,
      title: item.title,
      email: session.user?.email as string,
      thumbnails: item.thumbnails,
    },
  });

  revalidatePath("/streamboard");
  return { message: "added successfully" };
}
