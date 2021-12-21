import axios from "axios";
import React, { useState } from "react";
import { JOKE_BASE_URL } from "../globals";

const AddNewJoke = (props) => {
  const [inputValue, setInputValue] = useState([])
  const [displayedMessage, setDisplayedMessage] = useState('')

  const handleChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
    setDisplayedMessage('')
  };

  const addJoke = async () => {
    await axios
      .post(JOKE_BASE_URL, {
        setup: inputValue.setup,
        punchline: inputValue.punchline,
        likes: 0,
        author: props.currentUser._id,
        flagged: false
      })
      .then(() => {
        props.getJokes()
        alert("Your joke has been added!")
        props.history.push('/jokes')
      })
  }

  const validateSubmission = (e) => {
    e.preventDefault();
    const existingSetup = props.jokes.find(({ setup }) => setup === inputValue.setup)
    const existingPunchline = props.jokes.find(({ punchline }) => punchline === inputValue.punchline)
    if (existingSetup || existingPunchline) {
      setDisplayedMessage("That joke has already been added. You shouldn't tell the same joke over and over ...")
    } else if (inputValue.setup.length < 1) {
      setDisplayedMessage('Come on. Get us ready to laugh with a good setup.')
    } else if (inputValue.punchline.length < 1) {
      setDisplayedMessage('No punchline? You must be joking ...')
    } else {
      addJoke()
    }
  };

  return (
    <div className="form">
      <h2>Add a New Joke</h2>
      <form onSubmit={validateSubmission}>

      <p /*className={validClass}*/>{displayedMessage}</p>

      <textarea
          type="text"
          placeholder="Joke Setup"
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

      </form>
    </div>
  )
}

export default AddNewJoke