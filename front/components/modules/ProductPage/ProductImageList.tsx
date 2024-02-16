/* eslint-disable @next/next/no-img-element */
import { useStore } from 'effector-react'
import { $productOne } from '@/context/productOne'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { getImageURL } from '@/utils/getImageURL'
import styles from '@/styles/product/index.module.scss'

const PartImagesList = () => {
  const productOne = useStore($productOne)
  const isMobile = useMediaQuery(850)
  const isMobile700 = useMediaQuery(700)
  const isMobile530 = useMediaQuery(530)

  return (
    <div className={styles.part__images}>
      {isMobile ? (
       <div
        className={styles.part__slide}
        style={{ width: isMobile530 ? 228 : isMobile700 ? 350 : 593 }}
      >
        <img src={getImageURL(productOne.image)} alt={productOne.name}  />
      </div>
      ) : (
        <>
          <div className={styles.part__images__main}>
            <img src={getImageURL(productOne.image)} alt={productOne.name}/>
          </div>
        </>
      )}
    </div>
  )
}

export default PartImagesList
