import { z } from "zod";

export const IssueSchema = z.object({
  title: z.string().min(1, "Title is Required.").max(255),
  description: z.string().min(1, "Description is Required"),
});

export const patchIssueSchema = z.object({
  title: z.string().min(1, "Title is Required.").max(255).optional(),
  description: z
    .string()
    .min(1, "Description is Required")
    .max(633533)
    .optional(),
  assignToUserId: z
    .string()
    .min(1, "AssugnToUserId is Required")
    .max(633533)
    .optional()
    .nullable(),
});
