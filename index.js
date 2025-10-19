// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
import { randomUUID } from "crypto";
var MemStorage = class {
  violations;
  evidence;
  constructor() {
    this.violations = /* @__PURE__ */ new Map();
    this.evidence = /* @__PURE__ */ new Map();
    this.seedData();
  }
  seedData() {
    const violationData = [
      {
        date: "2017",
        title: "Cancelled ABN - Continued Trading",
        category: "registration",
        severity: "critical",
        description: "Australian Business Number (ABN) was cancelled in 2017, yet the business continued to operate and accept payments under the SC Diesel Tuning name without valid registration.",
        evidence: ["5"],
        sortOrder: 1
      },
      {
        date: "June 2023",
        title: "Resigned as Director - Continued Operations",
        category: "registration",
        severity: "critical",
        description: "Owner resigned as company director in June 2023 but continued to issue quotes, accept payments, and run business operations as if legally authorized to do so.",
        evidence: ["6"],
        sortOrder: 2
      },
      {
        date: "2017-2024",
        title: "Unregistered Trading Name",
        category: "registration",
        severity: "high",
        description: "Used 'SC Diesel Tuning' as an unregistered trading name to conduct business while concealing actual company registration details from customers.",
        evidence: ["5", "6"],
        sortOrder: 3
      },
      {
        date: "2024",
        title: "Unauthorized Invoice Additions",
        category: "financial",
        severity: "critical",
        description: "Added costly parts to customer invoices without consent, including APR LPFP and 4-bar MAP sensor, significantly inflating charges beyond agreed scope.",
        evidence: ["1"],
        sortOrder: 4
      },
      {
        date: "2024",
        title: "Retroactive Invoice Alterations",
        category: "financial",
        severity: "critical",
        description: "Altered invoices after customer complaints were raised, removing or editing line items retroactively to obscure unauthorized charges.",
        evidence: ["1", "2"],
        sortOrder: 5
      },
      {
        date: "2024",
        title: "Admitted Negligent Handling",
        category: "conduct",
        severity: "high",
        description: "Admitted in messages to having 'spat on it / loaded it with grease' when referring to customer's propshaft - demonstrating negligent and unprofessional handling of vehicle components.",
        evidence: ["3"],
        sortOrder: 6
      },
      {
        date: "2024",
        title: "Vehicle Withheld for Coercion",
        category: "coercion",
        severity: "critical",
        description: "Withheld customer's vehicle and demanded signing of gag-waiver agreement and deletion of negative reviews as conditions for vehicle release.",
        evidence: ["4"],
        sortOrder: 7
      },
      {
        date: "2024",
        title: "Conditional 'Goodwill' Offer",
        category: "coercion",
        severity: "critical",
        description: "Offered discounted 'goodwill' repair pricing only if customer waived all legal rights and agreed to silence complaints - classic coercion tactic.",
        evidence: ["8"],
        sortOrder: 8
      },
      {
        date: "2024",
        title: "False Criminal Allegations",
        category: "conduct",
        severity: "high",
        description: "Posted false criminal-style allegations about the customer in Google review replies to discredit complaints and retaliate against negative feedback.",
        evidence: ["7"],
        sortOrder: 9
      },
      {
        date: "2017-2024",
        title: "Pattern of Registration Evasion",
        category: "registration",
        severity: "critical",
        description: "Continued to operate and offer services despite cancelled/changed company registration details, demonstrating systematic pattern of regulatory evasion.",
        evidence: ["5", "6"],
        sortOrder: 10
      }
    ];
    violationData.forEach((v) => {
      const id = randomUUID();
      this.violations.set(id, { ...v, id });
    });
    const evidenceData = [
      {
        title: "Original Invoice - Unauthorized Charges",
        type: "invoice",
        description: "Invoice showing APR LPFP and 4-bar MAP sensor added without customer authorization.",
        timestamp: "2024-03",
        category: "Invoices"
      },
      {
        title: "Altered Invoice - Post-Complaint",
        type: "invoice",
        description: "Modified version of invoice with line items removed after customer raised concerns.",
        timestamp: "2024-04",
        category: "Invoices"
      },
      {
        title: "Message Admission - Negligent Handling",
        type: "message",
        description: "Written admission stating 'spat on it / loaded it with grease' regarding propshaft handling.",
        timestamp: "2024-04",
        category: "Messages"
      },
      {
        title: "Coercion Message - Gag Waiver Demand",
        type: "message",
        description: "Message demanding customer sign waiver and delete reviews before vehicle release.",
        timestamp: "2024-04",
        category: "Messages"
      },
      {
        title: "ABN Lookup Results",
        type: "registry",
        description: "Official Australian Business Register showing ABN cancelled in 2017.",
        timestamp: "2024",
        category: "Business Records"
      },
      {
        title: "ASIC Company Extract",
        type: "registry",
        description: "Company registration showing director resignation in June 2023.",
        timestamp: "2024",
        category: "Business Records"
      },
      {
        title: "Google Review Response - False Allegations",
        type: "review",
        description: "Public review reply containing false criminal-style accusations against customer.",
        timestamp: "2024-05",
        category: "Public Responses"
      },
      {
        title: "Conditional Offer Message",
        type: "message",
        description: "Message offering 'goodwill' pricing only if customer waives all rights.",
        timestamp: "2024-04",
        category: "Messages"
      }
    ];
    evidenceData.forEach((e, index) => {
      const id = (index + 1).toString();
      const evidence = {
        ...e,
        id,
        imageUrl: e.imageUrl ?? null,
        timestamp: e.timestamp ?? null
      };
      this.evidence.set(id, evidence);
    });
  }
  async getAllViolations() {
    return Array.from(this.violations.values()).sort((a, b) => a.sortOrder - b.sortOrder);
  }
  async getViolation(id) {
    return this.violations.get(id);
  }
  async createViolation(insertViolation) {
    const id = randomUUID();
    const violation = { ...insertViolation, id };
    this.violations.set(id, violation);
    return violation;
  }
  async getAllEvidence() {
    return Array.from(this.evidence.values());
  }
  async getEvidenceByCategory(category) {
    return Array.from(this.evidence.values()).filter((e) => e.category === category);
  }
  async getEvidence(id) {
    return this.evidence.get(id);
  }
  async createEvidence(insertEvidence) {
    const id = randomUUID();
    const evidence = {
      ...insertEvidence,
      id,
      imageUrl: insertEvidence.imageUrl ?? null,
      timestamp: insertEvidence.timestamp ?? null
    };
    this.evidence.set(id, evidence);
    return evidence;
  }
};
var storage = new MemStorage();

