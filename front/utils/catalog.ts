import router, { NextRouter } from 'next/router'
import { getQueryParamOnFirstRender, idGenerator } from './common'
import { getProductsPaginateFx } from '@/app/api/products'
import { setFilteredModels } from '@/context/products'

const createModelCheckboxObj = (title: string) => ({
  title,
  checked: false,
  id: idGenerator(),
})

export const productModels = [
  'Угловой диван',
  'Диван прямой',
  'Модульный диван',
  'Тахта',
].map(createModelCheckboxObj)

const checkPriceFromQuery = (price: number) =>
  price && !isNaN(price) && price >= 0 && price <= 10000

export const checkQueryParams = (router: NextRouter) => {
  const priceFromQueryValue = getQueryParamOnFirstRender(
    'priceFrom',
    router
  ) as string
  const priceToQueryValue = getQueryParamOnFirstRender(
    'priceTo',
    router
  ) as string

  const modelQueryValue = JSON.parse(
    decodeURIComponent(getQueryParamOnFirstRender('model', router) as string)
  )

  const isValidModelQuery =
    Array.isArray(modelQueryValue) && !!modelQueryValue?.length

  const isValidPriceQuery =
    checkPriceFromQuery(+priceFromQueryValue) &&
    checkPriceFromQuery(+priceToQueryValue)

  return {
    isValidModelQuery,
    isValidPriceQuery,
    priceFromQueryValue,
    priceToQueryValue,
    modelQueryValue,
  }
}

export const updateParamAndFitersFromQuery = async (
  callback: VoidFunction,
  path: string,

) => {
  callback()

  const data = await getProductsPaginateFx(
    `/products/all?limit=20&offset=${path}`
  )

  setFilteredModels(data)
}

export async function updateParamAndFiters<T>(updatedParams: T, path: string, router: NextRouter) {
  const params = router.query

  delete params.model
  delete params.priceFrom
  delete params.priceTo

  router.push({ query: { ...params } }, undefined, { shallow: true })

  router.push(
    {
      query: {
        ...params,
        ...updatedParams,
      },
    },
    undefined,
    { shallow: true }
  )
  const data = await getProductsPaginateFx(
    `/products/all?limit=20&offset=${path}`
  )

  setFilteredModels(data)
}

