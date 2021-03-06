import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import Jokes from './pages/Jokes';
import LikedJokes from './pages/LikedJokes';
import AddNewJoke from './forms/AddNewJoke';
import SignUp from './forms/SignUp';
import LogIn from './forms/LogIn';
import Settings from './pages/Settings';
import ChangePassword from './forms/ChangePassword';
import DeleteAccount from './forms/DeleteAccount';
import { JOKE_URL_PARAMS, USER_URL_PARAMS } from './globals';
import { CheckSession } from './services/Auth';
import Client from './services/api';

const App = () => {
  const [jokes, setJokes] = useState([]);
  const [users, setUsers] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentJoke, setCurrentJoke] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [launched, setLaunched] = useState(false);

  const getFirstJoke = (jokesArray) => {
    const randomizer = Math.floor(Math.random() * jokesArray.length);
    const index = randomizer;
    setCurrentJoke(jokesArray[index]);
  };

  const getJokes = async () => {
    await Client.get(JOKE_URL_PARAMS).then((res) => {
      setJokes(res.data.jokes);
    });
  };

  const getUser = async (userId) => {
    const user = await Client.get(`${USER_URL_PARAMS}/${userId}`);
    setCurrentUser(user.data.user);
    setLoggedIn(true);
  };

  const getUsers = async () => {
    const res = await Client.get(USER_URL_PARAMS);
    setUsers(res.data.users);
  };

  const postLaunch = () => {
    setTimeout(() => {
      setLaunched(true);
    }, 4200);
  };

  useEffect(() => {
    const checkToken = async () => {
      await CheckSession();
      const id = localStorage.getItem('id');
      getUser(id);
    };

    checkToken();
    getJokes();
    getUsers();
    postLaunch();
  }, []);

  useEffect(() => {
    getFirstJoke(jokes);
  }, [jokes]);

  const toggleLoggedIn = () => {
    !loggedIn ? setLoggedIn(true) : setLoggedIn(false);
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
                currentJoke={currentJoke}
                getUser={getUser}
                currentUser={currentUser}
                decrementJokes={decrementJokes}
                incrementJokes={incrementJokes}
                loggedIn={loggedIn}
                setCurrentJoke={setCurrentJoke}
              />
            )}
          />
          <Route
            exact
            path="/your-liked-jokes"
            component={(props) => (
              <LikedJokes
                {...props}
                currentUser={currentUser}
                getUser={getUser}
                decrementJokes={decrementJokes}
                incrementJokes={incrementJokes}
                loggedIn={loggedIn}
                setCurrentJoke={setCurrentJoke}
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
