import { PrismaSuspiciousMessagesRepository } from "@/repositories/prisma/suspicious-messages-repository";
import { DestroySuspiciousMessageService } from "@/services/suspicious-messages/destroy-suspicious-message";

export function makeDestroySuspiciousMessageService() {
  const prismaSuspiciousMessagesRepository =
    new PrismaSuspiciousMessagesRepository();
  const service = new DestroySuspiciousMessageService(
    prismaSuspiciousMessagesRepository
  );

  return service;
}
