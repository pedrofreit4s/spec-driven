import type { ServerInstance } from "@spec-driven/http"
import type { AuthenticateUseCase } from "../../../application/user/use-cases/authenticate.js"
import type { RefreshTokenUseCase } from "../../../application/user/use-cases/refresh-token.js"
import type { RegisterUseCase } from "../../../application/user/use-cases/register.js"
import { loginBodySchema, refreshBodySchema, registerBodySchema } from "../schemas/auth-schemas.js"

interface AuthRouteDeps {
  registerUseCase: RegisterUseCase
  authenticateUseCase: AuthenticateUseCase
  refreshTokenUseCase: RefreshTokenUseCase
}

export function registerAuthRoutes(app: ServerInstance, deps: AuthRouteDeps) {
  app.post("/auth/register", async (request, reply) => {
    const body = registerBodySchema.parse(request.body)
    const result = await deps.registerUseCase.execute(body)
    return reply.status(201).send(result)
  })

  app.post("/auth/login", async (request, reply) => {
    const body = loginBodySchema.parse(request.body)
    const result = await deps.authenticateUseCase.execute(body)
    return reply.status(200).send(result)
  })

  app.post("/auth/refresh", async (request, reply) => {
    const body = refreshBodySchema.parse(request.body)
    const result = await deps.refreshTokenUseCase.execute(body)
    return reply.status(200).send(result)
  })
}
