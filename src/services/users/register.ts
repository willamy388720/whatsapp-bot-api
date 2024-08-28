import { UserAlreadyExistsError } from "@/errors/user-already-exists-error";
import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { hash } from "bcryptjs";

interface RegisterServiceRequest {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  photoUrl: string;
}

interface RegisterServiceResponse {
  user: User;
}

export class RegisterService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
    phoneNumber,
    photoUrl,
  }: RegisterServiceRequest): Promise<RegisterServiceResponse> {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
      phone_number: phoneNumber,
      photo_url: photoUrl,
    });

    return { user };
  }
}
