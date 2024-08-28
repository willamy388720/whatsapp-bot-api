import { ContactsRepository } from "@/repositories/contacts-repository";
import { KeywordsRepository } from "@/repositories/keywords-repository";
import { SuspiciousMessagesRepository } from "@/repositories/suspicious-messages-repository";
import { containsScamWords } from "@/utils/services/checksTheExistenceOfKeywords";
import { areSimilar } from "@/utils/services/theyAreSimilar";

interface CatchSuspiciousMessageServiceRequest {
  message: string;
  phoneNumber: string | null;
}

interface CatchSuspiciousMessageServiceResponse {
  scamDetected: boolean;
}

export class CatchSuspiciousMessageService {
  constructor(
    private suspiciousMessagesRepository: SuspiciousMessagesRepository,
    private contactsRepository: ContactsRepository,
    private keywordsRepository: KeywordsRepository
  ) {}

  async execute({
    message,
    phoneNumber,
  }: CatchSuspiciousMessageServiceRequest): Promise<CatchSuspiciousMessageServiceResponse> {
    let scamDetected = false;

    if (phoneNumber) {
      const contact = await this.contactsRepository.findByPhoneNumber(
        phoneNumber
      );

      if (contact) {
        scamDetected = true;
      }
    }

    const messageLowCase = message.toLowerCase();

    const suspiciousMessageAlreadyExists =
      await this.suspiciousMessagesRepository.findByMessage(messageLowCase);

    if (suspiciousMessageAlreadyExists) {
      scamDetected = true;
    }

    if (!scamDetected) {
      const suspiciousMessages =
        await this.suspiciousMessagesRepository.findAllSuspiciousMessages();

      suspiciousMessages.forEach((suspicious) => {
        if (areSimilar(suspicious.message, messageLowCase)) {
          if (suspicious.number_of_times_used) {
            suspicious.number_of_times_used += 1;
          } else {
            suspicious.number_of_times_used = 1;
          }

          this.suspiciousMessagesRepository.save(suspicious);
          scamDetected = true;
        }
      });
    }

    if (!scamDetected) {
      const allKeyword = await this.keywordsRepository.findAllKeywords();

      const keywords = allKeyword.map((keyword) => keyword.word);

      if (containsScamWords(messageLowCase, keywords)) {
        scamDetected = true;
      }
    }

    return { scamDetected };
  }
}
