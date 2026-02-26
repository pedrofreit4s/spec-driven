import type { FastifyInstance } from "fastify"

export async function registerRequestId(app: FastifyInstance) {
  app.addHook("onRequest", async (request) => {
    const incomingId = request.headers["x-request-id"]
    if (typeof incomingId === "string" && incomingId.length > 0) {
      request.id = incomingId
    }
  })

  app.addHook("onSend", async (_request, reply) => {
    reply.header("x-request-id", reply.request.id)
  })
}
