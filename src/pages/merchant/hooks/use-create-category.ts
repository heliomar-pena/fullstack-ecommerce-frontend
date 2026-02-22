import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createCategory,
  type CreateCategoryInput,
} from "../api/categories.api";

export function useCreateCategory() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateCategoryInput) => createCategory(input),
    onSuccess: async () => {
      await Promise.all([
        qc.invalidateQueries({ queryKey: ["categories"] }),
        qc.invalidateQueries({ queryKey: ["products", "me"] }),
      ]);
    },
  });
}
