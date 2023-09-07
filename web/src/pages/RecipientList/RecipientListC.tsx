import "./RecipientList.scss";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { recipientApi } from "@data/api";
import { Recipient } from "@data/models/Recipient";
import downloadCSVTemplate from "@helpers/downloadCSVTemplate";
import RecipientList from "./RecipientList";

import {
  useRecipientDispatch,
  useRecipientState,
} from "@data/state/RecipientContext";

import {
  CREATE_RECIPIENT,
  CREATE_RECIPIENT_SUCCESS,
  FETCH_RECIPIENTS,
  FETCH_RECIPIENTS_ERROR,
  FETCH_RECIPIENTS_SUCCESS,
} from "@data/state/ActionConstants";

const RecipientListC = () => {
  const state = useRecipientState();
  const dispatch = useRecipientDispatch();
  const [showNewEmailForm, setShowNewEmailForm] = useState(false);

  const { handleSubmit, control, reset, setError, getValues } =
    useForm<EmailForm>({
      mode: "onChange",
      defaultValues: {
        email: "",
      },
    });

  useEffect(() => {
    fetchRecipients();
  }, []);

  const fetchRecipients = async () => {
    dispatch({ type: FETCH_RECIPIENTS });
    try {
      const response = await recipientApi.list();
      const recipients = response?.data;

      dispatch({ type: FETCH_RECIPIENTS_SUCCESS, payload: recipients });
    } catch (error) {
      dispatch({
        type: FETCH_RECIPIENTS_ERROR,
        payload: "Error getting the recipients list",
      });
    }
  };

  const handleCreateNewRecipient = () => {
    setShowNewEmailForm(true);
  };

  const handleOnSubmitNewRecipient = async (values: EmailForm) => {
    dispatch({ type: CREATE_RECIPIENT });

    try {
      const recipient: Recipient = { email: values.email };
      await recipientApi.create(recipient);

      dispatch({
        type: CREATE_RECIPIENT_SUCCESS,
        payload: recipient,
      });

      setShowNewEmailForm(false);
      reset();
    } catch (error) {
      setError("email", { message: "Error creating the recipient" });
    }
  };

  const handleUnsubscribeRecipient = async (recipient: Recipient) => {
    if (recipient.id) {
      try {
        await recipientApi.unsubscribe({ id: recipient.id });
        fetchRecipients();
      } catch {}
    }
  };

  const handleUploadBulkRecipients = async () => {
    const file = getValues("recipientListFile");

    if (file?.size && file.size > 0) {
      try {
        await recipientApi.bulkCreate(file);

        fetchRecipients();
      } catch (error) {}
    }
  };

  const handleDownloadTemplate = () => {
    downloadCSVTemplate();
  };

  return (
    <RecipientList
      RecipientList={state?.items}
      showNewEmailForm={showNewEmailForm}
      handleOnSubmitNewRecipient={handleSubmit(handleOnSubmitNewRecipient)}
      handleCreateNewRecipient={handleCreateNewRecipient}
      handleUnsubscribeRecipient={handleUnsubscribeRecipient}
      handleUploadBulkRecipients={handleUploadBulkRecipients}
      handleDownloadTemplate={handleDownloadTemplate}
      control={control}
    />
  );
};

type EmailForm = {
  email: string;
  recipientListFile?: File;
};

export default RecipientListC;
