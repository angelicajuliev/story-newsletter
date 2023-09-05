import { createContext, useReducer, useContext } from "react"
import { Recipient } from "@data/models/Recipient";

import { 
  FETCH_RECIPIENTS,
  FETCH_RECIPIENTS_SUCCESS,
  FETCH_RECIPIENTS_ERROR,
  CREATE_RECIPIENT_SUCCESS,
 } from "./ActionConstants";

const initialState = {
  items: [],
  loading: false,
};

type RecipientContextType = {
  items: Recipient[];
  loading?: boolean;
  error?: string;
};

const RecipientContext = createContext<RecipientContextType>(initialState);
const RecipientDispatchContext = createContext<(values: any) => void>(() => {});

const recipientReducer = (state: any, action: any) => {
  switch (action.type) {
    case FETCH_RECIPIENTS:
      return {
        ...state,
        loading: true,
      };
    case FETCH_RECIPIENTS_SUCCESS:
      return {
        ...state,
        items: action.payload,
        loading: false,
      };
    case CREATE_RECIPIENT_SUCCESS:
      const previousItems = state.items ?? [];
      return {
        ...state,
        items: [...previousItems, action.payload],
        loading: false,
      };
    case FETCH_RECIPIENTS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}

export const RecipientProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(recipientReducer, initialState);

  return (
    <RecipientContext.Provider value={state}>
      <RecipientDispatchContext.Provider value={dispatch}>
        {children}
      </RecipientDispatchContext.Provider>
    </RecipientContext.Provider>
  );
}

export function useRecipientState() {
  return useContext(RecipientContext);
}

export function useRecipientDispatch() {
  return useContext(RecipientDispatchContext);
}
