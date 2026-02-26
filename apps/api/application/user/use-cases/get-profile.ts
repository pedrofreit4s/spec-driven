import { NotFoundError } from "@spec-driven/http"
import type { UserRepository } from "../../../domain/user/repository.js"

interface GetProfileOutput {
  user: { id: string; name: string; email: string; createdAt: Date }
}

export class GetProfileUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userId: string): Promise<GetProfileOutput> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new NotFoundError("User not found")
    }

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
    }
  }
}
