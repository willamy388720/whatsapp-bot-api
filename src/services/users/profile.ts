import { ProfileDTO } from "@/dtos/profileDTO";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { UsersRepository } from "@/repositories/users-repository";

interface ProfileServiceRequest {
  userId: string;
}

interface ProfileServiceResponse {
  profile: ProfileDTO;
}

export class ProfileService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: ProfileServiceRequest): Promise<ProfileServiceResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    const profile: ProfileDTO = {
      id: user.id,
      email: user.email,
      name: user.name,
      phone_number: user.phone_number,
      photo_url: user.photo_url,
    };

    return { profile };
  }
}
