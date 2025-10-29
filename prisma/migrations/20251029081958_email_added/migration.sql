/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Stream` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Stream` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Stream" ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Stream_email_key" ON "public"."Stream"("email");

-- AddForeignKey
ALTER TABLE "public"."Stream" ADD CONSTRAINT "Stream_email_fkey" FOREIGN KEY ("email") REFERENCES "public"."User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
