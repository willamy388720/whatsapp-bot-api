import { ContactAlreadyExistsError } from "@/errors/contact-already-exists-error";
import { ContactsRepository } from "@/repositories/contacts-repository";
import { Contact } from "@prisma/client";

interface CreateContactServiceRequest {
  userId: string;
  name: string | null;
  phoneNumber: string;
  photoUrl: string | null;
}

interface CreateContactServiceResponse {
  contact: Contact;
}

export class CreateContactService {
  constructor(private contactsRepository: ContactsRepository) {}

  async execute({
    userId,
    name,
    phoneNumber,
    photoUrl,
  }: CreateContactServiceRequest): Promise<CreateContactServiceResponse> {
    const contactWithSamePhoneNumber =
      await this.contactsRepository.findByPhoneNumber(phoneNumber);

    if (contactWithSamePhoneNumber) {
      throw new ContactAlreadyExistsError();
    }

    const contact = await this.contactsRepository.create({
      user_id: userId,
      name: name,
      phone_number: phoneNumber,
      photo_url: photoUrl,
    });

    return { contact };
  }
}
