import { z } from "zod";

export const deleteUserInputSchema = z.object({
  userId: z.string().min(1),
});
