import React, { useState, useEffect } from "react";

const Jokes = (props) => {
  useEffect(() => {
    props.getFirstJoke()
  }, [props.jokes]) 

  return(
    <div>
      {props.firstJoke ? (
      <div>
        <p>{ props.firstJoke.setup }</p>
        <p>{ props.firstJoke.punchline }</p>
      </div>
      ) : null}
    </div>
  )
}

export default Jokes