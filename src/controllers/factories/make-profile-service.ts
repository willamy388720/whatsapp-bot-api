import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { ProfileService } from "@/services/users/profile";

export function makeProfileService() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const service = new ProfileService(prismaUsersRepository);

  return service;
}
