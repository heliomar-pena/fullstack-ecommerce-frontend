import { http } from "@/lib/http";
import type { ProductApi } from "../dto/product.dto";

export async function getMyProducts(): Promise<ProductApi[]> {
  const { data } = await http.get<ProductApi[]>("/product/me");
  return data;
}

export async function publishProduct(productId: number): Promise<void> {
  await http.post(`/product/${productId}/publish`);
}

export async function deleteProduct(productId: number): Promise<void> {
  await http.delete(`/product/${productId}`);
}

export type ProductAttributesPayload = Record<
  string,
  string | number | boolean
>;

export async function patchProductAttributes(
  productId: number,
  attributes: ProductAttributesPayload,
): Promise<void> {
  await http.patch(`/product/${productId}/attributes`, attributes);
}
