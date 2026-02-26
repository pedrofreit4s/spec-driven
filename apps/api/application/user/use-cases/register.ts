import crypto from "node:crypto"
import { ConflictError } from "@spec-driven/http"
import { User } from "../../../domain/user/entity.js"
import type { UserRepository } from "../../../domain/user/repository.js"
import { Email } from "../../../domain/user/value-objects/email.js"
import { Password } from "../../../domain/user/value-objects/password.js"
import type { Hasher } from "../ports/hasher.js"

interface RegisterInput {
  name: string
  email: string
  password: string
}

interface RegisterOutput {
  user: { id: string; name: string; email: string }
}

export class RegisterUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hasher: Hasher
  ) {}

  async execute(input: RegisterInput): Promise<RegisterOutput> {
    const email = Email.create(input.email)
    Password.create(input.password)

    const existingUser = await this.userRepository.findByEmail(email.value)

    if (existingUser) {
      throw new ConflictError("Email already in use")
    }

    const passwordHash = await this.hasher.hash(input.password)
    const now = new Date()

    const user = User.create({
      id: crypto.randomUUID(),
      name: input.name,
      email: email.value,
      passwordHash,
      createdAt: now,
      updatedAt: now,
    })

    await this.userRepository.create(user)

    return {
      user: { id: user.id, name: user.name, email: user.email },
    }
  }
}
