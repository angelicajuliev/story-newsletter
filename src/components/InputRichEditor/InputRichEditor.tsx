import { Editor } from '@tinymce/tinymce-react'
import { FunctionComponent, useRef } from 'react'

type InputRichEditorProps = {
  name: string
  control: any
}

const InputRichEditor: FunctionComponent<InputRichEditorProps> = (props) => {
  const editorRef = useRef<any>(null)
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent())
    }
  }

  return (
    <Editor
      apiKey={process.env.REACT_APP_TINY_MCE_API_KEY}
      onInit={(evt: any, editor: any) => (editorRef.current = editor)}
      initialValue='<p>This is the initial content of the editor.</p>'
      init={{
        height: 500,
        menubar: false,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount',
        ],
        toolbar:
          'undo redo | formatselect | ' +
          'bold italic backcolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | help',
        content_style:
          'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
      }}
    />
  )
}

export default InputRichEditor
