import { z } from "zod";



export function createResponseSchema<T>(schema: z.ZodType<T>) {
    return z.object({
      data: schema,
    });
  }

