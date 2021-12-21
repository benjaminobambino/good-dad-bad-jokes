import React from 'react'
import { NavLink } from 'react-router-dom'

const UserNavBar = () => {
  return (
    <div className="nav-bar">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/jokes">Jokes</NavLink>
      <NavLink to="/add-new-joke">Add a New Joke</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/settings">Settings</NavLink>
    </div>
  )
}

export default UserNavBar