import { BadRequestError } from "@spec-driven/http"

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export class Email {
  readonly value: string

  private constructor(value: string) {
    this.value = value
  }

  static create(raw: string): Email {
    const normalized = raw.trim().toLowerCase()

    if (!EMAIL_REGEX.test(normalized)) {
      throw new BadRequestError("Invalid email format")
    }

    return new Email(normalized)
  }
}
