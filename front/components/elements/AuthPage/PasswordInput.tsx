import { IAuthPageInput } from '@/types/auth'
import styles from '@/styles/auth/index.module.scss'
import { $mode } from '@/context/mode'
import { useStore } from 'effector-react'

const PasswordInput = ({ register, errors }: IAuthPageInput) => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  return (
    <label className={styles.label}>
      <input
        {...register('password', {
          required: 'Введите пароль!',
          minLength: 4,
          maxLength: 20,
        })}
        className={`${styles.form_input} ${darkModeClass}`}
        type="password"
        placeholder="Password"
      />
      {errors.password && (
        <span className={styles.error_alert}>{errors.password?.message}</span>
      )}
      {errors.password && errors.password.type === 'minLength' && (
        <span className={styles.error_alert}>Минимум 4 символа!</span>
      )}
      {errors.password && errors.password.type === 'maxLength' && (
        <span className={styles.error_alert}>Не более 20 символов!</span>
      )}
    </label>
  )
}

export default PasswordInput
