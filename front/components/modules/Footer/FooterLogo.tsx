/* eslint-disable @next/next/no-img-element */
//import React from 'react'
import Link from 'next/link'
import styles from '@/styles/footer/index.module.scss'

const FooterLogo = () => (
  <div className={styles.footer__top__item}>
    <Link href="/" passHref legacyBehavior>
      <a className={styles.footer__top__item__logo}>
        <img src="/img/logo.svg" alt="logo" />
        <span className={styles.footer__top__item__logo__text}>
          {' '}
          Фабрика мягкой мебели{' '}
        </span>
      </a>
    </Link>
  </div>
)

export default FooterLogo
