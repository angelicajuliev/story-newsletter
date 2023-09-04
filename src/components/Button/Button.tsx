import './Button.scss';
import { FunctionComponent, PropsWithChildren } from "react";

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'icon';
  title?: string;
} & PropsWithChildren

const Button: FunctionComponent<ButtonProps> = ({ children, variant, ...props }) => {
  return (
    <button className={`Button ${variant}`} {...props}>
      {children}
    </button>
  );
}

export default Button
