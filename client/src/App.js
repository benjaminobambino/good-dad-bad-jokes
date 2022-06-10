import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import Jokes from './pages/Jokes';
import AddNewJoke from './forms/AddNewJoke';
import SignUp from './forms/SignUp';
import LogIn from './forms/LogIn';
import Settings from './pages/Settings';
import ChangePassword from './forms/ChangePassword';
import DeleteAccount from './forms/DeleteAccount';
import { JOKE_BASE_URL, USER_BASE_URL } from './globals';
import { CheckSession } from './services/Auth';
import Client from './services/api';

const App = () => {
  const [jokes, setJokes] = useState([]);
  const [users, setUsers] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentJoke, setCurrentJoke] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [launched, setLaunched] = useState(false);

  const getJokes = async () => {
    const res = await axios.get(JOKE_BASE_URL);
    setJokes(res.data.jokes);
  };

  const getUser = async (userId) => {
    const user = await Client.get(`/api/users/${userId}`);
    setCurrentUser(user.data.user);
    setLoggedIn(true);
  };

  const checkToken = async () => {
    await CheckSession();
    const id = localStorage.getItem('id');
    getUser(id);
  };

  const getUsers = async () => {
    const res = await axios.get(USER_BASE_URL);
    setUsers(res.data.users);
  };

  const postLaunch = () => {
    setTimeout(() => {
      setLaunched(true);
    }, 4200);
  };

  useEffect(() => {
    checkToken();
    getJokes();
    getUsers();
    postLaunch();
  }, []);

  const toggleLoggedIn = () => {
    !loggedIn ? setLoggedIn(true) : setLoggedIn(false);
  };

  const getFirstJoke = () => {
    const randomizer = Math.floor(Math.random() * jokes.length);
    const index = randomizer - 1;
    setCurrentJoke(jokes[index]);
  };

  const incrementJokes = () => {
    const index = jokes.indexOf(currentJoke);
    const lastIndex = jokes.length - 1;
    index === lastIndex
      ? setCurrentJoke(jokes[0])
      : setCurrentJoke(jokes[index + 1]);
  };

  const decrementJokes = () => {
    const index = jokes.indexOf(currentJoke);
    const lastIndex = jokes.length - 1;
    index === 0
      ? setCurrentJoke(jokes[lastIndex])
      : setCurrentJoke(jokes[index - 1]);
  };

  return (
    <div className="App">
      <Header loggedIn={loggedIn} launched={launched} />
      <main>
        <Switch>
          <Route
            exact
            path="/"
            component={(props) => (
              <Home
                {...props}
                jokes={jokes}
                loggedIn={loggedIn}
                currentUser={currentUser}
                launched={launched}
              />
            )}
          />
          <Route
            exact
            path="/jokes"
            render={(props) => (
              <Jokes
                {...props}
                jokes={jokes}
                getJokes={getJokes}
                getUsers={getUsers}
                getFirstJoke={getFirstJoke}
                currentJoke={currentJoke}
                currentUser={currentUser}
                decrementJokes={decrementJokes}
                incrementJokes={incrementJokes}
                loggedIn={loggedIn}
                setCurrentJoke={setCurrentJoke}
                setCurrentUser={setCurrentUser}
              />
            )}
          />
          <Route
            path="/add-new-joke"
            render={(props) => (
              <AddNewJoke
                {...props}
                jokes={jokes}
                getJokes={getJokes}
                currentUser={currentUser}
              />
            )}
          />
          <Route path="/about" component={About} />
          <Route
            path="/signup"
            render={(props) => (
              <SignUp {...props} users={users} getUsers={getUsers} />
            )}
          />
          <Route
            path="/login"
            render={(props) => (
              <LogIn
                {...props}
                users={users}
                getUsers={getUsers}
                toggleLoggedIn={toggleLoggedIn}
                setCurrentUser={setCurrentUser}
              />
            )}
          />
          <Route
            exact
            path="/settings"
            component={(props) => (
              <Settings
                {...props}
                users={users}
                getUsers={getUsers}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                toggleLoggedIn={toggleLoggedIn}
              />
            )}
          />
          <Route
            path="/settings/change-password"
            render={(props) => (
              <ChangePassword
                {...props}
                getUsers={getUsers}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            )}
          />
          <Route
            path="/settings/delete-account"
            render={(props) => (
              <DeleteAccount
                {...props}
                getUsers={getUsers}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                toggleLoggedIn={toggleLoggedIn}
              />
            )}
          />
        </Switch>
      </main>
    </div>
  );
};

export default App;
