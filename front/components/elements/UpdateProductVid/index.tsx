import { useEffect } from 'react'
import { useStore } from 'effector-react'
import { UpdateProductItem } from '../UpdateProduct/index'
import { $product, setProducts } from '@/context/product'
import { getProductsFx } from '@/app/api/products'
import { toast } from 'react-toastify'
import CreateProduct from '../CreateProduct'
import styles from '@/styles/admin/getProductsList.module.scss'

export const UpdateProductVid = () => {
  const products = useStore($product)
  const loadProducts = async () => {
    try {
      const data = await getProductsFx('/products')
      setProducts(data)
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  return (
    <div>
      <CreateProduct />
      <h2>Диваны</h2>
      <table></table>
      <ul className={styles.ul}>
        {products.map((product) => (
          <UpdateProductItem key={product.id} product={product} />
        ))}
      </ul>
    </div>
  )
}
