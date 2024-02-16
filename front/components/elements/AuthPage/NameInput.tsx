import { IAuthPageInput } from '@/types/auth'
import styles from '@/styles/auth/index.module.scss'
import { $mode } from '@/context/mode'
import { useStore } from 'effector-react'

const NameInput = ({ register, errors }: IAuthPageInput) => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  return (
    <label className={styles.label}>
      <input
        
        {...register('name', {
          required: 'Введите имя!',
          minLength: 2,
          maxLength: 15,
          pattern: {
            value: /^[а-яА-Яa-zA-ZёЁ]*$/,
            message: 'Недопустимое значение!',
          },
        })}
        className={`${styles.form_input} ${darkModeClass}`}
        type="text"
        placeholder="Имя"
      />
      {errors.name && (
        <span className={styles.error_alert}>{errors.name?.message}</span>
      )}
      {errors.name && errors.name.type === 'minLength' && (
        <span className={styles.error_alert}>Минимум 2 символа!</span>
      )}
      {errors.name && errors.name.type === 'maxLength' && (
        <span className={styles.error_alert}>Не более 15 символов!</span>
      )}
    </label>
  )
}

export default NameInput
