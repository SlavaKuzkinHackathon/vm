/* eslint-disable @next/next/no-img-element */
import { useStore } from 'effector-react'
import { $mode } from '@/context/mode'
import styles from '@/styles/about/index.module.scss'

const AboutPage = () => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  return (
    <section className={styles.about}>
      <div className="container">
        <h2 className={`${styles.about__title} ${darkModeClass}`}>
          О компании
        </h2>
        <div className={styles.about__inner}>
          <div className={`${styles.about__info} ${darkModeClass}`}>
            <p>
              Производство мягкой мебели всегда было нашим основным видом деятельности.
              За время существования компании, мы в разы увеличили свои производственные мощности,
              тем самым, значительно расширив модельный ряд. Используя современное оборудование,
              труд квалифицированных и опытных мастеров, а также первосортные материалы,
              мы смело гарантируем отличное качество и долгий срок эксплуатации мягкой мебели нашего производства.
            </p>
            <p>
              Компания &quot;Ваша Мебель&quot; идет в ногу со временем.
              Наше предприятие регулярно использует свежие идеи из сферы мебельного производства,
              чтобы изготавливать не только качественные, но и стильные элементы интерьера.
              Мы рады предложить вам широкий спектр услуг по изготовлению диванов, кресел,
              пуфов и другой мягкой мебели по ценам от производителя.
            </p>
          </div>
          <div className={styles.about__img}>
            <img src="/img/999.png" alt="image-999" />
          </div>
          <div className={styles.about__img}>
            <img src="/img/888.png" alt="image-888" />
          </div>
          <div className={styles.about__img}>
            <img src="/img/777.png" alt="image-777" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutPage
