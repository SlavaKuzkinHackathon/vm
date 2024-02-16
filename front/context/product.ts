import { IProduct } from '@/types/product'
import { createDomain } from 'effector-next'

const product = createDomain()
export const setProducts = product.createEvent<IProduct[]>()
//export const setProducts = products.createEvent<IProducts>()
export const createProduct = product.createEvent<IProduct>()




 export const $product = product
  .createStore<IProduct[]>([])
  .on(setProducts, (_, products) => products)
  .on(createProduct, (state, product) => [...state, product]) 