import { PrismaContactsRepository } from "@/repositories/prisma/prisma-contacts-repository";
import { GetContactService } from "@/services/contacts/get-contact";

export function makeGetContactService() {
  const prismaContactsRepository = new PrismaContactsRepository();
  const service = new GetContactService(prismaContactsRepository);

  return service;
}
