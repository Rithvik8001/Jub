import { z } from "zod";

export const createUrlSchema = z.object({
  destinationUrl: z.string().url("Invalid URL format"),
  shortUrl: z.string().min(1, "Short URL is required"),
  comments: z.string().optional(),
});

export const updateUrlSchema = z.object({
  destinationUrl: z.string().url("Invalid URL format").optional(),
  shortUrl: z.string().min(1, "Short URL is required").optional(),
  comments: z.string().optional(),
});

export const querySchema = z.object({
  page: z.string().transform(Number).pipe(z.number().min(1)).optional(),
  limit: z
    .string()
    .transform(Number)
    .pipe(z.number().min(1).max(100))
    .optional(),
  search: z.string().optional(),
});

export type CreateUrlInput = z.infer<typeof createUrlSchema>;
export type UpdateUrlInput = z.infer<typeof updateUrlSchema>;
export type QueryParams = z.infer<typeof querySchema>;
