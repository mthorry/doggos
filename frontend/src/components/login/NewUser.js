import React from "react";
import axios from "axios";
import { Link } from 'react-router-dom'
// import "../../register-page.css";

class NewUser extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      fullName: "",
      username: "",
      password: "",
      message: "",
      profile_pic: ""
      
    };
  }

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault()
    const { username, password, email, fullName } = this.state;
    if (username.length < 4 || password.length < 4) {
      this.setState({
        message: "Username and password must be at least 3 characters"
      });
    } else if (!password || !email || !fullName) {
      this.setState({
        message: 'Please enter a password, email and full name.'
      })
    } else {
      axios
        .post("/users/new", { 
          email: email,
          fullName: fullName,
          username: username,
          password: password,
          profile_pic: "http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640-300x300.png"
        })
        .then(res => {
          console.log(res);
          this.setState({
            username: "",
            password: "",
            message: "REGISTRATION SUCCESS!"
          });
        })
        .catch(err => {
          console.log(err);
          this.setState({
            username: "",
            password: "",
            message: "USERNAME ALREADY EXISTS"
          });
        });
    }
  };

  render() {
    const { email, fullName, username, password, message } = this.state;
    return (
      <div className="signup-container">
        <div id="register-box">

          <h1 id="app-name" > Doggos </h1>
          <h4>Sign Up to share photos and videos of yourself-ish with your friends.</h4>
          <button type="button" className="button"> <i className="fab fa-facebook-square"> </i> Log in with Facebook</button>
          <p> ------------------ OR ------------------ </p>
          <form onSubmit={this.handleSubmit}>
            <input
              className="input-box"
              name="email"
              type="email"
              value={email}
              onChange={this.handleInput}
              placeholder="Email"
              maxLength="30"
            />
            <br />
            <input
              className="input-box"
              name="fullName"
              type="text"
              value={fullName}
              onChange={this.handleInput}
              placeholder="Full Name"
              maxLength="30"
            />
            <br />
            <input
              className="input-box"
              name="username"
              type="text"
              value={username}
              onChange={this.handleInput}
              placeholder="Username"
              maxLength="30"
            />

            <br />
            <input
              className="input-box"
              name="password"
              type="password"
              value={password}
              onChange={this.handleInput}
              placeholder="Password"
              maxLength="30"
            />
            <br />

            <input type="submit" value="Sign Up" className="button" />
          </form>
          <p id="signup-agreement"> By signing up, you agree to our <br/> <strong> Terms &amp; Privacy Policy </strong></p>

          <br />
          {message}
        </div>
        <div id="login-box">
          <p>Already a Self-ish member? <Link to="/login">Log in</Link></p>
        </div>
      </div>
    );
  }
}

export default NewUser;