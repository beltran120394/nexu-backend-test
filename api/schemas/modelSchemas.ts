import { z } from "zod";

export const postModelSchema = z.object({
  name: z.string(),
  average_price: z.number().optional(),
});

export const putModelSchema = z.object({
  average_price: z.number(),
});

export const getModelsSchema = z.object({
  greater: z.coerce.number().optional(),
  lower: z.coerce.number().optional(),
});
