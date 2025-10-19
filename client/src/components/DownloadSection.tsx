import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Share2, Mail } from "lucide-react";

export function DownloadSection() {
  const handleDownload = () => {
    // This will be connected to backend in integration phase
    alert("Download functionality will be implemented in the integration phase. This will generate a comprehensive PDF fact sheet with all documented violations and evidence.");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "SC Diesel Tuning: Documented Business Violations",
        text: "Evidence-based documentation of business compliance violations and misconduct",
        url: window.location.href,
      }).catch(() => {
        // User cancelled or share failed
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <section id="download" className="py-24 px-4 sm:px-6 lg:px-8 bg-card">
      <div className="max-w-4xl mx-auto">
        <Card className="p-8 lg:p-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg bg-primary/10 mb-6">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-black mb-4">
              DOWNLOAD COMPREHENSIVE REPORT
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get the complete fact sheet compiling all documented violations, evidence summaries, 
              and reference information in a single downloadable PDF document.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="p-4 bg-background rounded-lg border border-border">
              <h3 className="font-semibold mb-2">Report Includes</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Complete violation timeline</li>
                <li>• Evidence summaries with references</li>
                <li>• Business registry documentation</li>
                <li>• Legal basis and context</li>
              </ul>
            </div>
            <div className="p-4 bg-background rounded-lg border border-border">
              <h3 className="font-semibold mb-2">Document Details</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Format: PDF (A4)</li>
                <li>• Pages: ~15-20 pages</li>
                <li>• Last Updated: 2024</li>
                <li>• Printable & shareable</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={handleDownload}
              className="min-w-[200px]"
              data-testid="button-download-report"
            >
              <Download className="w-5 h-5 mr-2" />
              Download PDF Report
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleShare}
              data-testid="button-share"
            >
              <Share2 className="w-5 h-5 mr-2" />
              Share This Site
            </Button>
          </div>

          <div className="mt-8 pt-8 border-t border-border">
            <div className="text-center">
              <h3 className="font-semibold mb-3">Contact for Additional Evidence</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Regulatory authorities, legal counsel, or journalists seeking additional documentation 
                can request access to original evidence files.
              </p>
              <Button
                variant="secondary"
                size="sm"
                data-testid="button-contact"
              >
                <Mail className="w-4 h-4 mr-2" />
                Contact for Evidence Access
              </Button>
            </div>
          </div>
        </Card>

        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-muted-foreground">
          <p className="mb-2">
            <strong className="text-foreground">Last Updated:</strong> October 2024
          </p>
          <p className="mb-4">
            This is a public interest disclosure website documenting business compliance violations.
          </p>
          <p className="text-xs">
            All information presented is factual, evidence-based, and verifiable. Documentation maintained for regulatory and legal purposes.
          </p>
        </footer>
      </div>
    </section>
  );
}
