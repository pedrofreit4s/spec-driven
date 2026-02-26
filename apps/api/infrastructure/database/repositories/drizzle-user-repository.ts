import type { Database } from "@spec-driven/db"
import { refreshTokens, users } from "@spec-driven/db"
import { eq } from "drizzle-orm"
import { User } from "../../../domain/user/entity.js"
import type { RefreshToken, UserRepository } from "../../../domain/user/repository.js"

export class DrizzleUserRepository implements UserRepository {
  constructor(private readonly db: Database) {}

  async findById(id: string): Promise<User | null> {
    const result = await this.db.query.users.findFirst({
      where: eq(users.id, id),
    })

    if (!result) return null

    return User.fromPersistence(result)
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await this.db.query.users.findFirst({
      where: eq(users.email, email),
    })

    if (!result) return null

    return User.fromPersistence(result)
  }

  async create(user: User): Promise<void> {
    await this.db.insert(users).values({
      id: user.id,
      name: user.name,
      email: user.email,
      passwordHash: user.passwordHash,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    })
  }

  async createRefreshToken(userId: string, token: string, expiresAt: Date): Promise<void> {
    await this.db.insert(refreshTokens).values({
      userId,
      token,
      expiresAt,
    })
  }

  async findRefreshToken(token: string): Promise<RefreshToken | null> {
    const result = await this.db.query.refreshTokens.findFirst({
      where: eq(refreshTokens.token, token),
    })

    if (!result) return null

    return {
      id: result.id,
      userId: result.userId,
      token: result.token,
      expiresAt: result.expiresAt,
      revokedAt: result.revokedAt,
      createdAt: result.createdAt,
    }
  }

  async revokeRefreshToken(tokenId: string): Promise<void> {
    await this.db
      .update(refreshTokens)
      .set({ revokedAt: new Date() })
      .where(eq(refreshTokens.id, tokenId))
  }

  async revokeAllUserRefreshTokens(userId: string): Promise<void> {
    await this.db
      .update(refreshTokens)
      .set({ revokedAt: new Date() })
      .where(eq(refreshTokens.userId, userId))
  }
}
