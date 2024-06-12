import { prisma } from "@/libs/prisma";
import { KeywordsRepository } from "../keywords-repository";
import { Keyword, Prisma } from "@prisma/client";

export class PrismaKeywordsRepository implements KeywordsRepository {
  async findById(id: string) {
    const keyword = await prisma.keyword.findUnique({
      where: {
        id: id,
      },
    });

    return keyword;
  }

  async findByWord(word: string) {
    const keyword = await prisma.keyword.findUnique({
      where: {
        word: word,
      },
    });

    return keyword;
  }

  async findAllKeywords() {
    const keywords = await prisma.keyword.findMany();

    return keywords;
  }

  async create(data: Prisma.KeywordUncheckedCreateInput) {
    const keyword = await prisma.keyword.create({ data });

    return keyword;
  }

  async save(data: Keyword) {
    const keyword = await prisma.keyword.update({
      where: {
        id: data.id,
      },
      data,
    });

    return keyword;
  }

  async destroy(data: Keyword): Promise<void> {
    await prisma.keyword.delete({
      where: {
        id: data.id,
      },
    });
  }
}
