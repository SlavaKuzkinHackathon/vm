import { CreateProductDTO, createProduct } from '@/app/api/products';
import { createDomain, createEffect, createEvent, createStore, sample } from 'effector';

// Effects
const createProductFx = createEffect<CreateProductDTO, void>(
  async (product) => {
    await createProduct(product);
  },
);

// Events
export const formSubmitted = createEvent<CreateProductDTO>(
  'Create product form submitted',
);
export const productCreated = createProductFx.done;

// Stores

export const $isPending = createStore(false);

sample({
  clock: formSubmitted,
  target: createProductFx,
});

$isPending.on(createProductFx, () => true);

$isPending.on(createProductFx.finally, () => false);


