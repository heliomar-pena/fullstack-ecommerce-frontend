import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteProduct,
  patchProductAttributes,
  publishProduct,
  type ProductAttributesPayload,
} from "../api/products.api";

export function useProductMutations() {
  const qc = useQueryClient();

  const refresh = async () => {
    await qc.invalidateQueries({ queryKey: ["products", "me"] });
  };

  const publish = useMutation({
    mutationFn: (productId: number) => publishProduct(productId),
    onSuccess: refresh,
  });

  const remove = useMutation({
    mutationFn: (productId: number) => deleteProduct(productId),
    onSuccess: refresh,
  });

  const addDetails = useMutation({
    mutationFn: async (input: {
      productId: number;
      details: ProductAttributesPayload;
    }) => {
      await patchProductAttributes(input.productId, input.details);
    },
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["products", "me"] });
    },
  });

  return { publish, remove, addDetails, refresh };
}
