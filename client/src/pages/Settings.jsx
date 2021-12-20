const Settings = (props) => {
  const logOut = () => {
    props.toggleLoggedIn()
    props.history.push('/')
  }
  return(
    <div>
      <h1>Settings</h1>
      <button onClick={() => logOut()}>Log Out</button>
    </div>
  )
}

export default Settings