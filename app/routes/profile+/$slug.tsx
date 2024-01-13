const ProfilePage = () => {
  return (
    <main className='flex min-h-screen flex-col items-center'>
      <section className='flex h-32 w-full flex-col items-center justify-center space-y-4 bg-slate-600 text-center text-emerald-200'>
        <h1 className=' text-4xl font-bold uppercase'>User Name</h1>
        <p className='text-2xl'>User Bio</p>
      </section>
      <section className='my-4 flex w-full max-w-screen-md flex-col space-y-4 text-xl'>
        <p>Profile Details Page</p>
      </section>
    </main>
  )
}

export default ProfilePage
