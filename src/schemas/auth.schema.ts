import { z } from 'zod'

type Props = {
  min?: number
  max?: number
}

const getMessage = (field: string, props?: Props) => {
  const { min, max } = props || {}

  return {
    isEmail: `${field} must be a valid email.`,
    minLength: `${field} must contain at least ${min} character(s).`,
    maxLength: `${field} must contain at most ${max} character(s).`
  }
}

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: getMessage('Email').isEmail })
    .trim(),
  password: z
    .string()
    .trim()
    .min(6, getMessage('Password', { min: 6 }).minLength)
})
