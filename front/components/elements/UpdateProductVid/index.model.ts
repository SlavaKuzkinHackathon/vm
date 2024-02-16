import { createEffect, createEvent, createStore, sample } from 'effector';
import { debounce, reset } from 'patronum';
import * as productsApi from '@/app/api/products';
import { ApiError, ListDTO } from '@/app/api/lib';
import {
  productDeleted,
  productUpdated,
} from '../UpdateProduct/index.model';
import { IProduct } from '@/types/product';
import { toast } from 'react-toastify';

// Effects
const fetchProductsFx = createEffect<
  {
    pageSize: number;
    pageNumber: number;
    name: string;
  },
  ListDTO<IProduct> & { pageNumber: number },
  ApiError
>(async ({ pageSize, pageNumber, name }) => {
  const result = await productsApi.fetchProducts({
    take: pageSize,
    skip: pageSize * pageNumber,
    name,
  });
  return { ...result, pageNumber };
});

// Events
export const mounted = createEvent('Mounted');
export const loadPage = createEvent<number>('Load page');
export const searchQueryChanged = createEvent<string>('Search query changed');
const searchTriggered = debounce({ source: searchQueryChanged, timeout: 500 });

// Stores
export const $products = createStore<IProduct[]>([]);
export const $productsCount = createStore(0);
export const $searchQuery = createStore('');
export const $pageSize = createStore(12);
export const $pageNumber = createStore(0);
export const $isPending = createStore(false);

$searchQuery.on(searchQueryChanged, (_, newQuery) => newQuery);

reset({
  clock: mounted,
  target: [$products, $productsCount, $pageSize, $pageNumber, $isPending],
});

sample({
  clock: [
    mounted,
    searchTriggered,
    //productCreated,
    productUpdated,
    productDeleted,
  ],
  source: {
    pageSize: $pageSize,
    pageNumber: $pageNumber,
    name: $searchQuery,
  },
  target: fetchProductsFx,
});

sample({
  clock: loadPage,
  source: {
    pageSize: $pageSize,
    name: $searchQuery,
  },
  fn: ({ pageSize, name }, pageNumber) => ({ pageSize, pageNumber, name }),
  target: fetchProductsFx,
});

$isPending.on(fetchProductsFx, () => true);

$products.on(fetchProductsFx.doneData, (_, { list }) => {
  return list;
});
$productsCount.on(fetchProductsFx.doneData, (_, { count }) => {
  return count;
});
$pageNumber.on(fetchProductsFx.doneData, (_, { pageNumber }) => pageNumber);

fetchProductsFx.failData.watch((e) => toast.error(e.message));

$isPending.on(fetchProductsFx.finally, () => false);

/*
import { createEffect, createEvent, createStore, sample } from 'effector';
import { debounce, reset } from 'patronum';
import * as productsApi from '@/app/api/products';
import { ApiError, ListDTO } from '@/app/api/lib';
import {
  productDeleted,
  productUpdated,
} from '../UpdateProduct/index.model';
import { IProduct } from '@/types/product';
import { toast } from 'react-toastify';

// Effects
const fetchProductsFx = createEffect<
  {
    pageSize: number;
    pageNumber: number;
    name: string;
  },
  ListDTO<IProduct> & { pageNumber: number },
  ApiError
>(async ({ pageSize, pageNumber, name }) => {
  const result = await productsApi.fetchProducts({
    take: pageSize,
    skip: pageSize * pageNumber,
    name,
  });
  return { ...result, pageNumber };
});

// Events
export const mounted = createEvent('Mounted');
export const loadPage = createEvent<number>('Load page');
export const searchQueryChanged = createEvent<string>('Search query changed');
const searchTriggered = debounce({ source: searchQueryChanged, timeout: 500 });

// Stores
export const $products = createStore<IProduct[]>([]);
export const $productsCount = createStore(0);
export const $searchQuery = createStore('');
export const $pageSize = createStore(12);
export const $pageNumber = createStore(0);
export const $isPending = createStore(false);

$searchQuery.on(searchQueryChanged, (_, newQuery) => newQuery);

reset({
  clock: mounted,
  target: [$products, $productsCount, $pageSize, $pageNumber, $isPending],
});

sample({
  clock: [
    mounted,
    searchTriggered,
    //productCreated,
    productUpdated,
    productDeleted,
  ],
  source: {
    pageSize: $pageSize,
    pageNumber: $pageNumber,
    name: $searchQuery,
  },
  target: fetchProductsFx,
});

sample({
  clock: loadPage,
  source: {
    pageSize: $pageSize,
    name: $searchQuery,
  },
  fn: ({ pageSize, name }, pageNumber) => ({ pageSize, pageNumber, name }),
  target: fetchProductsFx,
});

$isPending.on(fetchProductsFx, () => true);

$products.on(fetchProductsFx.doneData, (_, { list }) => {
  return list;
});
$productsCount.on(fetchProductsFx.doneData, (_, { count }) => {
  return count;
});
$pageNumber.on(fetchProductsFx.doneData, (_, { pageNumber }) => pageNumber);

fetchProductsFx.failData.watch((e) => toast.error(e.message));

$isPending.on(fetchProductsFx.finally, () => false);
*/