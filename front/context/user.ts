import { IUser,} from '@/types/auth'
import {
  createDomain,
} from 'effector-next'
import persist from 'effector-localstorage'


const user = createDomain()

export const setUser = user.createEvent<IUser>()
export const setUserCity = user.createEvent<{ city: string; street: string }>()

export const $user = user
  .createStore<IUser>({} as IUser)
  .on(setUser, (_, user) => user)

export const $userCity = user
  .createStore({ city: '', street: '' })
  .on(setUserCity, (_, city) => city)

export const setAuth = user.createEvent<boolean>()

export const $auth = user
  .createStore<boolean>(false)
  .on(setAuth, (_, value) => value)


  persist({ store: $user, key: 'user' })

