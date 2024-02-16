import { $mode } from '@/context/mode'
import styles from '@/styles/catalog/index.module.scss'
import { IModelsBlockProps } from '@/types/catalog'
import { useStore } from 'effector-react'
import { AnimatePresence, motion } from 'framer-motion'
import ModelsBlockItem from './ModelsBlockItem'

const ModelsBlock = ({ title, event, modelsList }: IModelsBlockProps) => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const checkedItems = modelsList.filter((item) => item.checked)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`${styles.manufacturers} ${darkModeClass}`}
    >
      <h3 className={styles.manufacturers__title}>{title}</h3>
      <ul className={styles.manufacturers__list}>
        <AnimatePresence>
          {checkedItems.map((item) => (
            <ModelsBlockItem key={item.id} item={item} event={event} />
          ))}
        </AnimatePresence>
      </ul>
    </motion.div>
  )
}

export default ModelsBlock
