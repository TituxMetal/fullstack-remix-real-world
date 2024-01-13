import { redirect, type ActionFunctionArgs, type LoaderFunction } from '@remix-run/node'

import { authenticator } from '~/services'

export const action = async ({ request }: ActionFunctionArgs) => {
  return authenticator.logout(request, { redirectTo: '/' })
}

export const loader: LoaderFunction = () => {
  return redirect('/')
}
