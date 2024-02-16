import styles from '@/styles/admin/index.module.scss'
import { useCallback, useState } from 'react'
import AdminProductsPage from './products'
import { NextPage } from 'next'
import useRedirectByAdmin from '@/hooks/useRedirectByAdmin'
import Breadcrumbs from '@/components/modules/Breadcrumbs/Breadcrumbs'

const Admin: NextPage = () => {
  const { shouldAccessAllow } = useRedirectByAdmin(true)
  const [isActive, setIsActive] = useState('products')

  const getDefaultTextGenerator = useCallback(() => 'Админ-панель', [])
  const getTextGenerator = useCallback((param: string) => ({}[param]), [])

  return (
    <>
    <Breadcrumbs
            getDefaultTextGenerator={getDefaultTextGenerator}
            getTextGenerator={getTextGenerator}
          /> 
      {shouldAccessAllow && (
        <section className={styles.admin}>
          <div className={styles.header}>
            <h1 className={styles.name}>Админ-панель</h1>

            <div className={styles.tabs}>
              <button
                className={`${styles.tab} ${
                  isActive === 'products' && styles.tab_active
                }`}
                onClick={() => setIsActive('products')}
              >
                Товары
              </button>
              <button
                className={`${styles.tab} ${
                  isActive === 'orders' && styles.tab_active
                }`}
                onClick={() => setIsActive('orders')}
              >
                Заказы
              </button>
              <button
                className={`${styles.tab} ${
                  isActive === 'users' && styles.tab_active
                }`}
                onClick={() => setIsActive('users')}
              >
                Пользователи
              </button>
            </div>
          </div>
          {isActive === 'products' && <AdminProductsPage />}
        </section>
      )}
    </>
  )
}

export default Admin
