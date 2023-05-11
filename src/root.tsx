import type { LinksFunction } from '@remix-run/node'
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from '@remix-run/react'

import tailwindStylesheetUrl from './styles/tailwind.css'

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: tailwindStylesheetUrl }]
}

const App = () => {
  return (
    <html lang='en' className='h-full'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width,initial-scale=1' />
        <Meta />
        <Links />
      </head>
      <body className='h-full bg-zinc-900 text-green-400'>
        <nav className='w-full px-5'>
          <div className='mx-auto flex w-full max-w-screen-lg content-center justify-between py-3'>
            <Link to='/' className='text-3xl font-bold'>
              Conduit
            </Link>
            <ul className=' flex flex-col items-center justify-between gap-x-4 font-bold md:flex-row'>
              <li>
                <Link to='/login'>Login</Link>
              </li>
              <li>
                <Link to='/register'>Register</Link>
              </li>
              <li>
                <Link to='/profile/titux'>Titux Profile</Link>
              </li>
              <li>
                <Link to='/profile/settings'>Profile Settings</Link>
              </li>
              <li>
                <Link to='/article/new'>New article</Link>
              </li>
              <li>
                <Link to='/article/abc'>View Article abc</Link>
              </li>
            </ul>
          </div>
        </nav>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

export default App
