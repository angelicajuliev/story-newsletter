import { Editor } from "@tinymce/tinymce-react";
import { FunctionComponent, useRef } from "react";
import { UseControllerProps, useController } from "react-hook-form";

type InputRichEditorProps = {
  name: string;
  required?: boolean;
} & UseControllerProps<any>;

const InputRichEditor: FunctionComponent<InputRichEditorProps> = (props) => {
  const editorRef = useRef<any>(null);
  const { field, fieldState } = useController({
    ...props,
    rules: { required: props.required },
  });

  return (
    <>
      <Editor
        onEditorChange={(e) => field.onChange(e)}
        value={(field.value as string) ?? ""}
        apiKey={process.env.REACT_APP_TINY_MCE_API_KEY}
        onInit={(_: any, editor: any) => (editorRef.current = editor)}
        init={{
          height: 300,
          menubar: false,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | fontsize | " +
            "bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Rubik,Arial,sans-serif; font-size:16px }",
        }}
      />
      {fieldState?.error?.message && (
        <p className="error">{fieldState?.error?.message}</p>
      )}
    </>
  );
};

export default InputRichEditor;
