import axios from "axios";
import React, { useState } from "react";
import { USER_BASE_URL } from "../globals";

const DeleteAccount = (props) => {
  const [inputValue, setInputValue] = useState([])
  const [displayedMessage, setDisplayedMessage] = useState('')

  const handleChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
    setDisplayedMessage('')
  };

  const deleteUser = async () => {
    await axios
      .delete(`${USER_BASE_URL}/${props.currentUser._id}`)
      .then(() => {
        alert("Your account has been deleted. We're sad to see you go, but we hope you'll be back someday. We're not even joking.")
        props.setCurrentUser({})
        props.toggleLoggedIn()
        props.getUsers()
        props.history.push('/')
      })
  }

  const validateRequest = (e) => {
    e.preventDefault();
    if (props.currentUser.username !== inputValue.username) {
      setDisplayedMessage('Invalid username.')
    } else if (props.currentUser.password !== inputValue.password) {
      setDisplayedMessage('Incorrect password.')
    } else if (inputValue.password !== inputValue.confirmPassword) {
      setDisplayedMessage('Passwords do not match.')
    } else {
      const confirmDeletion = window.confirm('This will permanently remove all your account information. Are you sure you wish to delete your account?')
      if (confirmDeletion) {
        deleteUser()
      } else {
        props.history.push('/settings')
      }
    }
  };

  return (
    <div className="form">
      <h2>Delete Account</h2>
      <form onSubmit={validateRequest}>

      <p /*className={validClass}*/>{displayedMessage}</p>

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

        <input
          type="password"
          placeholder="Confirm Password"
          id="confirm-password"
          name="confirmPassword"
          onChange={handleChange}
        />
        <label htmlFor="confirm-new-password">Confirm New Password</label>

        <button type="submit">Delete Account</button>

      </form>
    </div>
  )
}

export default DeleteAccount