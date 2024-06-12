import { KeywordAlreadyExistsError } from "@/errors/keyword-already-exists-error";
import { KeywordsRepository } from "@/repositories/keywords-repository";
import { Keyword } from "@prisma/client";

interface CreateKeywordServiceRequest {
  word: string;
}

interface CreateKeywordServiceResponse {
  keyword: Keyword;
}

export class CreateKeywordService {
  constructor(private keywordsRepository: KeywordsRepository) {}

  async execute({
    word,
  }: CreateKeywordServiceRequest): Promise<CreateKeywordServiceResponse> {
    const wordLowCase = word.toLowerCase();

    const keywordAlreadyExists = await this.keywordsRepository.findByWord(
      wordLowCase
    );

    if (keywordAlreadyExists) {
      throw new KeywordAlreadyExistsError();
    }

    const keyword = await this.keywordsRepository.create({
      word: wordLowCase,
    });

    return { keyword };
  }
}
