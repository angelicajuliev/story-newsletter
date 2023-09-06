import "./RecipientUnsubscribe.scss";
import { FunctionComponent } from "react";
import { UseControllerProps } from "react-hook-form";
import Input from "@components/Input/Input";
import Button from "@components/Button/Button";
import SelectCategoryC from "@components/SelectCategory/SelectCategoryC";

export type RecipientUnsubscribeForm = {
  email: string;
};

type RecipientUnsubscribeProps = {
  handleSubmit: (data: any) => void;
  control: UseControllerProps<RecipientUnsubscribeForm>["control"];
};
const RecipientUnsubscribe: FunctionComponent<RecipientUnsubscribeProps> = ({
  control,
  handleSubmit,
}) => {
  return (
    <div className="RecipientUnsubscribe">
      <h1>Unsubscribe from Our Newsletter.</h1>

      <p>
        We're genuinely sorry to see you go. Your presence in our community has
        meant a lot to us, and it's with a heavy heart that we acknowledge your
        decision to unsubscribe from our newsletter.
      </p>

      <p>
        If you're certain about unsubscribing, please confirm your email address
        below, select the newsletter category and a reason for your decision,
        and click the "Unsubscribe" button.
      </p>

      <form onSubmit={handleSubmit}>
        <Input name="email" control={control} disabled />

        <SelectCategoryC
          label="Which category would you like to stop receiving"
          control={control}
          extraOptions={[{ label: "All", value: "all" }]}
        />

        <Button variant="primary">Unsubscribe</Button>
      </form>
    </div>
  );
};

export default RecipientUnsubscribe;
