export interface TokenProviderOptions {
  secret: string
  accessTokenExpiresIn?: string
  refreshTokenExpiresIn?: string
}

export interface TokenPayload {
  sub: string
  type: "access" | "refresh"
  jti?: string
}

export interface HasherOptions {
  saltRounds?: number
}

export interface AuthMiddlewareOptions {
  secret: string
}
