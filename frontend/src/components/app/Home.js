import React from "react";
// import Modal from "react-modal";
import NewPost from "./NewPost";
import UserFeed from "./UserFeed";
import Profile from "./Profile";
import UserProfile from "./UserProfile";
import EditProfile from "./EditProfile";
import NavBar from "./NavBar";
// import axios from "axios";
import { Link, Route } from "react-router-dom";
// import "../../user-home.css";

class Home extends React.Component {

	state = {
      modalIsOpen: false
    }

  toggleModal = () => {
    let { modalIsOpen } = this.state;
    this.setState({
      modalIsOpen: !modalIsOpen
    })
  }

  renderFeed = () => {
    const { user } = this.props;
    return <UserFeed user={user} />;
  }

  renderNavBar = () => {
  	const { logOut, user } = this.props
  	return <NavBar user={user} logOut={logOut}/>
  }

  render() {
    const { modalIsOpen } = this.state;
    const { logOut, user } = this.props;
    return (
      <div className="user-home">
        <Route path='/' component={this.renderNavBar} />
        <Route exact path="/home" component={this.renderFeed} />
        <Route exact path="/profile/:username" component={Profile} />
        <Route exact path="/profile/edit" component={EditProfile} />
        <Route exact path="/photos/new" user={user} component={NewPost} />
      </div>
    );
  }
}

export default Home;
