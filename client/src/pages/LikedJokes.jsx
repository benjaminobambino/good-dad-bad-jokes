import React, { useState, useEffect } from "react";
import JokeCard from "../components/JokeCard";
import Client from "../services/api";
import { JOKE_URL_PARAMS } from "../globals";

const LikedJokes = (props) => {
  const [likedJokes, setLikedJokes] = useState([])

  useEffect(() => {
    const getLikedJokes = async () => {
      const jokesLiked = props.currentUser.jokes_liked
      const jokes = []
      for (let i = 0; i < jokesLiked.length; i++) {
        await Client
          .get(`${JOKE_URL_PARAMS}/${props.currentUser.jokes_liked[i]}`)
          .then((res) => {
            jokes.push(res.data.joke)
          })
      }
      setLikedJokes(jokes)
    }

    getLikedJokes()
  }, [props.currentUser]) 

  return(
    <div>
      <h2>Your Liked Jokes</h2>
      { 
      likedJokes.length ?
        likedJokes.map((joke) => {
          return (
            <div key={joke._id}>
              <JokeCard 
                currentJoke={joke} 
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
        })
        : 
        <p>You have not liked any jokes yet.</p>
      }
    </div>
  )
}

export default LikedJokes