/*
  Warnings:

  - A unique constraint covering the columns `[userId,id]` on the table `JournalEntry` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sentimentScore` to the `Analysis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subject` to the `Analysis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Analysis` table without a default value. This is not possible if the table is not empty.
  - Made the column `clerkId` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "JournalEntryStatus" AS ENUM ('DRAFT', 'PENDING', 'ANALYZED');

-- AlterTable
ALTER TABLE "Analysis" ADD COLUMN     "sentimentScore" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "subject" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "color" SET DEFAULT '#0101fe';

-- AlterTable
ALTER TABLE "JournalEntry" ADD COLUMN     "status" "JournalEntryStatus" NOT NULL DEFAULT 'DRAFT';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "name" TEXT,
ALTER COLUMN "clerkId" SET NOT NULL;

-- CreateIndex
CREATE INDEX "Analysis_userId_idx" ON "Analysis"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "JournalEntry_userId_id_key" ON "JournalEntry"("userId", "id");

-- AddForeignKey
ALTER TABLE "Analysis" ADD CONSTRAINT "Analysis_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
