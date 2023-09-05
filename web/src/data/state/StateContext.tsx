import { FunctionComponent, PropsWithChildren } from "react"
import { EmailProvider } from "./EmailContext"
import { NewsletterProvider } from "./NewsletterContext"

type StateContextProps = PropsWithChildren & {}
const StateContext:FunctionComponent<StateContextProps> = ({ children }: any) => {
  return (
    <EmailProvider>
      <NewsletterProvider>
        {children}
      </NewsletterProvider>
    </EmailProvider>
  )
}

export default StateContext
