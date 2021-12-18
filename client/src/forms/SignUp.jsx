import React, { useReducer } from 'react';

const SignUp = (props) => {
  const iState = {
    name: '',
    email: '',
    username: '',
    password: '',
    passwordConfirm: '',
    valid: '',
    displayedMessage: ''
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'addName':
        return {
          ...state,
          name: action.payload,
          valid: '',
          displayedMessage: ''
        };
      case 'addEmail':
        return {
          ...state,
          email: action.payload,
          valid: '',
          displayedMessage: ''
        };
      case 'addUser':
        return {
          ...state,
          username: action.payload,
          valid: '',
          displayedMessage: ''
        };
      case 'addPassword':
        return {
          ...state,
          password: action.payload,
          valid: '',
          displayedMessage: ''
        };
      case 'confirmPassword':
        return {
          ...state,
          passwordConfirm: action.payload,
          valid: '',
          displayedMessage:
            state.passwordConfirm === state.password ? '' : 'Passwords must match'
        };
      case 'submitInfo':
        console.log();
        if (state.username.length < 6) {
          return {
            ...state,
            valid: false,
            displayedMessage: 'Username must be at least six characters.'
          };
        } else if (state.password.length < 7) {
          return {
            ...state,
            valid: false,
            displayedMessage: 'Password must be at least seven characters.'
          };
        } else if (state.password !== state.passwordConfirm) {
          return {
            ...state,
            valid: false,
            displayedMessage: 'Passwords must match.'
          };
        } else if (
          !/^(?=.*[0-9])(?=.*[a-z])(?=.*[!@#$%^&*])/.test(state.password)
        ) {
          return {
            ...state,
            valid: false,
            displayedMessage:
              'Passwords must contain at least one letter, one number, and one special character.'
          };
        } else {
          return {
            ...state,
            valid: true,
            displayedMessage: 'Thanks for signing up!',
            username: '',
            password: '',
            passwordConfirm: ''
          };
        }
      case 'clearInput':
        return {
          ...state,
          username: '',
          password: '',
          passwordConfirm: '',
          displayedMessage: '',
          valid: ''
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, iState);

  const submitInfo = (e) => {
    e.preventDefault();
    dispatch({ type: 'submitInfo' });
    console.log(state);
  };

  let validClass;
  if (state.valid === false) {
    validClass = 'invalid';
  } else if (state.valid === true) {
    validClass = 'valid';
  } else {
    validClass = '';
  }

  return (
    <div className="form">
      <h1>Sign Up</h1>
      <form onSubmit={submitInfo}>
      <input
          type="text"
          placeholder="Name"
          id="name"
          value={state.name}
          onChange={(e) =>
            dispatch({ type: 'addName', payload: e.target.value })
          }
        />
        <label htmlFor="username">Name</label>

        <input
          type="email"
          placeholder="Email"
          id="email"
          value={state.email}
          onChange={(e) =>
            dispatch({ type: 'addEmail', payload: e.target.value })
          }
        />
        <label htmlFor="username">Name</label>

        <input
          type="text"
          placeholder="Username"
          id="username"
          value={state.username}
          onChange={(e) =>
            dispatch({ type: 'addUser', payload: e.target.value })
          }
        />
        <label htmlFor="username">Username</label>

        <input
          type="password"
          placeholder="Password"
          id="password"
          value={state.password}
          onChange={(e) =>
            dispatch({ type: 'addPassword', payload: e.target.value })
          }
        />
        <label htmlFor="password">Password</label>

        <input
          type="password"
          placeholder="Confirm password"
          id="passwordConfirm"
          value={state.passwordConfirm}
          onChange={(e) =>
            dispatch({ type: 'confirmPassword', payload: e.target.value })
          }
        />
        <label htmlFor="passwordConfirm">Confirm password</label>

        <button type="submit">Sign Up</button>

        <button type="button" onClick={() => dispatch({ type: 'clearInput' })}>
          Cancel
        </button>

        <p className={validClass}>{state.displayedMessage}</p>
      </form>
    </div>
  );
};

export default SignUp;
