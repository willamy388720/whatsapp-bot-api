import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCreateSuspiciousMessageService } from "../factories/make-create-suspicious-message";
import { SuspiciousMessageAlreadyExistsError } from "@/errors/suspicious-message-already-exists-error";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createSchema = z.object({
    message: z.string(),
    name: z.string().optional().nullable().default(null),
    photo_url: z.string().optional().nullable().default(null),
    phone_number: z.string().optional().nullable().default(null),
  });

  const { message, name, phone_number, photo_url } = createSchema.parse(
    request.body
  );

  try {
    const createSuspiciousMessageService = makeCreateSuspiciousMessageService();

    const { suspiciousMessage } = await createSuspiciousMessageService.execute({
      message,
      name,
      phoneNumber: phone_number,
      photoUrl: photo_url,
    });

    return reply.status(201).send({ suspiciousMessage });
  } catch (error) {
    if (error instanceof SuspiciousMessageAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }
}
