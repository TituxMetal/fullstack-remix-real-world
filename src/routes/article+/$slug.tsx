import type { V2_MetaFunction } from '@remix-run/node'

export const meta: V2_MetaFunction = ({ params, data }) => {
  const article = data?.article

  if (!article) {
    return [
      {
        title: `Title for ${params.slug} article`
      },
      {
        name: 'description',
        content: 'Default Article Description, not yet implemented!'
      }
    ]
  }
  return [
    {
      title: 'Article Details Not Yet Implemented | Conduit'
    },
    {
      name: 'description',
      content: 'Default Article Description, not yet implemented!'
    }
  ]
}

const ArticlePage = () => {
  return (
    <main className='flex min-h-screen flex-col items-center'>
      <section className='flex h-32 w-full flex-col items-center justify-center space-y-4 bg-green-900 text-center text-zinc-300'>
        <h1 className=' text-4xl font-bold uppercase'>Article Title</h1>
        <p className='text-2xl'>Author</p>
      </section>
      <section className='my-4 flex w-full max-w-screen-md flex-col space-y-4 text-xl'>
        <p>Article Details Page</p>
      </section>
    </main>
  )
}

export default ArticlePage
