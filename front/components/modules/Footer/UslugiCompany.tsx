import Link from 'next/link'
import styles from '@/styles/footer/index.module.scss'

const UslugiCompany = () => (
  <ul className={styles.footer__top__item__list}>
    <li className={styles.footer__top__item__list__item}>
      <Link href="/services" passHref legacyBehavior>
        <a className={styles.footer__top__item__list__item__link}>Ремонт и перетяжка мягкой мебели</a>
      </Link>
    </li>
    <li className={styles.footer__top__item__list__item}>
      <Link href="/custom" passHref legacyBehavior>
        <a className={styles.footer__top__item__list__item__link}>Изготовление мягкой мебели на заказ</a>
      </Link>
    </li>
  </ul>
)

export default UslugiCompany