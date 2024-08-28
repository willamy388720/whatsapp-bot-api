import { Prisma, SuspiciousMessage } from "@prisma/client";

export interface SuspiciousMessagesRepository {
  create(
    data: Prisma.SuspiciousMessageUncheckedCreateInput
  ): Promise<SuspiciousMessage>;
  findById(id: string): Promise<SuspiciousMessage | null>;
  findByMessage(word: string): Promise<SuspiciousMessage | null>;
  findAllSuspiciousMessages(): Promise<SuspiciousMessage[]>;
  destroy(data: SuspiciousMessage): Promise<void>;
  save(data: SuspiciousMessage): Promise<SuspiciousMessage>;
}
