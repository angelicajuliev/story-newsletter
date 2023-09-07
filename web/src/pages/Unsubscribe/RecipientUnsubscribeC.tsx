import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import RecipientUnsubscribe, {
  RecipientUnsubscribeForm,
} from "./RecipientUnsubscribe";
import RecipientUnsubscribeSuccess from "./RecipientUnsubscribeSuccess";
import { recipientApi } from "@data/api";
import { decryptToken } from "@helpers/decryptToken";

const RecipientUnsubscribeC = () => {
  const [ searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (token) {
      const result = decryptToken(token);

      if (result?.email) {
        setEmail(result.email);
        setValue("email", result.email);

        searchParams.delete("token");
        setSearchParams(searchParams);
      }
    }
  }, [token]);

  const { handleSubmit, control, setValue, setError } = useForm<RecipientUnsubscribeForm>({
    mode: "onChange",
    defaultValues: {
      email: email || "",
    },
  });

  const onSubmit = async (data: RecipientUnsubscribeForm) => {
    try {
      await recipientApi.publicUnsubscribe({
        email: data.email,
        category: data.category === "all" ? undefined : data.category,
      });

      setShowSuccessMessage(true);
    } catch (error) {
      setError("email", { message: "You do not seem to be subscribed to our newsletter yet." })
    }
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
