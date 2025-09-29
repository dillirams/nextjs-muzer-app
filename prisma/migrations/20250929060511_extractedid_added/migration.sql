/*
  Warnings:

  - Added the required column `extractedID` to the `Stream` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Stream" ADD COLUMN     "extractedID" TEXT NOT NULL;
