import { createContext, useReducer, useContext } from "react"
import { Email } from "@data/models/Email";

import { 
  FETCH_EMAILS,
  FETCH_EMAILS_SUCCESS,
  FETCH_EMAILS_ERROR,
  CREATE_EMAIL_SUCCESS,
 } from "./ActionConstants";

const initialState = {
  items: [],
  loading: false,
};

type EmailContextType = {
  items: Email[];
  loading?: boolean;
  error?: string;
};

const EmailContext = createContext<EmailContextType>(initialState);
const EmailDispatchContext = createContext<(values: any) => void>(() => {});

const emailReducer = (state: any, action: any) => {
  switch (action.type) {
    case FETCH_EMAILS:
      return {
        ...state,
        loading: true,
      };
    case FETCH_EMAILS_SUCCESS:
      return {
        ...state,
        items: action.payload,
        loading: false,
      };
    case CREATE_EMAIL_SUCCESS:
      const previousItems = state.items;
      return {
        ...state,
        items: [...previousItems, action.payload],
        loading: false,
      };
    case FETCH_EMAILS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}

export const EmailProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(emailReducer, initialState);

  return (
    <EmailContext.Provider value={state}>
      <EmailDispatchContext.Provider value={dispatch}>
        {children}
      </EmailDispatchContext.Provider>
    </EmailContext.Provider>
  );
}

export function useEmailState() {
  return useContext(EmailContext);
}

export function useEmailDispatch() {
  return useContext(EmailDispatchContext);
}
