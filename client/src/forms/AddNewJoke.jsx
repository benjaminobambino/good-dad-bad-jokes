import Client from "../services/api";
import React, { useState } from "react";
import { JOKE_URL_PARAMS } from "../globals";

const AddNewJoke = ({ history, getJokes, jokes, currentUser }) => {
  const [inputValue, setInputValue] = useState({author: currentUser._id})
  const [displayedMessage, setDisplayedMessage] = useState('')

  const handleChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
    setDisplayedMessage('')
  };

  const addJoke = async () => {
    await Client
      .post(JOKE_URL_PARAMS, inputValue)
      .then(() => {
        getJokes()
        alert("Your joke has been added!")
        history.push('/jokes')
      })
  }

  const validateSubmission = (e) => {
    e.preventDefault();
    const existingSetup = jokes.find(({ setup }) => setup === inputValue.setup)
    const existingPunchline = jokes.find(({ punchline }) => punchline === inputValue.punchline)
    if (existingSetup || existingPunchline) {
      setDisplayedMessage("That joke has already been added. You shouldn't tell the same joke over and over ...")
    } else if (!inputValue.setup) {
      setDisplayedMessage('Come on. Get us ready to laugh with a good setup.')
    } else if (!inputValue.punchline) {
      setDisplayedMessage('No punchline? You must be joking ...')
    } else {
      addJoke()
    }
  };

  return (
    <div className="form">
      <h2>Add a New Joke</h2>
      <form onSubmit={validateSubmission}>
      
      <p className="submission-disclaimer">Your submissions are welcome! Please remember, a "bad" joke does not mean a "dirty" joke. Let's be a good dad and keep it family-friendly.</p>

      <textarea
          type="text"
          placeholder="Joke Setup (everything but the punchline)"
          id="setup"
          name="setup"
          onChange={handleChange}
        />
        <label htmlFor="setup">Joke Setup (everything but the punchline)</label>

        <textarea
          type="text"
          placeholder="Punchline"
          id="punchline"
          name="punchline"
          onChange={handleChange}
        />
        <label htmlFor="punchline">Punchline</label>

        <button type="submit">Submit Your Joke</button>

        <div className={displayedMessage ? 'invalid' : ''}>{displayedMessage}</div>

      </form>
    </div>
  )
}

export default AddNewJoke