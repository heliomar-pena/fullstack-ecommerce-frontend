import type {
  CategoryAttributeApi,
  ProductAttributeValueApi,
} from "../dto/product.dto";

function coerceFromString(
  type: CategoryAttributeApi["type"],
  raw: string,
): string | number | boolean | undefined {
  switch (type) {
    case "string":
      return raw;

    case "number": {
      const n = Number(raw);
      return Number.isFinite(n) ? n : undefined;
    }

    case "boolean":
      if (raw === "true") return true;
      if (raw === "false") return false;
      if (raw === "1") return true;
      if (raw === "0") return false;
      return undefined;
  }
}

export function buildProductDetailsDefaultValues(
  categoryAttributes: CategoryAttributeApi[],
  productAttributes: ProductAttributeValueApi[],
): Record<string, string | number | boolean> {
  const valuesByAttributeId = new Map<number, string>();

  for (const pAttr of productAttributes) {
    valuesByAttributeId.set(pAttr.attributeId, pAttr.value);
  }

  const defaults: Record<string, string | number | boolean> = {};

  for (const cAttr of categoryAttributes) {
    const raw = valuesByAttributeId.get(cAttr.id);

    if (raw !== undefined) {
      const coerced = coerceFromString(cAttr.type, raw);
      if (coerced !== undefined) {
        defaults[cAttr.name] = coerced;
        continue;
      }
    }

    if (cAttr.type === "boolean") {
      defaults[cAttr.name] = false;
    } else {
      defaults[cAttr.name] = "";
    }
  }

  return defaults;
}
