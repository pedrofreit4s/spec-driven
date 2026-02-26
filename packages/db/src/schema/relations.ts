import { relations } from "drizzle-orm"
import { refreshTokens } from "./refresh-tokens"
import { users } from "./users"

export const usersRelations = relations(users, ({ many }) => ({
  refreshTokens: many(refreshTokens),
}))

export const refreshTokensRelations = relations(refreshTokens, ({ one }) => ({
  user: one(users, { fields: [refreshTokens.userId], references: [users.id] }),
}))
