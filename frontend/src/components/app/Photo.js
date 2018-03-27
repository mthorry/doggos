import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Modal from 'react-modal';
const moment = require('moment');

class Photo extends React.Component {

	state = {
		likes: [],
		liked: false,
		photoModalIsOpen: false,
		currentUser: ''
	}

	componentDidMount = () => {
		const {photo, user} = this.props
		const {liked, likes} = this.state
		
		axios
		.get(`/api/${this.props.user.username}/photos/${photo.id}/likes`)
			.then( res => {
				this.setState({
					likes: res.data.likes
				})
			})
		axios
		.get('/users/getUser')
			.then( res => {
				this.setState({
					currentUser: res.data.user.username
				})
			})
	}

	handleShowPhoto = (e) => {
		this.setState({ 
			photoModalIsOpen: true
		})
	}

	handleHidePhoto = () => {
		this.setState({ 
			photoModalIsOpen: false
		})
	}

  render() {
    const {photo} = this.props
    const {likes, liked} = this.state

    return(
    	<div className='user-photo'>
    	<img key={photo.id} id={photo.id} src={photo.url} alt={photo.caption} width='250px' onClick={this.handleShowPhoto}></img>

            <Modal
				isOpen={this.state.photoModalIsOpen}
       			contentLabel="onRequestClose Example"
       			onRequestClose={this.handleHidePhoto}
       			shouldCloseOnOverlayClick={true}
			>
				<div className="feed-photo" key={photo.id} id={photo.id}>
					<div className="photo-top">
						<h3 className="photo-top-item"><Link to={`/profile/${photo.username}`}>{photo.username}</Link></h3>
						<p className="photo-top-item">{ `${moment(photo.date_created).fromNow()}` }</p>
					</div>
					<img src={photo.url} alt={photo.caption} />
					<div className="photo-likes">
						<h4> {likes.length} { likes.length > 1 || likes.length == 0 ? `borks` : `bork` }</h4>
					</div>
					<div className="photo-bottom">
						<p className="p-caption"><strong>{photo.username}</strong>: {photo.caption} </p>
					</div>
				</div>
				<button onClick={this.handleHidePhoto}>Close</button>
			</Modal>
			</div>
    )
  }

}

export default Photo

