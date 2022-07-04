import React, { useState, useEffect } from "react";
import JokeCard from "../components/JokeCard";
import Client from "../services/api";
import { JOKE_URL_PARAMS } from "../globals";

const LikedJokes = ({ loggedIn, currentUser, setCurrentJoke, getUser, decrementJokes, incrementJokes }) => {
  const [likedJokes, setLikedJokes] = useState([])

  useEffect(() => {
    const getLikedJokes = async () => {
      const jokesLiked = currentUser.jokes_liked
      if (jokesLiked.length) {
        const jokes = []
        for (let i = 0; i < jokesLiked.length; i++) {
          await Client
          .get(`${JOKE_URL_PARAMS}/${currentUser.jokes_liked[i]}`)
          .then((res) => {
            jokes.push(res.data.joke)
          })
        }
        setLikedJokes(jokes)
      }
    }

    getLikedJokes()
  }, [currentUser]) 

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
                currentUser={currentUser}
                getUser={getUser}
                decrementJokes={decrementJokes} 
                incrementJokes={incrementJokes}
                loggedIn={loggedIn}
                setCurrentJoke={setCurrentJoke}
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