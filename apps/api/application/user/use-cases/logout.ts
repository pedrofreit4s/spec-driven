import type { UserRepository } from "../../../domain/user/repository.js"

export class LogoutUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userId: string): Promise<void> {
    await this.userRepository.revokeAllUserRefreshTokens(userId)
  }
}
