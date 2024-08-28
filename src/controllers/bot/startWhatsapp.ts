import { FastifyReply, FastifyRequest } from "fastify";
import { makeStartWhatsappService } from "../factories/make-start-whatsapp";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { Whatsapp } from "venom-bot";

export async function startWhatsapp(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const createContactService = makeStartWhatsappService();

    let venomClient: Whatsapp;

    const venom = require("venom-bot");

    venomClient = await venom.create(
      request.user.sub,
      (base64Qrimg: string) => {
        reply.status(201).send({ qr_code: base64Qrimg });
      },
      undefined,
      {
        folderNameToken: "tokens",
        mkdirFolderToken: "",
        headless: true,
        devtools: false,
        useChrome: true,
        debug: false,
        logQR: false,
      }
    );

    await createContactService.execute({
      userId: request.user.sub,
      venomClient,
    });

    return reply.status(201).send({});
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }

    throw error;
  }
}
