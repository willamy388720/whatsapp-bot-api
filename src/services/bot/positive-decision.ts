import { makeCreateSuspiciousMessageService } from "@/controllers/factories/make-create-suspicious-message";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { sendPositiveEmail } from "@/libs/sendEmail";
import { UsersRepository } from "@/repositories/users-repository";

interface PositiveDecisionServiceRequest {
  userId: string;
  maliciousMessage: string;
  maliciousNameContact: string;
  malicousPhoneNumber: string;
}

interface PositiveDecisionServiceResponse {}

export class PositiveDecisionService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
    maliciousMessage,
    maliciousNameContact,
    malicousPhoneNumber,
  }: PositiveDecisionServiceRequest): Promise<PositiveDecisionServiceResponse> {
    try {
      const user = await this.usersRepository.findById(userId);

      if (!user) {
        throw new ResourceNotFoundError();
      }

      const createSuspiciousMessage = makeCreateSuspiciousMessageService();
      await createSuspiciousMessage.execute({
        userId,
        message: maliciousMessage,
        name: maliciousNameContact,
        phoneNumber: malicousPhoneNumber,
        photoUrl: null,
      });

      await sendPositiveEmail({
        toEmail: user.email,
        malicousPhoneNumber,
      });
    } catch (error) {
      throw error;
    }

    return {};
  }
}
