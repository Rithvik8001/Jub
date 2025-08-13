import { z } from "zod";

// Validation schema for updating user profile
export const updateProfileSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .optional(),
});

// Type exports for TypeScript
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
