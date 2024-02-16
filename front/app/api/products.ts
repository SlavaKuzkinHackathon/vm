import { createEffect } from 'effector-next'
import api from '../axiosClient'
import { IProduct } from '@/types/product'
import {
  axiosInstance,
  ListDTO,
  PaginationQueryDTO,
  createListResponseSchema,
  createResponseSchema,
} from './lib'
import { ProductSchema } from '@/types/product'
import { toast } from 'react-toastify'

export const getProductFx = createEffect(async (url: string) => {
  const { data } = await api.get(url)

  return data
})

export const getProductsFx = createEffect(async (url: string) => {
  const { data } = await api.get(url)

  return data
})

export const getProductsPaginateFx = createEffect(async (url: string) => {
  const { data } = await api.get(url)

  return data
})


export const getDivansOrNewFx = createEffect(async (url: string) => {
  const { data } = await api.get(url)

  return data
})

// Create
const BASE_ROUTE = '/products'

const ProductResponseSchema = createResponseSchema(ProductSchema)
const ProductListSchema = createListResponseSchema(ProductSchema)

export type CreateProductDTO = {
  name: string
  description: string
  model: string
  price: number
  in_stock: number
  rating: number
  image: string
}

export const createProduct = async (
  data: CreateProductDTO
): Promise<IProduct> => {
  const formData = new FormData()
  formData.append('name', data.name)
  formData.append('description', data.description)
  formData.append('model', data.model)
  formData.append('price', data.price.toString())
  formData.append('rating', data.rating.toString())
  formData.append('in_stock', data.in_stock.toString())

  for (const image of data.image) {
    formData.append('image', image)
  }

  const response = await api.post(`${BASE_ROUTE}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return ProductResponseSchema.parse(response.data).data
}

export const fetchProduct = async (productId: number): Promise<IProduct> => {
  const response = await api.get(`${BASE_ROUTE}/${productId}`)
  return ProductResponseSchema.parse(response.data).data
}

export const fetchProducts = async (
  query: PaginationQueryDTO & {
    name?: string
  }
): Promise<ListDTO<IProduct>> => {
  const params: Record<string, unknown> = query

  const response = await axiosInstance.get(`${BASE_ROUTE}`, { params })

  return ProductListSchema.parse(response.data).data
}

export const fetchRecommendedProducts = async (
  query: PaginationQueryDTO & { productId: number }
): Promise<ListDTO<IProduct>> => {
  const response = await api.get(`${BASE_ROUTE}/recommended`, {
    params: query,
  })

  return ProductListSchema.parse(response.data).data
}

///Update
export type UpdateProductDTO = {
  id: number
} & Partial<{
  name: string
  description: string
  model: string
  price: number
  in_stock: number
  rating: number
  image: Blob
}>

export const updateProduct = async (
  product: UpdateProductDTO
): Promise<IProduct> => {
  const formData = new FormData()
  formData.append('id', product.id.toString())
  if (product.name) {
    formData.append('name', product.name)
  }
  if (product.description) {
    formData.append('description', product.description)
  }
  if (product.model) {
    formData.append('model', product.model)
  }
  if (product.price) {
    formData.append('price', product.price.toString())
  }
  if (product.in_stock) {
    formData.append('in_stock', product.in_stock.toString())
  }
  if (product.rating) {
    formData.append('rating', product.rating.toString())
  }

  if (product.image) {
    formData.append('image', product.image)
  }

  const response = await api.put(`${BASE_ROUTE}/${product.id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return ProductResponseSchema.parse(response.data).data
}

/// Delete
export const deleteProduct = async (productId: number): Promise<void> => {
  await api.delete(`${BASE_ROUTE}/${productId}`)
}



///search
export const searchProductFx = createEffect(
  async ({ url, search }: { url: string; search: string }) => {
    const { data } = await api.post(url, { search })

    return data.rows
  }
)

export const getProductByNameFx = createEffect(
  async ({ url, name }: { url: string; name: string }) => {
    try {
      const { data } = await api.post(url, { name })

      return data
    } catch (error) {
      toast.error((error as Error).message)
    }
  }
)