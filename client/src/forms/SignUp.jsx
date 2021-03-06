// TO DO:
// - move existing user check to server
// - remove users and getUsers
// - useState instead of useReducer
import React, { useReducer } from 'react';
import { RegisterUser } from '../services/Auth';

const SignUp = ({ users, getUsers }) => {

  const iState = {
    name: '',
    nameValid: '',
    email: '',
    emailValid: '',
    username: '',
    usernameValid: '',
    password: '',
    passwordValid: '',
    passwordConfirm: '',
    passwordConfirmValid: '',
    displayedMessage: '',
    valid: ''
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'addName':
          return {
            ...state,
            name: action.payload,
            nameValid: true,
            displayedMessage: '',
            valid: ''
          };
      case 'addEmail':
        return {
          ...state,
          email: action.payload,
          emailValid: true,
          displayedMessage: '',
          valid: ''
        };
      case 'addUser':
        return {
          ...state,
          username: action.payload,
          usernameValid: true,
          displayedMessage: '',
          valid: ''
        };
      case 'addPassword':
        return {
          ...state,
          password: action.payload,
          passwordValid: true,
          displayedMessage: '',
          valid: ''
        };
      case 'confirmPassword':
          return {
            ...state,
            passwordConfirm: action.payload,
            displayedMessage: '',
            valid: '',
            passwordConfirmValid: true,
          };
      case 'submitInfo':
        const existingUser = users.find(({ username }) => username === state.username)
        if (existingUser) {
          return {
            ...state,
            valid: false,
            displayedMessage: 'Username is already taken.'
          };
        } else if (state.email.length < 3) {
          return {
            ...state,
            valid: false,
            displayedMessage: 'Email is invalid.'
          }
        } else if (state.name.length < 1){
          return {
            ...state,
            valid: false,
            displayedMessage: 'Name is required.'
          }
        } else if (state.username.length < 5) {
          return {
            ...state,
            valid: false,
            displayedMessage: 'Username must be at least five characters.'
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
          !/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/.test(state.password)
        ) {
          return {
            ...state,
            valid: false,
            displayedMessage:
              'Passwords must contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
          };
        } else {
          return {
            ...state,
            valid: true,
            displayedMessage: `Thanks for signing up! Please log in.`,
            name: '',
            email: '',
            username: '',
            password: '',
            passwordConfirm: ''
          };
        }
      case 'clearInput':
        return {
          ...state,
          name: '',
          email: '',
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

  const addUser = async () => {
    await RegisterUser(state)
      .then(() => {
        getUsers()
      })
  }
  
  const submitInfo = (e) => {
    e.preventDefault();
    dispatch({ type: 'submitInfo' })
    const existingUser = users.find(({ username }) => username === state.username)
    const meetsConditions = state.nameValid && state.emailValid && (state.email.length >= 3) && state.usernameValid && (state.username.length >= 5) && state.passwordValid && (state.password.length >= 7) && /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/.test(state.password) && state.passwordConfirmValid && (state.password === state.passwordConfirm) && !existingUser
    if(meetsConditions) {
      addUser();
    }
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
      <h2>Sign Up</h2>
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
        <label htmlFor="name">Name</label>

        <input
          type="email"
          placeholder="Email"
          id="email"
          value={state.email}
          onChange={(e) =>
            dispatch({ type: 'addEmail', payload: e.target.value })
          }
        />
        <label htmlFor="email">Email</label>

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
        
        <p>For your own security, do NOT use a password that you use for other accounts.</p>
          <p>Password must:</p>
        <ul>
          <li>be at least seven characters,</li>
          <li>include at least one uppercase letter,</li>
          <li>include at least one lowercase letter,</li>
          <li>include at least one number,</li>
          <li>and include at least one special character (!@#$%^&amp;*).</li>
        </ul>

        <button type="submit">Sign Up</button>

        <button type="button" onClick={() => dispatch({ type: 'clearInput' })}>
          Clear
        </button>

        <div className={validClass}>{state.displayedMessage}</div>
      </form>
    </div>
  );
};

export default SignUp;
