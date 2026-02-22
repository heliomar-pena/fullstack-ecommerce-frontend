import { useQuery } from "@tanstack/react-query";
import { getRoles } from "../api/roles.api";
import type { RoleApi } from "../api/roles.api";

export function useRoles() {
  return useQuery<RoleApi[]>({
    queryKey: ["roles", "all"],
    queryFn: getRoles,
    staleTime: 60000,
    retry: false,
  });
}
