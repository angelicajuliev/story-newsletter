import "./RecipientList.scss";
import { FunctionComponent } from "react";
import {
  MdAdd,
  MdOutlineDeleteOutline,
  MdOutlineFileDownload,
} from "react-icons/md";

import Button from "@components/Button/Button";
import { Recipient } from "@data/models/Recipient";
import Input from "@components/Input/Input";

type RecipientListProps = {
  RecipientList?: Recipient[];
  showNewEmailForm: boolean;
  handleOnSubmitNewRecipient: () => void;
  handleCreateNewRecipient: () => void;
  handleUnsubscribeRecipient: (email: Recipient) => void;
  handleUploadBulkRecipients: (event: any) => void;
  handleDownloadTemplate: () => void;
  control: any;
};
const RecipientList: FunctionComponent<RecipientListProps> = ({
  RecipientList,
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

        {RecipientList?.map((recipient) => (
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
        ))}
      </ul>
    </div>
  );
};

export default RecipientList;
