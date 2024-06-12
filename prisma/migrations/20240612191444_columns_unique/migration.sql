/*
  Warnings:

  - A unique constraint covering the columns `[word]` on the table `keywords` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[message]` on the table `suspicious_messages` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "keywords_word_key" ON "keywords"("word");

-- CreateIndex
CREATE UNIQUE INDEX "suspicious_messages_message_key" ON "suspicious_messages"("message");
