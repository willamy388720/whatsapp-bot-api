import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import cors from "@fastify/cors";
import { ZodError } from "zod";

import { env } from "./env";
import { contactRoutes } from "./controllers/contacts/routes";
import { keywordRoutes } from "./controllers/keywords/routes";
import { suspiciousMessageRoutes } from "./controllers/suspicious-messages/routes";
import { userRoutes } from "./controllers/users/routes";
import { botRoutes } from "./controllers/bot/routes";

export const app = fastify();

app.register(cors, {
  origin: "*",
});

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
  sign: {
    expiresIn: "30m",
  },
});

app.register(fastifyCookie);

app.register(contactRoutes);
app.register(keywordRoutes);
app.register(suspiciousMessageRoutes);
app.register(userRoutes);
app.register(botRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error", issues: error.format() });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  }

  return reply.status(500).send({ message: "Internal error server." });
});
