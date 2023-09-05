import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CreateNewsletter from "./CreateNewsletter";
import { getCurrentDate } from "@helpers/getCurrentDate";
import { categoryApi, newsletterApi } from "@data/api";
import { CREATE_NEWSLETTER_SUCCESS, FETCH_CATEGORIES, FETCH_CATEGORIES_ERROR, FETCH_CATEGORIES_SUCCESS } from "@data/state/ActionConstants";

import {
  useNewsletterDispatch,
  useNewsletterState,
} from "@data/state/NewsletterContext";
import { useEffect } from "react";

const CreateNewsletterC = () => {
  const today = getCurrentDate();
  const navigate = useNavigate();
  const state = useNewsletterState();
  const dispatch = useNewsletterDispatch();

  const { handleSubmit, control, reset } = useForm<NewsLetterForm>({
    mode: "onChange",
    defaultValues: {
      scheduledAt: today,
      title: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: FETCH_CATEGORIES });

      try {
        const response = await categoryApi.list();
        const categories = response?.data;

        dispatch({
          type: FETCH_CATEGORIES_SUCCESS,
          payload: categories,
        });
      } catch (error) {
        dispatch({
          type: FETCH_CATEGORIES_ERROR,
          payload: "Error getting the category list",
        });
      }
    };

    fetchData();
  }
  , [dispatch]);

  const buildCategoryOptions = () => {
    const categories = state.categories ?? [];
    return categories.map((category) => ({
      label: category.name,
      value: category.id.toString(),
    }));
  };

  const onSubmit = (data: NewsLetterForm) => {
    data.scheduledAt = new Date(data.scheduledAt).toISOString();
    newsletterApi.create(data);

    dispatch({
      type: CREATE_NEWSLETTER_SUCCESS,
      payload: { ...data, status: "scheduled" },
    });

    reset();
    navigate("/newsletters");
  };

  return (
    <CreateNewsletter
      control={control}
      handleSubmit={handleSubmit(onSubmit)}
      categoryOptions={buildCategoryOptions()}
    />
  );
};

type NewsLetterForm = {
  title: string;
  scheduledAt: string;
  content: string;
};

export default CreateNewsletterC;
