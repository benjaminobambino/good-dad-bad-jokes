const JokeCard = (props) => {
  return (
    <div>
      {props.currentJoke ? (
      <div>
        <p>{ props.currentJoke.setup }</p>
        <p>{ props.currentJoke.punchline }</p>
        <button onClick={props.decrementJokes}>Previous</button>
        <button onClick={props.incrementJokes}>Next</button>
      </div>
      ) : null}
    </div>
  )
}

export default JokeCard