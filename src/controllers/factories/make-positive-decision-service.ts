import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { PositiveDecisionService } from "@/services/bot/positive-decision";

export function makePositiveDecisionService() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const service = new PositiveDecisionService(prismaUsersRepository);

  return service;
}
