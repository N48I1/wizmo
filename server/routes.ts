import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Quizzes
  app.get(api.quizzes.list.path, async (_req, res) => {
    const quizzes = await storage.getQuizzes();
    res.json(quizzes);
  });

  app.get(api.quizzes.get.path, async (req, res) => {
    const quiz = await storage.getQuiz(req.params.id as string);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.json(quiz);
  });

  // Results
  app.post(api.results.create.path, async (req, res) => {
    try {
      const input = api.results.create.input.parse(req.body);
      const result = await storage.createQuizResult(input);
      res.status(201).json(result);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.get(api.results.list.path, async (_req, res) => {
    const results = await storage.getQuizResults();
    res.json(results);
  });

  return httpServer;
}
