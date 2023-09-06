import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CreateNewsletter from "./CreateNewsletter";
import { getCurrentDate } from "@helpers/getCurrentDate";
import { newsletterApi } from "@data/api";
import { useNewsletterDispatch } from "@data/state/NewsletterContext";
import { CREATE_NEWSLETTER_SUCCESS } from "@data/state/ActionConstants";

const CreateNewsletterC = () => {
  const today = getCurrentDate();
  const navigate = useNavigate();
  const dispatch = useNewsletterDispatch();

  const { handleSubmit, control, reset, setError } = useForm<NewsLetterForm>({
    mode: "onChange",
    defaultValues: {
      scheduledAt: today,
      title: "",
      category: "",
    },
  });

  const onSubmit = async (data: NewsLetterForm) => {
    data.scheduledAt = new Date(data.scheduledAt).toISOString();

    try {
      await newsletterApi.create(data);
  
      dispatch({
        type: CREATE_NEWSLETTER_SUCCESS,
        payload: { ...data, status: "scheduled" },
      });
  
      reset();
      navigate("/newsletters");
    } catch (error) {
      setError("content", { message: "Error creating the newsletter" })
    }
  };

  return (
    <CreateNewsletter
      control={control}
      handleSubmit={handleSubmit(onSubmit)}
    />
  );
};

type NewsLetterForm = {
  title: string;
  scheduledAt: string;
  content: string;
  category: string;
};

export default CreateNewsletterC;
