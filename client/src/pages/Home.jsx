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
      <Link to="/jokes">
        <h5>Let the Jokes Begin</h5>
      </Link>
    </div>
  )
}

export default Home