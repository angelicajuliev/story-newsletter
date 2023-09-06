import { Link } from 'react-router-dom'
import './Button.scss'
import { FunctionComponent, PropsWithChildren } from 'react'

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'icon' | 'link-icon' | 'input'
  title?: string
  to?: string
} & PropsWithChildren &
  React.ButtonHTMLAttributes<HTMLButtonElement>

const Button: FunctionComponent<ButtonProps> = ({
  children,
  variant,
  ...props
}) => {
  return (
    <button className={`Button ${variant}`} {...props}>
      {variant === 'link-icon' ? (
        <Link to={props.to || ''}>{children}</Link>
      ) : (
        children
      )}
    </button>
  )
}

export default Button
