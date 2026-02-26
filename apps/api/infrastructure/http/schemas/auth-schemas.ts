import { z } from "zod"

// Request schemas
export const registerBodySchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[a-zA-Z]/, "Password must contain at least one letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
})

export const loginBodySchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
})

export const refreshBodySchema = z.object({
  refreshToken: z.string().min(1, "Refresh token is required"),
})

// Response schemas
const userBasicSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
})

export const registerResponseSchema = z.object({
  user: userBasicSchema,
})

export const loginResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  user: userBasicSchema,
})

export const refreshResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
})

export type RegisterBody = z.infer<typeof registerBodySchema>
export type LoginBody = z.infer<typeof loginBodySchema>
export type RefreshBody = z.infer<typeof refreshBodySchema>
