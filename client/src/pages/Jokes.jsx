import JokeCard from "../components/JokeCard";

const Jokes = ({ loggedIn, currentJoke, currentUser, setCurrentJoke, getUser, decrementJokes, incrementJokes }) => {  

  return(
    <div>
      <h2>Jokes</h2>
      <JokeCard 
        currentJoke={currentJoke} 
        currentUser={currentUser}
        getUser={getUser}
        decrementJokes={decrementJokes} 
        incrementJokes={incrementJokes}
        loggedIn={loggedIn}
        setCurrentJoke={setCurrentJoke}
      />
    </div>
  )
}

export default Jokes