import React from "react";
import axios from "axios";
import { Link, Route } from "react-router-dom";
import Modal from 'react-modal';
import Photo from "./Photo";
const moment = require('moment');


class Profile extends React.Component {

	state = {
		photos: '',
		user: '',
		followers: '',
		following: '',
		followed: false,
		followerModalIsOpen: false,
		followingModalIsOpen: false,
		photoModalIsOpen: false,
		photoForModal: ''
	}

	componentWillMount() {
	    Modal.setAppElement('body');
	 }

	componentDidMount = () => {
		this.getUserPhotos()
		this.getUser()
		this.getFollowers()
		this.getFollowing()
	}

	getUserPhotos = () => {
		const username = this.props.match.params.username
		axios
		.get(`/api/${username}/photos`)
			.then( res => {
				this.setState({
					photos: res.data.data
				})
			})
			.catch(err => {
				console.log(err)
			})
	}

	getUser = () => {
		const username = this.props.match.params.username
		axios
		.get(`/users/getSingleUser/${username}`)
			.then( res => {
				this.setState({
					user: res.data.user
				})
			})
			.catch(err => {
				console.log(err)
			})
	}

	getFollowers = () => {
		const username = this.props.match.params.username
		axios
		.get(`/api/${username}/followers`)
			.then( res => {
				let data = res.data.data
				let followed = false
				data.forEach( item => {
					if (item.follower_username == this.props.user.username && username != this.props.user.username) {
						followed = true
					} else if (username == this.props.user.username) {
						followed = 'YOUR PROFILE'
					}
				})
				this.setState({
					followers: res.data.data,
					followed: followed
				})
			})
			.catch(err => {
				console.log(err)
			})
	}

	getFollowing = () => {
		const username = this.props.match.params.username
		axios
		.get(`/api/${username}/following`)
			.then( res => {
				this.setState({
					following: res.data.data
				})
			})
			.catch(err => {
				console.log(err)
			})
	}

	checkReload = () => {
		if (this.props.match.params.username != this.state.user.username) {
			this.getUserPhotos()
			this.getUser()
			this.getFollowers()
			this.getFollowing()
		}
	}

	handleFollow = () => {
		axios
		.post(`/api/${this.props.match.params.username}/follow`)
		.then( res => {
			this.setState({
				followed: true
			})
		})
		.catch(err => {
				console.log(err)
		})
	}

	handleUnfollow = () => {
		axios
		.delete(`/api/${this.props.match.params.username}/follow`)
		.then( res => {
			this.setState({
				followed: false
			})
		})
		.catch(err => {
				console.log(err)
		})
	}

	handleShowFollowers = () => {
		this.setState({ followerModalIsOpen: !this.state.followerModalIsOpen })
	}

	handleShowFollowing = () => {
		this.setState({ followingModalIsOpen: !this.state.followingModalIsOpen })
	}

	handleShowPhoto = (e) => {
		let {photos} = this.state
		let photo 
		if (photos.length) {
			photo = photos.filter( photo => photo.id == e.target.id)
		}
		this.setState({ 
			photoForModal: photo
		}, this.setPhotoTrue())
	}

	setPhotoTrue = () => {
		this.setState({ photoModalIsOpen: true })
		console.log(this.state)
	}

	handleHidePhoto = () => {
		this.setState({ 
			photoModalIsOpen: false,
			photoForModal: ''
		})
	}
	// handleImageClick = (e) => {
	// 	let {photos} = this.state
	// 	let photo 
	// 	if (photos.length) {
	// 		photo = photos.filter( photo => photo.id == e.target.id)
	// 	}
	// 	console.log("CLICK", photo)
	// }

	render() {
		this.checkReload()
		const {photos, user, followers, following, followed, photo, photoForModal} = this.state

		let userFollowers 
		if (followers.length) { 
			userFollowers = followers.map( follower => {
			return <li key={follower.follower_username} onClick={this.handleShowFollowers}><Link to={`/profile/${follower.follower_username}` }>{follower.follower_username}</Link></li>
			})
		}

		let userFollowing 
		if (following.length) { 
			userFollowing = following.map( follow => {
			return <li key={follow.followed_username} onClick={this.handleShowFollowing}><Link to={`/profile/${follow.followed_username}`}>{follow.followed_username}</Link></li>
			})
		}

		let userPhotos
		if (photos.length > 0 && user) {
			userPhotos = photos.map( photo => {
			return <Photo photo={photo} user={user} handleShowPhoto={this.handleShowPhoto} handleHidePhoto={this.handleHidePhoto} isOpen={this.state.photoModalIsOpen}/>
			})
		} else { userPhotos = <p>This user has no photos yet 😐 Mlem.</p> }
		
		return(
			<div>
				<div className='user-heading'>
					<h2> {user.username}</h2>
					<h4> {followed ? ( followed === true ? <button onClick={this.handleUnfollow}> Unfollow 😐 </button> : <Link to='/profile/user/edit'> Edit Profile </Link> ) : <button onClick={this.handleFollow}> Follow Me, Boop! </button>} </h4>
				</div>
					<div className='user-info'>
					<img className='user-item user-bio-photo' src={user.profile_pic} alt={user.username} />
					<p className='user-item user-follow'><strong>{followers.length}</strong> heckin {followers.length === 1 ? `follower` : `followers`}<br/><button onClick={this.handleShowFollowers}>See Followers</button></p>
					<p className='user-item user-follow'>Following <strong>{following.length}</strong> {following.length === 1 ? `good dog` : `good boys and girls`}<br/><button onClick={this.handleShowFollowing}>See Following</button></p>
					<p className='user-item user-bio'><em>{user.bio}</em></p>
				</div>
				<div className='user-photos'>{userPhotos}</div>
				<Modal
					isOpen={this.state.followerModalIsOpen}
           			contentLabel="onRequestClose Example"
           			onRequestClose={this.handleShowFollowers}
           			shouldCloseOnOverlayClick={true}
           		>
           			<p><strong>Followers</strong></p>
           			{userFollowers}
           			<br/>
          			<button onClick={this.handleShowFollowers}>Close</button>
				</Modal>

				<Modal
					isOpen={this.state.followingModalIsOpen}
           			contentLabel="onRequestClose Example"
           			onRequestClose={this.handleShowFollowing}
           			shouldCloseOnOverlayClick={true}
           		>
           			<p><strong>Following</strong></p>
           			{userFollowing}
           			<br/>
          			<button onClick={this.handleShowFollowing}>Close</button>
				</Modal>


			</div>
		)
	}

}

export default Profile

