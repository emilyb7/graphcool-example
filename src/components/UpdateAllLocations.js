import React from 'react'
import { gql, graphql, } from 'react-apollo'

class UpdateAllLocations extends React.Component {
  constructor(props) {
    super(props)
    this.updateAllLocations = this.updateAllLocations.bind(this)
  }

  async updateAllLocations() {
    try {
      let res = await this.props.mutate()
      console.log('done', res)
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <div>
        <button onClick={ this.updateAllLocations }>Update All Locations</button>
      </div>
    )
  }
}

const updateAllLocationsQuery = gql`
  mutation updateAllLocations {
    updateAllLocations(name: "emily") {
      count
    }
  }
`

export default graphql(updateAllLocationsQuery)(UpdateAllLocations)
