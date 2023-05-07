import { useState } from 'react'
import { Outlet, ScrollRestoration, useNavigation } from 'react-router-dom'

import { StyleContext } from '../Context/StyleContext'

import Header from '../Components/Header'
import SearchInput from '../Components/SearchInput'

const media = matchMedia('(prefers-color-scheme: dark)')

export default function Root() {
  const [darkMode, setDarkMode] = useState(media.matches)
  const [{ fontClass, fontName }, setFont] = useState({
    fontClass: 'font-sans-serif',
    fontName: 'Sans Serif'
  })

  const navigation = useNavigation()

  return (
    <div
      className={`max-w-[768px] min-h-screen p-6 md:px-10 md:py-[58px] lg:px-4 m-auto ${fontClass} ${
        navigation.state === 'loading' && 'opacity-30'
      }`}
    >
      <ScrollRestoration />
      <StyleContext.Provider value={{ darkMode, setDarkMode, fontName, setFont }}>
        <Header />
      </StyleContext.Provider>

      <SearchInput />

      <Outlet />
    </div>
  )
}
