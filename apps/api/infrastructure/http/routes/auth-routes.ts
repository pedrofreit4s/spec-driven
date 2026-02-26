import type { ServerInstance } from "@spec-driven/http"
import type { ZodTypeProvider } from "fastify-type-provider-zod"
import type { AuthenticateUseCase } from "../../../application/user/use-cases/authenticate.js"
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
}
