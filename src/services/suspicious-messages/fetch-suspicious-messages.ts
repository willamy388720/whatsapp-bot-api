import { SuspiciousMessagesRepository } from "@/repositories/suspicious-messages-repository";
import { SuspiciousMessage } from "@prisma/client";

interface FetchSuspiciousMessagesServiceRequest {}

interface FetchSuspiciousMessagesServiceResponse {
  suspiciousmessages: SuspiciousMessage[];
}

export class FetchSuspiciousMessagesService {
  constructor(
    private suspiciousmessagesRepository: SuspiciousMessagesRepository
  ) {}

  async execute({}: FetchSuspiciousMessagesServiceRequest): Promise<FetchSuspiciousMessagesServiceResponse> {
    let suspiciousmessages: SuspiciousMessage[] = [];

    suspiciousmessages =
      await this.suspiciousmessagesRepository.findAllSuspiciousMessages();
    return { suspiciousmessages };
  }
}
