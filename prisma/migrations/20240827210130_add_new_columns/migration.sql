/*
  Warnings:

  - Added the required column `phone_number` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "contacts" ADD COLUMN     "user_id" TEXT;

-- AlterTable
ALTER TABLE "suspicious_messages" ADD COLUMN     "number_of_times_used" INTEGER;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "phone_number" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
