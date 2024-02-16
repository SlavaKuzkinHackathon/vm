import { useState } from 'react'
import { useUnit } from 'effector-react'
import { $isDeleting, deleteProduct, updateProduct } from './index.model'
import { IProduct } from '@/types/product'
import { toast } from 'react-toastify'
import { getImageURL } from '@/utils/getImageURL'
import styles from '@/styles/admin/getProductsList.module.scss'
import { Button } from '@/components/ui/atoms/Button'
import {
  Image as ImageType,
  ImageInput,
} from '@/components/ui/atoms/ImageInput'
import Image from 'next/image'

type ProductItemProps = {
  product: IProduct
}

export const UpdateProductItem = ({ product }: ProductItemProps) => {
  const [isDeleting, deleteProductEvent, updateProductEvent] = useUnit([
    $isDeleting,
    deleteProduct,
    updateProduct,
  ])

  const [isEditing, setIsEditing] = useState(false)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [model, setModel] = useState('')
  const [price, setPrice] = useState(0)
  const [in_stock, setIn_stock] = useState(0)
  const [rating, setRating] = useState(0)
  const [icon, setIcon] = useState<ImageType>({
    preview: '',
    raw: null,
  })

  const [isPending, setIsPending] = useState(false)

  const onSave = () => {
    try {
      setIsPending(true)
      updateProductEvent({
        id: product.id,
        name,
        description,
        model,
        price,
        in_stock,
        rating,
        image: icon.raw || undefined,
      })
      setIsEditing(false)
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setIsPending(false)
    }
  }

  if (isEditing) {
    return (
      <li>
        <div className={styles.form_item}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Наименование"
            type="text"
          />
        </div>
        <div className={styles.form_item}>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            placeholder="Описание"
          />
        </div>
        <div className={styles.form_item}>
          <input
            value={model}
            onChange={(e) => setModel(e.target.value)}
            type="text"
            placeholder="Модель"
          />
        </div>
        <div className={styles.form_item}>
          <input
            placeholder="Стоимость"
            className="form-control"
            type="number"
            value={price}
            onChange={(e) => setPrice(parseInt(e.target.value))}
          />
        </div>
        <div className={styles.form_item}>
          <input
            value={in_stock}
            onChange={(e) => setIn_stock(parseInt(e.target.value))}
            type="number"
            placeholder="Количество"
          />
        </div>
        <div className={styles.form_item}>
          <input
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
            type="number"
            placeholder="Рейтинг"
          />
        </div>
        <div className={styles.form_item}>
          <ImageInput preview={icon.preview} onChange={(i) => setIcon(i)} />
        </div>
        <Button onClick={() => onSave()} color='secondary'>Создать</Button>
        <button onClick={() => setIsEditing(false)}>Закрыть</button>
      </li>
    )
  }

  return (
    <li className={styles.li}>
      <br />
      <div>
        <Image
          src={getImageURL(product.image)}
          alt={product.name}
          width={80}
          height={60}
        />
      </div>
      <div>{product.id}</div>
      <div>{product.name}</div>
      <div>{product.description}</div>
      <div>{product.model}</div>
      <div>{product.price}</div>
      <div>{product.in_stock}</div>
      <div>{product.rating}</div>

      <div>
        <Button
          isLoading={isPending}
          onClick={() => {
            setName(product.name)
            setDescription(product.description)
            setModel(product.model)
            setPrice(product.price)
            setIn_stock(product.in_stock)
            setRating(product.rating)
            setIcon({ preview: getImageURL(product.image), raw: null })
            setIsEditing(true)
          }}
          color='secondary'
        >
          Изменить
        </Button> 
        <Button
          onDoubleClick={() => deleteProductEvent(product.id)}
          isLoading={isDeleting}
          color="danger"
        >
          Удалить
        </Button>
      </div>
    </li>
  )
}
