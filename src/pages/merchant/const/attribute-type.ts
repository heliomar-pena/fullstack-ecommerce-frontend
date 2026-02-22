export const ATTRIBUTE_TYPES = {
  STRING: "string",
  NUMBER: "number",
  BOOLEAN: "boolean",
} as const;

export type AttributeType =
  (typeof ATTRIBUTE_TYPES)[keyof typeof ATTRIBUTE_TYPES];
