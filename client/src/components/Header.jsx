import React from "react"
import PublicNavBar from "./PublicNavBar"
import UserNavBar from "./UserNavBar"

const Header = (props) => {
  return(
    <div className="header">
      <h1 className="good-dad">Good Dad</h1>
      <h1 className="bad-jokes">Bad Jokes</h1>
      <h3>Be a good dad. Tell bad jokes.</h3>
      { !props.loggedIn ? <PublicNavBar /> : <UserNavBar /> }
    </div>
  )
}

export default Header