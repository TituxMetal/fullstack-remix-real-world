const { flatRoutes } = require('remix-flat-routes')

/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  cacheDirectory: './node_modules/.cache/remix',
  ignoredRouteFiles: ['**/*'],
  appDirectory: 'src',
  tailwind: true,
  postcss: true,
  serverModuleFormat: 'cjs',
  future: {
    v2_errorBoundary: true,
    v2_meta: true,
    v2_normalizeFormMethod: true,
    v2_routeConvention: true
  },
  routes: async defineRoutes => {
    return flatRoutes('routes', defineRoutes, {
      appDir: 'src',
      ignoredRouteFiles: ['**/.*', '**/*.{test,spec}.{js,jsx,ts,tsx}']
    })
  }
}
