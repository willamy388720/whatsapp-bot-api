import { FastifyReply, FastifyRequest } from "fastify";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { makeFetchKeywordsService } from "../factories/make-fetch-keywords";

export async function fetchKeywords(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const fetchKeywordsService = makeFetchKeywordsService();

    const { keywords } = await fetchKeywordsService.execute({});

    return reply.status(200).send({ keywords });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }

    throw error;
  }
}
