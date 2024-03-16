import { getProductsPaginateFx } from '@/app/api/products'
import FilterSelect from '@/components/modules/CatalogPage/FilterSelect'
import ModelsBlock from '@/components/modules/CatalogPage/ModelsBlock'
import { $mode } from '@/context/mode'
import {
  $filteredModels,
  $productsm,
  $productsmModels,
  setProductsm,
  setProductsmModels,
  updateProductsmModels,
} from '@/context/products'
import { useStore } from 'effector-react'
import { AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import skeletonStyles from '@/styles/skeleton/index.module.scss'
import CatalogItem from '@/components/modules/CatalogPage/CatalogItem'
import ReactPaginate from 'react-paginate'
import { IQueryParams } from '@/types/catalog'
import { useRouter } from 'next/router'
import { IProducts } from '@/types/productsm'
import CatalogFilters from '@/components/modules/CatalogPage/CatalogFilters'
import { usePopup } from '@/hooks/usePopup'
import { checkQueryParams } from '@/utils/catalog'
import FilterSvg from '@/components/elements/FilterSvg/FilterSvg'
import styles from '@/styles/catalog/index.module.scss'

const CatalogPage = ({ query }: { query: IQueryParams }) => {
  const mode = useStore($mode)
  const products = useStore($productsm)
  const productModels = useStore($productsmModels)
  const filteredModels = useStore($filteredModels)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const [spinner, setSpinner] = useState(false)
  const [priceRange, setPriceRange] = useState([5000, 150000])
  const [isPriceRangeChanged, setIsPriceRangeChanged] = useState(false)
  const [isFilterInQuery, setIsFilterInQuery] = useState(false)
  const pageCount = Math.ceil(products.count / 20)
  const isValidOffset =
    query.offset && !isNaN(+query.offset) && +query.offset > 0
  const [currentPage, setCurrentPage] = useState(
    isValidOffset ? +query.offset - 1 : 0
  )

  const router = useRouter()

console.log('pageCount', pageCount);


  const isAnyProductsModelerChecked = productModels.some((item) => item.checked)
  const resetFilterBtnDisabled = !(
    isPriceRangeChanged || isAnyProductsModelerChecked
  )

  const { toggleOpen, open, closePopup } = usePopup()

  useEffect(() => {
    loadProducts()
  }, [filteredModels, isFilterInQuery])

  const loadProducts = async () => {
    try {
      setSpinner(true)
      const data = await getProductsPaginateFx(
        '/products/all?limit=20&offset=0'
      )
      if (!isValidOffset) {
        router.replace({
          query: {
            offset: 1,
          },
        })
        resetPagination(data)
        return
      }

      if (isValidOffset) {
        if (+query.offset > Math.ceil(data.count / 3)) {
          router.push(
            {
              query: {
                ...query,
                offset: 1,
              },
            },
            undefined,
            { shallow: true }
          )
          setCurrentPage(0)
          setProductsm(isFilterInQuery ? filteredModels : data)
          return
        }
        const offset = +query.offset - 1
        const result = await getProductsPaginateFx(
          `/products/all?limit=20&offset=${offset}`
        )

        setCurrentPage(offset)
        setProductsm(isFilterInQuery ? filteredModels : result)
      }

      setCurrentPage(0)
      setProductsm(isFilterInQuery ? filteredModels : data)
      return
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setTimeout(() => setSpinner(false), 1000)
    }
  }

  const resetPagination = (data: IProducts) => {
    setCurrentPage(0)
    setProductsm(data)
  }

  const handlePageChange = async ({ selected }: { selected: number }) => {
    try {
      setSpinner(true)
      const data = await getProductsPaginateFx(
        '/products/all?limit=20&offset=0'
      )

      if (selected > pageCount) {
        resetPagination(isFilterInQuery ? filteredModels : data)
        return
      }

      if (isValidOffset && +query.offset > Math.ceil(data.count / 2)) {
        resetPagination(isFilterInQuery ? filteredModels : data)
        return
      }

      const { isValidModelQuery, isValidPriceQuery } = checkQueryParams(router)

      const result = await getProductsPaginateFx(
        `/products/all?limit=20&offset=${selected}${
          isFilterInQuery && isValidModelQuery
            ? `&model=${router.query.model}`
            : ''
        }${
          isFilterInQuery && isValidPriceQuery
            ? `&priceFrom=${router.query.priceFrom}&priceTo=${router.query.priceTo}`
            : ''
        }`
      )

      router.push(
        {
          query: {
            ...router.query,
            offset: selected + 1,
          },
        },
        undefined,
        { shallow: true }
      )

      setCurrentPage(selected)
      setProductsm(result)
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setTimeout(() => setSpinner(false), 1000)
    }
  }

  const resetFilters = async () => {
    try {
      const data = await getProductsPaginateFx(
        '/products/all?limit=20&offset=0'
      )

      const params = router.query

      delete params.model
      delete params.priceFrom
      delete params.priceTo
      params.first = 'cheap'

      router.push({ query: { ...params } }, undefined, { shallow: true })

      setProductsmModels(
        productModels.map((item) => ({ ...item, checked: false }))
      )

      setProductsm(data)
      setPriceRange([5000, 150000])
      setIsPriceRangeChanged(false)
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  return (
    <section className={styles.catalog}>
      <div className={`container ${styles.catalog__container}`}>
        <h2 className={`${styles.catalog__title} ${darkModeClass}`}>
          Каталог Мягкой Mебели
        </h2>
        <div className={`${styles.catalog__top} ${darkModeClass}`}>
          <AnimatePresence>
            {isAnyProductsModelerChecked && (
              <ModelsBlock
                title="Модели диванов"
                event={updateProductsmModels}
                modelsList={productModels}
              />
            )}
          </AnimatePresence>
          <div className={styles.catalog__top__inner}>
            <button
              className={`${styles.catalog__top__reset} ${darkModeClass}`}
              disabled={resetFilterBtnDisabled}
              onClick={resetFilters}
            >
              Сбросить фильтры
            </button>
            <button
              className={styles.catalog__top__mobile_btn}
              onClick={toggleOpen}
            >
              <span className={styles.catalog__top__mobile_btn__svg}>
                <FilterSvg />
              </span>
              <span className={styles.catalog__top__mobile_btn__text}>
                Фильтр
              </span>
            </button>
            <FilterSelect setSpinner={setSpinner} />
          </div>
        </div>
        <div className={styles.catalog__bottom}>
          <div className={styles.catalog__bottom__inner}>
            <CatalogFilters
              priceRange={priceRange}
              setIsPriceRangeChanged={setIsPriceRangeChanged}
              setPriceRange={setPriceRange}
              resetFilterBtnDisabled={resetFilterBtnDisabled}
              resetFilters={resetFilters}
              isPriceRangeChanged={isPriceRangeChanged}
              currentPage={currentPage}
              setIsFilterInQuery={setIsFilterInQuery}
              closePopup={closePopup}
              filtersMobileOpen={open}
            />
            {spinner ? (
              <ul className={skeletonStyles.skeleton}>
                {Array.from(new Array(20)).map((_, i) => (
                  <li
                    key={i}
                    className={`${skeletonStyles.skeleton__item} ${
                      mode === 'dark' ? `${skeletonStyles.dark_mode}` : ''
                    }`}
                  >
                    <div className={skeletonStyles.skeleton__item__light} />
                  </li>
                ))}
              </ul>
            ) : (
              <ul className={styles.catalog__list}>
                {products.rows?.length ? (
                  products.rows.map((item) => (
                    <CatalogItem item={item} key={item.id} />
                  ))
                ) : (
                  <span>Список товаров пуст...</span>
                )}
              </ul>
            )}
          </div>
          <ReactPaginate
            containerClassName={styles.catalog__bottom__list}
            pageClassName={styles.catalog__bottom__list__item}
            pageLinkClassName={styles.catalog__bottom__list__item__link}
            previousClassName={styles.catalog__bottom__list__prev}
            nextClassName={styles.catalog__bottom__list__next}
            breakClassName={styles.catalog__bottom__list__break}
            breakLinkClassName={`${styles.catalog__bottom__list__break__link} ${darkModeClass}`}
            breakLabel="..."
            pageCount={pageCount}
            forcePage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </section>
  )
}

export default CatalogPage
