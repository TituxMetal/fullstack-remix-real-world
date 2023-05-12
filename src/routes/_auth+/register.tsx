import type {
  ActionArgs,
  ActionFunction,
  LoaderArgs,
  LoaderFunction,
  V2_MetaFunction
} from '@remix-run/node'
import { Link } from '@remix-run/react'
import { makeDomainFunction } from 'domain-functions'
import { AuthorizationError } from 'remix-auth'
import { performMutation } from 'remix-forms'

import { RemixForm } from '~/components/form'
import { registerSchema } from '~/schemas'
import { authenticator } from '~/services'

export const meta: V2_MetaFunction = () => [{ title: 'Register | Conduit' }]

export const action: ActionFunction = async ({ request }: ActionArgs) => {
  await performMutation({
    request,
    schema: registerSchema,
    mutation: makeDomainFunction(registerSchema)(async () => {})
  })

  try {
    await authenticator.authenticate('register', request, {
      successRedirect: '/'
    })
  } catch (error) {
    if (error instanceof AuthorizationError) {
      return { errors: { password: ['Invalid Credentials.'] } }
    }

    throw error
  }
}

export const loader: LoaderFunction = async ({ request }: LoaderArgs) =>
  authenticator.isAuthenticated(request, { successRedirect: '/' })

const RegisterPage = () => {
  return (
    <main className='flex min-h-screen flex-col items-center'>
      <section className='my-6 flex w-full max-w-screen-md flex-col space-y-4 bg-emerald-900 px-5 py-6 text-xl font-bold md:w-2/3 lg:m-10 lg:w-1/2'>
        <h1 className='mb-6 text-center text-4xl font-bold text-green-100'>
          Create an account
        </h1>
        <p className='flex justify-center'>
          <Link to='/login'>Already have an account?</Link>
        </p>
        <RemixForm schema={registerSchema} buttonLabel='Register'>
          {({ Field, Button, Errors }) => (
            <>
              <Field name='email' />
              <Field name='username' />
              <Field name='password' type='password' />
              <Errors />
              <Button />
            </>
          )}
        </RemixForm>
      </section>
    </main>
  )
}
export default RegisterPage
