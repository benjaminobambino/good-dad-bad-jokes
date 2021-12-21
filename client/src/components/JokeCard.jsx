import axios from "axios"
import { JOKE_BASE_URL, USER_BASE_URL } from "../globals"

const JokeCard = (props) => {
  const likedJoke = props.currentUser.jokes_liked.includes(props.currentJoke._id)
  console.log(likedJoke)
  console.log(props.currentUser.jokes_liked)
  
  const toggleLiked = async () => {
    if (likedJoke) {
      console.log('you have liked this joke')
      await axios.put(`${JOKE_BASE_URL}/${props.currentJoke._id}`, {
        likes: props.currentJoke.likes - 1
      })
    } else {
      console.log('you have not liked this joke')
      await axios
        .put(`${JOKE_BASE_URL}/${props.currentJoke._id}`, {
          likes: props.currentJoke.likes + 1
        })
        .then(() => {
          props.getJokes()
        })
      // await axios.put(`${USER_BASE_URL}/${props.currentUser._id}`, {
      //   jokes_liked: props.currentUser.jokes_liked.push(props.currentJoke._id)
      // })
    }
  }


  return (
    <div>
      {props.currentJoke ? (
      <div>
        <p>{ props.currentJoke.setup }</p>
        <p>{ props.currentJoke.punchline }</p>
        <div className="likes-container" onClick={toggleLiked}>
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