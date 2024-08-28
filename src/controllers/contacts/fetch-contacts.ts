import { FastifyReply, FastifyRequest } from "fastify";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { makeFetchContactsService } from "../factories/make-fetch-contacts";

export async function fetchContacts(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const fetchContactsService = makeFetchContactsService();

    const { contacts } = await fetchContactsService.execute({
      userId: request.user.sub,
    });

    return reply.status(200).send({ contacts });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }

    throw error;
  }
}
