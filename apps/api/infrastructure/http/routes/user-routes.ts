import type { ServerInstance } from "@spec-driven/http"
import type { FastifyReply, FastifyRequest } from "fastify"
import type { ZodTypeProvider } from "fastify-type-provider-zod"
import type { GetProfileUseCase } from "../../../application/user/use-cases/get-profile.js"
import { errorResponseSchema } from "../schemas/error-schemas.js"
import { profileResponseSchema } from "../schemas/user-schemas.js"

interface UserRouteDeps {
  getProfileUseCase: GetProfileUseCase
  authMiddleware: (request: FastifyRequest, reply: FastifyReply) => Promise<void>
}

export function registerUserRoutes(app: ServerInstance, deps: UserRouteDeps) {
  const typedApp = app.withTypeProvider<ZodTypeProvider>()

  typedApp.get(
    "/me",
    {
      preHandler: [deps.authMiddleware],
      schema: {
        summary: "Get current user profile",
        description: "Returns the authenticated user's profile information.",
        tags: ["user"],
        security: [{ bearerAuth: [] }],
        response: {
          200: profileResponseSchema,
          401: errorResponseSchema,
          404: errorResponseSchema,
        },
      },
    },
    async (request, reply) => {
      const result = await deps.getProfileUseCase.execute(request.user.sub)
      return reply.status(200).send(result)
    }
  )
}
