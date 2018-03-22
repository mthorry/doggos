import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import "../../login-page.css";
// import baseURL from '../../baseurl'

class LoginUser extends React.Component {

  state = {
    username: "",
    password: "",
    message: ""
  }

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleDemo = () => {
    setTimeout(() => {
      this.setState({
        username: "matt",
        password: "1234"
      });
    }, 500);
    setTimeout(() => {this.handleSubmit()},1200)
  }

  handleSubmit = e => {
    const { username, password } = this.state;
    axios
      .post("/users/login", {
        username: username,
        password: password
      })
      .then(res => {
        console.log(res.data)
        this.props.user(res.data);
        this.props.active();
        this.setState({
          username: "",
          password: "",
          message: "Logged in"
        });
      })
      .catch(err => {
        this.setState({
          username: "",
          password: "",
          message: "Username / Password Incorrect"
        });
      });
  };

  render() {
    const { username, password, message } = this.state;
    return (
      <div className="login-container">
        <div id="login-box">
          <h1 id="app-name"> Login </h1>
          <input
            name="username"
            type="text"
            value={username}
            onChange={this.handleInput}
            placeholder="Username"
            className="input-box"
          />
          <br />
          <input
            name="password"
            type="password"
            value={password}
            onChange={this.handleInput}
            placeholder="Password"
            className="input-box"
          />
          <br />
          <button className="button" onClick={this.handleSubmit}> Log in </button>
          <br />
          <button className="button" onClick={this.handleDemo}>Demo Log in</button>
          <br />
            {" "}
          <strong>{ message }</strong>
          <p>
            <Link id="forgot-link" to="/">
              {" "}
              Forgot Password?
            </Link>
          </p>
        </div>

        <div id="signup-box">
          <p>
            {" "}
            Not a member? <Link to="/register"> Sign Up </Link>
          </p>
        </div>
      </div>
    );
  }
}

export default LoginUser;
