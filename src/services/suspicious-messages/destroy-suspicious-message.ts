import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { SuspiciousMessagesRepository } from "@/repositories/suspicious-messages-repository";

interface DestroySuspiciousMessageServiceRequest {
  suspiciousmessageId: string;
}

interface DestroySuspiciousMessageServiceResponse {}

export class DestroySuspiciousMessageService {
  constructor(
    private suspiciousmessagesRepository: SuspiciousMessagesRepository
  ) {}

  async execute({
    suspiciousmessageId,
  }: DestroySuspiciousMessageServiceRequest): Promise<DestroySuspiciousMessageServiceResponse> {
    const suspiciousmessage = await this.suspiciousmessagesRepository.findById(
      suspiciousmessageId
    );

    if (!suspiciousmessage) {
      throw new ResourceNotFoundError();
    }

    await this.suspiciousmessagesRepository.destroy(suspiciousmessage);

    return {};
  }
}
