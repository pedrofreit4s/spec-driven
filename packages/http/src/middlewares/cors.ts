import fastifyCors from "@fastify/cors"
import type { FastifyInstance } from "fastify"
import type { CorsOptions } from "../types.js"

export async function registerCors(app: FastifyInstance, options: CorsOptions = {}) {
  await app.register(fastifyCors, {
    origin: options.origin ?? true,
    methods: options.methods,
    allowedHeaders: options.allowedHeaders,
    credentials: options.credentials,
  })
}
