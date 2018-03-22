var express = require('express');
var router = express.Router();
var db = require('../db/queries');
const { loginRequired } = require("../auth/helpers");

// Photos
router.get('/api/:username/photos', db.getAllPhotos);
router.get('/api/:username/photos/:photo_id', db.getSinglePhoto);
router.post('/api/:username/photos/new', loginRequired, db.createPhoto);
router.put('/api/:username/photos/:photo_id', db.updatePhoto);
router.delete('/api/:username/photos/:photo_id', db.removePhoto);

// Feed
router.get('/api/:username/feed', loginRequired, db.getUserFeed)

// Likes
router.get('/api/:username/photos/:photo_id/likes', db.getPhotoLikes);
router.get('/api/photos/likes', db.getAllLikes)
router.post('/api/:username/photos/:photo_id/likes', loginRequired, db.likePhoto);
router.delete('/api/:username/photos/:photo_id/likes', loginRequired, db.removeLike);


// Follows
router.post('/api/:followed_username/addFollower', loginRequired, db.addFollower)
router.get('/api/:username/followers/count', db.getFollowersCount)
router.get('/api/:username/followers', db.getFollowers)
router.get('/api/:username/following/count', db.getFollowingCount)
router.get('/api/:username/following', db.getFollowing)


// Adoptables
router.get('/api/adoptables', db.getAllAdoptables)

module.exports = router;
