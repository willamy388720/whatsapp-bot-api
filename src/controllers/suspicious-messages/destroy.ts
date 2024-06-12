import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { makeDestroySuspiciousMessageService } from "../factories/make-destroy-suspicious-message";

export async function destroy(request: FastifyRequest, reply: FastifyReply) {
  const destroySchemaParams = z.object({
    id: z.string(),
  });

  const { id } = destroySchemaParams.parse(request.params);

  try {
    const destroySuspiciousMessageService =
      makeDestroySuspiciousMessageService();

    await destroySuspiciousMessageService.execute({
      suspiciousmessageId: id,
    });

    return reply.status(204).send({});
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }

    throw error;
  }
}
