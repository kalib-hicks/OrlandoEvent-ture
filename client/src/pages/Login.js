import React, { useState } from "react";
import { useMutation } from '@apollo/react-hooks';
import { Link } from "react-router-dom";
import { LOGIN_USER } from "../utils/mutations"
import { Button } from 'react-bootstrap';
import Auth from "../utils/auth";

function Login(props) {
  const [formState, setFormState] = useState({ email: '', password: '' })
  const [login, { error }] = useMutation(LOGIN_USER);

  const handleFormSubmit = async event => {
    event.preventDefault();
    try {
      const mutationResponse = await login({ variables: { email: formState.email, password: formState.password } })
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e)
    }
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  return (
    <div className="container my-5 d-flex flex-column justify-content-center" id='login'>

      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email address:</label>
          <input
            placeholder="youremail@test.com"
            className='form-control'
            name="email"
            type="email"
            id="email"
            value={formState.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group my-2">
          <label htmlFor="password">Password:</label>
          <input
            placeholder="******"
            className='form-control'
            name="password"
            type="password"
            id="password"
            value={formState.password}
            onChange={handleChange}
          />
        </div>
        {
          error ? <div>
            <p className="error-text" >The provided credentials are incorrect</p>
          </div> : null
        }

        <Button variant='secondary' type='submit' className='w-100 my-2'>
          Login
        </Button>

        <Button variant='outline-primary' className='w-100 signup-btn' >
          <Link to="/signup" style={{textDecoration: 'none'}}>
            Sign Up
          </Link>
        </Button>

      </form>
    </div>
  );
}


export default Login;
