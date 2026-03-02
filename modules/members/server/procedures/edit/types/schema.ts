import { z } from "zod";

export const editUserInputSchema = z.object({
  userId: z.string().min(1),
});
