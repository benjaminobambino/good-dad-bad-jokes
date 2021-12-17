import React from 'react'
import { NavLink } from 'react-router-dom'

const UserNavBar = () => {
  return (
    <div className="nav-bar">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/jokes">Jokes</NavLink>
    </div>
  )
}

export default UserNavBar