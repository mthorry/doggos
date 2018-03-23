import React from "react";
import axios from "axios";
// import { Link, Switch, Route } from "react-router-dom";


class NewPost extends React.Component {
  state = {
      message: "",
      caption: "",
      url: "",
      user_id: this.props.user.id,
      username: this.props.user.username,
      date_created: ""
    }

  handleUrl = e => {
    this.setState({
      url: e.target.value
    });
  }

  handleCaption = e => {
    this.setState({
      caption: e.target.value
    });
  }

  handleNewPost = e => {
   
    const { url, caption, username, user_id } = this.state;
    const date = new Date()

    axios.post(`/api/${username}/photos/new`, {
      caption: caption,
      url: url,
      user_id: user_id,
      username: username,
      date_created: date
    })

    this.setState({
      url: "",
      caption: "",
      date: "",
      message: 'Added Post!'
    })
  }

  render() {
    const { url, caption, username, message} = this.state;

    return (
      <div className="newpost-container">
        <h1> New Post </h1>
        <input type='text' value={url} onChange={this.handleUrl} className="input-box" placeholder="Url image" />
        <br/>
         <input type="text" value={caption} onChange={this.handleCaption} className="input-box" placeholder="Write a caption..." />
         <br/>
        <button id="add-post" onClick={this.handleNewPost}> Add Pupper </button>
        <button id="cancel-post" onClick={this.props.toggleModal}> Cancel </button>
        <p id="message"> {message} </p>
      </div>
    );
  }
}

export default NewPost