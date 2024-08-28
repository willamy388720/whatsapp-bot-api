import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeUpdateUserService } from "../factories/make-update-user-service";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const registerSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    photo_url: z.string(),
    phone_number: z.string(),
  });

  const { email, name, photo_url, phone_number } = registerSchema.parse(
    request.body
  );

  try {
    const updateUserService = makeUpdateUserService();

    await updateUserService.execute({
      userId: request.user.sub,
      name,
      email,
      phoneNumber: phone_number,
      photoUrl: photo_url,
    });

    return reply.status(201).send();
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }

    throw error;
  }
}
