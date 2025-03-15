import * as z from "zod";

export const checklistItemSchema = z.object({
  description: z.string().min(1, "A descrição é obrigatória"),
  required: z.boolean().default(true),
  weight: z.number().min(0).max(10).default(1),
});

export type ChecklistItemFormData = z.infer<typeof checklistItemSchema>;
