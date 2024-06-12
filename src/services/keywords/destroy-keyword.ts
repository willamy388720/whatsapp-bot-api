import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { KeywordsRepository } from "@/repositories/keywords-repository";

interface DestroyKeywordServiceRequest {
  keywordId: string;
}

interface DestroyKeywordServiceResponse {}

export class DestroyKeywordService {
  constructor(private keywordsRepository: KeywordsRepository) {}

  async execute({
    keywordId,
  }: DestroyKeywordServiceRequest): Promise<DestroyKeywordServiceResponse> {
    const keyword = await this.keywordsRepository.findById(keywordId);

    if (!keyword) {
      throw new ResourceNotFoundError();
    }

    await this.keywordsRepository.destroy(keyword);

    return {};
  }
}
