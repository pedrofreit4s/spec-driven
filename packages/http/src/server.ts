import Fastify from "fastify"
import { registerCors } from "./middlewares/cors.js"
import { registerErrorHandler } from "./middlewares/error-handler.js"
import { registerHealthCheck } from "./middlewares/health-check.js"
import { registerRequestId } from "./middlewares/request-id.js"
import type { ServerInstance, ServerOptions, StartOptions } from "./types.js"

export function createServer(options: ServerOptions = {}): ServerInstance {
  const app = Fastify({
    logger: options.logger ?? true,
  })

  app.register(async (instance) => {
    await registerCors(instance, options.cors)
    await registerRequestId(instance)
    await registerErrorHandler(instance)
    await registerHealthCheck(instance, options.healthCheck)
  })

  app.decorate("start", async ({ port, host = "0.0.0.0" }: StartOptions) => {
    await app.listen({ port, host })

    const shutdown = async () => {
      app.log.info("Shutting down gracefully...")
      await app.close()
    }

    process.on("SIGTERM", shutdown)
    process.on("SIGINT", shutdown)
  })

  return app as unknown as ServerInstance
}
