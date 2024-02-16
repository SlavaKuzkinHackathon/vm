import { useStore } from 'effector-react'
import { $productOne } from '@/context/productOne'
import { $mode } from '@/context/mode'
import { formatPrice } from '@/utils/common'
import { $shoppingCart } from '@/context/shopping-cart'
import CartHoverCheckedSvg from '@/components/elements/CartHoverCheckedSvg/CartHoverCheckedSvg'
import CartHoverSvg from '@/components/elements/CartHoverSvg/CartHoverSvg'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import { toggleCartItem } from '@/utils/shopping-cart'
import { $user } from '@/context/user'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { getProductsFx } from '@/app/api/products'
import {
  $productsm,
} from '@/context/products'
import { removeFromCartFx } from '@/app/api/shopping-cart'
import styles from '@/styles/product/index.module.scss'
import DashboardSlider from '@/components/modules/HomePage/DashboardSlider'
import PartImagesList from '@/components/modules/ProductPage/ProductImageList'

const ProductPage = () => {
  const mode = useStore($mode)
  const user = useStore($user)
  const productOne = useStore($productOne)
  const productsm = useStore($productsm)
  const cartItems = useStore($shoppingCart)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const isInCart = cartItems.some((item) => item.productId === productOne.id)
  const spinnerToggleCart = useStore(removeFromCartFx.pending)
  const spinnerSlider = useStore(getProductsFx.pending)
  const toggleToCart = () =>
    toggleCartItem(user.name, productOne.id, isInCart)

  return (
    <section>
      <div className="container">
        <div className={`${styles.part__top} ${darkModeClass}`}>
          <h2 className={`${styles.part__title} ${darkModeClass}`}>
            {productOne.name}
          </h2>
          <div className={styles.part__inner}>
            <PartImagesList /> 
            <div className={styles.part__info}>
              <span className={`${styles.part__info__price} ${darkModeClass}`}>
                {formatPrice(productOne.price || 0)} ₽
              </span>
              <span className={styles.part__info__stock}>
                {productOne.in_stock > 0 ? (
                  <span className={styles.part__info__stock__success}>
                    Есть на складе
                  </span>
                ) : (
                  <span className={styles.part__info__stock__not}>
                    Нет на складе
                  </span>
                )}
              </span>
              <span className={styles.part__info__code}>
                Описание: {productOne.description}
              </span>
              <button
                className={`${styles.part__info__btn} ${
                  isInCart ? styles.in_cart : ''
                }`}
                onClick={toggleToCart}
              >
                {spinnerToggleCart ? (
                  <span
                    className={spinnerStyles.spinner}
                    style={{ top: 10, left: '45%' }}
                  />
                ) : (
                  <>
                    <span className={styles.part__info__btn__icon}>
                      {isInCart ? <CartHoverCheckedSvg /> : <CartHoverSvg />}
                    </span>
                    {isInCart ? (
                      <span>Добавлено в корзину</span>
                    ) : (
                      <span>Положить в корзину</span>
                    )}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
        <div className={styles.part__bottom}>
          <h2 className={`${styles.part__title} ${darkModeClass}`}>
            Вам понравится
          </h2>
          <DashboardSlider
            goToProductPage
            spinner={spinnerSlider}
            items={productsm.rows || []}
          />
        </div>
      </div>
    </section>
  )
}

export default ProductPage


