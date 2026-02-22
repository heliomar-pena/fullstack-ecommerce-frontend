import { useQuery } from "@tanstack/react-query";
import { profile } from "../api/profile";
import { getToken } from "@/stores/authStore";

export function useProfileQuery() {
  const token = getToken();

  return useQuery({
    queryKey: ["user", "profile"],
    queryFn: profile,
    enabled: !!token,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
}
