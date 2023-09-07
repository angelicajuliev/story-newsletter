import "./NewsLetterList.scss";
import { FunctionComponent } from "react";
import { MdAdd, MdOutlineAttachEmail, MdSend } from "react-icons/md";
import Button from "@components/Button/Button";
import { Newsletter } from "@data/models/Newsletter";
import { formatDate } from "@helpers/formatDate";

type NewsLetterListProps = {
  newsletters: Newsletter[];
  sendingEmail: boolean;
  handleSendNewsletter: (newsletterId?: number) => void;
};
const NewsLetterList: FunctionComponent<NewsLetterListProps> = ({
  newsletters = [],
  handleSendNewsletter,
  sendingEmail,
}) => {
  return (
    <div className="Newsletter">
      <section className="RecipientList__header">
        <h1>Newsletters</h1>

        <div className="actions">
          <Button
            variant="link-icon"
            title="Create a newsletter"
            to="/newsletters/create"
          >
            <MdAdd />
          </Button>
        </div>
      </section>

      {!newsletters.length ? (
        <p className="empty">
          There are no newsletters to send yet. Create one!
        </p>
      ) : (
        <ul className="list">
          <li className="list-header">
            <b>Title</b>
            <b></b>
            <b>Category</b>
            <b>Status</b>
            <b>Date</b>
            <b>Actions</b>
          </li>

          {newsletters.map((newsletter) => {
            const categoryName =
              (newsletter.category as any)?.name ?? newsletter.category;

            return (
              <li key={newsletter.id ?? newsletter.title}>
                <p className="title">{newsletter.title}</p>

                {newsletter.attachment ? (
                  <MdOutlineAttachEmail />
                ) : (
                  <span></span>
                )}

                <p className="category">{categoryName}</p>

                <p className="status">{newsletter.status}</p>

                <p>
                  {newsletter.status !== "archived"
                    ? formatDate(newsletter.scheduledAt)
                    : " - "}
                </p>

                <div className="actions">
                  {newsletter.status === "scheduled" && (
                    <>
                      <Button
                        variant="icon"
                        title="Send the email now"
                        onClick={() => handleSendNewsletter(newsletter.id)}
                        disabled={sendingEmail}
                      >
                        <MdSend />
                      </Button>
                    </>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default NewsLetterList;
