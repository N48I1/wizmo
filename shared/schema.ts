import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// We'll use a simple table to store quiz results if we were online, 
// but mostly we are defining the shapes for the frontend here.

export const quizResults = pgTable("quiz_results", {
  id: serial("id").primaryKey(),
  category: text("category").notNull(),
  score: integer("score").notNull(),
  totalQuestions: integer("total_questions").notNull(),
  stars: integer("stars").notNull(),
  completedAt: text("completed_at").notNull(), // ISO string
});

export const insertQuizResultSchema = createInsertSchema(quizResults).omit({ id: true });

export type QuizResult = typeof quizResults.$inferSelect;
export type InsertQuizResult = z.infer<typeof insertQuizResultSchema>;

// === APP SPECIFIC TYPES (For JSON Data) ===

export const OptionSchema = z.string();

export const QuestionSchema = z.object({
  id: z.number(),
  question: z.string(),
  options: z.array(z.string()),
  correctAnswerIndex: z.number(),
  image: z.string().optional(), // filename
});

export const QuizCategorySchema = z.object({
  id: z.string(), // e.g. "vocab-1"
  title: z.string(), // e.g. "Vocabulary"
  level: z.number(),
  description: z.string(),
  icon: z.string().optional(), // icon name
  questions: z.array(QuestionSchema),
});

export type Question = z.infer<typeof QuestionSchema>;
export type QuizCategory = z.infer<typeof QuizCategorySchema>;

// Request types
export type CreateQuizResultRequest = InsertQuizResult;
