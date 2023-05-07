import { useEffect, useRef, useState } from 'react'
import { Form, useNavigate, useParams } from 'react-router-dom'

import searchIcon from '../assets/images/icon-search.svg'

export default function SearchInput() {
  const [inputError, setInputError] = useState(false)
  const searchInputRef = useRef(null)

  const navigate = useNavigate()
  let { query } = useParams()

  useEffect(() => {
    searchInputRef.current.value = query
  }, [query])

  query ??= ''

  return (
    <Form
      noValidate
      className='md:mb-[13px]'
      onSubmit={async evt => {
        evt.preventDefault()
        const value = searchInputRef.current.value.trim()

        if (!value) {
          evt.preventDefault()
          setInputError(true)
          return
        }

        // TODO : allow the search to be made again when the initial search wasn't successful
        // current implementation prevents the search from being made again just by checking
        // if the input value and the value of the query params are the same
        if (value === query) {
          searchInputRef.current.blur()
          return
        }

        navigate(`/definition/${value}`)
        searchInputRef.current.blur()
      }}
    >
      <div className='h-12 md:h-16 mb-2 relative'>
        <input
          ref={searchInputRef}
          name='q'
          type='text'
          required
          placeholder='Search for any word…'
          defaultValue={query}
          className={`w-full h-full text-mheading-s md:text-heading-s font-bold p-6 bg-gray-3 dark:bg-black-2 rounded-2xl placeholder:text-[#2d2d2d] dark:placeholder:text-[#ffffff] placeholder:opacity-25 outline-none outline-1 focus-visible:outline-purple outline-offset-0 ${
            inputError && 'outline-red focus-visible:outline-red'
          }`}
          onChange={evt => {
            if (setInputError && evt.currentTarget.value.trim()) {
              setInputError(false)
            }
          }}
        />
        <button
          title='search'
          className='h-full px-6 hover:bg-[#2d2d2d17] dark:hover:bg-[#ffffff17] rounded-r-2xl absolute top-1/2 -translate-y-1/2 right-0'
        >
          <img src={searchIcon} alt='search icon' className='w-4 h-4' />
        </button>
      </div>
      <h3
        className={`text-red text-mheading-s md:text-heading-s ${
          inputError ? 'visible' : 'invisible'
        }`}
      >
        Whoops, can’t be empty…
      </h3>
    </Form>
  )
}
