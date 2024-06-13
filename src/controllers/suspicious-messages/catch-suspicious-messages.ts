import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCatchSuspiciousMessageService } from "../factories/make-catch-suspicious-message";

export async function catchSuspiciousMessage(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const catchSchema = z.object({
    message: z.string(),
    phone_number: z.string().optional().nullable().default(null),
  });

  const { message, phone_number } = catchSchema.parse(request.body);

  try {
    const catchSuspiciousMessageService = makeCatchSuspiciousMessageService();

    const { scamDetected } = await catchSuspiciousMessageService.execute({
      message,
      phoneNumber: phone_number,
    });

    return reply.status(201).send({ scam_detected: scamDetected });
  } catch (error) {
    throw error;
  }
}
