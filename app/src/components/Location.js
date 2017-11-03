import React from 'react'
import { gql, graphql, } from 'react-apollo'

const Location = ({ data: { allLocations, }, }) => {
  if (allLocations && allLocations.length) {
    return (
      <div>{allLocations.map((loc, i) => <p key={ loc.id }>{loc.name}</p>)}</div>
    )
  } else return <div>hello</div>
}

export default graphql(
  gql`
    query LocationQuery {
      allLocations {
        id
        name
      }
    }
  `
)(Location)
