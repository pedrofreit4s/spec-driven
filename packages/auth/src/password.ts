import bcrypt from "bcryptjs"
import type { HasherOptions } from "./types.js"

export function createHasher(options: HasherOptions = {}) {
  const { saltRounds = 10 } = options

  return {
    async hash(plain: string) {
      return bcrypt.hash(plain, saltRounds)
    },

    async compare(plain: string, hashed: string) {
      return bcrypt.compare(plain, hashed)
    },
  }
}
