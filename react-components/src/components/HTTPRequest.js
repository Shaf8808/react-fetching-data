import React, { Component } from 'react'
import axios from 'axios'

export class HTTPRequest extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         posts: [],
         error: null
      }
    }
    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/posts/13')
        .then(response => {
            console.log(response)
            // Set state of posts to the data in the API
            this.setState({
              // Checks if posts is already an array
                posts: Array.isArray(response.data) ? 
                response.data
                // If not and is an object, returns it in an array
                // form
                : [response.data]
            })
        })
        // Error handling, sets state of error
        // and displays an error message
        .catch(error => {
          this.setState({
            error: error.message
          })
        }) 
    }
  render() {
    const posts = this.state.posts
    return (
      <div>
        <h2>Posts</h2>
        {
          // Checks if posts is present before rendering 
          // div below
          posts.length ? (
            posts.map(post => (
              <div key={post.id}>
                <h2>{post.id}. {post.title}</h2>
                <h4>By User ID {post.userId}</h4>
                <p>{post.body}</p>
                <hr />
              </div>
            ))
            // If its not present, loads this section instead
          ) : (
            // Checks if an error is present before displaying
            // error message
            this.state.error ?
            <p>{this.state.error}</p>
            // If not, loads this h4 tag instead
            : <h4>Loading posts...</h4>
          )
        }
      </div>
    )
  }
}

export default HTTPRequest