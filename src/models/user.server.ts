import type { Password, Prisma, Profile, User } from '@prisma/client'
import * as argon from 'argon2'

import { prisma } from '~/lib'

type CreateUserInput = {
  email: User['email']
  password: Password['hash']
  username: Profile['username']
}

export const create = async (data: CreateUserInput) => {
  const { password, username, ...dto } = data
  const hash = await argon.hash(password)

  return prisma.user.create({
    data: {
      ...dto,
      profile: { create: { username } },
      password: { create: { hash } }
    },
    include: { profile: true }
  })
}

export const getByUniqueField = async (
  where: Prisma.UserWhereUniqueInput,
  options?: Prisma.UserInclude
) => {
  const include = options || { password: false, profile: true }

  return prisma.user.findUnique({ where, include })
}

export const getByEmail = async (email: string) => getByUniqueField({ email })

export const getById = async (id: string) => getByUniqueField({ id })

export const getByEmailWithPassword = async (email: string) =>
  getByUniqueField({ email }, { password: true, profile: true })
