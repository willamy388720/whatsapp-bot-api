import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { ContactsRepository } from "@/repositories/contacts-repository";
import { Contact } from "@prisma/client";

interface GetContactServiceRequest {
  id: string;
}

interface GetContactServiceResponse {
  contact: Contact;
}

export class GetContactService {
  constructor(private contactsRepository: ContactsRepository) {}

  async execute({
    id,
  }: GetContactServiceRequest): Promise<GetContactServiceResponse> {
    const contact = await this.contactsRepository.findById(id);

    if (!contact) {
      throw new ResourceNotFoundError();
    }

    return { contact };
  }
}
