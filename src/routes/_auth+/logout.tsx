import type {
  ActionArgs,
  ActionFunction,
  LoaderFunction
} from '@remix-run/node'
import { redirect } from '@remix-run/node'

import { authenticator } from '~/services'

export const action: ActionFunction = async ({ request }: ActionArgs) =>
  authenticator.logout(request, { redirectTo: '/' })

export const loader: LoaderFunction = () => redirect('/')
