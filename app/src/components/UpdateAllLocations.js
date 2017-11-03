import React from 'react'
import { gql, graphql, } from 'react-apollo'

class UpdateAllLocations extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      locationsCount: null,
      validationErrors: null,
      serverError: null,
    }
    this.updateAllLocations = this.updateAllLocations.bind(this)
  }

  async updateAllLocations() {
    try {
      let res = await this.props.mutate()
      console.log('done', res)
      const { data: { updateAllLocations: { count, errors, }, }, } = res
      this.setState({
        locationsCount: count,
        validationErrors: errors,
        serverError: null,
      })
    } catch (err) {
      console.log(err)
      this.setState({ ...this.state, serverError: err, })
    }
  }

  render() {
    const { locationsCount, validationErrors, } = this.state
    return (
      <div>
        <button onClick={ this.updateAllLocations }>Update All Locations</button>
        <p>
          {locationsCount
            ? `Successfully added ${locationsCount} locations`
            : ''}
        </p>
        <p>
          {validationErrors && validationErrors.length
            ? 'Identified some errors'
            : ''}
        </p>
        <ul>
          {validationErrors &&
            validationErrors.map((err, i) => <li key={ i }>{err}</li>)}
        </ul>
      </div>
    )
  }
}

const updateAllLocationsQuery = gql`
  mutation updateAllLocations {
    updateAllLocations(name: "emily") {
      count
      errors
    }
  }
`

export default graphql(updateAllLocationsQuery)(UpdateAllLocations)
