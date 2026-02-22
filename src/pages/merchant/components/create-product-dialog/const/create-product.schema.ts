import { z } from "zod";

export const createProductSchema = z.object({
  categoryId: z.number().int().positive("Category is required"),
  title: z.string().min(1, "Title is required"),
  code: z.string().min(1, "Code is required"),
  description: z.string().min(1, "Description is required"),
});

export type CreateProductFormValues = z.infer<typeof createProductSchema>;
