import './EmailList.scss';
import { useEffect } from 'react';
import { MdOutlineDeleteOutline } from 'react-icons/md';

import Button from '@components/Button/Button';
import { emailApi } from '@data/api';
import { useEmailDispatch, useEmailState } from '@data/state/EmailContext';
import { FETCH_EMAILS, FETCH_EMAILS_SUCCESS } from '@data/state/ActionConstants';

const EmailList = () => {
  const state = useEmailState();
  const dispatch = useEmailDispatch();

  useEffect(() => {
    const fetchEmails = async () => {
      dispatch({ type: FETCH_EMAILS });
      const response = await emailApi.list();
      const emails = response.data;

      dispatch({ type: FETCH_EMAILS_SUCCESS, payload: emails });
    };

    fetchEmails();
  }, []);

  return (
    <div className='EmailList'>
      <h1>Email List</h1>
      
      <ul>
        {state?.items?.map((email) => (
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
