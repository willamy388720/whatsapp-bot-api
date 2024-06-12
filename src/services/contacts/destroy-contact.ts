import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { ContactsRepository } from "@/repositories/contacts-repository";

interface DestroyContactServiceRequest {
  contactId: string;
}

interface DestroyContactServiceResponse {}

export class DestroyContactService {
  constructor(private contactsRepository: ContactsRepository) {}

  async execute({
    contactId,
  }: DestroyContactServiceRequest): Promise<DestroyContactServiceResponse> {
    const contact = await this.contactsRepository.findById(contactId);

    if (!contact) {
      throw new ResourceNotFoundError();
    }

    await this.contactsRepository.destroy(contact);

    return {};
  }
}
