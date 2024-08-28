/*
  Warnings:

  - Added the required column `photo_url` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "photo_url" TEXT NOT NULL;
