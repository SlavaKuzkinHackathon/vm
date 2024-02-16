import { useEffect, useId } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useUnit } from 'effector-react'

import styles from '@/styles/admin/createProduct.module.scss'
import { $isPending, formSubmitted, productCreated } from './index.model'

const CreateProduct = () => {
  const [isPending] = useUnit([$isPending])

  const formSubmittedEvent = useUnit(formSubmitted)

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: '',
      description: '',
      model: '',
      price: 0,
      rating: 0,
      in_stock: 0,
      image: '',
    },
  })

  const onSubmit = handleSubmit((data) => {
    formSubmittedEvent({
      name: data.name,
      description: data.description,
      model: data.model,
      price: data.price,
      in_stock: data.in_stock,
      rating: data.rating,
      image: data.image,
    })
    
  })

  useEffect(() => {
    return productCreated.watch(() => {
      reset()
    })
  }, [reset])

  return (
    <form
      className={styles.form}
      onSubmit={onSubmit}
    >
      <h1>Создать товар</h1>
      <div className={styles.form_item}>
        <input
          {...register('name', { required: '0Name is required!' })}
          placeholder="Наименование"
          type="text"
        />
      </div>

      <div className={styles.form_item}>
        <input
          {...register('description')}
          type="text"
          placeholder="Описание"
        />
      </div>
      <div className={styles.form_item}>
        <input
          {...register('model')}
          type="text"
          placeholder="Модель"
        />
      </div>
      <div className={styles.form_item}>
        <input
          placeholder="Стоимость"
          className="form-control"
          type="number"
          {...register('price', {
            required: 'Price is required!',
            valueAsNumber: true,
          })}
        />
      </div>
      <div className={styles.form_item}>
        <input
          {...register('in_stock')}
          type="number"
          placeholder="Количество"
          className="form-control"
        />
      </div>
      <div className={styles.form_item}>
        <input
          {...register('rating')}
          type="number"
          placeholder="Рейтинг"
          className="form-control"
        />
      </div>
      <div className={styles.form_item}>
        <input 
        {...register('image')}
        type="file"/>
      </div>
       <button >Создать</button>
    </form>
  )
}

export default CreateProduct
