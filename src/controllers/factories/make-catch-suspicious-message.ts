import { PrismaContactsRepository } from "@/repositories/prisma/prisma-contacts-repository";
import { PrismaKeywordsRepository } from "@/repositories/prisma/prisma-keywords-repository";
import { PrismaSuspiciousMessagesRepository } from "@/repositories/prisma/suspicious-messages-repository";
import { CatchSuspiciousMessageService } from "@/services/suspicious-messages/catch-suspicious-message";

export function makeCatchSuspiciousMessageService() {
  const prismaSuspiciousMessagesRepository =
    new PrismaSuspiciousMessagesRepository();
  const prismaContactsRepository = new PrismaContactsRepository();
  const prismaKeywordsRepository = new PrismaKeywordsRepository();
  const service = new CatchSuspiciousMessageService(
    prismaSuspiciousMessagesRepository,
    prismaContactsRepository,
    prismaKeywordsRepository
  );

  return service;
}
