import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, MessageSquare, Building2, Star, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEvidence } from "@/hooks/useEvidence";
import type { Evidence } from "@shared/schema";

const getTypeIcon = (type: string) => {
  switch (type) {
    case "invoice":
      return FileText;
    case "message":
      return MessageSquare;
    case "registry":
      return Building2;
    case "review":
      return Star;
    default:
      return FileText;
  }
};

export function EvidenceGallery() {
  const [selectedEvidence, setSelectedEvidence] = useState<Evidence | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { data: evidenceItems, isLoading } = useEvidence();

  const categories = ["all", "Invoices", "Messages", "Business Records", "Public Responses"];

  const filteredItems = !evidenceItems ? [] : selectedCategory === "all" 
    ? evidenceItems 
    : evidenceItems.filter(item => item.category === selectedCategory);

  if (isLoading) {
    return (
      <section id="evidence" className="py-24 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-7xl mx-auto flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </section>
    );
  }

  return (
    <section id="evidence" className="py-24 px-4 sm:px-6 lg:px-8 bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black mb-4">
            EVIDENCE REPOSITORY
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Documented evidence including invoices, message screenshots, business registry records, and public responses.
          </p>
        </div>

        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 mb-8 h-auto">
            {categories.map((category) => (
              <TabsTrigger 
                key={category} 
                value={category}
                className="capitalize"
                data-testid={`tab-${category.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {category === "all" ? "All Evidence" : category}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={selectedCategory} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => {
                const Icon = getTypeIcon(item.type);
                return (
                  <Card
                    key={item.id}
                    className="p-6 hover-elevate cursor-pointer"
                    onClick={() => setSelectedEvidence(item)}
                    data-testid={`card-evidence-${item.id}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg shrink-0">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold mb-2 leading-tight" data-testid={`text-evidence-title-${item.id}`}>
                          {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {item.description}
                        </p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="font-mono text-xs">
                            {item.timestamp}
                          </Badge>
                          <Badge variant="secondary" className="text-xs capitalize">
                            {item.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>

        {/* Evidence Detail Modal */}
        <Dialog open={!!selectedEvidence} onOpenChange={(open) => !open && setSelectedEvidence(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">
                {selectedEvidence?.title}
              </DialogTitle>
            </DialogHeader>
            
            {selectedEvidence && (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant="outline" className="font-mono">
                    {selectedEvidence.timestamp}
                  </Badge>
                  <Badge variant="secondary" className="capitalize">
                    {selectedEvidence.type}
                  </Badge>
                  <Badge>{selectedEvidence.category}</Badge>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Description</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedEvidence.description}
                  </p>
                </div>

                <div className="bg-muted/50 rounded-lg p-8 text-center">
                  <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Evidence document placeholder. In production, actual scanned documents, 
                    screenshots, and official records would be displayed here with appropriate redactions.
                  </p>
                </div>

                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                  <p className="text-sm text-destructive font-medium">
                    <strong>Note:</strong> All evidence has been verified and preserved with timestamps. 
                    Original documents available upon request to regulatory authorities.
                  </p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
