import { pgTable, text, serial, integer, boolean, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name").notNull(),
  profileImage: text("profile_image"),
  level: integer("level").default(1),
  totalPoints: integer("total_points").default(0),
  currentLevelPoints: integer("current_level_points").default(0),
  maxLevelPoints: integer("max_level_points").default(1000),
});

export const dashboardStats = pgTable("dashboard_stats", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  projectsOutsourced: integer("projects_outsourced").default(0),
  reviewsGained: integer("reviews_gained").default(0),
  starsEarned: integer("stars_earned").default(0),
  monthlyEarnings: decimal("monthly_earnings", { precision: 10, scale: 2 }).default("0"),
  weeklyProjects: integer("weekly_projects").default(0),
  weeklyReviews: integer("weekly_reviews").default(0),
  weeklyEarnings: decimal("weekly_earnings", { precision: 10, scale: 2 }).default("0"),
});

export const quickTools = pgTable("quick_tools", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  icon: text("icon").notNull(),
  description: text("description"),
  isActive: boolean("is_active").default(true),
});

export const hotDeals = pgTable("hot_deals", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  originalPrice: decimal("original_price", { precision: 10, scale: 2 }).notNull(),
  discountPrice: decimal("discount_price", { precision: 10, scale: 2 }).notNull(),
  discountPercentage: integer("discount_percentage").notNull(),
  timeLeft: text("time_left").notNull(),
  isActive: boolean("is_active").default(true),
});

export const todoItems = pgTable("todo_items", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  priority: text("priority").notNull(), // "high", "medium", "low"
  points: integer("points").default(0),
  isCompleted: boolean("is_completed").default(false),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  fullName: true,
  profileImage: true,
});

export const insertDashboardStatsSchema = createInsertSchema(dashboardStats).omit({
  id: true,
});

export const insertQuickToolSchema = createInsertSchema(quickTools).omit({
  id: true,
});

export const insertHotDealSchema = createInsertSchema(hotDeals).omit({
  id: true,
});

export const insertTodoItemSchema = createInsertSchema(todoItems).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type DashboardStats = typeof dashboardStats.$inferSelect;
export type InsertDashboardStats = z.infer<typeof insertDashboardStatsSchema>;
export type QuickTool = typeof quickTools.$inferSelect;
export type InsertQuickTool = z.infer<typeof insertQuickToolSchema>;
export type HotDeal = typeof hotDeals.$inferSelect;
export type InsertHotDeal = z.infer<typeof insertHotDealSchema>;
export type TodoItem = typeof todoItems.$inferSelect;
export type InsertTodoItem = z.infer<typeof insertTodoItemSchema>;
