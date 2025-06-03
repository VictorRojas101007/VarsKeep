import React from "react";
import "../styles/Login.css";

const Login = (props) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const username = event.target.username.value.trim();
    if (username) {
      localStorage.setItem("username", username);
      props.onLoginSuccess();
    }
  };
  return (
    <div className="loginContainer">
      <h1 className="loginContainer__h1">Welcome to Vars Keep</h1>
      <form onSubmit={handleSubmit} className="loginContainer__form">
        <label htmlFor="username" className="loginContainer__form-label">
          <strong>Username</strong>
        </label>
        <input
          name="username"
          id="username"
          type="text"
          className="loginContainer__form-input"
          placeholder="some-user"
          required
        />
        <button type="submit" className="loginContainer__form-button">
          Enter
        </button>
      </form>
    </div>
  );
};

export default Login;
