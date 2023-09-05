import StateContext from '@data/state/StateContext'
import Router from '@pages/router/Router'

function App() {
  return (
    <StateContext>
      <Router />
    </StateContext>
  )
}

export default App
