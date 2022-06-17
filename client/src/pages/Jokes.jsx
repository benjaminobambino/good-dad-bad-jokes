import React, { useEffect } from "react";
import JokeCard from "../components/JokeCard";

const Jokes = (props) => {  
  useEffect(() => {
    const { getFirstJoke } = props

    getFirstJoke()
  }, []) 

  return(
    <div>
      <h2>Jokes</h2>
      <JokeCard 
        currentJoke={props.currentJoke} 
        currentUser={props.currentUser}
        getJokes={props.getJokes}
        getUsers={props.getUsers}
        getUser={props.getUser}
        decrementJokes={props.decrementJokes} 
        incrementJokes={props.incrementJokes}
        loggedIn={props.loggedIn}
        setCurrentUser={props.setCurrentUser}
        setCurrentJoke={props.setCurrentJoke}
      />
    </div>
  )
}

export default Jokes