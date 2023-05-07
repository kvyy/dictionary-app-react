import { useRouteError } from 'react-router-dom'

export default function ErrorPage() {
  const error = useRouteError()
  return (
    <div className='text-center mt-[132px]'>
      <h1 className='text-heading-l md:text-heading-l mb-[44px]'>😐</h1>
      <h2 className='text-mheading-s md:text-heading-s font-bold mb-6'>Failed to fetch</h2>
      <p className='text-mbody-m md:text-body-m text-gray-1'>{error.message}</p>
    </div>
  )
}
