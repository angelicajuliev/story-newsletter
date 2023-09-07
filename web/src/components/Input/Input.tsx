import "./Input.scss";
import { FunctionComponent, useRef } from "react";
import { UseControllerProps, useController } from "react-hook-form";
import { MdOutlineAttachEmail, MdOutlineFileUpload } from "react-icons/md";
import DatePicker from "react-date-picker";
import Button from "@components/Button/Button";
import { getTomorrowDate } from "@helpers/getTomorrowDate";

type InputProps = {
  type?: "file" | "date" | "text";
  label?: string;
  variant?: "icon" | "input";
  onChange?: (event: any) => void;
} & UseControllerProps<any> &
  React.InputHTMLAttributes<HTMLInputElement>;

const Input: FunctionComponent<InputProps> = (props) => {
  const { type, onChange, variant = 'input' } = props;
  const inputRef = useRef<any>(null);

  const { field, fieldState } = useController({
    ...props,
    rules: { required: props.required },
  });

  const handleButtonFileClick = () => {
    inputRef?.current?.click();
  };

  switch (type) {
    case "file":
      const fileName = field.value?.name;
      return (
        <div className="Input">
          {props.label && variant === 'input' && <label>{props.label}</label>}
          <input
            type="file"
            ref={inputRef}
            onChange={(e) => {
              field.onChange(e.target.files?.[0])
              onChange?.(e)
            }}
          />
          <Button
            variant={variant}
            title={props.label || "Upload file"}
            onClick={handleButtonFileClick}
            type="button"
          >
            {variant === "icon" ? (
              <MdOutlineFileUpload />
            ) : (
              <>
                {fileName && <MdOutlineAttachEmail />}
                <p>{fileName ?? "Choose your file"}</p>
              </>
            )}
          </Button>

          {fieldState?.error?.message && (
            <p className="error">{fieldState?.error?.message}</p>
          )}
        </div>
      );

    case "date":
      return (
        <div className={`Input ${fieldState}`}>
          <label>{props.label || props.name}</label>
          <DatePicker
            dayAriaLabel="Day"
            monthAriaLabel="Month"
            nativeInputAriaLabel="Date"
            yearAriaLabel="Year"
            onChange={field.onChange}
            value={(field.value as string) ?? ""}
            format="yyyy/MM/dd"
            minDate={new Date(getTomorrowDate())}
          />
          {fieldState?.error?.message && (
            <p className="error">{fieldState?.error?.message}</p>
          )}
        </div>
      );

    default:
      return (
        <div className={`Input ${fieldState}`}>
          <label>{props.label || props.name}</label>
          <input {...field} {...props} />
          {fieldState?.error?.message && (
            <p className="error">{fieldState?.error?.message}</p>
          )}
        </div>
      );
  }
};

export default Input;
