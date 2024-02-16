export interface IProduct {
  id: number
  name: string
  price: number
  description: string
  model: string
  image: string
  in_stock: number
  rating: number
}

 export interface IProducts {
  count: number
  rows: IProduct[]
} 

