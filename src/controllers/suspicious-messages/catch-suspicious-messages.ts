import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCatchSuspiciousMessageService } from "../factories/make-catch-suspicious-message";

export async function catchSuspiciousMessage(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const catchSchema = z.object({
    message: z.string(),
    name: z.string().optional().nullable().default(null),
    photo_url: z.string().optional().nullable().default(null),
    phone_number: z.string().optional().nullable().default(null),
  });

  const { message, name, phone_number, photo_url } = catchSchema.parse(
    request.body
  );

  try {
    const catchSuspiciousMessageService = makeCatchSuspiciousMessageService();

    const { scamDetected } = await catchSuspiciousMessageService.execute({
      message,
      name,
      phoneNumber: phone_number,
      photoUrl: photo_url,
    });

    return reply.status(201).send({ scam_detected: scamDetected });
  } catch (error) {
    throw error;
  }
}
