import type { LoggerOptions as PinoLoggerOptions } from "pino"

/** Whether the current environment is development. */
export function isDev(env?: string): boolean {
  return (env ?? process.env.NODE_ENV) !== "production"
}

/** Pino transport config for pretty-printing in development. */
export function devTransport(): PinoLoggerOptions["transport"] {
  return {
    target: "pino-pretty",
    options: {
      translateTime: "HH:MM:ss Z",
      ignore: "pid,hostname",
      colorize: true,
    },
  }
}
