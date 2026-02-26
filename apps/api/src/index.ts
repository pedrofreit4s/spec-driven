import { buildApp } from "./app.js"

const PORT = Number(process.env.PORT) || 3001
const HOST = process.env.HOST ?? "0.0.0.0"

const app = buildApp()

try {
  await app.start({ port: PORT, host: HOST })
} catch (err) {
  app.log.error(err)
  process.exit(1)
}
