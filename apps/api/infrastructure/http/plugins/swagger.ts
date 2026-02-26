import type { FastifyInstance } from "fastify"
import { jsonSchemaTransform } from "fastify-type-provider-zod"

export async function registerSwagger(app: FastifyInstance) {
  const fastifySwagger = await import("@fastify/swagger")
  await app.register(fastifySwagger.default, {
    openapi: {
      openapi: "3.1.0",
      info: {
        title: "Spec-Driven API",
        version: "1.0.0",
        description: "REST API with authentication and user management",
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
    },
    transform: jsonSchemaTransform,
  })

  const scalarPlugin = await import("@scalar/fastify-api-reference")
  await app.register(scalarPlugin.default, {
    routePrefix: "/docs",
  })

  app.get("/openapi.json", async () => {
    return app.swagger()
  })
}
