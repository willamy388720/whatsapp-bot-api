import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { UpdateUserService } from "@/services/users/update-user";

export function makeUpdateUserService() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const service = new UpdateUserService(prismaUsersRepository);

  return service;
}
