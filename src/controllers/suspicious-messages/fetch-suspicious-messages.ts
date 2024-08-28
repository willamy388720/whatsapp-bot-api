import { FastifyReply, FastifyRequest } from "fastify";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { makeFetchSuspiciousMessagesService } from "../factories/make-fetch-suspicious-messages";

export async function fetchSuspiciousMessages(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const fetchSuspiciousMessagesService = makeFetchSuspiciousMessagesService();

    const { suspicious_messages } =
      await fetchSuspiciousMessagesService.execute({});

    return reply.status(200).send({ suspicious_messages });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }

    throw error;
  }
}
