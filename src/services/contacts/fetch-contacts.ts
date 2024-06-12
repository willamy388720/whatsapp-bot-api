import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { ContactsRepository } from "@/repositories/contacts-repository";
import { Contact } from "@prisma/client";

interface FetchContactsServiceRequest {}

interface FetchContactsServiceResponse {
  contacts: Contact[];
}

export class FetchContactsService {
  constructor(private contactsRepository: ContactsRepository) {}

  async execute({}: FetchContactsServiceRequest): Promise<FetchContactsServiceResponse> {
    let contacts: Contact[] = [];

    contacts = await this.contactsRepository.findAllContacts();
    return { contacts };
  }
}
