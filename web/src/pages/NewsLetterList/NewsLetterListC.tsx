import { useEffect, useState } from "react";
import NewsLetterList from "./NewsLetterList";
import {
  useNewsletterDispatch,
  useNewsletterState,
} from "@data/state/NewsletterContext";
import { newsletterApi } from "@data/api";
import {
  FETCH_NEWSLETTERS,
  FETCH_NEWSLETTERS_ERROR,
  FETCH_NEWSLETTERS_SUCCESS,
} from "@data/state/ActionConstants";

const NewsLetterListC = () => {
  const state = useNewsletterState();
  const dispatch = useNewsletterDispatch();
  const [sendingEmail, setSendingEmail] = useState(false);

  const fetchData = async () => {
    dispatch({ type: FETCH_NEWSLETTERS });

    try {
      const response = await newsletterApi.list();
      const newsletters = response?.data;

      dispatch({
        type: FETCH_NEWSLETTERS_SUCCESS,
        payload: newsletters,
      });
    } catch (error) {
      dispatch({
        type: FETCH_NEWSLETTERS_ERROR,
        payload: "Error getting the newsletter list",
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  const handleSendNewsletter = async (newsletterId?: number) => {
    if (!newsletterId) return;

    try {
      setSendingEmail(true);
      await newsletterApi.send(newsletterId);
      fetchData();
    } catch (error) {
      console.error(error);
    } finally {
      setSendingEmail(false);
    }
  };

  return (
    <NewsLetterList
      sendingEmail={sendingEmail}
      newsletters={state.items}
      handleSendNewsletter={handleSendNewsletter}
    />
  );
};

export default NewsLetterListC;
