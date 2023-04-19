import type { V2_MetaFunction } from '@remix-run/node'

export const meta: V2_MetaFunction = () => [{ title: 'Home | Conduit' }]

const IndexPage = () => {
  return (
    <main className='flex min-h-screen flex-col items-center'>
      <section className='flex h-32 w-full flex-col items-center justify-center space-y-4 bg-green-800 text-center text-green-300'>
        <h1 className=' text-4xl font-bold uppercase'>conduit</h1>
        <p className='text-2xl'>A place to share your knowledge.</p>
      </section>
      {/* <section className='my-4 flex max-w-screen-md flex-col space-y-4 text-lg'>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus
          velit ut quaerat quidem, ea corrupti facilis perferendis quis totam
          consequatur. Odit est provident tempore maxime voluptate consequatur
          aperiam reiciendis iusto?
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus
          velit ut quaerat quidem, ea corrupti facilis perferendis quis totam
          consequatur. Odit est provident tempore maxime voluptate consequatur
          aperiam reiciendis iusto?
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus
          velit ut quaerat quidem, ea corrupti facilis perferendis quis totam
          consequatur. Odit est provident tempore maxime voluptate consequatur
          aperiam reiciendis iusto?
        </p>
      </section> */}
    </main>
  )
}

export default IndexPage
