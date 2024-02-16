import { useStore } from 'effector-react'
import { $mode } from '@/context/mode'
import styles from '@/styles/contacts/index.module.scss'
import FeedbackForm from '@/components/modules/FeedbackForm/FeedbackForm'

import Link from 'next/link'

const ServicesPage = ({ isCustomPage = true }) => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  return (
    <section className={styles.contacts}>
      <div className="container">
        <h2 className={`${styles.contacts__title} ${darkModeClass}`}>
          {isCustomPage
            ? 'Ремонт и перетяжка мягкой мебели'
            : 'Изготовление мягкой мебели на заказ'}
        </h2>
        <div className={styles.contacts__inner}>
          {isCustomPage ? (
            <div className={`${styles.contacts__list} ${darkModeClass}`}>
              <p>
                Мы работаем индивидуально с каждым нашим заказчиком и тщательно
                подбираем обивочный материал, аналогичный тому, что был на вашей
                мебели. Если даже точно таких материалов у нас в данный момент
                нет в наличии, мы закажем его специально для Вас.
              </p>
              <p>
                <span>Ремонт и перетяжка мебели недорого: </span>
                <span>+7 (913) 913-55-47</span>
              </p>
              <p>
                Либо опишите суть заказа в форме обратной связи и мы с вами
                свяжемся.
              </p>

              <div className={`${styles.contacts__list} ${darkModeClass}`}>
                <Link href="/custom" passHref legacyBehavior>
                  <a>
                    Также мы изготавливаем мягкую мебель по индивидуальным
                    проектам
                  </a>
                </Link>
              </div>
            </div>
          ) : (
            <div className={`${styles.contacts__list} ${darkModeClass}`}>
              <p>
                Компания "Ваша мебель" с удовольствием возьмётся за проект по
                изготовлению мягкой мебели (диванов) для любого интерьера.
                Квалифицированные специалисты гарантированно выполнят все работы
                в полном соответствии с требованиями заказчика.
              </p>
              <p>
                <span>
                  Изготовление мягкой мебели по индивидуальным проектам:{' '}
                </span>
                <span>+7 (913) 913-55-47</span>
              </p>
              <p>
                Либо опишите суть заказа в форме обратной связи и мы с вами
                свяжемся.
              </p>
              <div className={`${styles.contacts__list} ${darkModeClass}`}>
                <Link href="/services" passHref legacyBehavior>
                  <a>
                    Также мы ремонтируем и перетягиваем мягкую мебель
                  </a>
                </Link>
              </div>
            </div>
          )}
          <FeedbackForm />
        </div>
      </div>
    </section>
  )
}

export default ServicesPage
