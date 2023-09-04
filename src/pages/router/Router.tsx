import { FunctionComponent } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import BasePage from './BasePage'
import ErrorPage from '@pages/ErrorPage/ErrorPage'
import CreateNewsLetter from '@pages/CreateNewsLetter/CreateNewsLetter'
import EmailListC from '@pages/EmailList/EmailListC'
import NewsLetterListC from '@pages/NewsLetterList/NewsLetterListC'

const router = createBrowserRouter([
  {
    path: '/',
    element: <BasePage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/home',
        element: <h1>Home</h1>,
      },
      {
        path: '/emails',
        element: <EmailListC />,
      },
      {
        path: '/newsletters',
        element: <NewsLetterListC />,
      },
      {
        path: '/newsletters/create',
        element: <CreateNewsLetter />,
      }
    ],
  },
])

const Router: FunctionComponent = () => {
  return <RouterProvider router={router} />
}

export default Router
