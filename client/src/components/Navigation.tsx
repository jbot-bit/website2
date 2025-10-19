import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FileText, Menu, X } from "lucide-react";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-destructive rounded-md flex items-center justify-center">
              <FileText className="w-5 h-5 text-destructive-foreground" />
            </div>
            <span className="font-black text-lg tracking-tight uppercase">
              SC Diesel Tuning<span className="text-muted-foreground ml-2 text-sm font-medium normal-case hidden sm:inline">Documentation</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => scrollToSection("timeline")}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              data-testid="link-timeline"
            >
              Timeline
            </button>
            <button
              onClick={() => scrollToSection("violations")}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              data-testid="link-violations"
            >
              Violations
            </button>
            <button
              onClick={() => scrollToSection("evidence")}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              data-testid="link-evidence"
            >
              Evidence
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              data-testid="link-faq"
            >
              FAQ
            </button>
            <Button
              size="sm"
              variant="default"
              onClick={() => scrollToSection("download")}
              data-testid="button-download-nav"
            >
              <FileText className="w-4 h-4 mr-2" />
              Download Report
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            size="icon"
            variant="ghost"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-3">
              <button
                onClick={() => scrollToSection("timeline")}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors text-left"
                data-testid="link-timeline-mobile"
              >
                Timeline
              </button>
              <button
                onClick={() => scrollToSection("violations")}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors text-left"
                data-testid="link-violations-mobile"
              >
                Violations
              </button>
              <button
                onClick={() => scrollToSection("evidence")}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors text-left"
                data-testid="link-evidence-mobile"
              >
                Evidence
              </button>
              <button
                onClick={() => scrollToSection("faq")}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors text-left"
                data-testid="link-faq-mobile"
              >
                FAQ
              </button>
              <Button
                size="sm"
                variant="default"
                onClick={() => scrollToSection("download")}
                className="w-full justify-start"
                data-testid="button-download-mobile"
              >
                <FileText className="w-4 h-4 mr-2" />
                Download Report
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
