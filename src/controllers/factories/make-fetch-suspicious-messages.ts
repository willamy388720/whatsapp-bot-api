import { PrismaSuspiciousMessagesRepository } from "@/repositories/prisma/suspicious-messages-repository";
import { FetchSuspiciousMessagesService } from "@/services/suspicious-messages/fetch-suspicious-messages";

export function makeFetchSuspiciousMessagesService() {
  const prismaSuspiciousMessagesRepository =
    new PrismaSuspiciousMessagesRepository();
  const service = new FetchSuspiciousMessagesService(
    prismaSuspiciousMessagesRepository
  );

  return service;
}
