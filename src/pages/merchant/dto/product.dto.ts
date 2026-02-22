import type { AttributeType } from "../const/attribute-type";

export type CategoryAttributeApi = {
  id: number;
  name: string;
  type: AttributeType;
  unit: string;
};

export type CategoryApi = {
  name: string;
  attributes: CategoryAttributeApi[];
};

export type ProductAttributeValueApi = {
  value: string;
  attributeId: number;
};

export type ProductApi = {
  id: number;
  code: string;
  title: string;
  description: string;
  isActive: boolean;
  category: CategoryApi;
  attributes: ProductAttributeValueApi[];
};

export type ProductDto = {
  id: number;
  code: string;
  title: string;
  description: string;
  isActive: boolean;

  categoryName: string;

  categoryAttributes: CategoryAttributeApi[];
  productAttributes: ProductAttributeValueApi[];
};

export function toProductDto(p: ProductApi): ProductDto {
  return {
    id: p.id,
    code: p.code,
    title: p.title,
    description: p.description,
    isActive: p.isActive,

    categoryName: p.category.name,
    categoryAttributes: p.category.attributes,
    productAttributes: p.attributes,
  };
}
