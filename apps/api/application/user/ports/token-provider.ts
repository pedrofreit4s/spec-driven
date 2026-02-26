export interface TokenPayload {
  sub: string
  type: "access" | "refresh"
  jti?: string
}

export interface TokenProvider {
  generateAccessToken(payload: { sub: string }): string
  generateRefreshToken(payload: { sub: string }): string
  verifyToken(token: string): TokenPayload
}
