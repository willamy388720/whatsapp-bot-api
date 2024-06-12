import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCreateKeywordService } from "../factories/make-create-keyword";
import { KeywordAlreadyExistsError } from "@/errors/keyword-already-exists-error";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createSchema = z.object({
    word: z.string(),
  });

  const { word } = createSchema.parse(request.body);

  try {
    const createKeywordService = makeCreateKeywordService();

    const { keyword } = await createKeywordService.execute({
      word,
    });

    return reply.status(201).send({ keyword });
  } catch (error) {
    if (error instanceof KeywordAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }
}
