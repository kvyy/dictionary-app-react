/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react'
import { Link, useLoaderData, useNavigate, useParams } from 'react-router-dom'

import getDefinitions from '../utils/fetch_meaning'

// eslint-disable-next-line react-refresh/only-export-components
export const loader = async ({ params: { query } }) => await getDefinitions(query)

export default function Meanings() {
  const audioRef = useRef(null)

  const { parsedSearchData, notFound } = useLoaderData()
  const navigate = useNavigate()
  const { query } = useParams()

  useEffect(() => {
    if (notFound) {
      navigate(`/definition/not-found/${query}`, { state: parsedSearchData, replace: true })
    }
  })

  if (notFound) return null

  const { word, phonetic, definitions, sourceURL } = parsedSearchData

  return (
    <main>
      <div className='flex justify-between mb-8'>
        {/* SEARCH WORD AND PHONETIC */}
        <div className=''>
          <h1 className='text-mheading-l md:text-heading-l font-bold mb-2'>{word}</h1>
          {phonetic.text && (
            <h2 className='text-mheading-m md:text-heading-m text-purple'>{phonetic.text}</h2>
          )}
        </div>

        {/* PLAY BUTTON */}
        {phonetic.audio && (
          <button
            title='play'
            onClick={() => {
              audioRef.current.play()
            }}
          >
            <audio ref={audioRef} src={phonetic.audio}></audio>
            <svg
              className='group w-12 h-12 md:w-auto md:h-auto'
              xmlns='http://www.w3.org/2000/svg'
              width='75'
              height='75'
              viewBox='0 0 75 75'
            >
              <g fill='#A445ED' fillRule='evenodd'>
                <circle
                  className='group-hover:opacity-100'
                  cx='37.5'
                  cy='37.5'
                  r='37.5'
                  opacity='.25'
                />
                <path className='group-hover:fill-white' d='M29 27v21l21-10.5z' />
              </g>
            </svg>
          </button>
        )}
      </div>

      {definitions.map(({ definitions, partOfSpeech, synonyms }) => (
        <div key={crypto.randomUUID()} className='mb-8 md:mb-10'>
          <PartOfSpeech partOfSpeech={partOfSpeech} />

          <h3 className='text-gray-1 text-mheading-s md:text-heading-s mb-[17px] md:mb-[25px]'>
            Meaning
          </h3>

          <ul className='text-mbody-m md:text-body-m pl-[15px] md:pl-[42px] list-disc'>
            {definitions.map(({ definition, example }) => (
              <Definition key={crypto.randomUUID()} definition={definition} example={example} />
            ))}
          </ul>

          {/* SYNONYMS */}
          {synonyms.length !== 0 && (
            <div className='flex gap-4 mt-6 md:mt-10'>
              <h3 className='text-gray-1 text-mheading-s md:text-heading-s'>Synonyms </h3>
              <div className='flex flex-wrap gap-2'>
                {synonyms.map(s => (
                  <Link
                    to={`/definition/${s}`}
                    key={crypto.randomUUID()}
                    className='text-purple text-mheading-s md:text-heading-s font-bold'
                  >
                    {s}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}

      <div className='h-1 border-b-[1px] border-b-gray-2 dark:border-b-black-4 mb-6 md:mb-[19px]'></div>

      <p className='flex flex-col gap-2 md:flex-row md:gap-5 text-gray-1 text-mbody-s md:text-body-s underline underline-offset-[3px]'>
        Source
        <a
          href={sourceURL}
          className='text-black-3 dark:text-white underline underline-offset-[3px]'
          rel='noreferrer'
          target='_blank'
        >
          {sourceURL}
        </a>
      </p>
    </main>
  )
}

const Definition = ({ definition, example }) => (
  <li className='mb-[13px] pl-2 marker:text-purple'>
    {definition}
    {example && <p className='text-gray-1 mt-[13px]'>{example}</p>}
  </li>
)

const PartOfSpeech = ({ partOfSpeech }) => (
  <div className='flex gap-4 md:gap-5 items-center mb-[31px] md:mb-[10]'>
    <h2 className='text-mheading-m md:text-heading-m font-bold italic'>{partOfSpeech || 'noun'}</h2>
    <div className='h-1 flex-1 border-b-[1px] border-b-gray-2 dark:border-b-black-4'></div>
  </div>
)
