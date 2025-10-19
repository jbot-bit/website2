import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, AlertTriangle, Info } from "lucide-react";

const violations = [
  {
    id: "1",
    date: "2017",
    title: "Cancelled ABN - Continued Trading",
    category: "registration",
    severity: "critical",
    description: "Australian Business Number (ABN) was cancelled in 2017, yet the business continued to operate and accept payments under the SC Diesel Tuning name without valid registration.",
  },
  {
    id: "2",
    date: "June 2023",
    title: "Resigned as Director - Continued Operations",
    category: "registration",
    severity: "critical",
    description: "Owner resigned as company director in June 2023 but continued to issue quotes, accept payments, and run business operations as if legally authorized to do so.",
  },
  {
    id: "3",
    date: "2017-2024",
    title: "Unregistered Trading Name",
    category: "registration",
    severity: "high",
    description: "Used 'SC Diesel Tuning' as an unregistered trading name to conduct business while concealing actual company registration details from customers.",
  },
  {
    id: "4",
    date: "2024",
    title: "Unauthorized Invoice Additions",
    category: "financial",
    severity: "critical",
    description: "Added costly parts to customer invoices without consent, including APR LPFP and 4-bar MAP sensor, significantly inflating charges beyond agreed scope.",
  },
  {
    id: "5",
    date: "2024",
    title: "Retroactive Invoice Alterations",
    category: "financial",
    severity: "critical",
    description: "Altered invoices after customer complaints were raised, removing or editing line items retroactively to obscure unauthorized charges.",
  },
  {
    id: "6",
    date: "2024",
    title: "Admitted Negligent Handling",
    category: "conduct",
    severity: "high",
    description: "Admitted in messages to having 'spat on it / loaded it with grease' when referring to customer's propshaft - demonstrating negligent and unprofessional handling of vehicle components.",
  },
  {
    id: "7",
    date: "2024",
    title: "Vehicle Withheld for Coercion",
    category: "coercion",
    severity: "critical",
    description: "Withheld customer's vehicle and demanded signing of gag-waiver agreement and deletion of negative reviews as conditions for vehicle release.",
  },
  {
    id: "8",
    date: "2024",
    title: "Conditional 'Goodwill' Offer",
    category: "coercion",
    severity: "critical",
    description: "Offered discounted 'goodwill' repair pricing only if customer waived all legal rights and agreed to silence complaints - classic coercion tactic.",
  },
  {
    id: "9",
    date: "2024",
    title: "False Criminal Allegations",
    category: "conduct",
    severity: "high",
    description: "Posted false criminal-style allegations about the customer in Google review replies to discredit complaints and retaliate against negative feedback.",
  },
  {
    id: "10",
    date: "2017-2024",
    title: "Pattern of Registration Evasion",
    category: "registration",
    severity: "critical",
    description: "Continued to operate and offer services despite cancelled/changed company registration details, demonstrating systematic pattern of regulatory evasion.",
  },
];

const getSeverityIcon = (severity: string) => {
  switch (severity) {
    case "critical":
      return <AlertCircle className="w-5 h-5" />;
    case "high":
      return <AlertTriangle className="w-5 h-5" />;
    default:
      return <Info className="w-5 h-5" />;
  }
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "critical":
      return "bg-destructive/10 text-destructive border-destructive/20";
    case "high":
      return "bg-primary/10 text-primary border-primary/20";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
};

const getCategoryLabel = (category: string) => {
  switch (category) {
    case "registration":
      return "Business Registration";
    case "financial":
      return "Financial Misconduct";
    case "conduct":
      return "Professional Conduct";
    case "coercion":
      return "Coercion & Intimidation";
    default:
      return category;
  }
};

export function Timeline() {
  return (
    <section id="timeline" className="py-24 px-4 sm:px-6 lg:px-8 bg-card">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black mb-4">
            VIOLATION TIMELINE
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A chronological record of documented business compliance violations and misconduct spanning multiple years.
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden md:block" />

          {/* Timeline Items */}
          <div className="space-y-8">
            {violations.map((violation, index) => (
              <div key={violation.id} className="relative" data-testid={`timeline-item-${violation.id}`}>
                {/* Timeline Marker */}
                <div className="absolute left-8 top-6 w-4 h-4 -ml-[7px] rounded-full bg-destructive border-4 border-card hidden md:block" />

                {/* Content Card */}
                <Card className="ml-0 md:ml-20 p-6 hover-elevate">
                  <div className="flex flex-col gap-4">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-md ${getSeverityColor(violation.severity)}`}>
                          {getSeverityIcon(violation.severity)}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold mb-1" data-testid={`text-violation-title-${violation.id}`}>
                            {violation.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge variant="outline" className="font-mono text-xs">
                              {violation.date}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {getCategoryLabel(violation.category)}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <Badge className={getSeverityColor(violation.severity)}>
                        {violation.severity.toUpperCase()}
                      </Badge>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed" data-testid={`text-violation-description-${violation.id}`}>
                      {violation.description}
                    </p>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
