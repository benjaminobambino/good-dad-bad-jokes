import React, { useEffect } from "react";
import JokeCard from "../components/JokeCard";

const Jokes = (props) => {
  useEffect(() => {
    props.getFirstJoke()
  }, [props.jokes]) 

  return(
    <div>
      <JokeCard 
        currentJoke={ props.currentJoke } 
        currentUser={ props.currentUser }
        getJokes={ props.getJokes }
        decrementJokes={ props.decrementJokes } 
        incrementJokes={ props.incrementJokes }
      />
    </div>
  )
}

export default Jokes