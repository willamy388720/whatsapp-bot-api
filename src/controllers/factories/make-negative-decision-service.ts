import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { NegativeDecisionService } from "@/services/bot/negative-decision";

export function makeNegativeDecisionService() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const service = new NegativeDecisionService(prismaUsersRepository);

  return service;
}
