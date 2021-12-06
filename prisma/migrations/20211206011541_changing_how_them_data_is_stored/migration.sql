/*
  Warnings:

  - You are about to drop the column `fileName` on the `Link` table. All the data in the column will be lost.
  - Made the column `data` on table `Link` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Link" DROP COLUMN "fileName",
ALTER COLUMN "data" SET NOT NULL;
