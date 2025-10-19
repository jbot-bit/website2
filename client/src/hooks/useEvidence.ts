import { useQuery } from "@tanstack/react-query";
import type { Evidence } from "@shared/schema";

export function useEvidence(category?: string) {
  return useQuery<Evidence[]>({
    queryKey: category ? ["/api/evidence", { category }] : ["/api/evidence"],
  });
}

export function useEvidenceItem(id: string) {
  return useQuery<Evidence>({
    queryKey: ["/api/evidence", id],
    enabled: !!id,
  });
}
