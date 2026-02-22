import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct, type CreateProductInput } from "../api/products.api";

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateProductInput) => createProduct(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["products", "me"] });
    },
  });
}
