import { KeywordsRepository } from "@/repositories/keywords-repository";
import { Keyword } from "@prisma/client";

interface FetchKeywordsServiceRequest {}

interface FetchKeywordsServiceResponse {
  keywords: Keyword[];
}

export class FetchKeywordsService {
  constructor(private keywordsRepository: KeywordsRepository) {}

  async execute({}: FetchKeywordsServiceRequest): Promise<FetchKeywordsServiceResponse> {
    let keywords: Keyword[] = [];

    keywords = await this.keywordsRepository.findAllKeywords();
    return { keywords };
  }
}
