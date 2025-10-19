import { type Violation, type Evidence, type InsertViolation, type InsertEvidence } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Violations
  getAllViolations(): Promise<Violation[]>;
  getViolation(id: string): Promise<Violation | undefined>;
  createViolation(violation: InsertViolation): Promise<Violation>;
  
  // Evidence
  getAllEvidence(): Promise<Evidence[]>;
  getEvidenceByCategory(category: string): Promise<Evidence[]>;
  getEvidence(id: string): Promise<Evidence | undefined>;
  createEvidence(evidence: InsertEvidence): Promise<Evidence>;
}

export class MemStorage implements IStorage {
  private violations: Map<string, Violation>;
  private evidence: Map<string, Evidence>;

  constructor() {
    this.violations = new Map();
    this.evidence = new Map();
    this.seedData();
  }

  private seedData() {
    // Seed violations
    const violationData: InsertViolation[] = [
      {
        date: "2017",
        title: "Cancelled ABN - Continued Trading",
        category: "registration",
        severity: "critical",
        description: "Australian Business Number (ABN) was cancelled in 2017, yet the business continued to operate and accept payments under the SC Diesel Tuning name without valid registration.",
        evidence: ["5"],
        sortOrder: 1,
      },
      {
        date: "June 2023",
        title: "Resigned as Director - Continued Operations",
        category: "registration",
        severity: "critical",
        description: "Owner resigned as company director in June 2023 but continued to issue quotes, accept payments, and run business operations as if legally authorized to do so.",
        evidence: ["6"],
        sortOrder: 2,
      },
      {
        date: "2017-2024",
        title: "Unregistered Trading Name",
        category: "registration",
        severity: "high",
        description: "Used 'SC Diesel Tuning' as an unregistered trading name to conduct business while concealing actual company registration details from customers.",
        evidence: ["5", "6"],
        sortOrder: 3,
      },
      {
        date: "2024",
        title: "Unauthorized Invoice Additions",
        category: "financial",
        severity: "critical",
        description: "Added costly parts to customer invoices without consent, including APR LPFP and 4-bar MAP sensor, significantly inflating charges beyond agreed scope.",
        evidence: ["1"],
        sortOrder: 4,
      },
      {
        date: "2024",
        title: "Retroactive Invoice Alterations",
        category: "financial",
        severity: "critical",
        description: "Altered invoices after customer complaints were raised, removing or editing line items retroactively to obscure unauthorized charges.",
        evidence: ["1", "2"],
        sortOrder: 5,
      },
      {
        date: "2024",
        title: "Admitted Negligent Handling",
        category: "conduct",
        severity: "high",
        description: "Admitted in messages to having 'spat on it / loaded it with grease' when referring to customer's propshaft - demonstrating negligent and unprofessional handling of vehicle components.",
        evidence: ["3"],
        sortOrder: 6,
      },
      {
        date: "2024",
        title: "Vehicle Withheld for Coercion",
        category: "coercion",
        severity: "critical",
        description: "Withheld customer's vehicle and demanded signing of gag-waiver agreement and deletion of negative reviews as conditions for vehicle release.",
        evidence: ["4"],
        sortOrder: 7,
      },
      {
        date: "2024",
        title: "Conditional 'Goodwill' Offer",
        category: "coercion",
        severity: "critical",
        description: "Offered discounted 'goodwill' repair pricing only if customer waived all legal rights and agreed to silence complaints - classic coercion tactic.",
        evidence: ["8"],
        sortOrder: 8,
      },
      {
        date: "2024",
        title: "False Criminal Allegations",
        category: "conduct",
        severity: "high",
        description: "Posted false criminal-style allegations about the customer in Google review replies to discredit complaints and retaliate against negative feedback.",
        evidence: ["7"],
        sortOrder: 9,
      },
      {
        date: "2017-2024",
        title: "Pattern of Registration Evasion",
        category: "registration",
        severity: "critical",
        description: "Continued to operate and offer services despite cancelled/changed company registration details, demonstrating systematic pattern of regulatory evasion.",
        evidence: ["5", "6"],
        sortOrder: 10,
      },
    ];

    violationData.forEach((v) => {
      const id = randomUUID();
      this.violations.set(id, { ...v, id });
    });

    // Seed evidence
    const evidenceData: InsertEvidence[] = [
      {
        title: "Original Invoice - Unauthorized Charges",
        type: "invoice",
        description: "Invoice showing APR LPFP and 4-bar MAP sensor added without customer authorization.",
        timestamp: "2024-03",
        category: "Invoices",
      },
      {
        title: "Altered Invoice - Post-Complaint",
        type: "invoice",
        description: "Modified version of invoice with line items removed after customer raised concerns.",
        timestamp: "2024-04",
        category: "Invoices",
      },
      {
        title: "Message Admission - Negligent Handling",
        type: "message",
        description: "Written admission stating 'spat on it / loaded it with grease' regarding propshaft handling.",
        timestamp: "2024-04",
        category: "Messages",
      },
      {
        title: "Coercion Message - Gag Waiver Demand",
        type: "message",
        description: "Message demanding customer sign waiver and delete reviews before vehicle release.",
        timestamp: "2024-04",
        category: "Messages",
      },
      {
        title: "ABN Lookup Results",
        type: "registry",
        description: "Official Australian Business Register showing ABN cancelled in 2017.",
        timestamp: "2024",
        category: "Business Records",
      },
      {
        title: "ASIC Company Extract",
        type: "registry",
        description: "Company registration showing director resignation in June 2023.",
        timestamp: "2024",
        category: "Business Records",
      },
      {
        title: "Google Review Response - False Allegations",
        type: "review",
        description: "Public review reply containing false criminal-style accusations against customer.",
        timestamp: "2024-05",
        category: "Public Responses",
      },
      {
        title: "Conditional Offer Message",
        type: "message",
        description: "Message offering 'goodwill' pricing only if customer waives all rights.",
        timestamp: "2024-04",
        category: "Messages",
      },
    ];

    evidenceData.forEach((e, index) => {
      const id = (index + 1).toString();
      this.evidence.set(id, { ...e, id });
    });
  }

  async getAllViolations(): Promise<Violation[]> {
    return Array.from(this.violations.values()).sort((a, b) => a.sortOrder - b.sortOrder);
  }

  async getViolation(id: string): Promise<Violation | undefined> {
    return this.violations.get(id);
  }

  async createViolation(insertViolation: InsertViolation): Promise<Violation> {
    const id = randomUUID();
    const violation: Violation = { ...insertViolation, id };
    this.violations.set(id, violation);
    return violation;
  }

  async getAllEvidence(): Promise<Evidence[]> {
    return Array.from(this.evidence.values());
  }

  async getEvidenceByCategory(category: string): Promise<Evidence[]> {
    return Array.from(this.evidence.values()).filter(e => e.category === category);
  }

  async getEvidence(id: string): Promise<Evidence | undefined> {
    return this.evidence.get(id);
  }

  async createEvidence(insertEvidence: InsertEvidence): Promise<Evidence> {
    const id = randomUUID();
    const evidence: Evidence = { ...insertEvidence, id };
    this.evidence.set(id, evidence);
    return evidence;
  }
}

export const storage = new MemStorage();
