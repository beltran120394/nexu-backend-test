import { z } from "zod";

export const postBrandSchema = z.object({
  name: z.string(),
});
