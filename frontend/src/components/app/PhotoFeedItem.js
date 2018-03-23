import React from "react";
import { Link } from "react-router-dom";
const moment = require('moment');

class PhotoFeedItem extends React.Component {

  state = {
    photo: this.props.photo,
    liked: this.props.photo.liked
  }

  render() {
    const {photo, liked} = this.state

    return(
        <div className="feed-photo" key={photo.id} id={photo.id}>
          <div className="photo-top">
              <h3 className="photo-top-item"><Link to={`/profile/${photo.username}`}>{photo.username}</Link></h3>
              <p className="photo-top-item">{ `${moment(photo.date_created).fromNow()}` }</p>
          </div>
          <img src={photo.url} alt={photo.caption} />
          <div className="photo-likes">
            <h4> {photo.likes.length} { photo.likes.length > 1 || photo.likes.length == 0 ? `borks` : `bork` } {photo.liked ? '♥' : '♡' }</h4>
              <p>{!photo.liked ? <button onClick={this.props.addLike} data-id={photo.id} data-username={photo.username}>Add a bork! 🐶</button> : <button onClick={this.props.removeLike} data-id={photo.id} data-username={photo.username}>Un-bork! 💔</button>  }</p>
            </div>
            <div className="photo-bottom">
              <p className="p-caption"><strong>{photo.username}</strong>: {photo.caption} </p>
            </div>
            <br/>
        <hr/>
          </div>
    )
  }

}

export default PhotoFeedItem

