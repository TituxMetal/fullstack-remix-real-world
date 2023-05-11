import { createCookieSessionStorage } from '@remix-run/node'
import invariant from 'tiny-invariant'

const sessionSecret = process.env.SESSION_SECRET || 'supersescret'

invariant(
  typeof sessionSecret === 'string',
  `SESSION_SECRET must be set in env variables.`
)

const TEN_DAYS = 60 * 60 * 24 * 10
const maxAge = Number(process.env.SESSION_MAX_AGE) || TEN_DAYS

invariant(typeof maxAge === 'number', `MAX_AGE must be set in env variables.`)

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: 'rmx_real-world_session',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    secrets: [sessionSecret],
    sameSite: 'lax',
    path: '/',
    maxAge
  }
})

export const { getSession, commitSession, destroySession } = sessionStorage
