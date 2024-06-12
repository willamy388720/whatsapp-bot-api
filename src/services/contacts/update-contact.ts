import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { ContactsRepository } from "@/repositories/contacts-repository";
import { Contact } from "@prisma/client";

interface UpdateContactServiceRequest {
  id: string;
  name: string | null;
  phoneNumber: string | null;
  photoUrl: string | null;
}

interface UpdateContactServiceResponse {
  contact: Contact;
}

export class UpdateContactService {
  constructor(private contactsRepository: ContactsRepository) {}

  async execute({
    id,
    name,
    phoneNumber,
    photoUrl,
  }: UpdateContactServiceRequest): Promise<UpdateContactServiceResponse> {
    const contact = await this.contactsRepository.findById(id);

    if (!contact) {
      throw new ResourceNotFoundError();
    }

    contact.name = name ?? contact.name;
    contact.phone_number = phoneNumber ?? contact.phone_number;
    contact.photo_url = photoUrl ?? contact.photo_url;

    await this.contactsRepository.save(contact);

    return { contact };
  }
}
