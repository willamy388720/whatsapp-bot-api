import { prisma } from "@/libs/prisma";
import { ContactsRepository } from "../contacts-repository";
import { Contact, Prisma } from "@prisma/client";

export class PrismaContactsRepository implements ContactsRepository {
  async findById(id: string) {
    const contact = await prisma.contact.findUnique({
      where: {
        id: id,
      },
      include: {
        suspicious_messages: true,
      },
    });

    return contact;
  }

  async findAllContacts() {
    const contacts = await prisma.contact.findMany({
      include: {
        suspicious_messages: true,
      },
    });

    return contacts;
  }

  async findByPhoneNumber(phoneNumber: string) {
    const contact = await prisma.contact.findUnique({
      where: {
        phone_number: phoneNumber,
      },
    });

    return contact;
  }

  async create(data: Prisma.ContactUncheckedCreateInput) {
    const contact = await prisma.contact.create({ data });

    return contact;
  }

  async save(data: Contact) {
    const contact = await prisma.contact.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        phone_number: data.phone_number,
        photo_url: data.photo_url,
      },
    });

    return contact;
  }

  async destroy(data: Contact): Promise<void> {
    await prisma.contact.delete({
      where: {
        id: data.id,
      },
    });
  }
}
