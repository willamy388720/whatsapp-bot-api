import { PrismaContactsRepository } from "@/repositories/prisma/prisma-contacts-repository";
import { DestroyContactService } from "@/services/contacts/destroy-contact";

export function makeDestroyContactService() {
  const prismaContactsRepository = new PrismaContactsRepository();
  const service = new DestroyContactService(prismaContactsRepository);

  return service;
}
