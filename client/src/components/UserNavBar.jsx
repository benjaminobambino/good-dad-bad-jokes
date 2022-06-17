import React from 'react'
import { NavLink } from 'react-router-dom'

const UserNavBar = () => {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/jokes">Jokes</NavLink>
      <NavLink to="/your-liked-jokes">Your Liked Jokes</NavLink>
      <NavLink to="/add-new-joke">Add a New Joke</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/settings">Settings</NavLink>
    </nav>
  )
}

export default UserNavBar