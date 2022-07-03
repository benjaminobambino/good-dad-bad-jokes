import { useState } from 'react'
import Client from '../services/api'
import { JOKE_URL_PARAMS, USER_URL_PARAMS } from '../globals'
import laugh from "../pics/laugh.png"
import { useLocation } from 'react-router-dom'

const JokeCard = ({ loggedIn, currentJoke, currentUser, setCurrentJoke, getUser, decrementJokes, incrementJokes }) => {
  const location = useLocation()
  const navButtons = location.pathname === '/jokes' ? true : false

  const [displayedMessage, setDisplayedMessage] = useState('')

  const likedJoke = loggedIn && currentJoke ? currentUser.jokes_liked.includes(currentJoke._id) : null

  const toggleLiked = async () => {
    if (likedJoke) {
      const index = currentUser.jokes_liked.findIndex((joke) => joke === currentJoke._id)
      currentJoke.likes -= 1
      setCurrentJoke({ ...currentJoke })
      currentUser.jokes_liked.splice(index, 1)
      await Client.put(`${USER_URL_PARAMS}/${currentUser._id}`, {
        jokes_liked: currentUser.jokes_liked
      }).then(() => {
        getUser(currentUser._id)
      })
      await Client.put(`${JOKE_URL_PARAMS}/${currentJoke._id}`, {
        likes: currentJoke.likes
      })
    } else {
      currentJoke.likes += 1
      await Client.put(`${JOKE_URL_PARAMS}/${currentJoke._id}`, {
        likes: currentJoke.likes
      })
      currentUser.jokes_liked.push(currentJoke._id)
      await Client.put(`${USER_URL_PARAMS}/${currentUser._id}`, {
        jokes_liked: currentUser.jokes_liked
      })
      .then(() => {
        getUser(currentUser._id)
      })
    }
  }

  let likedId
  if (likedJoke) {
    likedId = 'liked'
  } else {
    likedId = 'not-liked'
  }

  const likeWhileLoggedOut = () => {
    if (!displayedMessage) {
      setDisplayedMessage("You must be logged in for your laughter to be heard!")
    } else {
      setDisplayedMessage('')
    }
  }

  return (
    <div>
      {currentJoke ? (
        <div className="joke">
          
          {navButtons ? <button onClick={decrementJokes}>Previous</button> : null}

          <div className="joke-card">
            <p className="setup">{currentJoke.setup}</p>
            <div className="punchline-likes">
              <p className="punchline">{currentJoke.punchline}</p>
              <div className="likes-container" id={likedId} onClick={loggedIn ? toggleLiked : likeWhileLoggedOut}>
                <img src={laugh} alt="laugh" className="laugh-image" />
                <p>{currentJoke.likes}</p>
              </div>
              <p>{displayedMessage}</p>
            </div>
          </div>
          
          {navButtons ? <button onClick={incrementJokes}>Next</button>: null}

        </div>
      ) : null}
    </div>
  )
}

export default JokeCard