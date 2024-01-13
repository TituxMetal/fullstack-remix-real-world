import { type Profile, type User } from '@prisma/client'
import * as argon from 'argon2'
import { Authenticator, AuthorizationError } from 'remix-auth'
import { FormStrategy } from 'remix-auth-form'

import { prisma } from '~/lib'
import { create, getByEmail, getByEmailWithPassword } from '~/models'
import { invariant } from '~/utils'

import { sessionStorage } from './session.server'

type AuthSession = Pick<User, 'id' | 'email'> & Pick<Profile, 'username'>

export const authenticator = new Authenticator<AuthSession>(sessionStorage, {
  sessionKey: 'sessionKey',
  sessionErrorKey: 'sessionErrorKey',
  throwOnError: true
})

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const email = form.get('email')
    const password = form.get('password')

    invariant(typeof email === 'string', 'Email must be a string.')
    invariant(typeof password === 'string', 'Password must be a string.')

    const user = await getByEmailWithPassword(email)
    const username = user?.profile?.username

    if (!user || !username) {
      console.log('No user in database.', FormStrategy.name)
      throw new AuthorizationError('Invalid Credentials.')
    }

    const userPassword = user.password?.hash || ''
    const passwordMatches = await argon.verify(userPassword, password)

    if (!passwordMatches) {
      console.log('Passwords not matching.', FormStrategy.name)
      throw new AuthorizationError('Invalid Credentials.')
    }

    const { id } = user

    return { id, email, username }
  }),
  'login'
)

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const email = form.get('email')
    const password = form.get('password')
    const username = form.get('username')

    invariant(typeof email === 'string', 'Email must be a string')
    invariant(typeof password === 'string', 'Password must be a string')
    invariant(typeof username === 'string', 'Username must be a string')

    const existingUser = await getByEmail(email)
    const existingProfile = await prisma.profile.findUnique({
      where: { username }
    })

    if (existingUser || existingProfile) {
      console.log('Username or Email already taken.', FormStrategy.name)
      throw new AuthorizationError('Invalid Credentials.')
    }

    const user = await create({ email, password, username })
    const { id } = user

    return { id, email, username }
  }),
  'register'
)
