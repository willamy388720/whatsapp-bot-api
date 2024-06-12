import { SuspiciousMessageAlreadyExistsError } from "@/errors/suspicious-message-already-exists-error";
import { ContactsRepository } from "@/repositories/contacts-repository";
import { SuspiciousMessagesRepository } from "@/repositories/suspicious-messages-repository";
import { areSimilar } from "@/utils/services/theyAreSimilar";
import { SuspiciousMessage } from "@prisma/client";

interface CreateSuspiciousMessageServiceRequest {
  message: string;
  phoneNumber: string | null;
  name: string | null;
  photoUrl: string | null;
}

interface CreateSuspiciousMessageServiceResponse {
  suspiciousMessage: SuspiciousMessage;
}

export class CreateSuspiciousMessageService {
  constructor(
    private suspiciousMessagesRepository: SuspiciousMessagesRepository,
    private contactsRepository: ContactsRepository
  ) {}

  async execute({
    message,
    phoneNumber,
    name,
    photoUrl,
  }: CreateSuspiciousMessageServiceRequest): Promise<CreateSuspiciousMessageServiceResponse> {
    let contactId = null;

    if (phoneNumber) {
      const contact = await this.contactsRepository.findByPhoneNumber(
        phoneNumber
      );

      if (contact) {
        contactId = contact.id;
      } else {
        const newContact = await this.contactsRepository.create({
          name,
          phone_number: phoneNumber,
          photo_url: photoUrl,
        });

        contactId = newContact.id;
      }
    }

    const messageLowCase = message.toLowerCase();

    const suspiciousMessageAlreadyExists =
      await this.suspiciousMessagesRepository.findByMessage(messageLowCase);

    if (suspiciousMessageAlreadyExists) {
      throw new SuspiciousMessageAlreadyExistsError();
    }

    const suspiciousMessages =
      await this.suspiciousMessagesRepository.findAllSuspiciousMessages();

    suspiciousMessages.forEach((suspicious) => {
      if (areSimilar(suspicious.message, messageLowCase)) {
        throw new SuspiciousMessageAlreadyExistsError();
      }
    });

    const suspiciousMessage = await this.suspiciousMessagesRepository.create({
      message: messageLowCase,
      contact_id: contactId,
    });

    return { suspiciousMessage };
  }
}
