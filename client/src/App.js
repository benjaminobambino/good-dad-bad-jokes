import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';
import Home from './pages/Home';
import About from './pages/About';
import { JOKE_BASE_URL } from './globals';

const App = () => {
  const getJokes = async () => {
    const res = await axios.get(JOKE_BASE_URL);
    console.log(res.data.jokes);
  };

  getJokes();

  return (
    <div className="App">
      <main>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/credits" component={About} />
        </Switch>
      </main>
    </div>
  );
};

export default App;
