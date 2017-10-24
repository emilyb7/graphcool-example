import React from 'react'
import { withRouter, } from 'react-router-dom'
import { gql, graphql, } from 'react-apollo'
import Modal from 'react-modal'
import modalStyle from '../constants/modalStyle'

class CreatePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      description: '',
      imageUrl: '',
    }
  }

  async handlePost() {
    const { description, imageUrl, } = this.state
    await this.props.addPost({ variables: { description, imageUrl, }, })

    window.location.pathname = '/'
  }

  render() {
    return (
      <Modal
        isOpen
        contentLabel="Create Post"
        style={ modalStyle }
        onRequestClose={ this.props.history.goBack }
      >
        <div className="pa4 flex justify-center bg-white">
          <div style={ { maxWidth: 400, } } className="">
            {this.state.imageUrl && (
              <img
                src={ this.state.imageUrl }
                alt="alt-text"
                role="presentation"
                className="w-100 mv3"
              />
            )}
            <input
              className="w-100 pa3 mv2"
              value={ this.state.imageUrl }
              placeholder="Image Url"
              onChange={ e => this.setState({ imageUrl: e.target.value, }) }
              autoFocus
            />
            <input
              className="w-100 pa3 mv2"
              value={ this.state.description }
              placeholder="Description"
              onChange={ e => this.setState({ description: e.target.value, }) }
            />
            {this.state.description &&
              this.state.imageUrl && (
                <button
                  className="pa3 bg-black-10 bn dim ttu pointer"
                  onClick={ this.handlePost }
                >
                  Post
                </button>
              )}
          </div>
        </div>
      </Modal>
    )
  }
}

const addMutation = gql`
  mutation addPost($description: String!, $imageUrl: String!) {
    createPost(description: $description, imageUrl: $imageUrl) {
      id
      description
      imageUrl
    }
  }
`

const PageWithMutation = graphql(addMutation, { name: 'addPost', })(CreatePage)

export default withRouter(PageWithMutation)
