import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCreateContactService } from "../factories/make-create-contact";
import { ContactAlreadyExistsError } from "@/errors/contact-already-exists-error";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createSchema = z.object({
    name: z.string().optional().nullable().default(null),
    photo_url: z.string().optional().nullable().default(null),
    phone_number: z.string(),
  });

  const { name, phone_number, photo_url } = createSchema.parse(request.body);

  try {
    const createContactService = makeCreateContactService();

    const { contact } = await createContactService.execute({
      name,
      phoneNumber: phone_number,
      photoUrl: photo_url,
    });

    return reply.status(201).send({ contact });
  } catch (error) {
    if (error instanceof ContactAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }
}
