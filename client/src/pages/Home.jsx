import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return(
    <div>
      <Link to="/jokes">
        <h5>Let the Jokes Begin</h5>
      </Link>
    </div>
  )
}

export default Home