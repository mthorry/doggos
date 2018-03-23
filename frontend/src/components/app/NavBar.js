import React, { Component } from "react";
// import axios from "axios";
import { Route, Link, Switch, Redirect } from "react-router-dom";
import NewPost from "./NewPost";

class NavBar extends Component {

	render() {
		const {user, logOut} = this.props
		return(
			<div className="navbar">
				<h3 className="navbar-item"> Doggos </h3>
              <Link to="/home" className="navbar-item">
                <i className="fas fa-camera-retro" />
                {' '} Show Me Doggos
              </Link>
              <input
                type="search"
                name="search"
                id="search"
                placeholder="search"
                 className="navbar-item"
              />
                <button className="navbar-item">
                  <Link to={`/profile/${user.username}`}>
                    <i className="far fa-user fa-2x" />
                    <p> My Heckin Profile </p>
                  </Link>
                </button>
                <button className="navbar-item">
                  <Link to="/photos/new">
                    <i className="fa fa-plus-square fa-2x" />
                    <p> Do a Post </p>
                  </Link>
                </button>
                <button onClick={logOut} className="navbar-item">
                    <i className="fas fa-sign-out-alt fa-2x" />
                    <p> Do an Exit </p>
                </button>
                <hr/>
        </div>
		)
	}

}

export default NavBar