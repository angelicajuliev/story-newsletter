import "./RecipientList.scss";
import { FunctionComponent } from "react";
import { Recipient } from "@data/models/Recipient";
import Button from "@components/Button/Button";
import Input from "@components/Input/Input";

import {
  MdAdd,
  MdOutlineDeleteOutline,
  MdOutlineFileDownload,
} from "react-icons/md";

type RecipientListProps = {
  recipients?: Recipient[];
  showNewEmailForm: boolean;
  handleOnSubmitNewRecipient: () => void;
  handleCreateNewRecipient: () => void;
  handleUnsubscribeRecipient: (email: Recipient) => void;
  handleUploadBulkRecipients: (event: any) => void;
  handleDownloadTemplate: () => void;
  control: any;
};
const RecipientList: FunctionComponent<RecipientListProps> = ({
  recipients = [],
  showNewEmailForm,
  handleOnSubmitNewRecipient,
  handleCreateNewRecipient,
  handleUnsubscribeRecipient,
  handleUploadBulkRecipients,
  handleDownloadTemplate,
  control,
}) => {
  return (
    <div className="RecipientList">
      <section className="RecipientList__header">
        <h1>Recipient List</h1>

        <div className="actions">
          <Button
            variant="icon"
            title="Add a new recipient email"
            onClick={handleCreateNewRecipient}
          >
            <MdAdd />
          </Button>

          <Input
            name="recipientListFile"
            control={control}
            type="file"
            variant="icon"
            accept=".csv"
            onChange={handleUploadBulkRecipients}
            label="Upload multiple recipients emails"
          />

          <Button
            variant="icon"
            title="Download template"
            onClick={handleDownloadTemplate}
          >
            <MdOutlineFileDownload />
          </Button>
        </div>
      </section>

      <ul>
        {showNewEmailForm && (
          <li key="newEmailForm">
            <form onSubmit={handleOnSubmitNewRecipient}>
              <Input name="email" control={control} />
              
              <Button variant="primary">Save</Button>
            </form>
          </li>
        )}

        {!recipients.length ? (
          <p className="empty">
            There are no subscribed recipients yet.
            </p>
        ) : (
          recipients?.map((recipient) => (
            <li key={recipient.id}>
              <span>{recipient.email}</span>

              <Button
                variant="icon"
                title="Unsubscribe the recipient email"
                onClick={() => handleUnsubscribeRecipient(recipient)}
              >
                <MdOutlineDeleteOutline />
              </Button>
            </li>
          ))
        )}
        {}
      </ul>
    </div>
  );
};

export default RecipientList;
