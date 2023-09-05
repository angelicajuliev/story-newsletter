import { createContext, useReducer, useContext } from 'react'
import { Newsletter } from '@data/models/Newsletter'
import { Category } from '@data/models/Category'

import {
  CREATE_NEWSLETTER_SUCCESS,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_NEWSLETTERS,
  FETCH_NEWSLETTERS_ERROR,
  FETCH_NEWSLETTERS_SUCCESS,
} from './ActionConstants'

const initialState = {
  items: [],
  loading: false,
}

type NewsletterContextType = {
  items: Newsletter[]
  categories?: Category[]
  loading?: boolean
  error?: string
}
const NewsletterContext = createContext<NewsletterContextType>(initialState)
const NewsletterDispatchContext = createContext<(values: any) => void>(() => {})

const newsletterReducer = (state: NewsletterContextType, action: any) => {
  const currentItems = state.items
  switch (action.type) {
    case FETCH_NEWSLETTERS:
      return { ...state, loading: true }

    case FETCH_NEWSLETTERS_SUCCESS:
      return {
        ...state,
        items: action.payload ?? [],
        loading: false,
      }
      
    case CREATE_NEWSLETTER_SUCCESS:
      return {
        ...state,
        items: [...currentItems, action.payload],
        loading: false,
      }

    case FETCH_NEWSLETTERS_ERROR:
      return { ...state, error: action.payload, loading: false }

    case FETCH_CATEGORIES_SUCCESS:
      return { ...state, categories: action.payload }

    default:
      return state
  }
}

export const NewsletterProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(newsletterReducer, initialState)

  return (
    <NewsletterContext.Provider value={state}>
      <NewsletterDispatchContext.Provider value={dispatch}>
        {children}
      </NewsletterDispatchContext.Provider>
    </NewsletterContext.Provider>
  )
}

export function useNewsletterState() {
  return useContext(NewsletterContext)
}

export function useNewsletterDispatch() {
  return useContext(NewsletterDispatchContext)
}
