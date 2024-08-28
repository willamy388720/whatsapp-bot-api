import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { InvalidCredentialsError } from "@/errors/invalid-credentials-error";
import { makeAuthenticateService } from "../factories/make-authenticate-service";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const registerSchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  const { email, password } = registerSchema.parse(request.body);

  try {
    const authenticateService = makeAuthenticateService();

    const { profile } = await authenticateService.execute({
      email,
      password,
    });

    const token = await reply.jwtSign(
      {},
      {
        sub: profile.id,
      }
    );

    const refreshToken = await reply.jwtSign(
      {},
      { sub: profile.id, expiresIn: "7d" }
    );

    return reply
      .setCookie("refreshToken", refreshToken, {
        path: "/",
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(201)
      .send({ token, user: profile });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(401).send({ message: error.message });
    }

    throw error;
  }
}
