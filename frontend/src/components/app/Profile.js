import React from "react";
import axios from "axios";
// import { Link, Switch, Route } from "react-router-dom";
const moment = require('moment');


class Profile extends React.Component {

	state = {
		photos: '',
		user: '',
		followers: '',
		following: ''
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
	}

	getFollowers = () => {
		const username = this.props.match.params.username
		axios
		.get(`/api/${username}/followers`)
			.then( res => {
				this.setState({
					followers: res.data.data
				})
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
	}

	checkReload = () => {
		if (this.props.match.params.username != this.state.user.username) {
			this.getUserPhotos()
			this.getUser()
			this.getFollowers()
			this.getFollowing()
		}
	}

	render() {
		this.checkReload()

		const {photos, user, followers, following} = this.state

		let userPhotos
		if (photos.length > 0) {
			userPhotos = photos.map( photo => {
			return <img key={photo.id} className='user-photo' src={photo.url} alt={photo.caption} width='250px'></img>
		})
		} else { userPhotos = <p>This user has no photos yet</p> } 
		
		return(
			<div>
				<h2> {user.username} </h2>
					<div className='user-info'>
					<img className='user-item user-bio-photo' src={user.profile_pic} alt={user.username} />
					<p className='user-item user-follow'><strong>{followers.length}</strong> heckin {followers.length === 1 ? `follower` : `followers`}</p>
					<p className='user-item user-follow'>Following <strong>{following.length}</strong> {following.length === 1 ? `good boy` : `good boys and girls`}</p>
					<p className='user-item user-bio'>{user.bio}</p>
				</div>
				<div className='user-photos'>{userPhotos}</div>
			</div>
		)
	}

}

export default Profile