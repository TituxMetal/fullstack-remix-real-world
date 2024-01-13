import { z } from 'zod'

type Props = {
  min?: number
  max?: number
}

const getMessage = (field: string, props?: Props) => {
  const { min, max } = props || {}

  return {
    isEmail: `${field} must be a valid email.`,
    notEmpty: `${field} must not be empty.`,
    minLength: `${field} must contain at least ${min} character(s).`,
    maxLength: `${field} must contain at most ${max} character(s).`
  }
}

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty({ message: getMessage('Email').notEmpty })
    .email({ message: getMessage('Email').isEmail })
    .trim(),
  password: z
    .string()
    .trim()
    .min(1, { message: getMessage('Password').notEmpty })
    .min(6, getMessage('Password', { min: 6 }).minLength)
})

export const registerSchema = loginSchema.extend({
  username: z
    .string()
    .trim()
    .min(1, { message: getMessage('Username').notEmpty })
    .min(3, { message: getMessage('Username', { min: 3 }).minLength })
    .max(15, { message: getMessage('Username', { max: 15 }).maxLength })
})
