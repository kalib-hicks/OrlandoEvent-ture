import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from '@apollo/react-hooks';
import { ADD_USER } from "../utils/mutations";
import { Button } from 'react-bootstrap';
import Auth from "../utils/auth";

const Signup =() => {
  const [formState, setFormState] = useState({ username: '', email: '', password: '' });
  const [addUser, { error }] = useMutation(ADD_USER);

  const handleChange = event => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value
    });
  };

  // submit form
  const handleFormSubmit = async event => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...formState }
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="container my-5 d-flex flex-column justify-content-center" id='signup'>
      <h2>Signup</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            className='form-control'
            placeholder="Username"
            name="username"
            type="username"
            id="username"
            value={formState.username}
            onChange={handleChange}
          />
        </div>
        <div className="form-group my-2">
          <label htmlFor="email">Email:</label>
          <input
            className='form-control'
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            value={formState.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="password">Password:</label>
          <input
            className='form-control'
            placeholder="******"
            name="password"
            type="password"
            id="password"
            value={formState.password}
            onChange={handleChange}
          />
        </div>
        <Button variant='secondary' type='submit' className='w-100 my-2'>
          Sign Up
        </Button>
        <Button variant='outline-primary' className='w-100 login-btn' >
          <Link to="/login" style={{textDecoration: 'none'}}>
            Login
          </Link>
        </Button>
      </form>
      {error && <div>Signup failed</div>}
    </div>

  );
}

export default Signup;
