import { UnauthorizedError } from "@spec-driven/http"
import type { UserRepository } from "../../../domain/user/repository.js"
import type { Hasher } from "../ports/hasher.js"
import type { TokenProvider } from "../ports/token-provider.js"

interface AuthenticateInput {
  email: string
  password: string
}

interface AuthenticateOutput {
  accessToken: string
  refreshToken: string
  user: { id: string; name: string; email: string }
}

export class AuthenticateUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hasher: Hasher,
    private readonly tokenProvider: TokenProvider
  ) {}

  async execute(input: AuthenticateInput): Promise<AuthenticateOutput> {
    const user = await this.userRepository.findByEmail(input.email.trim().toLowerCase())

    if (!user) {
      throw new UnauthorizedError("Invalid credentials")
    }

    const passwordValid = await this.hasher.compare(input.password, user.passwordHash)

    if (!passwordValid) {
      throw new UnauthorizedError("Invalid credentials")
    }

    const accessToken = this.tokenProvider.generateAccessToken({ sub: user.id })
    const refreshToken = this.tokenProvider.generateRefreshToken({ sub: user.id })

    const decoded = this.tokenProvider.verifyToken(refreshToken)
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

    await this.userRepository.createRefreshToken(user.id, refreshToken, expiresAt)

    return {
      accessToken,
      refreshToken,
      user: { id: user.id, name: user.name, email: user.email },
    }
  }
}
