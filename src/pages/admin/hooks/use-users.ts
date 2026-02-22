import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../api/user.api";
import type { UserApi } from "../dto/user.dto";
import { getToken } from "@/stores/authStore";

export function useUsers() {
  const token = getToken();

  return useQuery<UserApi[]>({
    queryKey: ["users", "all"],
    queryFn: getUsers,
    enabled: !!token,
    staleTime: 30_000,
    retry: false,
  });
}
