import React from 'react'
import { NavLink } from 'react-router-dom'

const PublicNavBar = ({ launched }) => {
  return (
    <nav className={!launched ? 'opening-appearing' : null}>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/jokes">Jokes</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/signup">Sign Up</NavLink>
      <NavLink to="/login">Log In</NavLink>
    </nav>
  )
}

export default PublicNavBar