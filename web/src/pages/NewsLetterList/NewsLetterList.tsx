import "./NewsLetterList.scss";
import { FunctionComponent } from "react";
import { MdAdd, MdFreeCancellation } from "react-icons/md";
import Button from "@components/Button/Button";
import { Newsletter } from "@data/models/Newsletter";
import { formatDate } from "@helpers/formatDate";

type NewsLetterListProps = {
  newsletters: Newsletter[];
};
const NewsLetterList: FunctionComponent<NewsLetterListProps> = ({
  newsletters = [],
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

      <ul className="list">
        <li className="list-header">
          <b>title</b>
          <b>Category</b>
          <b>Status</b>
          <b>Date</b>
          <b>Actions</b>
        </li>

        {newsletters.map((newsletter) => {
          const categoryName = (newsletter.category as any)?.name ?? newsletter.category;

          return (
            <li key={newsletter.id ?? newsletter.title}>
              <p className="title">{newsletter.title}</p>
              <p className="category">{categoryName}</p>
              <p className="status">{newsletter.status}</p>
              <p>{formatDate(newsletter.scheduledAt)}</p>
              <div className="actions">
                {newsletter.status === "scheduled" && (
                  <Button variant="icon" title="Cancel the scheduled email">
                    <MdFreeCancellation />
                  </Button>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default NewsLetterList;
