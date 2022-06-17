import { useState } from 'react'
import Client from '../services/api'
import { JOKE_URL_PARAMS, USER_URL_PARAMS } from '../globals'
import laugh from "../pics/laugh.png"
import { useLocation } from 'react-router-dom'

const JokeCard = (props) => {
  const location = useLocation()
  const navButtons = location.pathname === '/jokes' ? true : false

  const [displayedMessage, setDisplayedMessage] = useState('')

  const likedJoke = props.loggedIn && props.currentJoke ? props.currentUser.jokes_liked.includes(props.currentJoke._id) : null

  const toggleLiked = async () => {
    if (likedJoke) {
      const index = props.currentUser.jokes_liked.findIndex((joke) => joke === props.currentJoke._id)
      props.currentJoke.likes -= 1
      props.setCurrentJoke({ ...props.currentJoke })
      props.currentUser.jokes_liked.splice(index, 1)
      await Client.put(`${USER_URL_PARAMS}/${props.currentUser._id}`, {
        jokes_liked: props.currentUser.jokes_liked
      }).then(() => {
        props.getUser(props.currentUser._id)
      })
      await Client.put(`${JOKE_URL_PARAMS}/${props.currentJoke._id}`, {
        likes: props.currentJoke.likes
      })
    } else {
      props.currentJoke.likes += 1
      await Client.put(`${JOKE_URL_PARAMS}/${props.currentJoke._id}`, {
        likes: props.currentJoke.likes
      })
      props.currentUser.jokes_liked.push(props.currentJoke._id)
      await Client.put(`${USER_URL_PARAMS}/${props.currentUser._id}`, {
        jokes_liked: props.currentUser.jokes_liked
      })
      .then(() => {
        props.getUsers()
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
      {props.currentJoke ? (
        <div className="joke">
          
          {navButtons ? <button onClick={props.decrementJokes}>Previous</button> : null}

          <div className="joke-card">
            <p className="setup">{props.currentJoke.setup}</p>
            <div className="punchline-likes">
              <p className="punchline">{props.currentJoke.punchline}</p>
              <div className="likes-container" id={likedId} onClick={props.loggedIn ? toggleLiked : likeWhileLoggedOut}>
                <img src={laugh} alt="laugh" className="laugh-image" />
                <p>{props.currentJoke.likes}</p>
              </div>
              <p>{displayedMessage}</p>
            </div>
          </div>
          
          {navButtons ? <button onClick={props.incrementJokes}>Next</button>: null}

        </div>
      ) : null}
    </div>
  )
}

export default JokeCard