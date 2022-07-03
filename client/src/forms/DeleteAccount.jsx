import React, { useState } from "react";
import Client from "../services/api";

const DeleteAccount = ({ history, currentUser, setCurrentUser, toggleLoggedIn }) => {
  const [inputValue, setInputValue] = useState({})
  const [displayedMessage, setDisplayedMessage] = useState('')

  const handleChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
    setDisplayedMessage('')
  };

  const deleteUser = async () => {
    await Client
      .delete(`/auth/delete-user/${currentUser._id}`, {
        data: inputValue})
      .then((res) => {
        alert(`${res.data.msg} We're sad to see you go, but we hope you'll be back someday. We're not even joking.`)
        localStorage.clear()
        setCurrentUser({})
        toggleLoggedIn()
        history.push('/')
      })
      .catch((error) => {
        const response = error.response.data
        setDisplayedMessage(`${response.status}: ${response.msg}`)
      })
  }

  const validateRequest = (e) => {
    e.preventDefault();
    if (currentUser.username !== inputValue.username) {
      setDisplayedMessage('Invalid username.')
    } else if (inputValue.password !== inputValue.confirmPassword) {
      setDisplayedMessage('Passwords do not match.')
    } else {
      const confirmDeletion = window.confirm('This will permanently remove all your account information. Are you sure you wish to delete your account?')
      if (confirmDeletion) {
        deleteUser()
      } else {
        history.push('/settings')
      }
    }
  };

  return (
    <div className="form">
      <h2>Delete Account</h2>
      <form onSubmit={validateRequest}>

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

        <div className={displayedMessage ? 'invalid' : ''}>{displayedMessage}</div>

      </form>
    </div>
  )
}

export default DeleteAccount