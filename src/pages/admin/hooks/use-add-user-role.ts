import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addUserRole, type AddUserRoleInput } from "../api/user.api";

export function useAddUserRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: AddUserRoleInput) => addUserRole(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["users", "all"] });
    },
  });
}
