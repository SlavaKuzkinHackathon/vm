import { useMediaQuery } from '@/hooks/useMediaQuery'
import React, { useEffect, useState } from 'react'
import CatalogFiltersDesctop from './CatalogFiltersDesctop'
import {
  ICatalogFiltersProps,
} from '@/types/catalog'
import { toast } from 'react-toastify'
import { useStore } from 'effector-react'
import {
  $productsmModels,
  setProductsmModelsFromQuery,
} from '@/context/products'
import { useRouter } from 'next/router'
import { getQueryParamOnFirstRender } from '@/utils/common'
import CatalogFiltersMobile from './CatalogFiltersMobile'
import { checkQueryParams, updateParamAndFiters, updateParamAndFitersFromQuery } from '@/utils/catalog'

const CatalogFilters = ({
  priceRange,
  setPriceRange,
  setIsPriceRangeChanged,
  resetFilterBtnDisabled,
  resetFilters,
  isPriceRangeChanged,
  currentPage,
  setIsFilterInQuery,
  closePopup,
  filtersMobileOpen,
}: ICatalogFiltersProps) => {
  const isMobile = useMediaQuery(820)
  const [spinner, setSpinner] = useState(false)
  const productModels = useStore($productsmModels)
  const router = useRouter()

  useEffect(() => {
    applyFiltersFromQuery()
  }, [])

  const applyFiltersFromQuery = async () => {
    try {
      const {
        isValidModelQuery,
        isValidPriceQuery,
        priceFromQueryValue,
        priceToQueryValue,
        modelQueryValue,
      } = checkQueryParams(router)

      const modelQuery = `&products=${getQueryParamOnFirstRender('model', router)}`

      const priceQuery = `&priceFrom=${priceFromQueryValue}&priceTo=${priceToQueryValue}`

      if (isValidModelQuery && isValidPriceQuery) {
        updateParamAndFitersFromQuery(() => {
          setIsFilterInQuery(true)
          setPriceRange([+priceFromQueryValue, +priceToQueryValue])
          setIsPriceRangeChanged(true)
          setProductsmModelsFromQuery(modelQueryValue)
        }, `${currentPage}${priceQuery}${modelQuery}`)
        return
      }

      if (isValidPriceQuery) {
        updateParamAndFitersFromQuery(() => {
          setIsFilterInQuery(true)
          setPriceRange([+priceFromQueryValue, +priceToQueryValue])
          setIsPriceRangeChanged(true)
        }, `${currentPage}${priceQuery}`)
        return
      }

      if (isValidModelQuery) {
        updateParamAndFitersFromQuery(() => {
          setIsFilterInQuery(true)
          setIsPriceRangeChanged(true)
          setProductsmModelsFromQuery(modelQueryValue)
        }, `${currentPage}${modelQuery}`)
        return
      }
    } catch (error) {
      const err = error as Error

      if (err.message === 'URI malformed') {
        toast.warning('Неправильный url для фильтров')
        return
      }

      toast.error(err.message)
    }
  }


  const applyFilters = async () => {
    setIsFilterInQuery(true)
    try {
      setSpinner(true)

      const priceFrom = Math.ceil(priceRange[0])
      const priceTo = Math.ceil(priceRange[1])

      const priceQuery = isPriceRangeChanged
        ? `&priceFrom=${priceFrom}&priceTo=${priceTo}`
        : ''

      const products = productModels
        .filter((item) => item.checked)
        .map((item) => item.title)

      const encodedModelsQuery = encodeURIComponent(JSON.stringify(products))

      const modelQuery = `&products=${encodedModelsQuery}`

      const initialPage = currentPage > 0 ? 0 : currentPage

      if (products.length && isPriceRangeChanged) {
        updateParamAndFiters(
          {
            model: encodedModelsQuery,
            priceFrom,
            priceTo,
            offset: initialPage + 1,
          },
          `${initialPage}${priceQuery}${modelQuery}`,
          router
        )
        return
      }

      if (isPriceRangeChanged) {
        updateParamAndFiters(
          {
            priceFrom,
            priceTo,
            offset: initialPage + 1,
          },
          `${initialPage}${priceQuery}`,
          router
        )
        return
      }

      if (products.length) {
        updateParamAndFiters(
          {
            model: encodedModelsQuery,
            offset: initialPage + 1,
          },
          `${initialPage}${modelQuery}`,
          router
        )
        return
      }
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setSpinner(false)
    }
  }

  return (
    <>
      {isMobile ? (
        <CatalogFiltersMobile
          closePopup={closePopup}
          spinner={spinner}
          applyFilters={applyFilters}
          priceRange={priceRange}
          setIsPriceRangeChanged={setIsPriceRangeChanged}
          setPriceRange={setPriceRange}
          resetFilterBtnDisabled={resetFilterBtnDisabled}
          resetFilters={resetFilters}
          filtersMobileOpen={filtersMobileOpen}
        />
      ) : (
        <CatalogFiltersDesctop
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          setIsPriceRangeChanged={setIsPriceRangeChanged}
          resetFilterBtnDisabled={resetFilterBtnDisabled}
          spinner={spinner}
          resetFilters={resetFilters}
          applyFilters={applyFilters}
        />
      )}
    </>
  )
}

export default CatalogFilters
