import { UnauthorizedError } from "@spec-driven/http"
import type { UserRepository } from "../../../domain/user/repository.js"
import type { TokenProvider } from "../ports/token-provider.js"

interface RefreshTokenInput {
  refreshToken: string
}

interface RefreshTokenOutput {
  accessToken: string
  refreshToken: string
}

export class RefreshTokenUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenProvider: TokenProvider
  ) {}

  async execute(input: RefreshTokenInput): Promise<RefreshTokenOutput> {
    const storedToken = await this.userRepository.findRefreshToken(input.refreshToken)

    if (!storedToken) {
      throw new UnauthorizedError("Invalid refresh token")
    }

    if (storedToken.revokedAt) {
      throw new UnauthorizedError("Refresh token has been revoked")
    }

    if (storedToken.expiresAt < new Date()) {
      throw new UnauthorizedError("Refresh token has expired")
    }

    await this.userRepository.revokeRefreshToken(storedToken.id)

    const accessToken = this.tokenProvider.generateAccessToken({ sub: storedToken.userId })
    const newRefreshToken = this.tokenProvider.generateRefreshToken({ sub: storedToken.userId })

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    await this.userRepository.createRefreshToken(storedToken.userId, newRefreshToken, expiresAt)

    return {
      accessToken,
      refreshToken: newRefreshToken,
    }
  }
}
