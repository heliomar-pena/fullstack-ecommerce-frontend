import { z } from "zod";

export const addRoleSchema = z.object({
  roleId: z.number().int().positive("Role is required"),
});

export type AddRoleFormValues = z.infer<typeof addRoleSchema>;
