import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Shield, Scale, Eye, FileCheck } from "lucide-react";

const faqs = [
  {
    question: "Is this website legal?",
    answer: "Yes. This website constitutes public interest disclosure of documented business compliance violations. All statements are factual, evidence-based, and protected under Australian consumer protection laws and freedom of speech principles. The information presented is demonstrably true and serves the legitimate public interest of warning potential customers about documented patterns of misconduct.",
  },
  {
    question: "Why was this website created?",
    answer: "This website was created to document and publicly disclose a pattern of serious business compliance violations, financial misconduct, and coercive practices. When a business systematically violates regulations, alters financial documents, and uses coercion tactics, public disclosure serves the legitimate interest of consumer protection and regulatory enforcement.",
  },
  {
    question: "How is the information verified?",
    answer: "All violations documented on this site are supported by verifiable evidence including official business registry records (ABN, ASIC), original and altered invoices, written message admissions, and public review responses. Evidence has been preserved with timestamps and metadata. Original documents are available for verification by regulatory authorities, legal counsel, or courts upon appropriate request.",
  },
  {
    question: "Can this information be shared?",
    answer: "Yes. As factual public interest disclosure, this information can be freely shared. The documented violations represent matters of legitimate public concern regarding business compliance and consumer protection. Sharing this information helps warn other potential customers and supports regulatory oversight of business practices.",
  },
  {
    question: "What should affected customers do?",
    answer: "Customers who have experienced similar issues should: 1) Document all evidence (invoices, messages, agreements), 2) Report to relevant authorities (ACCC, Fair Trading, ASIC), 3) Consider legal consultation regarding consumer rights, 4) File formal complaints with industry associations if applicable, and 5) Leave honest reviews detailing experiences to warn other consumers.",
  },
  {
    question: "Has this been reported to authorities?",
    answer: "The violations documented here represent matters appropriate for reporting to multiple Australian regulatory bodies including ASIC (business registration violations), ACCC (consumer protection), state Fair Trading offices (unfair practices), and potentially law enforcement (coercion, false statements). This public disclosure serves to complement formal regulatory processes.",
  },
];

const principles = [
  {
    icon: Shield,
    title: "Truth Defense",
    description: "All statements are factually accurate and evidence-based",
  },
  {
    icon: Eye,
    title: "Public Interest",
    description: "Disclosure serves legitimate consumer protection purposes",
  },
  {
    icon: Scale,
    title: "Fair Comment",
    description: "Analysis represents reasonable conclusions from documented facts",
  },
  {
    icon: FileCheck,
    title: "Verified Evidence",
    description: "All claims supported by timestamped, verifiable documentation",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black mb-4">
            LEGAL BASIS & FAQ
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Understanding the legal defensibility and public interest justification for this documentation.
          </p>
        </div>

        {/* Legal Principles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {principles.map((principle, index) => {
            const Icon = principle.icon;
            return (
              <Card key={index} className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold mb-2">{principle.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {principle.description}
                </p>
              </Card>
            );
          })}
        </div>

        {/* FAQ Accordion */}
        <Card className="p-8">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`}>
                <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline" data-testid={`accordion-trigger-faq-${index}`}>
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground leading-relaxed pt-2">
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>

        {/* Disclaimer */}
        <div className="mt-12 p-6 bg-muted/50 border border-border rounded-lg">
          <p className="text-sm text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Legal Disclaimer:</strong> This website presents factual information based on documented evidence for public interest purposes. All statements are defensible as truth or fair comment on matters of public concern. The information is provided for consumer protection and regulatory awareness. Readers should conduct their own due diligence and seek professional advice for their specific circumstances.
          </p>
        </div>
      </div>
    </section>
  );
}
