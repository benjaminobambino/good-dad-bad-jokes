import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Home = (props) => {
  const [welcomeMessage, setWelcomeMessage] = useState('')

  const getWelcomeMessage = () => {
    props.loggedIn ? setWelcomeMessage(`Welcome back, ${props.currentUser.name}!`) : setWelcomeMessage('Welcome to Good Dad Bad Jokes!')
  }

  useEffect(() => {
    getWelcomeMessage()
  }, [])

  return(
    <div>
      <p>{welcomeMessage}</p>
      {!props.loggedIn ? (<div>If you'd like to contribute your own humor by adding new jokes and "liking" current jokes, <Link to="/signup">create an account</Link> and <Link to="/login">log in</Link>. Otherwise ...</div>) : null}
      <Link to="/jokes">
        <h4>Let the Jokes Begin</h4>
      </Link>
    </div>
  )
}

export default Home