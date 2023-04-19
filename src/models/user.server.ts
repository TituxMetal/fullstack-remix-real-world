import type { Password, User } from '@prisma/client'
import bcrypt from 'bcryptjs'

import { prisma } from '~/lib'

export type { User } from '@prisma/client'

export const getUserById = async (id: User['id']) => {
  return prisma.user.findUnique({ where: { id } })
}

export const getUserByEmail = async (email: User['email']) => {
  return prisma.user.findUnique({ where: { email } })
}

export const createUser = async (email: User['email'], password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10)

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

  const isValid = await bcrypt.compare(password, userWithPassword.password.hash)

  if (!isValid) {
    return null
  }

  const { password: _password, ...userWithoutPassword } = userWithPassword

  return userWithoutPassword
}
