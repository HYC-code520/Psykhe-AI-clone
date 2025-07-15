import { pgTable, text, serial, integer, json, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const testSessions = pgTable("test_sessions", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull().unique(),
  currentQuestionIndex: integer("current_question_index").notNull().default(0),
  answers: json("answers").$type<Record<string, string[]>>().notNull().default({}),
  isCompleted: integer("is_completed").notNull().default(0), // SQLite boolean
  results: json("results").$type<{
    openness: number;
    conscientiousness: number;
    extraversion: number;
    agreeableness: number;
    neuroticism: number;
  }>(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertTestSessionSchema = createInsertSchema(testSessions).omit({
  id: true,
  createdAt: true,
});

export const updateTestSessionSchema = createInsertSchema(testSessions).omit({
  id: true,
  sessionId: true,
  createdAt: true,
}).partial();

export type TestSession = typeof testSessions.$inferSelect;
export type InsertTestSession = z.infer<typeof insertTestSessionSchema>;
export type UpdateTestSession = z.infer<typeof updateTestSessionSchema>;

// Question types for the frontend
export interface Question {
  id: string;
  text: string;
  options: {
    id: string;
    text: string;
    color: string;
    trait: keyof PersonalityTraits;
    score: number;
    image?: string;
  }[];
}

export interface PersonalityTraits {
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number;
}

export interface PersonalityResults extends PersonalityTraits {
  sessionId: string;
  descriptions: {
    openness: string;
    conscientiousness: string;
    extraversion: string;
    agreeableness: string;
    neuroticism: string;
  };
}
