import './RecipientList.scss'
import { FunctionComponent } from 'react'
import { MdAdd, MdOutlineDeleteOutline } from 'react-icons/md'

import Button from '@components/Button/Button'
import { Recipient } from '@data/models/Recipient'
import Input from '@components/Input/Input'

type RecipientListProps = {
  RecipientList?: Recipient[]
  showNewEmailForm: boolean
  handleOnSubmitNewRecipient: () => void
  handleCreateNewRecipient: () => void
  handleUnsubscribeRecipient: (email: Recipient) => void
  control: any
}
const RecipientList: FunctionComponent<RecipientListProps> = ({
  RecipientList,
  showNewEmailForm,
  handleOnSubmitNewRecipient,
  handleCreateNewRecipient,
  handleUnsubscribeRecipient,
  control,
}) => {
  return (
    <div className='RecipientList'>
      <section className='RecipientList__header'>
        <h1>Recipient List</h1>

        <div className='actions'>
          <Input
            name='RecipientListFile'
            control={control}
            type='file'
            label='Upload multiple recipients emails'
          />

          <Button
            variant='icon'
            title='Add a new recipient email'
            onClick={handleCreateNewRecipient}
          >
            <MdAdd />
          </Button>
        </div>
      </section>

      <ul>
        {showNewEmailForm && (
          <li key='newEmailForm'>
            <form onSubmit={handleOnSubmitNewRecipient}>
              <Input name='email' control={control} />
              <Button variant='primary'>Save</Button>
            </form>
          </li>
        )}

        {RecipientList?.map((recipient) => (
          <li key={recipient.id}>
            <span>{recipient.email}</span>

            <Button
              variant='icon'
              title='Unsubscribe the recipient email'
              onClick={() => handleUnsubscribeRecipient(recipient)}
            >
              <MdOutlineDeleteOutline />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RecipientList
