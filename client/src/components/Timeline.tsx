import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, AlertTriangle, Info, Loader2 } from "lucide-react";
import { useViolations } from "@/hooks/useViolations";

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
  const { data: violations, isLoading } = useViolations();

  if (isLoading) {
    return (
      <section id="timeline" className="py-24 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-5xl mx-auto flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </section>
    );
  }

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
            {violations?.map((violation, index) => (
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
