import { SuspiciousMessagesRepository } from "@/repositories/suspicious-messages-repository";
import { SuspiciousMessage } from "@prisma/client";

interface FetchSuspiciousMessagesServiceRequest {}

interface FetchSuspiciousMessagesServiceResponse {
  suspicious_messages: SuspiciousMessage[];
}

export class FetchSuspiciousMessagesService {
  constructor(
    private suspiciousmessagesRepository: SuspiciousMessagesRepository
  ) {}

  async execute({}: FetchSuspiciousMessagesServiceRequest): Promise<FetchSuspiciousMessagesServiceResponse> {
    let suspicious_messages: SuspiciousMessage[] = [];

    suspicious_messages =
      await this.suspiciousmessagesRepository.findAllSuspiciousMessages();
    return { suspicious_messages };
  }
}
