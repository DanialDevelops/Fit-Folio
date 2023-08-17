import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Auth from "../utils/auth";
import Header from "../components/header";

import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";

export default function Signup() {
  const loggedIn = Auth.loggedIn();

  // set up the original state of the form
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  // update state based on form input
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  // If the user is logged in, redirect to the home page
  if (loggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="signup d-flex flex-column align-items-center justify-content-center text-center">
      <Header />
      <form
        onSubmit={handleFormSubmit}
        className="signup-form d-flex flex-column"
      >
        {/* --------------------username-------------------- */}
        <label htmlFor="username">Username</label>
        <input
          className="form-input"
          value={formState.username}
          placeholder="Your username"
          name="username"
          type="text"
          onChange={handleChange}
        />

        {/* --------------------email-------------------- */}
        <label htmlFor="email">Email</label>
        <input
          className="form-input"
          value={formState.email}
          placeholder="youremail@gmail.com"
          name="email"
          type="email"
          onChange={handleChange}
        />

        {/* -------------------- password-------------------- */}
        <label htmlFor="password">Password</label>
        <input
          className="form-input"
          value={formState.password}
          placeholder="********"
          name="password"
          type="password"
          onChange={handleChange}
        />

        {/* --------------------sign up btn-------------------- */}
        <div className="btn-div">
          <button
            disabled={
              !(formState.username && formState.email && formState.password)
            }
            className="signup-btn mx-auto my-auto"
          >
            Sign Up
          </button>
        </div>

        {/* --------------------login link-------------------- */}
        <p className="link-btn">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
        {showAlert && <div className="err-message">Signup failed</div>}
      </form>
    </div>
  );
}
