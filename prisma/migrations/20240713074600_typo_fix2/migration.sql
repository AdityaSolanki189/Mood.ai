/*
  Warnings:

  - You are about to drop the column `negaitve` on the `Analysis` table. All the data in the column will be lost.
  - Added the required column `negative` to the `Analysis` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Analysis" DROP COLUMN "negaitve",
ADD COLUMN     "negative" BOOLEAN NOT NULL;
