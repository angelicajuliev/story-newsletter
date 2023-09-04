import './EmailList.scss'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { emailApi } from '@data/api'
import { useEmailDispatch, useEmailState } from '@data/state/EmailContext'
import EmailList from './EmailList'
import { Email } from '@data/models/Email'

import {
  CREATE_EMAIL,
  CREATE_EMAIL_SUCCESS,
  FETCH_EMAILS,
  FETCH_EMAILS_SUCCESS,
} from '@data/state/ActionConstants'

const EmailListC = () => {
  const state = useEmailState()
  const dispatch = useEmailDispatch()
  const [showNewEmailForm, setShowNewEmailForm] = useState(false)

  const { handleSubmit, control } = useForm<EmailForm>({
    mode: 'onChange',
    defaultValues: {
      email: '',
    },
  })

  useEffect(() => {
    const fetchEmails = async () => {
      dispatch({ type: FETCH_EMAILS })
      const response = await emailApi.list()
      const emails = response.data

      dispatch({ type: FETCH_EMAILS_SUCCESS, payload: emails })
    }

    fetchEmails()
  }, [])

  const handleCreateNewEmail = () => {
    setShowNewEmailForm(true)
  }

  const handleSubmitNewEmail = async (values: EmailForm) => {
    dispatch({ type: CREATE_EMAIL })

    const email: Email = { email: values.email }
    const response = await emailApi.create(email)
    const newEmail = response.data

    dispatch({
      type: CREATE_EMAIL_SUCCESS,
      payload: email,
    })
    setShowNewEmailForm(false)
  }

  return (
    <EmailList
      emailList={state.items}
      showNewEmailForm={showNewEmailForm}
      handleOnSubmitNewEmail={handleSubmit(handleSubmitNewEmail)}
      handleCreateNewEmail={handleCreateNewEmail}
      control={control}
    />
  )
}

type EmailForm = {
  email: string
}

export default EmailListC
