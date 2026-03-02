import { z } from "zod";

export const GetOneInputSchema = z.object({
  userId: z.string().min(1),
});
