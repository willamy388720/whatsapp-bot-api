import { Keyword, Prisma } from "@prisma/client";

export interface KeywordsRepository {
  create(data: Prisma.KeywordUncheckedCreateInput): Promise<Keyword>;
  save(data: Keyword): Promise<Keyword>;
  findById(id: string): Promise<Keyword | null>;
  findByWord(word: string): Promise<Keyword | null>;
  findAllKeywords(): Promise<Keyword[]>;
  destroy(data: Keyword): Promise<void>;
}
