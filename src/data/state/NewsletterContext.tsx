import { Newsletter } from "@data/models/Newsletter";
import { createContext, useReducer, useContext } from "react"

const initialState = {
  items: [],
  loading: false
};

type NewsletterContextType = {
  items: Newsletter[];
  loading?: boolean;
  error?: string;
};
const NewsletterContext = createContext<NewsletterContextType>(initialState);
const NewsletterDispatchContext = createContext<(values: any) => void>(() => {});

const newsletterReducer = (state: NewsletterContextType, action: any) => {
  switch (action.type) {
    case 'FETCH_NEWSLETTER':
      return { ...state,
        loading: true
      };

    case 'SAVE_NEWSLETTER':
      return { ...state,
        items: action.payload,
        loading: false
      };

    case 'SET_ERROR':
      return { ...state,
        error: action.payload,
        loading: false
      };

    default:
      return state;
  }
}

export const NewsletterProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(newsletterReducer, initialState);

  return (
    <NewsletterContext.Provider value={state}>
      <NewsletterDispatchContext.Provider value={dispatch}>
        {children}
      </NewsletterDispatchContext.Provider>
    </NewsletterContext.Provider>
  );
}

export function useNewsletterState() {
  return useContext(NewsletterContext);
}

export function useNewsletterDispatch() {
  return useContext(NewsletterDispatchContext);
}
