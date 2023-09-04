import { FunctionComponent } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import BasePage from './BasePage'
import ErrorPage from '@pages/ErrorPage/ErrorPage'
import NewsLetterList from '@pages/NewsLetterList/NewsLetterList'
import CreateNewsLetter from '@pages/CreateNewsLetter/CreateNewsLetter'
import EmailListC from '@pages/EmailList/EmailListC'

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
        element: <NewsLetterList />,
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
