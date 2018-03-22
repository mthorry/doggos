import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import Home from "./components/app/Home";
import LoginUser from "./components/login/LoginUser";
import NewUser from "./components/login/NewUser";
import { Route, Switch, Redirect } from "react-router-dom";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: "",
      active: false
    }
    this.allUsers = [];
  }

  componentDidMount = () => {
    const { user } = this.state;
    axios
      .get("/users/getUser")
      .then(res => {
        this.setState({
          user: res.data.user,
          active: true
        })
      })
      .catch(err => {
        console.log(`errrr`, err);
      })
  }

  getUser = user => {
    this.setState({
      user: user
    })
  }

  isActive = () => {
    this.setState({
      active: !this.state.active
    });
  }

  logOut = () => {
    axios
      .get("/users/logout")
      .then(res => {
        this.setState({
          active: false
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  renderHome = () => {
    const { active, user } = this.state;

    if (active === false) {
      return <NewUser />;
    } else {
      return <Home user={user} logOut={this.logOut} />;
    }
  }

  renderNewUser = () => {
    const { active, user } = this.state;
    if (active === false) {
      return <NewUser />;
    } else {
      return <Redirect to="/" />;
    }
  }

  renderLogin = () => {
    const { active, user } = this.state;
    if (active === false) {
      return <LoginUser active={this.isActive} user={this.getUser} />;
    } else {
      return <Redirect to="/home" />;
    }
  }

  render() {
    const { active } = this.state;
    return (
      <div>
        <Switch>
          <Route path="/home" component={this.renderHome} />
          <Route path="/register" component={this.renderNewUser} />
          <Route path="/login" component={this.renderLogin} />
          <Route path="/" component={this.renderHome} />
        </Switch>
      </div>
    )
  }
}

export default App;
