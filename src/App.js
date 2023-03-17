import React from 'react'
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      users: []
    }
  }

  componentDidMount() {
    this.setState({ loading: true })
    this.getUsers()
      .then(res => {
        this.setState({ users: res.data })
      })
      .catch(err => {
        throw err
      })
      .finally(() => {
        this.setState({ loading: false })
      })

  }

  getUsers = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        axios.get('http://localhost:3001/users')
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      }, 3000);
    })
  }
  render() {
    const { loading, users } = this.state
    if (loading) return <p>loading...</p>
    return (
      <>
        <h1>Users:</h1>
        <ul>
          {users.map(user => (
            <li>{user.name}</li>
          ))}
        </ul>
      </>
    )
  }
}
export default App