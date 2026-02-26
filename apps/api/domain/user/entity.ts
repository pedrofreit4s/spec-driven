interface UserProps {
  id: string
  name: string
  email: string
  passwordHash: string
  createdAt: Date
  updatedAt: Date
}

export class User {
  readonly id: string
  readonly name: string
  readonly email: string
  readonly passwordHash: string
  readonly createdAt: Date
  readonly updatedAt: Date

  private constructor(props: UserProps) {
    this.id = props.id
    this.name = props.name
    this.email = props.email
    this.passwordHash = props.passwordHash
    this.createdAt = props.createdAt
    this.updatedAt = props.updatedAt
  }

  static create(props: UserProps): User {
    return new User(props)
  }

  static fromPersistence(raw: {
    id: string
    name: string
    email: string
    passwordHash: string
    createdAt: Date
    updatedAt: Date
  }): User {
    return new User(raw)
  }
}
