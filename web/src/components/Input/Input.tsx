import "./Input.scss";
import { FunctionComponent, useRef } from "react";
import { UseControllerProps, useController } from "react-hook-form";
import { MdOutlineAttachEmail, MdOutlineFileUpload } from "react-icons/md";
import DatePicker from "react-date-picker";
import Button from "@components/Button/Button";

type InputProps = {
  type?: "file" | "date" | "text";
  label?: string;
  variant?: "icon" | "input";
} & UseControllerProps<any> &
  React.InputHTMLAttributes<HTMLInputElement>;

const Input: FunctionComponent<InputProps> = (props) => {
  const { type } = props;
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
          {props.label && <label>{props.label}</label>}
          <input
            type="file"
            ref={inputRef}
            onChange={(e) => field.onChange(e.target.files?.[0])}
          />
          <Button
            variant={props.variant || "input"}
            title={props.label || "Upload file"}
            onClick={handleButtonFileClick}
            type="button"
          >
            {props.variant === "icon" ? (
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
