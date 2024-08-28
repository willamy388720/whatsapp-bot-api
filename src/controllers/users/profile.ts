import { FastifyReply, FastifyRequest } from "fastify";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { makeProfileService } from "../factories/make-profile-service";

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  try {
    const profileService = makeProfileService();

    const { profile } = await profileService.execute({
      userId: request.user.sub,
    });

    return reply.status(201).send({ user: profile });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }

    throw error;
  }
}
