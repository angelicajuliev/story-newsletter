import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import CreateNewsletter from './CreateNewsletter'
import { getCurrentDate } from '@helpers/getCurrentDate'
import { newsletterApi } from '@data/api'
import { useNewsletterDispatch } from '@data/state/NewsletterContext'
import { CREATE_NEWSLETTER_SUCCESS } from '@data/state/ActionConstants'

const CreateNewsletterC = () => {
  const today = getCurrentDate()
  const navigate = useNavigate();

  const dispatch = useNewsletterDispatch()

  const { handleSubmit, control, reset } = useForm<NewsLetterForm>({
    mode: 'onChange',
    defaultValues: {
      date: today,
      subject: '',
    },
  })

  const onSubmit = (data: NewsLetterForm) => {
    newsletterApi.create(data)
    
    dispatch({
      type: CREATE_NEWSLETTER_SUCCESS,
      payload: { ...data, status: 'scheduled' },
    })

    reset()
    navigate('/newsletters')
  }

  return (
    <CreateNewsletter control={control} handleSubmit={handleSubmit(onSubmit)} />
  )
}

type NewsLetterForm = {
  subject: string
  date: string
  content: string
}

export default CreateNewsletterC
