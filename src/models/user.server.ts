import type { Password, User } from '@prisma/client'
import * as argon from 'argon2'

import { prisma } from '~/lib'

export type { User } from '@prisma/client'

export const getUserById = async (id: User['id']) => {
  return prisma.user.findUnique({ where: { id } })
}

export const getUserByEmail = async (email: User['email']) => {
  return prisma.user.findUnique({ where: { email } })
}

export const createUser = async (email: User['email'], password: string) => {
  const hashedPassword = await argon.hash(password)

  return prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword
        }
      }
    }
  })
}

export const deleteUserByEmail = async (email: User['email']) => {
  return prisma.user.delete({ where: { email } })
}

export const verifyLogin = async (
  email: User['email'],
  password: Password['hash']
) => {
  const userWithPassword = await prisma.user.findUnique({
    where: { email },
    include: {
      password: true
    }
  })

  if (!userWithPassword || !userWithPassword.password) {
    return null
  }

  const isValid = await argon.verify(userWithPassword.password.hash, password)

  if (!isValid) {
    return null
  }

  const { password: _password, ...userWithoutPassword } = userWithPassword

  return userWithoutPassword
}
