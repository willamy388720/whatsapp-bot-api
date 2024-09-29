import { makeCatchSuspiciousMessageService } from "@/controllers/factories/make-catch-suspicious-message";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { customerDecision } from "@/libs/customerDecision";
import { sendEmail } from "@/libs/sendEmail";
import { UsersRepository } from "@/repositories/users-repository";
import { formatPhoneNumber } from "@/utils/services/formatPhoneNumber";
import { removeURLs } from "@/utils/services/removeURL";
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

          await sendEmail({
            toEmail: user.email,
            name: user.name,
            groupMessage: message.isGroupMsg
              ? `no grupo ${message.groupInfo!.name}`
              : "",
            phoneNumber: formatPhoneNumber(phoneNumber),
            maliciousMessage: removeURLs(maliciousMessage),
            maliciousContactName,
            maliciousPhoneNumber,
          });
        }

        maliciousMessage = "";
        maliciousContactName = "";
        maliciousPhoneNumber = "";
      });
    } catch (error) {
      if (error instanceof Error)
        throw new Error(`Error starting WhatsApp session: ${error.message}`);
    }
    return {};
  }
}
