import React from 'react'
import { gql, graphql, } from 'react-apollo'

const LocationDetails = ({ data, }) => {
  if (data.Location) {
    const { Location: { name, lat, lng, }, } = data
    return (
      <div>
        <p> {name}</p>
        <p>
          {lat}, {lng}
        </p>
      </div>
    )
  }

  return <div />
}

export default graphql(
  gql`
    query LocationQuery($id: ID!) {
      Location(id: $id) {
        id
        name
        lat
        lng
      }
    }
  `
)(LocationDetails)
