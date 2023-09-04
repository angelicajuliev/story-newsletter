import Button from '@components/Button/Button'
import './Input.scss'
import { FunctionComponent, useRef } from 'react'
import { UseControllerProps, useController } from 'react-hook-form'
import { MdOutlineFileUpload } from 'react-icons/md'

type InputProps = {
  variant?: 'file' | 'text'
} & UseControllerProps<any> &
  React.InputHTMLAttributes<HTMLInputElement>

const Input: FunctionComponent<InputProps> = (props) => {
  const { variant } = props
  const { field, fieldState } = useController(props)
  const inputRef = useRef<any>(null)

  const handleButtonFileClick = () => {
    inputRef?.current?.click()
  }

  if (variant === 'file') {
    return (
      <div className='Input'>
        <input {...field} type='file' ref={inputRef} />
        <Button
          variant='icon'
          title='Upload multiple emails'
          onClick={handleButtonFileClick}
        >
          <MdOutlineFileUpload />
        </Button>
      </div>
    )
  }

  return (
    <div className={`Input ${fieldState}`}>
      <label>{props.name}</label>
      <input {...field} />
    </div>
  )
}

export default Input
