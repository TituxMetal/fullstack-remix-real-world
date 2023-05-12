import type { Profile, User } from '@prisma/client'
import * as argon from 'argon2'
import { Authenticator, AuthorizationError } from 'remix-auth'
import { FormStrategy } from 'remix-auth-form'
import invariant from 'tiny-invariant'

import { create, getByEmail, getByEmailWithPassword } from '~/models'

import { sessionStorage } from './session.server'

type AuthSession = Pick<User, 'id' | 'email'> & Pick<Profile, 'username'>

const extractFormData = (form: FormData) => {
  const email = form.get('email')
  const password = form.get('password')
  const username = form.get('username')

  invariant(typeof email === 'string')
  invariant(typeof password === 'string')
  invariant(typeof username === 'string')

  return { email, password, username }
}

export const authenticator = new Authenticator<AuthSession>(sessionStorage, {
  sessionKey: 'sessionKey',
  sessionErrorKey: 'sessionErrorKey',
  throwOnError: true
})

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const { email, password, username } = extractFormData(form)

    const user = await getByEmailWithPassword(email)

    if (!user) {
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
    const { email, password, username } = extractFormData(form)

    const existingUser = await getByEmail(email)

    if (existingUser) {
      console.log('Email already taken.', FormStrategy.name)
      throw new AuthorizationError('Invalid Credentials.')
    }

    const user = await create({ email, password, username })
    const { id } = user

    return { id, email, username }
  }),
  'register'
)
