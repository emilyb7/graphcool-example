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
import GetLocation from './components/GetLocation'
import UpdateAllLocations from './components/UpdateAllLocations'

const networkInterface = createNetworkInterface({
  // __SIMPLE_API_ENDPOINT__ looks similar to: `https://api.graph.cool/simple/v1/<PROJECT_ID>`
  uri: 'http://localhost:60000/simple/v1/cj9fmnrj40004012534dmcgas',
})

const client = new ApolloClient({ networkInterface, })

ReactDOM.render(
  <ApolloProvider client={ client }>
    <Router>
      <Switch>
        <Route exact path="/" component={ Location } />
        <Route exact path="/create" component={ CreateLocation } />
        <Route exact path="/update" component={ UpdateAllLocations } />
        <Route path="/get-location/:id" component={ GetLocation } />
      </Switch>
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
)
