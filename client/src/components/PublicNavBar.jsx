import React from 'react'
import { NavLink } from 'react-router-dom'

const PublicNavBar = (props) => {
  return (
    <div className="nav-bar">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/jokes">Jokes</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/signup">Sign Up</NavLink>
    </div>
  )
}

export default PublicNavBar