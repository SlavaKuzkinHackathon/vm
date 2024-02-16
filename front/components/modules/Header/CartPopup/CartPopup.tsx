import { useStore } from 'effector-react'
import { forwardRef, useEffect } from 'react'
import { $mode } from '@/context/mode'
import { IWrappedComponentProps } from '@/types/common'
import { AnimatePresence, motion } from 'framer-motion'
import { withClickOutside } from '@/utils/withClickOutside'
import styles from '@/styles/cartPopup/index.module.scss'
import ShoppingCartSvg from '@/components/elements/ShoppingCartSvg/ShoppingCartSvg'
import Link from 'next/link'
import {
  $disableCart,
  $shoppingCart,
  $totalPrice,
  setShoppingCart,
  setTotalPrice,
} from '@/context/shopping-cart'
import CartPopupItem from './CartPopupItem'
import { getCartItemsFx } from '@/app/api/shopping-cart'
import { $auth, $user } from '@/context/user'
import { toast } from 'react-toastify'
import { formatPrice } from '@/utils/common'

const CartPopup = forwardRef<HTMLDivElement, IWrappedComponentProps>(
  ({ open, setOpen }, ref) => {
    const mode = useStore($mode)
    const user = useStore($user)
    const auth = useStore($auth)
    const totalPrice = useStore($totalPrice)
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
    const shoppingCart = useStore($shoppingCart)
    const disableCart = useStore($disableCart)

    const toggleCartDropDown = () => setOpen(!open)

    useEffect(() => {
      loadCartItems()
    }, [auth, user.id])

    useEffect(() => {
      setTotalPrice(
        shoppingCart.reduce(
          (defaultCount, item) => defaultCount + item.total_price,
          0
        )
      )
    }, [shoppingCart, auth])

    const loadCartItems = async () => {
      try {
        const catrItems = await getCartItemsFx(`/shopping-cart/${user.id}`)

        setShoppingCart(catrItems)
      } catch (error) {
        //toast.error((error as Error).message)
        console.log('Вы не авторизованны')
      }
    }
    return (
      <div className={styles.cart} ref={ref}>
        {disableCart ? (
          <button
            className={`${styles.cart__btn} ${darkModeClass}`}
            style={{ cursor: 'auto' }}
          >
            <span className={styles.cart__svg}>
              <ShoppingCartSvg />
            </span>
            <span className={styles.cart__text}>Корзина</span>
          </button>
        ) : (
          <button
            className={`${styles.cart__btn} ${darkModeClass}`}
            onClick={toggleCartDropDown}
          >
            {!!shoppingCart.length && (
              <span className={styles.cart__btn__count}>
                {shoppingCart.length}
              </span>
            )}
            <span className={styles.cart__svg}>
              <ShoppingCartSvg />
            </span>
            <span className={styles.cart__text}>Корзина</span>
          </button>
        )}

        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className={`${styles.cart__popup} ${darkModeClass}`}
              style={{ transformOrigin: 'right top' }}
            >
              <h3 className={styles.cart__popup__title}>Корзина</h3>
              <ul className={styles.cart__popup__list}>
                {shoppingCart.length ? (
                  shoppingCart.map((item) => (
                    <CartPopupItem key={item.id} item={item} />
                  ))
                ) : (
                  <li className={styles.cart__popup__empty}>
                    <span
                      className={`${styles.cart__popup__empty__text} ${darkModeClass}`}
                    >
                      Корзина пуста
                    </span>
                  </li>
                )}
              </ul>
              <div className={styles.cart__popup__footer}>
                <div className={styles.cart__popup__footer__total}>
                  <span
                    className={`${styles.cart__popup__footer__text} ${darkModeClass}`}
                  >
                    Общая сумма заказа:
                  </span>
                  <span className={styles.cart__popup__footer__price}>
                    {formatPrice(totalPrice)} ₽
                  </span>
                </div>
                <Link href="/order" passHref legacyBehavior>
                  <button
                    className={styles.cart__popup__footer__btn}
                    disabled={!shoppingCart.length}
                  >
                    Оформить заказ
                  </button>
                </Link>
              </div>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    )
  }
)

CartPopup.displayName = 'CartPopup'

export default withClickOutside(CartPopup)
