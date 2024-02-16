import { $mode } from "@/context/mode"
import { useStore } from "effector-react"
import { ICatalogFilterMobileProps } from "@/types/catalog"
import Accordion from "@/components/elements/Accordion/Accordion"
import PriceRange from "./PriceRange"
import FiltersPopupTop from "./FiltersPopupTop"
import FiltersPopup from "./FiltersPopup"
import { useState } from "react"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { $productsmModels, setProductsm, setProductsmModels, updateProductsmModels } from "@/context/products"
import router from "next/router"
import { toast } from "react-toastify"
import { getProductsPaginateFx } from "@/app/api/products"
import spinnerStyles from '@/styles/spinner/index.module.scss'
import styles from '@/styles/catalog/index.module.scss'


const CatalogFiltersMobile =({
  spinner,
  resetFilterBtnDisabled,
  resetFilters,
  closePopup,
  applyFilters,
  filtersMobileOpen,
  setIsPriceRangeChanged,
  priceRange,
  setPriceRange,
} :
  ICatalogFilterMobileProps) => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const productModels = useStore($productsmModels)
  const [openModels, setOpenModels] = useState(false)
  const handleOpenModels = () => setOpenModels(true)
  const handleCloseModels = () => setOpenModels(false)
  const isAnyProductModelerChecked = productModels.some(
    (item) => item.checked
  )

  const isMobile = useMediaQuery(820)

 /*  const resetAllProductModel = () =>
  setProductsmModels(
    productModels.map((item) => ({ ...item, checked: false }))
    ) */

    const resetAllProductModel = async () => {
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

  
  const applyFiltersAndClosePopup = () => {
    applyFilters()
    closePopup()
  }



return (
    <div
      className={`${styles.catalog__bottom__filters} ${darkModeClass} ${
        filtersMobileOpen ? styles.open : ''
      }`}
    >
      <div className={styles.catalog__bottom__filters__inner}>
        <FiltersPopupTop
          resetBtnText="Сбросить все"
          title="Фильтры"
          resetFilters={resetFilters}
          resetFilterBtnDisabled={resetFilterBtnDisabled}
          closePopup={closePopup}
        />
        <div className={styles.filters__boiler_manufacturers}>
          <button
            className={`${styles.filters__manufacturer__btn} ${darkModeClass}`}
            onClick={handleOpenModels}
          >
            Модели мебели
          </button>
          <FiltersPopup
            title="Модели мебели"
            resetFilterBtnDisabled={!isAnyProductModelerChecked}
            updateModel={updateProductsmModels}
            setModel={setProductsmModels}
            applyFilters={applyFiltersAndClosePopup}
            modelsList={productModels}
            resetAllModels={resetAllProductModel}
            handleClosePopup={handleCloseModels}
            openPopup={openModels}
          />
        </div>
        
        <div className={styles.filters__price}>
          <Accordion
            title="Цена"
            titleClass={`${styles.filters__manufacturer__btn} ${darkModeClass}`}
            hideArrowClass={styles.hide_arrow}
            isMobileForFilters={isMobile}
          >
            <div className={styles.filters__manufacturer__inner}>
              <PriceRange
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                setIsPriceRangeChanged={setIsPriceRangeChanged}
              />
              <div style={{ height: 24 }} />
            </div>
          </Accordion>
        </div>
      </div>
      <div className={styles.filters__actions}>
        <button
          className={styles.filters__actions__show}
          onClick={applyFiltersAndClosePopup}
          disabled={resetFilterBtnDisabled}
        >
          {spinner ? (
            <span
              className={spinnerStyles.spinner}
              style={{ top: 6, left: '47%' }}
            />
          ) : (
            'Показать'
          )}
        </button>
      </div>
    </div>
  )
}

export default CatalogFiltersMobile
