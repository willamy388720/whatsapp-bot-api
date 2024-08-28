import { ProfileDTO } from "@/dtos/profileDTO";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";

interface UpdateUserServiceRequest {
  userId: string;
  name?: string;
  email?: string;
  phoneNumber?: string;
  photoUrl?: string;
}

interface UpdateUserServiceResponse {
  user: ProfileDTO;
}

export class UpdateUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
    name,
    email,
    phoneNumber,
    photoUrl,
  }: UpdateUserServiceRequest): Promise<UpdateUserServiceResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;
    user.phone_number = phoneNumber ?? user.phone_number;
    user.photo_url = photoUrl ?? user.photo_url;

    await this.usersRepository.save(user);

    return { user };
  }
}
