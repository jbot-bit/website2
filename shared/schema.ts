import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Violation categories and data structure
export const violations = pgTable("violations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  date: text("date").notNull(),
  title: text("title").notNull(),
  category: text("category").notNull(), // "registration", "financial", "conduct", "coercion"
  severity: text("severity").notNull(), // "critical", "high", "medium"
  description: text("description").notNull(),
  evidence: text("evidence").array().notNull(), // array of evidence IDs
  sortOrder: integer("sort_order").notNull(),
});

export const evidence = pgTable("evidence", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  type: text("type").notNull(), // "invoice", "message", "registry", "review"
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  timestamp: text("timestamp"),
  category: text("category").notNull(),
});

export const insertViolationSchema = createInsertSchema(violations).omit({
  id: true,
});

export const insertEvidenceSchema = createInsertSchema(evidence).omit({
  id: true,
});

export type InsertViolation = z.infer<typeof insertViolationSchema>;
export type Violation = typeof violations.$inferSelect;
export type InsertEvidence = z.infer<typeof insertEvidenceSchema>;
export type Evidence = typeof evidence.$inferSelect;

// Frontend-only types for the documentation site
export interface ViolationData {
  id: string;
  date: string;
  title: string;
  category: "registration" | "financial" | "conduct" | "coercion";
  severity: "critical" | "high" | "medium";
  description: string;
  evidence: string[];
  sortOrder: number;
}

export interface EvidenceData {
  id: string;
  title: string;
  type: "invoice" | "message" | "registry" | "review";
  description: string;
  imageUrl?: string;
  timestamp?: string;
  category: string;
}
