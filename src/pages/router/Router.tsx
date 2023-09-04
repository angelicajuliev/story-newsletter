import { FunctionComponent } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import ErrorPage from '@pages/ErrorPage/ErrorPage'
import EmailList from '@pages/EmailList/EmailList'
import BasePage from './BasePage'
import NewsLetterList from '@pages/NewsLetterList/NewsLetterList'
import CreateNewsLetter from '@pages/CreateNewsLetter/CreateNewsLetter'

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
        element: <EmailList />,
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
