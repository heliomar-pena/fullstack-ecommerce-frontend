import { z } from "zod";
import type { CategoryAttributeApi } from "../dto/product.dto";

function schemaForType(type: CategoryAttributeApi["type"]) {
  switch (type) {
    case "string":
      return z.string().optional();

    case "number":
      return z
        .preprocess((v) => {
          if (v === "" || v === null || v === undefined) return undefined;
          const n = Number(v);
          return Number.isFinite(n) ? n : v;
        }, z.number())
        .optional();

    case "boolean":
      return z
        .preprocess((v) => {
          if (typeof v === "boolean") return v;
          if (v === "true") return true;
          if (v === "false") return false;
          return v;
        }, z.boolean())
        .optional();
  }
}

export function buildProductDetailsSchema(attributes: CategoryAttributeApi[]) {
  const shape: Record<string, z.ZodTypeAny> = {};

  for (const attr of attributes) {
    shape[attr.name] = schemaForType(attr.type);
  }

  return z.object(shape).strict();
}
