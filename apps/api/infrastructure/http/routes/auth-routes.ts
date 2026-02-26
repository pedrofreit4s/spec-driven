import type { ServerInstance } from "@spec-driven/http"
import type { FastifyReply, FastifyRequest } from "fastify"
import type { ZodTypeProvider } from "fastify-type-provider-zod"
import type { AuthenticateUseCase } from "../../../application/user/use-cases/authenticate.js"
import type { LogoutUseCase } from "../../../application/user/use-cases/logout.js"
import type { RefreshTokenUseCase } from "../../../application/user/use-cases/refresh-token.js"
import type { RegisterUseCase } from "../../../application/user/use-cases/register.js"
import {
  loginBodySchema,
  loginResponseSchema,
  refreshBodySchema,
  refreshResponseSchema,
  registerBodySchema,
  registerResponseSchema,
} from "../schemas/auth-schemas.js"
import { errorResponseSchema } from "../schemas/error-schemas.js"

interface AuthRouteDeps {
  registerUseCase: RegisterUseCase
  authenticateUseCase: AuthenticateUseCase
  refreshTokenUseCase: RefreshTokenUseCase
  logoutUseCase: LogoutUseCase
  authMiddleware: (request: FastifyRequest, reply: FastifyReply) => Promise<void>
}

export function registerAuthRoutes(app: ServerInstance, deps: AuthRouteDeps) {
  const typedApp = app.withTypeProvider<ZodTypeProvider>()

  typedApp.post(
    "/auth/register",
    {
      schema: {
        summary: "Register a new user",
        description: "Creates a new user account with name, email, and password.",
        tags: ["auth"],
        body: registerBodySchema,
        response: {
          201: registerResponseSchema,
          400: errorResponseSchema,
          409: errorResponseSchema,
        },
      },
    },
    async (request, reply) => {
      const result = await deps.registerUseCase.execute(request.body)
      return reply.status(201).send(result)
    }
  )

  typedApp.post(
    "/auth/login",
    {
      schema: {
        summary: "Authenticate user",
        description:
          "Authenticates a user with email and password, returning access and refresh tokens.",
        tags: ["auth"],
        body: loginBodySchema,
        response: {
          200: loginResponseSchema,
          400: errorResponseSchema,
          401: errorResponseSchema,
        },
      },
    },
    async (request, reply) => {
      const result = await deps.authenticateUseCase.execute(request.body)
      return reply.status(200).send(result)
    }
  )

  typedApp.post(
    "/auth/refresh",
    {
      schema: {
        summary: "Refresh access token",
        description: "Generates a new access token and refresh token using a valid refresh token.",
        tags: ["auth"],
        body: refreshBodySchema,
        response: {
          200: refreshResponseSchema,
          400: errorResponseSchema,
          401: errorResponseSchema,
        },
      },
    },
    async (request, reply) => {
      const result = await deps.refreshTokenUseCase.execute(request.body)
      return reply.status(200).send(result)
    }
  )

  typedApp.post(
    "/auth/logout",
    {
      preHandler: [deps.authMiddleware],
      schema: {
        summary: "Logout user",
        description:
          "Revokes all refresh tokens for the authenticated user, effectively logging them out.",
        tags: ["auth"],
        security: [{ bearerAuth: [] }],
        response: {
          204: { type: "null", description: "No Content" },
          401: errorResponseSchema,
        },
      },
    },
    async (request, reply) => {
      await deps.logoutUseCase.execute(request.user.sub)
      return reply.status(204).send()
    }
  )
}
