import { ATTRIBUTE_TYPES } from "@/pages/merchant/const/attribute-type";
import z from "zod";

export const newAttributeSchema = z.object({
  name: z.string().min(1, "Attribute name is required"),
  type: z.enum([
    ATTRIBUTE_TYPES.STRING,
    ATTRIBUTE_TYPES.NUMBER,
    ATTRIBUTE_TYPES.BOOLEAN,
  ]),
  unit: z.string().optional(),
});

export type NewAttributeFormValues = z.infer<typeof newAttributeSchema>;
