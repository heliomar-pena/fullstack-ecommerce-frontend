import { useQuery } from "@tanstack/react-query";
import { getMyProducts } from "../api/products.api";
import { toProductDto, type ProductDto } from "../dto/product.dto";
import { getToken } from "@/stores/authStore";

export function useMyProducts() {
  const token = getToken();

  return useQuery<ProductDto[]>({
    queryKey: ["products", "me"],
    enabled: !!token,
    queryFn: async () => {
      const api = await getMyProducts();
      return api.map(toProductDto);
    },
    staleTime: 60000,
    retry: false,
  });
}
