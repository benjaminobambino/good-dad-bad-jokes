import { Link } from 'react-router-dom'

const Settings = (props) => {
  const logOut = () => {
    props.toggleLoggedIn()
    props.history.push('/')
  }
  return(
    <div>
      <h3>Settings</h3>
      <Link to="/settings/change-password"><p>Change Password</p></Link>
      <Link to="/settings/delete-account"><p>Delete Account</p></Link>
      <button onClick={() => logOut()}>Log Out</button>
    </div>
  )
}

export default Settings