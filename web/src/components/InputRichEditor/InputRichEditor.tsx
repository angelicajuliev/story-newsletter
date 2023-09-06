import { Editor } from "@tinymce/tinymce-react";
import { FunctionComponent, useRef } from "react";
import { UseControllerProps, useController } from "react-hook-form";

type InputRichEditorProps = {
  name: string;
} & UseControllerProps<any>;

const InputRichEditor: FunctionComponent<InputRichEditorProps> = (props) => {
  const editorRef = useRef<any>(null);
  const { field, fieldState } = useController(props);

  return (
    <>
      <Editor
        onEditorChange={(e) => field.onChange(e)}
        value={(field.value as string) ?? ""}
        // apiKey={process.env.REACT_APP_TINY_MCE_API_KEY}
        apiKey="30t2v7bii9c1gspec4twqiyigi08ux6wgcfpzukg4rpiinzd"
        onInit={(evt: any, editor: any) => (editorRef.current = editor)}
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
            "body { font-family:Rubik,Arial,sans-serif; font-size:14px }",
        }}
      />
      {fieldState?.error?.message && (
        <p className="error">{fieldState?.error?.message}</p>
      )}
    </>
  );
};

export default InputRichEditor;
