import React, { useState } from "react";

const LogIn = (props) => {
  const [inputValue, setInputValue] = useState([])
  const [displayedMessage, setDisplayedMessage] = useState('')

  const handleChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const logIn = (e) => {
    e.preventDefault();
    const existingUser = props.users.find(({ username }) => username === inputValue.username)
    if(!existingUser) {
      setDisplayedMessage('Please enter a valid username.')
    } else if (existingUser.password !== inputValue.password) {
      setDisplayedMessage('Incorrect password.')
    } else {
      setDisplayedMessage('')
      props.toggleLoggedIn()
      props.setCurrentUser(existingUser)
      props.history.push('/')
    }
  };

  return (
<div className="form">
      <h1>Sign Up</h1>
      <form onSubmit={logIn}>

        <input
          type="text"
          placeholder="Username"
          id="username"
          name="username"
          onChange={handleChange}
        />
        <label htmlFor="username">Username</label>

        <input
          type="password"
          placeholder="Password"
          id="password"
          name="password"
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>

        <button type="submit">Log In</button>

        <p /*className={validClass}*/>{displayedMessage ? displayedMessage : ''}</p>
      </form>
    </div>
  )
}

export default LogIn