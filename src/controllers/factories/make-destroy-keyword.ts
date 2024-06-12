import { PrismaKeywordsRepository } from "@/repositories/prisma/prisma-keywords-repository";
import { DestroyKeywordService } from "@/services/keywords/destroy-keyword";

export function makeDestroyKeywordService() {
  const prismaKeywordsRepository = new PrismaKeywordsRepository();
  const service = new DestroyKeywordService(prismaKeywordsRepository);

  return service;
}
