import React, {useState, useEffect} from 'react'
import axios from 'axios'

function HTTPHooks() {
    const [posts, getPosts] = useState([])
    const [error, setError] = useState(null)
    const [postMessage, setPostMessage] = useState(null)
    // Const variable for POST Request
    const postToApi = () => {
        axios.post(
            // The API url
            'https://jsonplaceholder.typicode.com/posts',
            // What you want to send to the url
            {
                title: 'Goodbyeeeeee',
                body: 'It works!!!',
                userId: 123456,
            }).then(response => {
                // Setter function for postMessage
                // Checks if the status code after posting data
                // is 201
                setPostMessage(response.status === 201 ?
                               // If it is, returns the template literal statement
                               // below
                               `Success! Title ${response.data.title}`
                               // If not, returns this statement
                               : 'Failed')
            })
    } 

    // useEffect function for GET Request
    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts/14')
            .then(response => {
                console.log(response)
                const data = Array.isArray(response.data) ?
                            response.data
                            : [response.data]
                getPosts(data)
               
            })
            // Error handling, passes the error into 
            // the setter function
            // and displays an error message
            .catch(error => {
                setError(error.message)
            }) 
    // Empty array so this function only runs once
    }, [])
  return (
      <div>
          <button onClick={postToApi}>
              Create Post
          </button>
          <p>{postMessage}</p>
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
                  error ?
                      <p>{error}</p>
                      // If not, loads this h4 tag instead
                      : <h4>Loading posts...</h4>
              )
          }
      </div>
  )
}

export default HTTPHooks