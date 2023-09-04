import Button from '@components/Button/Button'
import './CreateNewsletter.scss'
import Input from '@components/Input/Input'
import InputRichEditor from '@components/InputRichEditor/InputRichEditor'
import { FunctionComponent } from 'react'

type CreateNewsletterProps = {
  control: any
  handleSubmit: any
}

const CreateNewsletter: FunctionComponent<CreateNewsletterProps> = ({
  control,
  handleSubmit,
}) => {
  return (
    <form className='CreateNewsletter' onSubmit={handleSubmit}>
      <h1>Create a Newsletter</h1>

      <div className='inputs-header'>
        <Input name='subject' control={control} />

        <Input
          name='date'
          label='Scheduled date'
          type='date'
          control={control}
        />
      </div>

      <InputRichEditor name='content' control={control} />

      <Button variant='primary'>Save</Button>
    </form>
  )
}

export default CreateNewsletter
