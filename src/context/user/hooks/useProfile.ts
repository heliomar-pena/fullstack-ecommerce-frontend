import { useQuery } from "@tanstack/react-query";
import { profile } from "../api/profile";
import { getToken } from "@/stores/authStore";

export function useProfileQuery() {
  const token = getToken();

  return useQuery({
    queryKey: ["user", "profile"],
    queryFn: profile,
    enabled: !!token, // sin token, no llamamos
    staleTime: 1000 * 60 * 5, // 5 min
    retry: false,
  });
}
