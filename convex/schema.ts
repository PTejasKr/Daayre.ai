import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  conversations: defineTable({
    userId: v.optional(v.id("users")),
    sessionId: v.string(),
    messages: v.array(v.object({
      id: v.string(),
      role: v.union(v.literal("user"), v.literal("assistant")),
      content: v.string(),
      timestamp: v.number(),
    })),
    location: v.optional(v.string()),
  }).index("by_session", ["sessionId"]),
  
  lawyers: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    address: v.string(),
    specialization: v.array(v.string()),
    rating: v.number(),
    location: v.string(),
    website: v.optional(v.string()),
  }).index("by_location", ["location"]),
  
  userPreferences: defineTable({
    userId: v.id("users"),
    theme: v.union(v.literal("light"), v.literal("dark")),
    location: v.optional(v.string()),
  }).index("by_user", ["userId"]),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
