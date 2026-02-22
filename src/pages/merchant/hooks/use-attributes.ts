import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createAttribute,
  getAllAttributes,
  type CreateAttributeInput,
} from "../api/attributes.api";

export function useAttributes() {
  return useQuery({
    queryKey: ["attributes", "all"],
    queryFn: getAllAttributes,
    staleTime: 60000,
    retry: false,
  });
}

export function useCreateAttribute() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateAttributeInput) => createAttribute(input),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["attributes", "all"] });
    },
  });
}
