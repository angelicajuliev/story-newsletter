import { FunctionComponent } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import BasePage from './BasePage'
import ErrorPage from '@pages/ErrorPage/ErrorPage'
import RecipientListC from '@pages/RecipientList/RecipientListC'
import NewsLetterListC from '@pages/NewsLetterList/NewsLetterListC'
import CreateNewsletterC from '@pages/CreateNewsletter/CreateNewsletterC'
import RecipientUnsubscribeC from '@pages/Unsubscribe/RecipientUnsubscribeC'
import HomeC from '@pages/Home/HomeC'

const router = createBrowserRouter([
  {
    path: '/',
    element: <BasePage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <HomeC />,
      },
      {
        path: '/home',
        element: <HomeC />,
      },
      {
        path: '/recipients',
        element: <RecipientListC />,
      },
      {
        path: '/recipients/unsubscribe',
        element: <RecipientUnsubscribeC />,
      },
      {
        path: '/newsletters',
        element: <NewsLetterListC />,
      },
      {
        path: '/newsletters/create',
        element: <CreateNewsletterC />,
      }
    ],
  },
])

const Router: FunctionComponent = () => {
  return <RouterProvider router={router} />
}

export default Router
