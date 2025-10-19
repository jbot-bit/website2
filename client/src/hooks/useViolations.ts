import { useQuery } from "@tanstack/react-query";
import type { Violation } from "@shared/schema";

export function useViolations() {
  return useQuery<Violation[]>({
    queryKey: ["/api/violations"],
  });
}

export function useViolation(id: string) {
  return useQuery<Violation>({
    queryKey: ["/api/violations", id],
    enabled: !!id,
  });
}
