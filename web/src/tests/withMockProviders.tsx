import {
  RecipientContext,
  RecipientDispatchContext,
} from "@data/state/RecipientContext";

export const withMockProviders = (Component: any) => {
  const recipients = [
    {
      id: 1,
      email: "mock@email.com",
    },
    {
      id: 2,
      email: "mock2@randomemail.com",
    },
  ];
  return (
    <RecipientContext.Provider value={{ items: recipients, loading: false }}>
      <RecipientDispatchContext.Provider value={() => {}}>
        <Component />
      </RecipientDispatchContext.Provider>
    </RecipientContext.Provider>
  );
};
