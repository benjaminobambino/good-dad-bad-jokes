import React, { useEffect } from "react";
import JokeCard from "../components/JokeCard";

const Jokes = (props) => {
  useEffect(() => {
    props.getFirstJoke()
  }, [props.jokes]) 

  return(
    <div>
      <JokeCard 
        currentJoke={props.currentJoke} 
        currentUser={props.currentUser}
        getJokes={props.getJokes}
        getUsers={props.getUsers}
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