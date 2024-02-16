import { IAuthPageInput } from '@/types/auth'
import styles from '@/styles/auth/index.module.scss'
import { $mode } from '@/context/mode'
import { useStore } from 'effector-react'

const EmailInput = ({ register, errors }: IAuthPageInput) => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  return (
    <label className={styles.label}>
      <input
        {...register('email', {
          required: 'Введите Email!',
          pattern: {
            value:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-z\-0-9]+\.)+(ru)))$/i,
            message: 'Неправильный Email!',
          },
        })}
        className={`${styles.form_input} ${darkModeClass}`}
        type="email"
        placeholder="Email"
      />
      {errors.email && (
        <span className={styles.error_alert}>{errors.email?.message}</span>
      )}
    </label>
  )
}

export default EmailInput

/* /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/i */
/* /\S+@\S+\.\S+/ */


