import { PrismaContactsRepository } from "@/repositories/prisma/prisma-contacts-repository";
import { UpdateContactService } from "@/services/contacts/update-contact";

export function makeUpdateContactService() {
  const prismaContactsRepository = new PrismaContactsRepository();
  const service = new UpdateContactService(prismaContactsRepository);

  return service;
}
