import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, MessageSquare, Building2, Star, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const evidenceItems = [
  {
    id: "1",
    title: "Original Invoice - Unauthorized Charges",
    type: "invoice",
    category: "Invoices",
    description: "Invoice showing APR LPFP and 4-bar MAP sensor added without customer authorization.",
    timestamp: "2024-03",
  },
  {
    id: "2",
    title: "Altered Invoice - Post-Complaint",
    type: "invoice",
    category: "Invoices",
    description: "Modified version of invoice with line items removed after customer raised concerns.",
    timestamp: "2024-04",
  },
  {
    id: "3",
    title: "Message Admission - Negligent Handling",
    type: "message",
    category: "Messages",
    description: "Written admission stating 'spat on it / loaded it with grease' regarding propshaft handling.",
    timestamp: "2024-04",
  },
  {
    id: "4",
    title: "Coercion Message - Gag Waiver Demand",
    type: "message",
    category: "Messages",
    description: "Message demanding customer sign waiver and delete reviews before vehicle release.",
    timestamp: "2024-04",
  },
  {
    id: "5",
    title: "ABN Lookup Results",
    type: "registry",
    category: "Business Records",
    description: "Official Australian Business Register showing ABN cancelled in 2017.",
    timestamp: "2024",
  },
  {
    id: "6",
    title: "ASIC Company Extract",
    type: "registry",
    category: "Business Records",
    description: "Company registration showing director resignation in June 2023.",
    timestamp: "2024",
  },
  {
    id: "7",
    title: "Google Review Response - False Allegations",
    type: "review",
    category: "Public Responses",
    description: "Public review reply containing false criminal-style accusations against customer.",
    timestamp: "2024-05",
  },
  {
    id: "8",
    title: "Conditional Offer Message",
    type: "message",
    category: "Messages",
    description: "Message offering 'goodwill' pricing only if customer waives all rights.",
    timestamp: "2024-04",
  },
];

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
  const [selectedEvidence, setSelectedEvidence] = useState<typeof evidenceItems[0] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["all", "Invoices", "Messages", "Business Records", "Public Responses"];

  const filteredItems = selectedCategory === "all" 
    ? evidenceItems 
    : evidenceItems.filter(item => item.category === selectedCategory);

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
