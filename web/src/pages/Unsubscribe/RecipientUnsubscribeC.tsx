import { useState } from "react";
import { useLocation } from "react-router";
import { useForm } from "react-hook-form";
import RecipientUnsubscribe, {
  RecipientUnsubscribeForm,
} from "./RecipientUnsubscribe";
import RecipientUnsubscribeSuccess from "./RecipientUnsubscribeSuccess";
import { recipientApi } from "@data/api";

const getQueryParams = (search: string, queryParamName: string) => {
  const params = new URLSearchParams(search);
  const param = params.get(queryParamName);
  return param;
};

const RecipientUnsubscribeC = () => {
  const { search } = useLocation();
  const email = getQueryParams(search, "email");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const { handleSubmit, control } = useForm<RecipientUnsubscribeForm>({
    mode: "onChange",
    defaultValues: {
      email: email || "",
    },
  });

  const onSubmit = async (data: RecipientUnsubscribeForm) => {
    console.log(data);
    try {
      await recipientApi.publicUnsubscribe({
        email: data.email,
        category: data.category === "all" ? undefined : data.category,
      });

      setShowSuccessMessage(true);
    } catch (error) {}
  };

  return showSuccessMessage ? (
    <RecipientUnsubscribeSuccess email={email} />
  ) : (
    <RecipientUnsubscribe
      handleSubmit={handleSubmit(onSubmit)}
      control={control}
    />
  );
};

export default RecipientUnsubscribeC;
