import { FastifyReply, FastifyRequest } from "fastify";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { z } from "zod";
import { makePositiveDecisionService } from "../factories/make-positive-decision-service";

export async function positiveDecision(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const destroySchemaParams = z.object({
    malicious_message: z.string(),
    malicious_name_contact: z.string(),
    malicous_phone_number: z.string(),
  });

  const { malicious_message, malicious_name_contact, malicous_phone_number } =
    destroySchemaParams.parse(request.body);

  try {
    const positiveDecisionService = makePositiveDecisionService();

    await positiveDecisionService.execute({
      userId: request.user.sub,
      maliciousMessage: malicious_message,
      maliciousNameContact: malicious_name_contact,
      malicousPhoneNumber: malicous_phone_number,
    });

    return reply.status(201).send({});
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }

    throw error;
  }
}
