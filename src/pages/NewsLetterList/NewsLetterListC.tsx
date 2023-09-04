import { useEffect } from 'react'
import NewsLetterList from './NewsLetterList'
import {
  useNewsletterDispatch,
  useNewsletterState,
} from '@data/state/NewsletterContext'
import { newsletterApi } from '@data/api'
import {
  FETCH_NEWSLETTERS,
  FETCH_NEWSLETTERS_SUCCESS,
} from '@data/state/ActionConstants'

const NewsLetterListC = () => {
  const state = useNewsletterState()
  const dispatch = useNewsletterDispatch()

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: FETCH_NEWSLETTERS })

      const response = await newsletterApi.list()
      const newsletters = response.data

      dispatch({
        type: FETCH_NEWSLETTERS_SUCCESS,
        payload: newsletters,
      })
    }

    fetchData()
  }, [dispatch])

  return <NewsLetterList newsletters={state.items} />
}

export default NewsLetterListC
