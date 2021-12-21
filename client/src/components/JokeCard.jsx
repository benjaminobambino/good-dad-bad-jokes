import axios from "axios"
import { JOKE_BASE_URL, USER_BASE_URL } from "../globals"

const JokeCard = (props) => {
  const likedJoke = props.loggedIn ? props.currentUser.jokes_liked.includes(props.currentJoke._id) : null
  console.log(likedJoke)
  // console.log(props.currentUser.jokes_liked)
  // console.log(props.currentUser._id)
  
  const toggleLiked = async () => {
      if (likedJoke) {
        console.log('you have just unliked this joke')
        const index = props.currentUser.jokes_liked.findIndex((joke) => joke === props.currentJoke._id)
        // props.setCurrentJoke(props.currentJoke.likes -= 1)
        props.currentUser.jokes_liked.splice(index, 1)
        // await axios.put()
        await axios.put(`${JOKE_BASE_URL}/${props.currentJoke._id}`, {
          likes: props.currentJoke.likes - 1
        })
      } else {
        console.log('you have just liked this joke')
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
        <p>{ props.currentJoke.setup }</p>
        <p>{ props.currentJoke.punchline }</p>
        <div className="likes-container" onClick={props.loggedIn ? toggleLiked : null}>
          <p>Likes: { props.currentJoke.likes }</p>
        </div>
        <button onClick={ props.decrementJokes }>Previous</button>
        <button onClick={ props.incrementJokes }>Next</button>
      </div>
      ) : null}
    </div>
  )
}

export default JokeCard