import "./Input.scss";
import { FunctionComponent, useRef } from "react";
import { UseControllerProps, useController } from "react-hook-form";
import { MdOutlineFileUpload } from "react-icons/md";
import DatePicker from "react-date-picker";
import Button from "@components/Button/Button";

type InputProps = {
  type?: "file" | "date" | "text";
  label?: string;
} & UseControllerProps<any> &
  React.InputHTMLAttributes<HTMLInputElement>;

const Input: FunctionComponent<InputProps> = (props) => {
  const { type } = props;
  const { field, fieldState } = useController(props);
  const inputRef = useRef<any>(null);

  const handleButtonFileClick = () => {
    inputRef?.current?.click();
  };

  switch (type) {
    case "file":
      return (
        <div className="Input">
          <input {...field} type="file" ref={inputRef} />
          <Button
            variant="icon"
            title={props.label || "Upload file"}
            onClick={handleButtonFileClick}
          >
            <MdOutlineFileUpload />
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
            format="dd/MM/yyyy"
            minDate={new Date()}
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
