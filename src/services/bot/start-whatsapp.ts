import { makeCatchSuspiciousMessageService } from "@/controllers/factories/make-catch-suspicious-message";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { customerDecision } from "@/libs/customerDecision";
import { UsersRepository } from "@/repositories/users-repository";
import { formatPhoneNumber } from "@/utils/services/formatPhoneNumber";
import { Whatsapp } from "venom-bot";

interface StartWhatsappRequest {
  userId: string;
  venomClient: Whatsapp;
}

interface StartWhatsappResponse {}

export class StartWhatsappService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    venomClient,
    userId,
  }: StartWhatsappRequest): Promise<StartWhatsappResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    try {
      let maliciousMessage = "";
      let maliciousPhoneNumber = "";
      let maliciousContactName = "";

      venomClient.onMessage(async (message) => {
        if (!message || !message.sender || !message.sender.id) {
          return;
        }

        const phoneNumber = message.sender.id.split("@")[0];

        if (phoneNumber === user.phone_number) return;

        const catchSuspiciousMessage = makeCatchSuspiciousMessageService();
        const data = await catchSuspiciousMessage.execute({
          message: message.body,
          phoneNumber,
        });

        if (data.scamDetected) {
          maliciousMessage = message.body;
          maliciousPhoneNumber = phoneNumber;
          maliciousContactName = message.sender.name;

          const notificationMessage = `*Aviso Importante!*

          Prezado(a) ${user.name},

          Gostaríamos de alertá-lo(a) que o número ${formatPhoneNumber(
            phoneNumber
          )} está enviando mensagens fraudulentas ${
            message.isGroupMsg ? `no grupo ${message.groupInfo.name}` : ""
          }, com a intenção de aplicar golpes. Pedimos que, por favor, tome as seguintes medidas de segurança:

          - *Bloqueie o número:* Evite qualquer contato com o número em questão.
          - *Não responda:* Não forneça nenhuma informação pessoal ou financeira.
          - *Avise os outros:* Informe os demais integrantes do grupo para que também tomem precauções.
          - *Reporte:* Caso tenha recebido mensagens suspeitas, reporte para que possamos tomar as devidas providências.

          A sua segurança é nossa prioridade. Agradecemos pela atenção e colaboração.

          *Deseja salvar o contato na nossa lista Negra? Responda com SIM ou NÃO*`;

          venomClient.sendText(
            `${user.phone_number}@c.us`,
            notificationMessage
          );
        }

        if (maliciousMessage !== "" && message.body !== maliciousMessage) {
          await customerDecision(
            userId,
            venomClient,
            message,
            maliciousMessage,
            maliciousContactName,
            maliciousPhoneNumber,
            user.phone_number
          );
          maliciousMessage = "";
          maliciousContactName = "";
          maliciousPhoneNumber = "";
        }
      });
    } catch (error) {
      if (error instanceof Error)
        throw new Error(`Error starting WhatsApp session: ${error.message}`);
    }
    return {};
  }
}
