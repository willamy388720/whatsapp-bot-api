import { PrismaContactsRepository } from "@/repositories/prisma/prisma-contacts-repository";
import { PrismaSuspiciousMessagesRepository } from "@/repositories/prisma/suspicious-messages-repository";
import { CreateSuspiciousMessageService } from "@/services/suspicious-messages/create-suspicious-message";

export function makeCreateSuspiciousMessageService() {
  const prismaSuspiciousMessagesRepository =
    new PrismaSuspiciousMessagesRepository();
  const prismaContactsRepository = new PrismaContactsRepository();
  const service = new CreateSuspiciousMessageService(
    prismaSuspiciousMessagesRepository,
    prismaContactsRepository
  );

  return service;
}
