import { createAuthMiddleware, createHasher, createTokenProvider } from "@spec-driven/auth"
import { createDatabase } from "@spec-driven/db"
import { createServer } from "@spec-driven/http"
import { createFastifyLoggerConfig } from "@spec-driven/logger"
import { AuthenticateUseCase } from "./application/user/use-cases/authenticate.js"
import { GetProfileUseCase } from "./application/user/use-cases/get-profile.js"
import { RefreshTokenUseCase } from "./application/user/use-cases/refresh-token.js"
import { RegisterUseCase } from "./application/user/use-cases/register.js"
import { env } from "./config/env.js"
import { DrizzleUserRepository } from "./infrastructure/database/repositories/drizzle-user-repository.js"
import { registerAuthRoutes } from "./infrastructure/http/routes/auth-routes.js"
import { registerUserRoutes } from "./infrastructure/http/routes/user-routes.js"

// Infrastructure
const db = createDatabase(env.DATABASE_URL)
const hasher = createHasher()
const tokenProvider = createTokenProvider({ secret: env.JWT_SECRET })

// Repositories
const userRepository = new DrizzleUserRepository(db)

// Use Cases
const registerUseCase = new RegisterUseCase(userRepository, hasher)
const authenticateUseCase = new AuthenticateUseCase(userRepository, hasher, tokenProvider)
const refreshTokenUseCase = new RefreshTokenUseCase(userRepository, tokenProvider)
const getProfileUseCase = new GetProfileUseCase(userRepository)

// Server
const server = createServer({
  logger: createFastifyLoggerConfig({
    name: "api",
    level: env.LOG_LEVEL,
  }),
  cors: { origin: true },
})

// Routes
registerAuthRoutes(server, { registerUseCase, authenticateUseCase, refreshTokenUseCase })
registerUserRoutes(server, {
  getProfileUseCase,
  authMiddleware: createAuthMiddleware({ secret: env.JWT_SECRET }),
})

try {
  await server.start({ port: env.PORT, host: env.HOST })
} catch (err) {
  server.log.error(err)
  process.exit(1)
}
