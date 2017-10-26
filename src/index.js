import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch, } from 'react-router-dom'
import {
  ApolloProvider,
  createNetworkInterface,
  ApolloClient,
} from 'react-apollo'
import 'tachyons'
import './index.css'

import Location from './components/Location'
import CreateLocation from './components/Create'

const networkInterface = createNetworkInterface({
  // __SIMPLE_API_ENDPOINT__ looks similar to: `https://api.graph.cool/simple/v1/<PROJECT_ID>`
  uri: 'https://api.graph.cool/simple/v1/cj98fe5vo2g0g0115y5x0kvhs',
})

const client = new ApolloClient({ networkInterface, })

ReactDOM.render(
  <ApolloProvider client={ client }>
    <Router>
      <Switch>
        <Route exact path="/" component={ Location } />
        <Route exactPath="/create" component={ CreateLocation } />
      </Switch>
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
)
