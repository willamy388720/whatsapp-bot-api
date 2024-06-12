import { PrismaKeywordsRepository } from "@/repositories/prisma/prisma-keywords-repository";
import { CreateKeywordService } from "@/services/keywords/create-keyword";

export function makeCreateKeywordService() {
  const prismaKeywordsRepository = new PrismaKeywordsRepository();
  const service = new CreateKeywordService(prismaKeywordsRepository);

  return service;
}
