import { UnauthorizedError } from "@spec-driven/http"
import type { FastifyReply, FastifyRequest } from "fastify"
import { createTokenProvider } from "./jwt.js"
import type { AuthMiddlewareOptions } from "./types.js"

export function createAuthMiddleware(options: AuthMiddlewareOptions) {
  const tokenProvider = createTokenProvider({ secret: options.secret })

  return async (request: FastifyRequest, _reply: FastifyReply) => {
    const authorization = request.headers.authorization

    if (!authorization?.startsWith("Bearer ")) {
      throw new UnauthorizedError("Missing or invalid authorization header")
    }

    const token = authorization.slice(7)

    try {
      const payload = tokenProvider.verifyToken(token)
      request.user = { sub: payload.sub }
    } catch {
      throw new UnauthorizedError("Invalid or expired token")
    }
  }
}

declare module "fastify" {
  interface FastifyRequest {
    user: { sub: string }
  }
}
