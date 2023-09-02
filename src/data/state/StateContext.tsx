import { FunctionComponent, PropsWithChildren } from "react"

type StateContextProps = PropsWithChildren & {}
const StateContext:FunctionComponent<StateContextProps> = ({ children }: any) => {
  return children
}

export default StateContext
