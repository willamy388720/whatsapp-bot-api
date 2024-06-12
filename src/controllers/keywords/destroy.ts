import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { makeDestroyKeywordService } from "../factories/make-destroy-keyword";

export async function destroy(request: FastifyRequest, reply: FastifyReply) {
  const destroySchemaParams = z.object({
    id: z.string(),
  });

  const { id } = destroySchemaParams.parse(request.params);

  try {
    const destroyKeywordService = makeDestroyKeywordService();

    await destroyKeywordService.execute({
      keywordId: id,
    });

    return reply.status(204).send({});
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }

    throw error;
  }
}
