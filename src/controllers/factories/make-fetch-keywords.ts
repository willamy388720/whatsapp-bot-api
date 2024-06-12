import { PrismaKeywordsRepository } from "@/repositories/prisma/prisma-keywords-repository";
import { FetchKeywordsService } from "@/services/keywords/fetch-keywords";

export function makeFetchKeywordsService() {
  const prismaKeywordsRepository = new PrismaKeywordsRepository();
  const service = new FetchKeywordsService(prismaKeywordsRepository);

  return service;
}
