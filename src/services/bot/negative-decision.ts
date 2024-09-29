import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { sendNegativeEmail } from "@/libs/sendEmail";
import { UsersRepository } from "@/repositories/users-repository";

interface NegativeDecisionServiceRequest {
  userId: string;
  malicousPhoneNumber: string;
}

interface NegativeDecisionServiceResponse {}

export class NegativeDecisionService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
    malicousPhoneNumber,
  }: NegativeDecisionServiceRequest): Promise<NegativeDecisionServiceResponse> {
    try {
      const user = await this.usersRepository.findById(userId);

      if (!user) {
        throw new ResourceNotFoundError();
      }

      await sendNegativeEmail({
        toEmail: user.email,
        malicousPhoneNumber,
      });
    } catch (error) {
      throw error;
    }

    return {};
  }
}
