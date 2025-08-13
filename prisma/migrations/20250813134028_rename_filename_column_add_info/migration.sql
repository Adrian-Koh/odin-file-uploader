/*
  Warnings:

  - You are about to drop the column `path` on the `File` table. All the data in the column will be lost.
  - Added the required column `fileSize` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uploadTime` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."File" RENAME COLUMN "path" TO "name";
ALTER TABLE "public"."File" ADD COLUMN     "fileSize" INTEGER NOT NULL,
ADD COLUMN     "uploadTime" TIMESTAMP(3) NOT NULL;
