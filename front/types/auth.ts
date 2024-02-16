import { FieldErrors, UseFormRegister } from 'react-hook-form'

export interface IInputs {
name: string
  email: string
  password: string
}

export interface IAuthPageInput {
  register: UseFormRegister<IInputs>
  errors: FieldErrors<IInputs>
}

export interface ISignUpFx {
  url: string
  name: string
  password: string
  email: string
}

export interface ISignInFx {
  url: string
  email: string
  password: string
}

export interface IUser {
  name: string
  id: number | string
  email: string
  roles: [{ id: number; value: string }]
}


