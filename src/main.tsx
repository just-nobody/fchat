import 'normalize.css/normalize.css'
import './index.scss'

import { Provider } from 'mobx-react'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { App } from './app/components/App'
import { AppStore } from './app/stores/AppStore'

const store = new AppStore()

function Root() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

function render() {
  ReactDOM.render(<Root />, document.getElementById('root'))
}

render()
if (module.hot) module.hot.accept(render)