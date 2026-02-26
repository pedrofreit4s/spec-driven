import { createServer } from "@spec-driven/http"
import { createFastifyLoggerConfig } from "@spec-driven/logger"

const server = createServer({
  logger: createFastifyLoggerConfig({
    name: "api",
    level: process.env.LOG_LEVEL ?? "info",
  }),
  cors: { origin: true },
})

// register routes...

try {
  await server.start({
    port: Number(process.env.PORT) || 3001,
    host: process.env.HOST ?? "0.0.0.0",
  })
} catch (err) {
  server.log.error(err)
  process.exit(1)
}
