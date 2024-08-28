import { ProfileDTO } from "@/dtos/profileDTO";
import { InvalidCredentialsError } from "@/errors/invalid-credentials-error";
import { UsersRepository } from "@/repositories/users-repository";
import { compare } from "bcryptjs";

interface AuthenticateServiceRequest {
  email: string;
  password: string;
}

interface AuthenticateServiceResponse {
  profile: ProfileDTO;
}

export class AuthenticateService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateServiceRequest): Promise<AuthenticateServiceResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatches = await compare(password, user.password_hash);

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError();
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
