import { ContactsRepository } from "@/repositories/contacts-repository";
import { SuspiciousMessagesRepository } from "@/repositories/suspicious-messages-repository";
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
      return { suspiciousMessage: suspiciousMessageAlreadyExists };
    } else {
      const suspiciousMessage = await this.suspiciousMessagesRepository.create({
        message: messageLowCase,
        contact_id: contactId,
      });

      return { suspiciousMessage };
    }
  }
}
