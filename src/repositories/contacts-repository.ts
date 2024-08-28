import { Contact, Prisma } from "@prisma/client";

export interface ContactsRepository {
  create(data: Prisma.ContactUncheckedCreateInput): Promise<Contact>;
  save(data: Contact): Promise<Contact>;
  findById(id: string): Promise<Contact | null>;
  findByPhoneNumber(phoneNumber: string): Promise<Contact | null>;
  findAllContacts(): Promise<Contact[]>;
  findAllContactsByUserId(userId: string): Promise<Contact[]>;
  destroy(data: Contact): Promise<void>;
}
