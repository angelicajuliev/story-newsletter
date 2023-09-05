import { FunctionComponent, PropsWithChildren } from "react"
import { RecipientProvider } from "./RecipientContext"
import { NewsletterProvider } from "./NewsletterContext"

type StateContextProps = PropsWithChildren & {}
const StateContext:FunctionComponent<StateContextProps> = ({ children }: any) => {
  return (
    <RecipientProvider>
      <NewsletterProvider>
        {children}
      </NewsletterProvider>
    </RecipientProvider>
  )
}

export default StateContext
