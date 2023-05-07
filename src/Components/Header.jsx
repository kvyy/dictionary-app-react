/* eslint-disable react/prop-types */
import { useContext, useEffect, useRef, useState } from 'react'

import { StyleContext } from '../Context/StyleContext'

import logo from '../assets/images/logo.svg'
import arrowdown from '../assets/images/icon-arrow-down.svg'
import { Link } from 'react-router-dom'

export default function Header() {
  const { darkMode, setDarkMode, fontName, setFont } = useContext(StyleContext)
  const [showFontOptions, setShowFontOptions] = useState(false)
  const fontOptionsSelector = useRef(null)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  useEffect(() => {
    function hideFontOptions(evt) {
      if (!fontOptionsSelector.current.contains(evt.target)) setShowFontOptions(false)
    }
    if (showFontOptions) document.body.addEventListener('click', hideFontOptions)

    return () => document.body.removeEventListener('click', hideFontOptions)
  }, [showFontOptions])

  function changeFont(fontClass, fontName) {
    setFont({ fontClass, fontName })
    setShowFontOptions(false)
  }

  return (
    <header className='h-8 md:h-[36.5px] flex justify-between items-center mb-6 md:mb-[51.5px]'>
      <Link to='/' title='home'>
        <img src={logo} alt='dictionary logo' className='h-full' />
      </Link>

      <div className='h-full flex items-center'>
        {/* FONT SELECT */}
        <div
          ref={fontOptionsSelector}
          className='relative h-full flex gap-4 items-center text-mbody-m md:text-body-m font-bold mr-4 md:mr-[26px]'
        >
          <span
            role='button'
            onClick={() => setShowFontOptions(!showFontOptions)}
            className='h-full flex items-center gap-4 cursor-pointer active:opacity-75'
          >
            {fontName}
            <img src={arrowdown} alt='downward arrow' />
          </span>

          {/* FONT OPTIONS */}
          {showFontOptions && (
            <ul className='w-[150px] md:w-[183px] flex gap-4 flex-col p-6 bg-white rounded-xl dark:bg-black-2 absolute top-full -left-6 md:left-auto md:right-0 mt-[10.5px] shadow-[0px_5px_30px_rgba(0,_0,_0,_0.1)] dark:shadow-purple z-50'>
              <FontOption changeFont={changeFont} fontClass='font-sans-serif'>
                Sans Serif
              </FontOption>
              <FontOption changeFont={changeFont} fontClass='font-serif'>
                Serif
              </FontOption>
              <FontOption changeFont={changeFont} fontClass='font-mono'>
                Mono
              </FontOption>
            </ul>
          )}
        </div>

        {/* LINE */}
        <div className='h-full border-r border-r-gray-2 mr-4 md:mr-[26px]'></div>

        {/* DARK MODE TOGGLE */}
        <div
          onClick={() => setDarkMode(!darkMode)}
          className='h-5 w-10 bg-gray-1 dark:bg-purple rounded-[10px] mr-3 md:mr-5 relative cursor-pointer'
        >
          <div
            className={`w-[14px] h-[14px] bg-white rounded-[10px] absolute top-1/2 left-[3px] -translate-y-1/2 transition-transform ${
              darkMode && 'translate-x-5'
            }`}
          ></div>
        </div>

        {/* MOON ICON */}
        <svg
          className='scale-[calc(20/22)]'
          xmlns='http://www.w3.org/2000/svg'
          width='22'
          height='22'
          viewBox='0 0 22 22'
        >
          <path
            className='dark:stroke-purple'
            fill='none'
            stroke='#838383'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='1.5'
            d='M1 10.449a10.544 10.544 0 0 0 19.993 4.686C11.544 15.135 6.858 10.448 6.858 1A10.545 10.545 0 0 0 1 10.449Z'
          />
        </svg>
      </div>
    </header>
  )
}

const FontOption = ({ children, fontClass, changeFont }) => (
  <li
    role='option'
    onClick={() => changeFont(fontClass, children)}
    className={`${fontClass} hover:text-purple cursor-pointer`}
  >
    {children}
  </li>
)
