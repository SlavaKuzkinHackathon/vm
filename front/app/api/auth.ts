import { createEffect } from 'effector-next'
import { toast } from 'react-toastify'
import api from '../axiosClient'
import { AxiosError, AxiosResponse } from 'axios'
import { HTTPStatus } from '@/constans'
import { ISignInFx, ISignUpFx, IUser } from '@/types/auth'
import jwtDecode from 'jwt-decode'
import { setAuth, setUser } from '@/context/user'
import IAuthResponse from '@/types/IAuthResponse'

export const singUpFx = createEffect(
  async ({ url, name, password, email }: ISignUpFx): Promise<AxiosResponse<IAuthResponse>> => {
    const { data } = await api.post(url, { name, password, email })
    const userDataReg: IUser = await jwtDecode(data.accessToken)

    setUser(userDataReg)

    localStorage.setItem('auth_registration', JSON.stringify(data.accessToken))

 /*    if (data.warningMessage) {
      toast.warning(data.warningMessage)
      return
    } */

    toast.success('Регистрация прошла успешно!')

    return data
  }
)

export const singInFx = createEffect(
  async ({ url, email, password }: ISignInFx): Promise<AxiosResponse<IAuthResponse>> => {
    const result = await api.post(url, { email, password })

    const userData: IUser = await jwtDecode(result.data.accessToken)

    setUser(userData)

    localStorage.setItem('auth', JSON.stringify(result.data))

    toast.success('Вход выполнен!')

    return result
  }
)

export const checkUserAuthFx = createEffect(async (token: string | any) => {
  try {
    const data = jwtDecode(token)

    const { email, id, name, roles } = data as IUser

    return { email, id, name, roles }
  } catch (error) {
    const axiosError = error as AxiosError

    if (axiosError.response) {
      if (axiosError.response.status === HTTPStatus.FORBIDDEN) {
        return false
      }
    }

    // toast.error((error as Error).message);
  }
})

/* export const checkUserAuthFx = createEffect(async (url: string) => {
  try {
    const data = await api.get(url)
    const userDataCheck: IUser = await jwtDecode(data.data.accessToken)

    setUser(userDataCheck)

    return data
  } catch (error) {
    const axiosError = error as AxiosError

    if (axiosError.response) {
      if (axiosError.response.status === HTTPStatus.FORBIDDEN) {
        return false
      }
    }

    //toast.error((error as Error).message)
  }
}) */

export const logoutFx = createEffect(async (url: string): Promise<void> => {
  try {
    await api.get(url)
    setAuth(false)
  } catch (error) {
    toast.error((error as Error).message)
  }
})

/*


export const checkUserAuthFx = createEffect(async (token: string | any) => {
	try {
		const data = jwt_decode(token);

		const { email, id, username } = data as IUser;

		return { email, id, username };
	} catch (error) {
		const axiosError = error as AxiosError;

		if (axiosError.response) {
			if (axiosError.response.status === HTTPStatus.FORBIDDEN) {
				return false;
			}
		}

		// toast.error((error as Error).message);
	}
});
*/
