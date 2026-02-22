import { http } from "@/lib/http";
import type { CategoryAttributeApi } from "../dto/product.dto";
import type { AttributeType } from "../const/attribute-type";
import { toast } from "sonner";

export async function getAllAttributes(): Promise<CategoryAttributeApi[]> {
  const { data } = await http.get<CategoryAttributeApi[]>("/attribute");
  return data;
}

export type CreateAttributeInput = {
  name: string;
  type: AttributeType;
  unit: string;
};

export type CreateAttributeResponse = { id: number };

export async function createAttribute(
  input: CreateAttributeInput,
): Promise<CreateAttributeResponse> {
  const { data } = await http.post<CreateAttributeResponse>(
    "/attribute",
    input,
  );

  toast.success("Attribute created successfully");

  return data;
}
