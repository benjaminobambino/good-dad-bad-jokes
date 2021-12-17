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
  // const [firstJoke, setFirstJoke] = useState({});
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
    // setFirstJoke(jokes[index]);
    setCurrentJoke(jokes[index]);
  };

  const incrementJokes = () => {
    const index = jokes.indexOf(currentJoke);
    const lastIndex = jokes.length - 1;
    if (index === lastIndex) {
      setCurrentJoke(jokes[0]);
    } else {
      setCurrentJoke(jokes[index + 1]);
    }
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
                // firstJoke={firstJoke}
                getFirstJoke={getFirstJoke}
                currentJoke={currentJoke}
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
