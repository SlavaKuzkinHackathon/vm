/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { $mode } from '@/context/mode'
import { useStore } from 'effector-react'
import React from 'react'
import { getImageURL } from '@/utils/getImageURL'
import { IProduct } from '@/types/productsm'
import { formatPrice } from '@/utils/common'
import CartHoverCheckedSvg from '@/components/elements/CartHoverCheckedSvg/CartHoverCheckedSvg'
import CartHoverSvg from '@/components/elements/CartHoverSvg/CartHoverSvg'
import { $shoppingCart } from '@/context/shopping-cart'
import { toggleCartItem } from '@/utils/shopping-cart'
import { $user } from '@/context/user'
import { removeFromCartFx } from '@/app/api/shopping-cart'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import styles from '@/styles/catalog/index.module.scss'

const CatalogItem = ({ item }: { item: IProduct }) => {

  const mode = useStore($mode)
  const user = useStore($user)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const spinner = useStore(removeFromCartFx.pending)

  const shoppingCart = useStore($shoppingCart)
  const isInCart = shoppingCart.some((cartItem) => cartItem.productId === item.id)


  const toggleToCart = () => toggleCartItem(user.name, item.id, isInCart)

  return (
    <li className={`${styles.catalog__list__item} ${darkModeClass}`}>
      <Link href={`/catalog/${item.id}`} passHref legacyBehavior>
        <img src={getImageURL(item.image)} alt={item.name} />
      </Link>
      <div className={styles.catalog__list__item__inner}>
        <Link href={`/catalog/${item.id}`} passHref legacyBehavior>
          <h3 className={styles.catalog__list__item__title}>{item.name}</h3>
        </Link>
        <span className={styles.catalog__list__item__code}>
          Описание: {item.description}
        </span>
        <span className={styles.catalog__list__item__price}>
          {formatPrice(item.price)} ₽
        </span>
      </div>
      <button
        className={`${styles.catalog__list__item__cart} ${isInCart ? styles.added : ''
          }`}
        disabled={spinner}
        onClick={toggleToCart}
      >
        {spinner ? (
          <div className={spinnerStyles.spinner} style={{ top: 6, left: 6 }} />
        ) : (
          <span>{isInCart ? <CartHoverCheckedSvg /> : <CartHoverSvg />}</span>
        )}
      </button>
    </li>
  )

}

export default CatalogItem