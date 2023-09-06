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
      attachment: ""
    },
  });

  const onSubmit = async (data: NewsLetterForm) => {
    const senderData = {
      title: data.title,
      content: data.content,
      category: data.category,
      scheduledAt: new Date(data.scheduledAt).toISOString(),
    };

    try {
      const response = await newsletterApi.create(senderData);
      const newsletter = response?.data;

      dispatch({ type: CREATE_NEWSLETTER_SUCCESS });

      if (newsletter?.id && typeof data.attachment !== "string") {
        await newsletterApi.uploadFile(newsletter.id, data.attachment);
      }

      reset();
      navigate("/newsletters");
    } catch (error) {
      setError("content", { message: "Error creating the newsletter" });
    }
  };

  return (
    <CreateNewsletter control={control} handleSubmit={handleSubmit(onSubmit)} />
  );
};

type NewsLetterForm = {
  title: string;
  scheduledAt: string;
  content: string;
  category: string;
  attachment: string | File;
};

export default CreateNewsletterC;