// server/routes.ts
async function registerRoutes(app2) {
  app2.get("/api/violations", async (req, res) => {
    try {
      const violations = await storage.getAllViolations();
      res.json(violations);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch violations" });
    }
  });
  app2.get("/api/violations/:id", async (req, res) => {
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
  app2.get("/api/evidence", async (req, res) => {
    try {
      const category = req.query.category;
      const evidence = category ? await storage.getEvidenceByCategory(category) : await storage.getAllEvidence();
      res.json(evidence);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch evidence" });
    }
  });
  app2.get("/api/evidence/:id", async (req, res) => {
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
  app2.get("/api/download/fact-sheet", async (req, res) => {
    try {
      const violations = await storage.getAllViolations();
      const evidence = await storage.getAllEvidence();
      const factSheet = {
        title: "SC Diesel Tuning: Comprehensive Violation Documentation",
        generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
        summary: {
          totalViolations: violations.length,
          criticalViolations: violations.filter((v) => v.severity === "critical").length,
          highViolations: violations.filter((v) => v.severity === "high").length,
          totalEvidence: evidence.length
        },
        violations,
        evidence
      };
      res.json(factSheet);
    } catch (error) {
      res.status(500).json({ error: "Failed to generate fact sheet" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
var vite_config_default = defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets")
    }
  },
  root: path.resolve(__dirname, "client"),
  base: "/website2/",
  // Matches your repo name for asset paths
  build: {
    outDir: path.resolve(__dirname, "dist"),
    // Simplified to 'dist' for gh-pages
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
