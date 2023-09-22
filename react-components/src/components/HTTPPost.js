import React, { Component } from 'react'
import axios from 'axios'

export class HTTPPost extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       apiResponse: null
    }
  }
  postToApi = () => {
    axios.post(
      // The API url
      'https://jsonplaceholder.typicode.com/posts',
      // What you want to send to the url
      {
        title: 'Goodbyeeeeee',
        body: 'It works!!!',
        userId: 123456,
      }).then(response => {
        // Sets the new data to apiResponse
        this.setState({
          apiResponse: response.data
        })
      })
  } 

  render() {
    // Destructure apiResponse from this.state
    // so you don't have to use this.state anymore
    const {apiResponse} = this.state
    return (
      <div>
        <button onClick={this.postToApi}>
          Create Post
        </button>
        {/* Conditional statement */}
        {
          apiResponse ?
          // Renders the following if apiResponse is truthy
          // or has new data attached
          (<div>
            <h1>{apiResponse.title}</h1>
            <p>Post ID: {apiResponse.id}</p>
            <p>{apiResponse.body}</p>
            <p>User ID: {apiResponse.userId}</p>
          </div>)
          // Renders the <p> tag below if there is no apiResponse
          : (<p>Please click the button above</p>)
        }
      </div>
    )
  }
}

export default HTTPPost