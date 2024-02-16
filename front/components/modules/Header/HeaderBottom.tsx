/* eslint-disable @next/next/no-img-element */
import { $mode } from '@/context/mode'
import { useStore } from 'effector-react'
import Link from 'next/link'
import SearchInput from '@/components/elements/Header/SearchInput'
import ModeToggler from '@/components/elements/ModeToggler/ModeToggler'
import CartPopup from './CartPopup/CartPopup'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { setDisableCart } from '@/context/shopping-cart'
import styles from '@/styles/header/index.module.scss'

const HeaderBottom = () => {
  const  isMedia950 = useMediaQuery(950)
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const router = useRouter()

  useEffect(() => {
    if(router.pathname === '/order'){
      setDisableCart(true)
      return
    }
    setDisableCart(false)
  },[router.pathname])

  return (
    <div className={styles.header__bottom}>
      <div className={`container ${styles.header__bottom__container}`}>
        <h1 className={styles.header__logo}>
          <Link href="/" legacyBehavior passHref>
            <a className={styles.header__logo__link}>
              <img src="/img/logo.svg" alt="лого" />
              <span
                className={styles.header__logo__link__text}
              >Фабрика мягкой мебели</span>
            </a>
          </Link>
        </h1>
        <div className={styles.header__search}>
          <SearchInput />
        </div>
        <div className={`${styles.header__shopping_cart} ${darkModeClass}`}>
            {!isMedia950 && <ModeToggler />}
            <CartPopup />
        </div>
      </div>
    </div>
  )
}
export default HeaderBottom
