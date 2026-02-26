import type { FastifyError, FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import { AppError } from "../errors.js"
import type { ErrorResponse } from "../types.js"

interface ZodIssue {
  message: string
  path: (string | number)[]
}

function isZodError(error: unknown): error is Error & { issues: ZodIssue[] } {
  return (
    error instanceof Error &&
    error.name === "ZodError" &&
    "issues" in error &&
    Array.isArray((error as Record<string, unknown>).issues)
  )
}

export async function registerErrorHandler(app: FastifyInstance) {
  app.setErrorHandler((error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
    if (isZodError(error)) {
      const message = error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ")

      const body: ErrorResponse = {
        error: {
          code: "VALIDATION_ERROR",
          message,
          statusCode: 400,
        },
      }

      return reply.status(400).send(body)
    }

    if (error instanceof AppError) {
      if (error.statusCode >= 500) {
        request.log.error({ err: error }, error.message)
      }

      const body: ErrorResponse = {
        error: {
          code: error.code,
          message: error.message,
          statusCode: error.statusCode,
        },
      }

      return reply.status(error.statusCode).send(body)
    }

    request.log.error({ err: error }, error.message)

    const statusCode = (error as { statusCode?: number }).statusCode ?? 500
    const body: ErrorResponse = {
      error: {
        code: "INTERNAL_ERROR",
        message: statusCode >= 500 ? "Internal Server Error" : error.message,
        statusCode,
      },
    }

    return reply.status(statusCode).send(body)
  })
}
