import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Root from './routes/root'
import Index from './routes'
import Meanings, { loader as meaningsLoader } from './routes/meanings'
import NotFound from './routes/not-found'
import ErrorPage from './error-page'

import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index /> },
          {
            path: '/definition/:query',
            element: <Meanings />,
            loader: meaningsLoader
          },
          {
            path: 'definition/not-found/:query',
            element: <NotFound />
          }
        ]
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
