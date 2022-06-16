import React, { useState } from "react";
import { SignInUser } from "../services/Auth";
import Client from '../services/api'

const LogIn = (props) => {
  const [inputValue, setInputValue] = useState([])
  const [displayedMessage, setDisplayedMessage] = useState('')

  const handleChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
    setDisplayedMessage('');
  };

  const logIn = async (e) => {
    e.preventDefault();
      await SignInUser(inputValue, setDisplayedMessage)
      setDisplayedMessage('')
      props.toggleLoggedIn()
      const id = localStorage.getItem('id')
      const user = await Client.get(`/api/users/${id}`)
      props.setCurrentUser(user.data.user)
      props.history.push('/')
  };

  return (
<div className="form">
      <h2>Log In</h2>
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

        <div className={displayedMessage ? "invalid" : ''}>{displayedMessage ? displayedMessage : ''}</div>
      </form>
    </div>
  )
}

export default LogIn