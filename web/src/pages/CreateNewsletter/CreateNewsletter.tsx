import Button from "@components/Button/Button";
import "./CreateNewsletter.scss";
import Input from "@components/Input/Input";
import InputRichEditor from "@components/InputRichEditor/InputRichEditor";
import { FunctionComponent } from "react";
import Select from "@components/Select/Select";

type CreateNewsletterProps = {
  control: any;
  handleSubmit: any;
  categoryOptions: { label: string; value: string }[];
};

const CreateNewsletter: FunctionComponent<CreateNewsletterProps> = ({
  control,
  handleSubmit,
  categoryOptions,
}) => {
  return (
    <form className="CreateNewsletter" onSubmit={handleSubmit}>
      <h1>Create a Newsletter</h1>

      <div className="inputs-header">
        <Input name="title" control={control} />

        <Input
          name="scheduledAt"
          label="Scheduled date"
          type="date"
          control={control}
        />

        <Select
          name="category"
          control={control}
          options={categoryOptions}
        />
      </div>

      <InputRichEditor name="content" control={control} />

      <Button variant="primary">Save</Button>
    </form>
  );
};

export default CreateNewsletter;
