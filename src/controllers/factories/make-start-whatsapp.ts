import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { StartWhatsappService } from "@/services/bot/start-whatsapp";

export function makeStartWhatsappService() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const service = new StartWhatsappService(prismaUsersRepository);

  return service;
}
