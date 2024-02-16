import { z } from 'zod';

export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  model: z.string(),
  price: z.number(),
  in_stock: z.number(),
  rating: z.number(),
  image: z.string(),
});

export type IProduct = z.infer<typeof ProductSchema>


export interface IProducts {
  count: number
  rows: IProduct[]
}
