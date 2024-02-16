/* eslint-disable @next/next/no-img-element */
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import {useMediaQuery} from '@/hooks/useMediaQuery'
import { useEffect } from 'react'
import { $mode } from '@/context/mode'
import { useStore } from 'effector-react'
import styles from '@/styles/dashboard/index.module.scss'
import BrandsSliderNextArrow from '@/components/elements/BrandsSliderNextArrow/BrandsSliderNextArrow'
import BrandsSliderPrevArrow from '@/components/elements/BrandsSliderPrevArrow/BrandsSliderPrevArrow'


const DivansSlider = () => {
 const isMedia800 = useMediaQuery(800)
 const mode = useStore($mode)
 const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

    const divansPhotoItem = [
        {id: 1, img: '/imgSlider/1_1.png', alt: 'Модельный ряд "Селена"'},
        {id: 2, img: '/imgSlider/1_2.png', alt: 'Модельный ряд "Селена"'},
        {id: 3, img: '/imgSlider/1_4.png', alt: 'Модельный ряд "Селена"'},
        {id: 4, img: '/imgSlider/1_7.png', alt: 'Модельный ряд "Селена"'},
        {id: 5, img: '/imgSlider/1_8.png', alt: 'Модельный ряд "Селена"'},
        {id: 6, img: '/imgSlider/1_1.png', alt: 'Модельный ряд "Селена"'},
        {id: 7, img: '/imgSlider/1_2.png', alt: 'Модельный ряд "Селена"'},
        {id: 8, img: '/imgSlider/1_4.png', alt: 'Модельный ряд "Селена"'},
        {id: 9, img: '/imgSlider/1_7.png', alt: 'Модельный ряд "Селена"'},
        {id: 10, img: '/imgSlider/1_8.png', alt: 'Модельный ряд "Селена"'},
        {id: 11, img: '/imgSlider/1_1.png', alt: 'Модельный ряд "Селена"'},
        {id: 12, img: '/imgSlider/1_2.png', alt: 'Модельный ряд "Селена"'},
        {id: 13, img: '/imgSlider/1_4.png', alt: 'Модельный ряд "Селена"'},
        {id: 14, img: '/imgSlider/1_7.png', alt: 'Модельный ряд "Селена"'},
        {id: 15, img: '/imgSlider/1_8.png', alt: 'Модельный ряд "Селена"'},
    ]

   useEffect(() => {
    const slider = document.querySelector(
      `.${styles.dashboard__brands__slider}`
    )

    const list = slider?.querySelector('.slick-list') as HTMLElement

    list.style.height = isMedia800 ? '90px' : '120px'
  }, [isMedia800])

  const settings = {
    dots: false,
    infinite: true,
    slidesToScroll: 1,
    variableWidth: true,
    autoplay: true,
    speed: 500,
    nextArrow: <BrandsSliderNextArrow modeClass={darkModeClass} />,
    prevArrow: <BrandsSliderPrevArrow modeClass={darkModeClass} />,
  }

  
  return (
    <Slider {...settings} className={styles.dashboard__brands__slider}>
      {divansPhotoItem.map((item) => (
        <div
          className={`${styles.dashboard__brands__slide} ${darkModeClass}`} 
          key={item.id}
          style={{ width: isMedia800 ? 135: 190 }}
        >
          <img src={item.img} alt={item.alt} />
        </div>
      ))}
    </Slider>
  )
}

export default DivansSlider
