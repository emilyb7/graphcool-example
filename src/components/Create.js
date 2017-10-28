import React from 'react'
import { gql, graphql, } from 'react-apollo'

import Input from './Input'

const defaultState = { name: '', mapsLink: '', }

class Create extends React.Component {
  constructor(props) {
    super(props)
    this.state = { ...defaultState, }
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleLinkChange = this.handleLinkChange.bind(this)
    this.createNewLocation = this.createNewLocation.bind(this)
  }

  handleNameChange(value) {
    this.setState({ ...this.state, name: value, })
  }

  handleLinkChange(value) {
    this.setState({ ...this.state, mapsLink: value, })
  }

  async createNewLocation() {
    try {
      const { name, mapsLink, } = this.state
      await this.props.mutate({ variables: { name, mapsLink, }, })
      this.setState({ ...defaultState, })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <div>
        <Input
          label="name"
          value={ this.state.name }
          handleInputChange={ this.handleNameChange }
        />
        <Input
          label="mapsLink"
          value={ this.state.mapsLink }
          handleInputChange={ this.handleLinkChange }
        />
        <button onClick={ this.createNewLocation }>Click me</button>
      </div>
    )
  }
}

const createNewLocation = gql`
  mutation createNewLocation($name: String!, $mapsLink: String) {
    createNewLocation(name: $name, mapsLink: $mapsLink) {
      name
    }
  }
`

export default graphql(createNewLocation)(Create)
