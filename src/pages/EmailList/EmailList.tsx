import './EmailList.scss'
import { FunctionComponent } from 'react'
import { MdAdd, MdOutlineDeleteOutline } from 'react-icons/md'

import Button from '@components/Button/Button'
import { Email } from '@data/models/Email'
import Input from '@components/Input/Input'

type EmailListProps = {
  emailList?: Email[]
  showNewEmailForm: boolean
  handleOnSubmitNewEmail: () => void
  handleCreateNewEmail: () => void
  control: any
}
const EmailList: FunctionComponent<EmailListProps> = ({
  emailList,
  showNewEmailForm,
  handleOnSubmitNewEmail,
  handleCreateNewEmail,
  control,
}) => {
  return (
    <div className='EmailList'>
      <section className='EmailList__header'>
        <h1>Email List</h1>

        <div className='actions'>
          <Input
            name='emailListFile'
            control={control}
            type='file'
            label='Upload multiple emails'
          />

          <Button
            variant='icon'
            title='Add a new email'
            onClick={handleCreateNewEmail}
          >
            <MdAdd />
          </Button>
        </div>
      </section>

      <ul>
        {showNewEmailForm && (
          <li key='newEmailForm'>
            <form onSubmit={handleOnSubmitNewEmail}>
              <Input name='email' control={control} />
              <Button variant='primary'>Save</Button>
            </form>
          </li>
        )}

        {emailList?.map((email) => (
          <li key={email.id}>
            <span>{email.email}</span>

            <Button variant='icon' title='Unsubscribe the email'>
              <MdOutlineDeleteOutline />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default EmailList
