import { useEffect, useState } from 'react';
import { MdOutlineDeleteOutline } from 'react-icons/md';

import { Email } from '@data/models/Email';
import Button from '@components/Button/Button';

const EmailList = () => {
  const [emails, setEmails] = useState<Email[]>([]);

  useEffect(() => {
    const fetchEmails = async () => {
      // const emails = await getEmails();
      setEmails(emails);
    };
    fetchEmails();
  }, []);

  return (
    <div className='EmailList'>
      <h1>Email List</h1>
      
      <ul>
        {emails.map((email) => (
          <li key={email.id}>
            <span>{email.email}</span>

            <Button variant='icon' title="Unsubscribe the email">
              <MdOutlineDeleteOutline />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EmailList;
