import React, { Component } from "react";
import axios from "axios";

class EditProfile extends Component {
	state = {
      email: "",
      message: "",
      bio: "",
      profile_pic: ""
    }

  componentDidMount() {
      const {user} = this.props
      this.setState({
          email: user.email,
          bio: user.bio,
          profile_pic: user.profile_pic
      })
  }

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    const { password, email, bio, profile_pic } = this.state;
	axios
		.put('/users/edit', {
		  email: email,
		  bio: bio,
		  profile_pic: profile_pic
		})
		.then(res => {
		  console.log(res);
		  this.setState({
		    message: "PROFILE CHANGE SUCCESSFUL!"
		  })
		})
		.catch(err => {
		  console.log(err);
		  this.setState({
		    password: "",
		    message: "Error"
		  })
		})
    }

  render() {
    const { email, bio, profile_pic, message } = this.state;
    return (
      <div className="signup-container">
        <div id="register-box">
          <h1> Edit Profile: </h1>
          <p> Email: {' '}
            <input
              className="input-box"
              name="email"
              type="email"
              value={email}
              onChange={this.handleInput}
              placeholder="Email"
              maxLength="30"
            /> 
            </p>

          <p> Profile Picture: {' '}
            <input
              className="input-box"
              name="profile_pic"
              type="text"
              value={profile_pic}
              onChange={this.handleInput}
              placeholder="Profile Picture"
              maxLength="99"
            />
            </p>

          <p> Bio: {' '}
            <input
              className="input-box"
              name="bio"
              type="text"
              value={bio}
              onChange={this.handleInput}
              placeholder="Your bio"
              maxLength="99"
            />
            </p>

            <button onClick={this.handleSubmit} id="edit-profile-btn">Update Profile</button>
          <br />
          {message}
        </div>
      </div>
    );
  }
}

export default EditProfile;
