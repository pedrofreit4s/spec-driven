import pino, { type Logger } from "pino"
import { devTransport, isDev } from "./config"
import type { FastifyLoggerConfig, LoggerOptions } from "./types"

/**
 * Creates a Pino logger instance.
 *
 * Uses `pino-pretty` in development and structured JSON in production.
 *
 * @example
 * ```ts
 * const logger = createLogger({ name: "my-service", level: "debug" })
 * logger.info("Server started")
 * logger.child({ module: "auth" }).warn("Token expired")
 * ```
 */
export function createLogger(options: LoggerOptions): Logger {
  const dev = isDev(options.env)

  return pino({
    name: options.name,
    level: options.level ?? "info",
    transport: dev ? devTransport() : undefined,
  })
}

/**
 * Creates a logger configuration object compatible with Fastify's `logger` option.
 *
 * @example
 * ```ts
 * import Fastify from "fastify"
 * const app = Fastify({
 *   logger: createFastifyLoggerConfig({ name: "api", level: "info" })
 * })
 * ```
 */
export function createFastifyLoggerConfig(options: LoggerOptions): FastifyLoggerConfig {
  const dev = isDev(options.env)

  return {
    name: options.name,
    level: options.level ?? "info",
    transport: dev ? devTransport() : undefined,
  }
}
