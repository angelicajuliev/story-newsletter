import "./CreateNewsletter.scss";
import { FunctionComponent } from "react";
import Input from "@components/Input/Input";
import Button from "@components/Button/Button";
import InputRichEditor from "@components/InputRichEditor/InputRichEditor";
import SelectCategoryC from "@components/SelectCategory/SelectCategoryC";

type CreateNewsletterProps = {
  control: any;
  handleSubmit: any;
};

const CreateNewsletter: FunctionComponent<CreateNewsletterProps> = ({
  control,
  handleSubmit,
}) => {
  return (
    <form className="CreateNewsletter" onSubmit={handleSubmit}>
      <h1>Create a Newsletter</h1>

      <div className="inputs-header">
        <Input name="title" control={control} required />

        <Input
          name="scheduledAt"
          label="Scheduled date"
          type="date"
          control={control}
          required
        />

        <SelectCategoryC control={control} />
      </div>

      <InputRichEditor name="content" control={control} required />

      <Button variant="primary">Save</Button>
    </form>
  );
};

export default CreateNewsletter;
