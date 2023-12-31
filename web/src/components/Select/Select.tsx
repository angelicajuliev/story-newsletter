import './Select.scss'
import { UseControllerProps, useController } from "react-hook-form";

export type SelectProps = {
  label?: string
  options: { label: string; value: string }[]
} & React.SelectHTMLAttributes<HTMLSelectElement> &
  UseControllerProps<any>

const Select = ({ label, options, ...props }: SelectProps) => {
  const { field, fieldState } = useController({
    ...props,
    rules: { required: props.required },
  })

  return (
    <div className={`Select ${fieldState}`}>
          <label>{label || props.name}</label>
          <select {...field}>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
  )
}

export default Select
