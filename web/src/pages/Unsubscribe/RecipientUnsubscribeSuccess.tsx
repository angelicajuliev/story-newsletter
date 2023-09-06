import "./RecipientUnsubscribe.scss";
import { FunctionComponent } from "react";

type RecipientUnsubscribeSuccessProps = {
  email?: string | null;
  category?: string;
};
const RecipientUnsubscribeSuccess: FunctionComponent<
  RecipientUnsubscribeSuccessProps
> = ({ email }) => {
  return (
    <div className="RecipientUnsubscribeSuccess">
      <h1>Unsubscribed</h1>

      <p>
        You have been <b>successfully unsubscribed</b> from all future emails from this
        sender.
      </p>

      <p>
        Please know that <b>you are always welcome back</b> should you decide to rejoin
        our newsletter in the future. Thank you for your support and for being a
        part of our journey.
      </p>
    </div>
  );
};

export default RecipientUnsubscribeSuccess;
