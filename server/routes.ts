import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all violations
  app.get("/api/violations", async (req, res) => {
    try {
      const violations = await storage.getAllViolations();
      res.json(violations);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch violations" });
    }
  });

  // Get single violation
  app.get("/api/violations/:id", async (req, res) => {
    try {
      const violation = await storage.getViolation(req.params.id);
      if (!violation) {
        return res.status(404).json({ error: "Violation not found" });
      }
      res.json(violation);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch violation" });
    }
  });

  // Get all evidence
  app.get("/api/evidence", async (req, res) => {
    try {
      const category = req.query.category as string | undefined;
      const evidence = category 
        ? await storage.getEvidenceByCategory(category)
        : await storage.getAllEvidence();
      res.json(evidence);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch evidence" });
    }
  });

  // Get single evidence item
  app.get("/api/evidence/:id", async (req, res) => {
    try {
      const evidence = await storage.getEvidence(req.params.id);
      if (!evidence) {
        return res.status(404).json({ error: "Evidence not found" });
      }
      res.json(evidence);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch evidence" });
    }
  });

  // Download fact sheet endpoint (will return JSON for now, can be extended to PDF)
  app.get("/api/download/fact-sheet", async (req, res) => {
    try {
      const violations = await storage.getAllViolations();
      const evidence = await storage.getAllEvidence();
      
      const factSheet = {
        title: "SC Diesel Tuning: Comprehensive Violation Documentation",
        generatedAt: new Date().toISOString(),
        summary: {
          totalViolations: violations.length,
          criticalViolations: violations.filter(v => v.severity === "critical").length,
          highViolations: violations.filter(v => v.severity === "high").length,
          totalEvidence: evidence.length,
        },
        violations,
        evidence,
      };

      res.json(factSheet);
    } catch (error) {
      res.status(500).json({ error: "Failed to generate fact sheet" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
