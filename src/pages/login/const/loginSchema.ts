import * as z from "zod";

export const loginSchema = z.object({
  email: z
    .email(),
  password: z
    .string()
    .min(4, "Password must be at least 4 characters.")
});
