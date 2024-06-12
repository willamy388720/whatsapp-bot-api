import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { makeUpdateContactService } from "../factories/make-update-contact";

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updateSchema = z.object({
    name: z.string().optional().nullable().default(null),
    photo_url: z.string().optional().nullable().default(null),
    phone_number: z.string().optional().nullable().default(null),
  });

  const updateSchemaParams = z.object({
    id: z.string(),
  });

  const { id } = updateSchemaParams.parse(request.params);

  const { name, phone_number, photo_url } = updateSchema.parse(request.body);

  try {
    const updateContactService = makeUpdateContactService();

    await updateContactService.execute({
      id,
      name,
      phoneNumber: phone_number,
      photoUrl: photo_url,
    });

    return reply.status(201).send();
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }

    throw error;
  }
}
