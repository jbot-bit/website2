import { Card } from "@/components/ui/card";
import { FileWarning, DollarSign, UserX, Lock } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const categories = [
  {
    id: "registration",
    title: "Business Registration Violations",
    icon: FileWarning,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
    violations: [
      {
        title: "Cancelled ABN (2017)",
        details: "Australian Business Number cancelled yet continued accepting payments and operating as SC Diesel Tuning without valid business registration.",
        impact: "Customers transacted with an entity lacking legal business registration, potentially invalidating contracts and creating liability issues.",
      },
      {
        title: "Post-Resignation Operations (June 2023)",
        details: "After resigning as company director, continued to quote, invoice, and accept payments as if still authorized to legally represent the business entity.",
        impact: "Customers were misled into believing they were dealing with a properly registered and authorized business representative.",
      },
      {
        title: "Unregistered Trading Name",
        details: "Operated under 'SC Diesel Tuning' without proper business name registration, concealing true company structure and registration status from customers.",
        impact: "Made it difficult for customers to verify business legitimacy, conduct due diligence, or pursue legal recourse through proper channels.",
      },
    ],
  },
  {
    id: "financial",
    title: "Financial Misconduct",
    icon: DollarSign,
    color: "text-primary",
    bgColor: "bg-primary/10",
    violations: [
      {
        title: "Unauthorized Invoice Additions",
        details: "Added expensive parts (APR LPFP, 4-bar MAP sensor) to customer invoices without prior authorization, consent, or discussion of necessity.",
        impact: "Customers were charged hundreds or thousands of dollars for parts never requested, discussed, or agreed upon.",
      },
      {
        title: "Retroactive Invoice Alterations",
        details: "Modified invoices after complaints were filed, removing or editing line items to make unauthorized charges less obvious or harder to track.",
        impact: "Destroyed audit trail and made it difficult for customers to prove the scope of unauthorized charges or seek appropriate remedies.",
      },
    ],
  },
  {
    id: "conduct",
    title: "Professional Conduct Failures",
    icon: UserX,
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
    violations: [
      {
        title: "Admitted Negligent Handling",
        details: "Admitted in written messages to 'spitting on' and 'loading with grease' customer vehicle components (propshaft) in a negligent, unprofessional manner.",
        impact: "Demonstrates flagrant disregard for professional standards and customer property, with potential for component damage.",
      },
      {
        title: "False Criminal Allegations",
        details: "Posted false criminal-style accusations about the customer in public Google review responses to discredit complaints and damage reputation.",
        impact: "Attempted character assassination and retaliation against customer for exercising right to leave honest feedback about service experience.",
      },
    ],
  },
  {
    id: "coercion",
    title: "Coercion & Intimidation",
    icon: Lock,
    color: "text-chart-1",
    bgColor: "bg-chart-1/10",
    violations: [
      {
        title: "Vehicle Withholding",
        details: "Refused to release customer's vehicle unless customer signed gag-waiver agreement and deleted negative online reviews.",
        impact: "Held customer property hostage to force silence and suppress legitimate complaints - potentially unlawful conversion of property.",
      },
      {
        title: "Conditional 'Goodwill' Offers",
        details: "Offered reduced 'goodwill' pricing for repairs only if customer waived all legal rights and agreed not to pursue complaints.",
        impact: "Used financial leverage to coerce customers into abandoning legal rights and accepting inferior remedies to silence complaints.",
      },
    ],
  },
];

export function ViolationBreakdown() {
  return (
    <section id="violations" className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black mb-4">
            DETAILED BREAKDOWN
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Systematic analysis of violations organized by category, demonstrating patterns of misconduct across multiple domains.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Card key={category.id} className="p-6" data-testid={`card-category-${category.id}`}>
                <div className="flex items-start gap-4 mb-6">
                  <div className={`p-3 rounded-lg ${category.bgColor}`}>
                    <Icon className={`w-6 h-6 ${category.color}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">{category.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {category.violations.length} documented violation{category.violations.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  {category.violations.map((violation, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left hover:no-underline" data-testid={`accordion-trigger-${category.id}-${index}`}>
                        <span className="font-semibold">{violation.title}</span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 pt-2">
                          <div>
                            <h4 className="text-sm font-semibold text-muted-foreground mb-2">Details</h4>
                            <p className="text-sm leading-relaxed">{violation.details}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-muted-foreground mb-2">Customer Impact</h4>
                            <p className="text-sm leading-relaxed text-muted-foreground">{violation.impact}</p>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
