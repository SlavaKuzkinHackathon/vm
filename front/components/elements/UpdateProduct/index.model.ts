import { createEffect, createEvent, createStore, sample } from 'effector'
import * as productsApi from '@/app/api/products'
import { ApiError } from '@/app/api/lib'
import { toast } from 'react-toastify'

// Effects
export const updateProductFx = createEffect<
  productsApi.UpdateProductDTO,
  void,
  ApiError
>(async (product: productsApi.UpdateProductDTO,) => {
  await productsApi.updateProduct(product)
})

const deleteProductFx = createEffect<number, void, ApiError>(
  (productId: number) => {
    return productsApi.deleteProduct(productId);
  },
);

// Events
export const updateProduct =
  createEvent<productsApi.UpdateProductDTO>('Update product')
export const productUpdated = updateProductFx.done
export const deleteProduct = createEvent<number>('Delete product');
export const productDeleted = deleteProductFx.done;

// Stores
export const $isDeleting = createStore(false);

sample({
  clock: updateProduct,
  target: updateProductFx,
})

updateProductFx.failData.watch((e) => toast.error(e.message))

sample({
  clock: deleteProduct,
  target: deleteProductFx,
});

$isDeleting.on(deleteProductFx, () => true);

deleteProductFx.failData.watch((e) => toast.error(e.message));

$isDeleting.on(deleteProductFx.finally, () => false);

