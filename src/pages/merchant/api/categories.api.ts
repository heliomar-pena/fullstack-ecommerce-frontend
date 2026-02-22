import { http } from "@/lib/http";
import { toast } from "sonner";
import type { CategoryAttributeApi } from "../dto/product.dto";

export type CreateCategoryInput = {
  name: string;
  attributes: number[];
};

export type CreateCategoryResponse = {
  id: number;
};

export async function createCategory(
  input: CreateCategoryInput,
): Promise<CreateCategoryResponse> {
  const { data } = await http.post<CreateCategoryResponse>("/category", input);

  toast.success("Category created successfully");

  return data;
}

export type CategoryApi = {
  id: number;
  name: string;
  attributes: CategoryAttributeApi[];
};

export async function getCategories(): Promise<CategoryApi[]> {
  const { data } = await http.get<CategoryApi[]>("/category");

  toast.success("Categories loaded successfully");

  return data;
}
