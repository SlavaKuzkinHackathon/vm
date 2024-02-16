import NameInput from '@/components/elements/AuthPage/NameInput'
import { $mode } from '@/context/mode'
import styles from '@/styles/auth/index.module.scss'
import { useStore } from 'effector-react'
import { useForm } from 'react-hook-form'
import { IInputs } from '@/types/auth'
import EmailInput from '@/components/elements/AuthPage/EmailInput'
import PasswordInput from '@/components/elements/AuthPage/PasswordInput'
import { singUpFx } from '@/app/api/auth'
import { showAuthError } from '@/utils/errors'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import { useState } from 'react'
import { setAuth } from '@/context/user'
import { useRouter } from 'next/router'

const SignUpForm = () => {
  const [spinner, setSpinner] = useState(false)
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const {
    register,
    formState: { errors },
    handleSubmit,
    resetField,
  } = useForm<IInputs>()
  const route = useRouter()

  const onSubmit = async (data: IInputs) => {
    try {
     await singUpFx({
        url: '/auth/registration',
        name: data.name,
        password: data.password,
        email: data.email,
      })
      setAuth(true)
      resetField('name')
      resetField('email')
      resetField('password')
      route.push('/')
    } catch (error) {
      showAuthError(error)
    } finally {
      setSpinner(false)
    }
  }

  return (
    <form className={styles.register_form} onSubmit={handleSubmit(onSubmit)}>
      <div className={`${styles.input} ${darkModeClass}`}>
        <NameInput register={register} errors={errors} />
        <EmailInput register={register} errors={errors} />
        <PasswordInput register={register} errors={errors} />
        <button className={`${styles.button} ${darkModeClass}`}>
          {spinner ? <div className={spinnerStyles.spinner} /> : 'Регистрация'}
        </button>
      </div>
    </form>
  )
}
export default SignUpForm
