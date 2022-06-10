import React, { useState } from "react";
import Client from "../services/api";

const ChangePassword = (props) => {
  const [inputValue, setInputValue] = useState({})
  const [displayedMessage, setDisplayedMessage] = useState('')

  const handleChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
    setDisplayedMessage('')
  };

  const updatePassword = async (userId) => {
    await Client.post(`/auth/update-password/${userId}`, inputValue).then((res) => {
      console.log(res.data.payload)
      props.setCurrentUser(res.data.payload);
      setDisplayedMessage('Password has been updated.')
  })
}

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.newPassword !== inputValue.confirmNewPassword) {
      setDisplayedMessage('New passwords do not match.')
    } else if (inputValue.newPassword.length < 7) {
      setDisplayedMessage('Password must be at least seven characters.')
    } else if (!/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/.test(inputValue.newPassword)) {
      setDisplayedMessage('Passwords must contain at least one uppercase letter, one lowercase letter, one number, and one special character.')
    } else {
      updatePassword(props.currentUser._id)
    }
  };

  let validClass;
  if (!displayedMessage) {
    validClass = '';
  } else if (displayedMessage === 'Password has been updated.') {
    validClass = 'valid';
  } else {
    validClass = 'invalid';
  }

  return (
    <div className="form">
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>

        <input
          type="password"
          placeholder="Current Password"
          id="current-password"
          name="oldPassword"
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
          <li>and include at least one special character (!@#$%^&amp;*).</li>
        </ul>

        <div className={validClass}>{displayedMessage}</div>

      </form>
    </div>
  )
}

export default ChangePassword