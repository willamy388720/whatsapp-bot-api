import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { ContactsRepository } from "@/repositories/contacts-repository";
import { Contact } from "@prisma/client";

interface FetchContactsServiceRequest {
  userId: string;
}

interface FetchContactsServiceResponse {
  contacts: Contact[];
}

export class FetchContactsService {
  constructor(private contactsRepository: ContactsRepository) {}

  async execute({
    userId,
  }: FetchContactsServiceRequest): Promise<FetchContactsServiceResponse> {
    let contacts: Contact[] = [];

    contacts = await this.contactsRepository.findAllContactsByUserId(userId);
    return { contacts };
  }
}
