import React, { useEffect, useState, UseState } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import Jokes from './pages/Jokes';
import { JOKE_BASE_URL, USER_BASE_URL } from './globals';

const App = () => {
  const [jokes, setJokes] = useState([]);
  const [users, setUsers] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentJoke, setCurrentJoke] = useState({});

  useEffect(() => {
    const getJokes = async () => {
      const res = await axios.get(JOKE_BASE_URL);
      setJokes(res.data.jokes);
    };
    getJokes();
    const getUsers = async () => {
      const res = await axios.get(USER_BASE_URL);
      setUsers(res.data.users);
    };
    getUsers();
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
    console.log(index);
  };

  const decrementJokes = () => {
    const index = jokes.indexOf(currentJoke);
    const lastIndex = jokes.length - 1;
    index === 0
      ? setCurrentJoke(jokes[lastIndex])
      : setCurrentJoke(jokes[index - 1]);
    console.log(index);
  };

  return (
    <div className="App">
      <Header loggedIn={loggedIn} />
      <main>
        <Switch>
          <Route
            exact
            path="/"
            component={(props) => <Home {...props} jokes={jokes} />}
          />
          <Route
            exact
            path="/jokes"
            render={(props) => (
              <Jokes
                {...props}
                jokes={jokes}
                getFirstJoke={getFirstJoke}
                currentJoke={currentJoke}
                decrementJokes={decrementJokes}
                incrementJokes={incrementJokes}
              />
            )}
          />
          <Route path="/about" component={About} />
        </Switch>
      </main>
    </div>
  );
};

export default App;
