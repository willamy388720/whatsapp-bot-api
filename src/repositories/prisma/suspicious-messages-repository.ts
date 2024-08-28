import { prisma } from "@/libs/prisma";
import { SuspiciousMessagesRepository } from "../suspicious-messages-repository";
import { Prisma, SuspiciousMessage } from "@prisma/client";

export class PrismaSuspiciousMessagesRepository
  implements SuspiciousMessagesRepository
{
  async findById(id: string) {
    const suspiciousMessage = await prisma.suspiciousMessage.findUnique({
      where: {
        id: id,
      },
      include: {
        contact: true,
      },
    });

    return suspiciousMessage;
  }

  async findByMessage(message: string) {
    const suspiciousMessage = await prisma.suspiciousMessage.findUnique({
      where: {
        message: message,
      },
    });

    return suspiciousMessage;
  }

  async findAllSuspiciousMessages() {
    const suspiciousMessages = await prisma.suspiciousMessage.findMany({
      orderBy: {
        number_of_times_used: "desc",
      },
      include: {
        contact: true,
      },
    });

    return suspiciousMessages;
  }

  async create(data: Prisma.SuspiciousMessageUncheckedCreateInput) {
    const suspiciousMessage = await prisma.suspiciousMessage.create({ data });

    return suspiciousMessage;
  }

  async save(data: SuspiciousMessage) {
    const suspiciousMessage = await prisma.suspiciousMessage.update({
      where: {
        id: data.id,
      },
      data,
    });

    return suspiciousMessage;
  }

  async destroy(data: SuspiciousMessage): Promise<void> {
    await prisma.suspiciousMessage.delete({
      where: {
        id: data.id,
      },
    });
  }
}
