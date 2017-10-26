import React from 'react'
import { gql, graphql, } from 'react-apollo'

const Create = props => {
  const createNewLocation = async () => {
    await props.mutate()
  }

  return (
    <div>
      <button onClick={ createNewLocation }>Click me</button>
    </div>
  )
}

export default graphql(
  gql`
    mutation createNewLocation {
      createNewLocation(name: "fancy thing") {
        name
      }
    }
  `
)(Create)
