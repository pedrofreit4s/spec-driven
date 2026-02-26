import type { LoggerOptions as PinoLoggerOptions } from "pino"

/** Options for creating a logger instance. */
export interface LoggerOptions {
  /** Service or module name, included in every log entry. */
  name: string
  /** Minimum log level. Defaults to `"info"`. */
  level?: string
  /** Force a specific environment instead of auto-detecting from `NODE_ENV`. */
  env?: "development" | "production"
}

/** The logger config object compatible with Fastify's `logger` option. */
export type FastifyLoggerConfig = PinoLoggerOptions
