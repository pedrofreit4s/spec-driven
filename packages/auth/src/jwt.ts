import crypto from "node:crypto"
import jwt, { type SignOptions } from "jsonwebtoken"
import type { TokenPayload, TokenProviderOptions } from "./types.js"

export function createTokenProvider(options: TokenProviderOptions) {
  const { secret, accessTokenExpiresIn = "15m", refreshTokenExpiresIn = "7d" } = options

  return {
    generateAccessToken(payload: { sub: string }) {
      return jwt.sign({ sub: payload.sub, type: "access" } satisfies TokenPayload, secret, {
        expiresIn: accessTokenExpiresIn,
      } as SignOptions)
    },

    generateRefreshToken(payload: { sub: string }) {
      const jti = crypto.randomUUID()
      return jwt.sign({ sub: payload.sub, type: "refresh", jti } satisfies TokenPayload, secret, {
        expiresIn: refreshTokenExpiresIn,
      } as SignOptions)
    },

    verifyToken(token: string): TokenPayload {
      return jwt.verify(token, secret) as TokenPayload
    },
  }
}
