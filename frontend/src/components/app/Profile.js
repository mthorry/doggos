import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const moment = require('moment');


class Profile extends React.Component {

	state = {
		photos: '',
		user: '',
		followers: '',
		following: '',
		followed: false
	}

	componentDidMount = () => {
		this.getUserPhotos()
		this.getUser()
		this.getFollowers()
		this.getFollowing()
		this.checkIfFollowed()
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
			this.checkIfFollowed()
		}
	}

	checkIfFollowed = () => {
		// console.log(this.state, this.props)
	}

	render() {
		this.checkReload()

		const {photos, user, followers, following, followed} = this.state

		console.log(followed)

		let userPhotos
		if (photos.length > 0) {
			userPhotos = photos.map( photo => {
			return <img key={photo.id} className='user-photo' src={photo.url} alt={photo.caption} width='250px'></img>
		})
		} else { userPhotos = <p>This user has no photos yet</p> } 
		
		return(
			<div>
				<div className='user-heading'>
					<h2> {user.username}</h2>
					<h3> {followed ? ( followed === true ? <Link to='/edit'> Follow Me! </Link> : <Link to='/edit'> Edit Profile </Link> ) : `Following, boop!`} </h3>
				</div>
					<div className='user-info'>
					<img className='user-item user-bio-photo' src={user.profile_pic} alt={user.username} />
					<p className='user-item user-follow'><strong>{followers.length}</strong> heckin {followers.length === 1 ? `follower` : `followers`}</p>
					<p className='user-item user-follow'>Following <strong>{following.length}</strong> {following.length === 1 ? `good dog` : `good boys and girls`}</p>
					<p className='user-item user-bio'><em>{user.bio}</em></p>
				</div>
				<div className='user-photos'>{userPhotos}</div>
			</div>
		)
	}

}

export default Profile