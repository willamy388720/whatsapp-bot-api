import { PrismaContactsRepository } from "@/repositories/prisma/prisma-contacts-repository";
import { FetchContactsService } from "@/services/contacts/fetch-contacts";

export function makeFetchContactsService() {
  const prismaContactsRepository = new PrismaContactsRepository();
  const service = new FetchContactsService(prismaContactsRepository);

  return service;
}
