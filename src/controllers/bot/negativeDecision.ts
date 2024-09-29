import { FastifyReply, FastifyRequest } from "fastify";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { z } from "zod";
import { makeNegativeDecisionService } from "../factories/make-negative-decision-service";

export async function negativeDecision(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const destroySchemaParams = z.object({
    malicous_phone_number: z.string(),
  });

  const { malicous_phone_number } = destroySchemaParams.parse(request.body);

  try {
    const negativeDecisionService = makeNegativeDecisionService();

    await negativeDecisionService.execute({
      userId: request.user.sub,
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
