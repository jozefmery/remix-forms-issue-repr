import { z } from "zod";

export const testSchema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
});
