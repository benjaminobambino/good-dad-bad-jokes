import React from "react"
import PublicNavBar from "./PublicNavBar"
import UserNavBar from "./UserNavBar"

const Header = (props) => {
  return(
    <div className="header">
      <h1>Good Dad Bad Jokes</h1>
      <h3>Be a good dad. Tell bad jokes.</h3>
      { !props.loggedIn ? <PublicNavBar /> : <UserNavBar /> }
    </div>
  )
}

export default Header