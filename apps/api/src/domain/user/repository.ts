import type { User } from "./entity.js"

export interface RefreshToken {
  id: string
  userId: string
  token: string
  expiresAt: Date
  revokedAt: Date | null
  createdAt: Date
}

export interface UserRepository {
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  create(user: User): Promise<void>
  createRefreshToken(userId: string, token: string, expiresAt: Date): Promise<void>
  findRefreshToken(token: string): Promise<RefreshToken | null>
  revokeRefreshToken(tokenId: string): Promise<void>
  revokeAllUserRefreshTokens(userId: string): Promise<void>
}
