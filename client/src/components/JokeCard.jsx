import axios from "axios"
import { JOKE_BASE_URL, USER_BASE_URL } from "../globals"
import laugh from "../pics/laugh.png"

const JokeCard = (props) => {
  const toggleLiked = async () => {
    const likedJoke = props.loggedIn ? props.currentUser.jokes_liked.includes(props.currentJoke._id) : null
    if (likedJoke) {
      const index = props.currentUser.jokes_liked.findIndex((joke) => joke === props.currentJoke._id)
      props.currentJoke.likes -= 1
      props.setCurrentJoke({ ...props.currentJoke })
      props.currentUser.jokes_liked.splice(index, 1)
      await axios.put(`${USER_BASE_URL}/${props.currentUser._id}`, {
        jokes_liked: props.currentUser.jokes_liked
      })
      await axios.put(`${JOKE_BASE_URL}/${props.currentJoke._id}`, {
        likes: props.currentJoke.likes
      })
    } else {
      props.currentJoke.likes += 1
      await axios.put(`${JOKE_BASE_URL}/${props.currentJoke._id}`, {
        likes: props.currentJoke.likes
      })
      props.currentUser.jokes_liked.push(props.currentJoke._id)
      await axios.put(`${USER_BASE_URL}/${props.currentUser._id}`, {
        jokes_liked: props.currentUser.jokes_liked
      })
      .then(() => {
        props.getUsers()
      })
    }
  }

  return (
    <div>
      {props.currentJoke ? (
        <div>
          <div className="joke-card">
            <p>{ props.currentJoke.setup }</p>
            <p>{ props.currentJoke.punchline }</p>
            <div className="likes-container" onClick={props.loggedIn ? toggleLiked : null}>
              <img src={laugh} alt="laugh" className="laugh-image" />
              <p>{ props.currentJoke.likes }</p>
            </div>
          </div>
            <button onClick={ props.decrementJokes }>Previous</button>
            <button onClick={ props.incrementJokes }>Next</button>
        </div>
      ) : null}
    </div>
  )
}

export default JokeCard