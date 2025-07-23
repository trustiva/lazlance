import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Dashboard API routes
  app.get("/api/dashboard/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const stats = await storage.getDashboardStats(userId);
      const quickTools = await storage.getQuickTools();
      const hotDeals = await storage.getHotDeals();
      const todoItems = await storage.getTodoItems(userId);

      res.json({
        user,
        stats,
        quickTools,
        hotDeals,
        todoItems,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/dashboard/stats/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const statsUpdate = req.body;

      const updatedStats = await storage.updateDashboardStats(userId, statsUpdate);
      if (!updatedStats) {
        return res.status(404).json({ message: "Stats not found" });
      }

      res.json(updatedStats);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/todo/:id/complete", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      const updatedTodo = await storage.updateTodoItem(id, { isCompleted: true });
      if (!updatedTodo) {
        return res.status(404).json({ message: "Todo item not found" });
      }

      res.json(updatedTodo);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/user/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const user = await storage.getUser(id);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
