import type { FastifyInstance, FastifyServerOptions } from "fastify"

export interface CorsOptions {
  origin?: boolean | string | string[] | RegExp | RegExp[]
  methods?: string[]
  allowedHeaders?: string[]
  credentials?: boolean
}

export type ReadinessChecker = () => Promise<void>

export interface HealthCheckOptions {
  readinessCheckers?: ReadinessChecker[]
}

export interface ServerOptions {
  logger?: FastifyServerOptions["logger"]
  cors?: CorsOptions
  healthCheck?: HealthCheckOptions
}

export type StartOptions = { port: number; host?: string }

export type ServerInstance = FastifyInstance & {
  start: (options: StartOptions) => Promise<void>
}

export interface ErrorResponse {
  error: {
    code: string
    message: string
    statusCode: number
  }
}
