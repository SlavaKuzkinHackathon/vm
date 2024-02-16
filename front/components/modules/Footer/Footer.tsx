/* eslint-disable @next/next/no-img-element */
import MarkerSvg from '@/components/elements/MarkerSvg/MarkerSvg'
import styles from '@/styles/footer/index.module.scss'
import FooterLogo from './FooterLogo'
import OnlineStoreContent from './OnlineStoreContent'
import UslugiCompany from './UslugiCompany'
import Link from 'next/link'
import PhoneSvg from '@/components/elements/PhoneSvg/PhoneSvg'
import MailSvg from '@/components/elements/MailSvg/MailSvg'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import Accordion from '@/components/elements/Accordion/Accordion'

const Footer = () => {
  const isMedia750 = useMediaQuery(750)
  const isMedia500 = useMediaQuery(500)

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__top}>
          {!isMedia750 && <FooterLogo />}
          <div className={styles.footer__top__inner}>
            <div className={styles.footer__top__item}>
              {!isMedia500 && (
                <>
                  <h3 className={styles.footer__top__item__title}>
                    Интернет-магазин
                  </h3>
                  <OnlineStoreContent />
                </>
              )}
              {isMedia500 && (
                <Accordion
                  title="Услуги компании"
                  titleClass={styles.footer__top__item__title}
                  arrowOpenClass={styles.open}
                >
                  <OnlineStoreContent />
                  <div style={{ height: 17 }} />
                </Accordion>
              )}
            </div>
            <div className={styles.footer__top__item}>
              {!isMedia500 && (
                <>
                  <h3 className={styles.footer__top__item__title}>
                    Услуги компании
                  </h3>
                  <UslugiCompany />
                </>
              )}
              {isMedia500 && (
                <Accordion
                  title="Услуги компании"
                  titleClass={styles.footer__top__item__title}
                  arrowOpenClass={styles.open}
                >
                  <UslugiCompany />
                  <div style={{ height: 17 }} />
                </Accordion>
              )}
            </div>
          </div>
          <div className={styles.footer__top__item}>
            <h3 className={styles.footer__top__item__title}>Контакты</h3>
            <ul
              className={`${styles.footer__top__item__list} ${styles.footer__top__item__contacts}`}
            >
              <li className={styles.footer__top__item__list__item}>
                <Link href="/contacts" passHref legacyBehavior>
                  <a className={styles.footer__top__item__list__item__link}>
                    <span>Адреса салонов: </span>
                    <span>
                      {' '}
                      <MarkerSvg />
                    </span>
                    <span>
                      г.Новосибирск ТВЦ "Большая Медведица​" ул.Светлановская,50
                      49 сектор;  2 этаж​.
                    </span>
                    <span> г.Новосибирск ул.Сибиряков-Гвардейцев, 49/1 к1.</span>
                  </a>
                </Link>
              </li>
              <li className={styles.footer__top__item__list__item}>
                <a
                  href="tel:+79139135547"
                  className={styles.footer__top__item__list__item__link}
                >
                  <span>Наш контактный телефон: </span>
                  <span>
                    <PhoneSvg />
                  </span>
                  <span>+7(913)913-55-47</span>
                </a>
              </li>
              <li className={styles.footer__top__item__list__item}>
                <a
                  href="mailto:mebel-petrova@mail.ru"
                  className={styles.footer__top__item__list__item__link}
                >
                  <span>Email: </span>
                  <span>
                    <MailSvg />
                  </span>
                  <span>mebel-petrova@mail.ru</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.footer__bottom}>
          <div className={styles.footer__bottom__block}>
            <div className={styles.footer__bottom__block__left}>
              <h3 className={styles.footer__bottom__block__title}>
                Мы принимаем к оплате:
              </h3>
              <ul className={styles.footer__bottom__block__pay}>
                <li className={styles.footer__bottom__block__pay__item}>
                  <img src="/img/master-card.png" alt="master-card" />
                </li>
                <li className={styles.footer__bottom__block__pay__item}>
                  <img src="/img/visa.png" alt="visa" />
                </li>
              </ul>
            </div>
            <div className={styles.footer__bottom__block__right}>
              <h3 className={styles.footer__bottom__block__title}>
                Мы в соцсетях:
              </h3>
              <ul className={styles.footer__bottom__block__social}>
                <li className={styles.footer__bottom__block__social__item}>
                    <a
                      href="https://t.me/ELENA15031977"
                      className={
                        styles.footer__bottom__block__social__item__telega
                      }
                    />
                </li>
                <li className={styles.footer__bottom__block__social__item}>
                  <a
                    href="https://wa.me/79139135547?text=Здравствуйте,%20интересует%20ваше%20объявление%20о%20диванах."
                    className={styles.footer__bottom__block__social__item__wa}
                  />
                </li>
              </ul>
            </div>
          </div>
          {isMedia750 && <FooterLogo />}
          <div className={styles.footer__bottom__block}>
            <p className={styles.footer__bottom__block__copyright}>
              © «Фабрика мягкой мебели» 1999 - {new Date().getFullYear()}.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
export default Footer
