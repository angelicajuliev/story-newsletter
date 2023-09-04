import InputRichEditor from "@components/InputRichEditor/InputRichEditor";

const CreateNewsLetter = () => {
  return (
    <div>
      <h1>CreateNewsLetter</h1>

      <InputRichEditor name="content" control={null} />
    </div>
  );
}

export default CreateNewsLetter;
