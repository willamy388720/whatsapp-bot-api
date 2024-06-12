import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { makeGetContactService } from "../factories/make-get-contact";

export async function getContact(request: FastifyRequest, reply: FastifyReply) {
  const getSchemaParams = z.object({
    id: z.string(),
  });

  const { id } = getSchemaParams.parse(request.params);

  try {
    const getContactService = makeGetContactService();

    const { contact } = await getContactService.execute({
      id,
    });

    return reply.status(200).send({ contact });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }

    throw error;
  }
}
