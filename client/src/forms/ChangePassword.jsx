import axios from "axios";
import React, { useState } from "react";
import { USER_BASE_URL } from "../globals";

const ChangePassword = (props) => {
  const [inputValue, setInputValue] = useState([])
  const [displayedMessage, setDisplayedMessage] = useState('')

  const handleChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
    setDisplayedMessage('')
  };

  const updatePassword = async (e) => {
    e.preventDefault();
    if (props.currentUser.password !== inputValue.currentPassword) {
      setDisplayedMessage('Incorrect current password.')
    } else if (inputValue.newPassword === props.currentUser.password) {
      setDisplayedMessage('New password must be different than current password.')
    } else if (inputValue.newPassword !== inputValue.confirmNewPassword) {
      setDisplayedMessage('New passwords do not match.')
    } else if (inputValue.newPassword.length < 7) {
      setDisplayedMessage('Password must be at least seven characters.')
    } else if (!/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/.test(inputValue.newPassword)) {
      setDisplayedMessage('Passwords must contain at least one uppercase letter, one lowercase letter, one number, and one special character.')
    } else {
      await axios.put(`${USER_BASE_URL}/${props.currentUser._id}`, {
        password: inputValue.newPassword
      }).then(() => {
        setDisplayedMessage('Password has been updated.')
        props.getUsers();
        props.setCurrentUser({
          _id: props.currentUser._id,
          name: props.currentUser.name,
          email: props.currentUser.email,
          username: props.currentUser.username,
          password: inputValue.newPassword,
          jokes_contributed: props.currentUser.jokes_contributed,
          jokes_liked: props.currentUser.jokes_liked,
          jokes_viewed: props.currentUser.jokes_viewed
        });
      })
    }
  };

  return (
    <div className="form">
      <h2>Change Password</h2>
      <form onSubmit={updatePassword}>

      <p /*className={validClass}*/>{displayedMessage}</p>

        <input
          type="password"
          placeholder="Current Password"
          id="current-password"
          name="currentPassword"
          onChange={handleChange}
        />
        <label htmlFor="current-password">Current Password</label>

        <input
          type="password"
          placeholder="New Password"
          id="new-password"
          name="newPassword"
          onChange={handleChange}
        />
        <label htmlFor="new-password">New Password</label>

        <input
          type="password"
          placeholder="Confirm New Password"
          id="confirm-new-password"
          name="confirmNewPassword"
          onChange={handleChange}
        />
        <label htmlFor="confirm-new-password">Confirm New Password</label>

        <button type="submit">Update Password</button>

        <p>For your own security, do NOT use a password that you use for other accounts.</p>
          <p>Password must:</p>
        <ul>
          <li>be at least seven characters,</li>
          <li>include at least one uppercase letter,</li>
          <li>include at least one lowercase letter,</li>
          <li>include at least one number,</li>
          <li>and include at least one special character (!@#$%^&*).</li>
        </ul>

      </form>
    </div>
  )
}

export default ChangePassword