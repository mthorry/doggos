import React, { Component } from "react";
// import axios from "axios";
import { Route, Link, Switch, Redirect } from "react-router-dom";
import NewPost from "./NewPost";

class NavBar extends Component {

	render() {
		const {user, logOut} = this.props
		return(
			<div>
				<h3> Doggos </h3>
          <div className="header">
            <div className="left-top">
              <Link to="/home">
                <i className="fas fa-camera-retro" />
                {' '} My Doggos Feed
              </Link>
            </div>
            <div className="search-box">
              <input
                type="search"
                name="search"
                id="search"
                placeholder="search"
              />
            </div>
            <div className="right-top">
              <div className="user-buttons">
                <button>
                  <Link to={`/profile/${user.username}`}>
                    <i className="far fa-user fa-2x" />
                    <p> Profile </p>
                  </Link>
                </button>
                <button>
                  <Link to="/photos/new">
                    <i className="fa fa-plus-square fa-2x" />
                    <p> New </p>
                  </Link>
                </button>
                <button onClick={logOut}>
                    <i className="fas fa-sign-out-alt fa-2x" />
                    <p> Logout </p>
                </button>
              </div>
            </div>
          </div>
        </div>
		)
	}

}

export default NavBar