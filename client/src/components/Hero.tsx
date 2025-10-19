import { Button } from "@/components/ui/button";
import { ChevronDown, FileText, Eye } from "lucide-react";
import { Navigation } from "@/components/Navigation";

export function Hero() {
  const scrollToTimeline = () => {
    const element = document.getElementById("timeline");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToDownload = () => {
    const element = document.getElementById("download");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-b from-background via-background to-card">
      <Navigation />
      
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center pt-16 pb-24">
          {/* Alert Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 border border-destructive/20 mb-8">
            <div className="w-2 h-2 bg-destructive rounded-full animate-pulse" />
            <span className="text-sm font-medium text-destructive">Public Interest Disclosure</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black tracking-tight mb-6 leading-[1.1]">
            SC DIESEL TUNING
            <span className="block text-primary mt-2">A DOCUMENTED PATTERN</span>
            <span className="block text-muted-foreground text-3xl sm:text-5xl lg:text-6xl mt-2">OF BUSINESS FRAUD</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-4 leading-relaxed">
            Evidence-based documentation of systematic business compliance violations, 
            unauthorized financial misconduct, and coercive practices spanning multiple years.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-12 text-sm font-mono">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-destructive rounded-sm" />
              <span className="text-muted-foreground">10 Critical Violations</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary rounded-sm" />
              <span className="text-muted-foreground">6+ Years of Misconduct</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-card-border rounded-sm" />
              <span className="text-muted-foreground">Multiple Evidence Sources</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              variant="default"
              onClick={scrollToTimeline}
              className="min-w-[200px]"
              data-testid="button-view-timeline"
            >
              <Eye className="w-5 h-5 mr-2" />
              View Evidence Timeline
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={scrollToDownload}
              className="min-w-[200px]"
              data-testid="button-download-hero"
            >
              <FileText className="w-5 h-5 mr-2" />
              Download Full Report
            </Button>
          </div>

          {/* Scroll Indicator */}
          <button
            onClick={scrollToTimeline}
            className="mt-16 inline-flex flex-col items-center gap-2 text-primary hover:text-primary/80 transition-colors group"
            data-testid="button-scroll-down"
          >
            <span className="text-sm font-medium">Scroll for Details</span>
            <ChevronDown className="w-6 h-6 animate-bounce group-hover:text-primary" />
          </button>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-card to-transparent pointer-events-none" />
    </div>
  );
}
