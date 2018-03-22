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

	render() {
		const {photos, user, followers, following} = this.state
		console.log(photos)
		let userPhotos
		if (photos.length > 0) {
			userPhotos = photos.map( photo => {
			return <div className='user-photos' key={photo.id}>
			<img src={photo.url} alt={photo.caption} width='250px'></img>
			</div>
		})
		} else { userPhotos = <p>This user has no photos yet</p> } 
		
		return(
			<div>
				<h2> {user.username} </h2>
				<img src={user.profile_pic} alt={user.username} width='150px'/>
				<p><strong>{followers.length}</strong> followers</p>
				<p><strong>{following.length}</strong> following</p>
				<p>{user.bio}</p>
				{userPhotos}
			</div>
		)
	}

}

export default Profile