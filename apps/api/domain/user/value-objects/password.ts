import { BadRequestError } from "@spec-driven/http"

export class Password {
  readonly value: string

  private constructor(value: string) {
    this.value = value
  }

  static create(raw: string): Password {
    if (raw.length < 8) {
      throw new BadRequestError("Password must be at least 8 characters long")
    }

    if (!/[a-zA-Z]/.test(raw)) {
      throw new BadRequestError("Password must contain at least one letter")
    }

    if (!/[0-9]/.test(raw)) {
      throw new BadRequestError("Password must contain at least one number")
    }

    return new Password(raw)
  }
}
