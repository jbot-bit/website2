import { Hero } from "@/components/Hero";
import { Timeline } from "@/components/Timeline";
import { EvidenceGallery } from "@/components/EvidenceGallery";
import { ViolationBreakdown } from "@/components/ViolationBreakdown";
import { FAQ } from "@/components/FAQ";
import { DownloadSection } from "@/components/DownloadSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <Timeline />
      <ViolationBreakdown />
      <EvidenceGallery />
      <FAQ />
      <DownloadSection />
    </div>
  );
}
