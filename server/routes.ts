import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTestSessionSchema, updateTestSessionSchema } from "@shared/schema";
import { nanoid } from "nanoid";

export async function registerRoutes(app: Express): Promise<Server> {
  // Create a new test session
  app.post("/api/test-sessions", async (req, res) => {
    try {
      const sessionId = nanoid();
      const sessionData = insertTestSessionSchema.parse({
        sessionId,
        currentQuestionIndex: 0,
        answers: {},
        isCompleted: 0,
      });

      const session = await storage.createTestSession(sessionData);
      res.json(session);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Get test session
  app.get("/api/test-sessions/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const session = await storage.getTestSession(sessionId);
      
      if (!session) {
        return res.status(404).json({ message: "Test session not found" });
      }

      res.json(session);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Update test session (save answers, progress, results)
  app.patch("/api/test-sessions/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const updates = updateTestSessionSchema.parse(req.body);

      const session = await storage.updateTestSession(sessionId, updates);
      
      if (!session) {
        return res.status(404).json({ message: "Test session not found" });
      }

      res.json(session);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Delete test session
  app.delete("/api/test-sessions/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const deleted = await storage.deleteTestSession(sessionId);
      
      if (!deleted) {
        return res.status(404).json({ message: "Test session not found" });
      }

      res.json({ message: "Test session deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
