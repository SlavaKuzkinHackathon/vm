import { IProduct } from '@/types/product'
import { createDomain } from 'effector-next'

const productOne = createDomain()

export const setProductOne = productOne.createEvent<IProduct>()

export const $productOne = productOne
  .createStore<IProduct>({} as IProduct)
  .on(setProductOne, (_, productOne) => productOne)