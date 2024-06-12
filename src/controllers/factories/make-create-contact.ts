import { PrismaContactsRepository } from "@/repositories/prisma/prisma-contacts-repository";
import { CreateContactService } from "@/services/contacts/create-contact";

export function makeCreateContactService() {
  const prismaContactsRepository = new PrismaContactsRepository();
  const service = new CreateContactService(prismaContactsRepository);

  return service;
}
