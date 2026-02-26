import type { ServerInstance } from "@spec-driven/http"
import type { FastifyReply, FastifyRequest } from "fastify"
import type { GetProfileUseCase } from "../../../application/user/use-cases/get-profile.js"

interface UserRouteDeps {
  getProfileUseCase: GetProfileUseCase
  authMiddleware: (request: FastifyRequest, reply: FastifyReply) => Promise<void>
}

export function registerUserRoutes(app: ServerInstance, deps: UserRouteDeps) {
  app.get("/me", { preHandler: [deps.authMiddleware] }, async (request, reply) => {
    const result = await deps.getProfileUseCase.execute(request.user.sub)
    return reply.status(200).send(result)
  })
}
