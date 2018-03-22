const promise = require('bluebird');
const options = { promiseLib: promise };
const pgp = require('pg-promise')(options);
const connectionString = 'postgres://localhost:5432/doggos';
const db = pgp(connectionString);
const authHelpers = require("../auth/helpers");
const passport = require("../auth/local");

// PHOTOS ===========================================================================
function getAllPhotos(req, res, next) {
  let username = req.params.username
  db.any('SELECT * FROM photos WHERE username = $1', username)
    .then( data => {
      res.status(200)
        .json({
          status: 'success',
          data: data
        })
    })
    .catch(function (err) {
      return next(err)
    })
}

function getSinglePhoto(req, res, next) {
  let photo = parseInt(req.params.photo_id)
  db.one('SELECT * FROM photos WHERE id = $1', photo)
    .then( data => {
      res.status(200)
        .json({
          status: 'success',
          data: data
        })
    })
    .catch( err => {
      return next(err)
    })
}

function createPhoto(req, res, next) {
  let user_id = parseInt(req.user.id)
  db.none('INSERT INTO photos(caption, url, user_id, username) VALUES ($1, $2, $3, $4)', 
    [req.body.caption, req.body.url, user_id, req.params.username])
    .then( function() {
      res.status(200)
        .json({
          status: 'success',
          message: 'Added one Photo'
        })
    })
    .catch( err => {
      return next(err)
    })
}

function updatePhoto(req, res, next) {
  db.none('UPDATE photos SET caption=$1, url=$2 WHERE id=$3',
    [req.body.caption, req.body.url, req.params.photo_id]
    )
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated Photo'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removePhoto(req, res, next) {
    const photoId = parseInt(req.params.photo_id);
  db.result('DELETE FROM photos WHERE id = $1', photoId)
    .then(function (result) {
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} Photo`
        });
    })
    .catch(function (err) {
      return next(err);
    });
}


// LIKES ===========================================================================
function likePhoto(req, res, next) {
  db
    .none('INSERT INTO likes (username, photo_id) VALUES(${liker}, ${photo})', {
      liker: req.user.username,
      photo: req.params.photo_id
    })
    .then(data => {
      res.status(200).json({
        status: 'success',
        likes: data
      });
    })
    .catch(err => {
      console.log(`Error`, err);
      res.status(500).json({
        status: 'Error',
        likes: err
      });
    });
}

function getPhotoLikes(req, res, next) {
  let photo_id = parseInt(req.params.photo_id)
  db
    .any(
      "SELECT * FROM likes WHERE likes.photo_id=$1",
      photo_id
    )
    .then(data => {
      res.status(200).json({
        status: 'success',
        likes: data
      });
    })
    .catch(err => {
      console.log(`Error`, err);
      res.status(500).json({
        status: 'Error',
        data: err
      });
    });
}

function getAllLikes(req, res, next) {
// function getAllPhotosWithLikes(req, res, next) {
  db
  .any("SELECT likes.id, likes.username AS liker, likes.photo_id, photos.caption, photos.url, photos.user_id, photos.username FROM likes JOIN photos ON likes.photo_id=photos.id")
  // .any("SELECT photos.id,  photos.caption, photos.url, photos.user_id, photos.username, array_agg(likes.username) AS likes FROM photos FULL JOIN likes ON likes.photo_id=photos.id GROUP BY photos.id")
  .then(data => {
      res.status(200).json({
        status: 'success',
        likes: data
      });
    })
    .catch(err => {
      console.log(`Error`, err);
      res.status(500).json({
        status: 'Error',
        data: err
      });
    });
}

function removeLike(req, res, next) {
  let photoId = parseInt(req.params.photo_id)
  let username = req.user.username
  db.result('DELETE FROM likes WHERE username = $1 AND photo_id = $2', [username, photoId])
    .then( result => {
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} like`
        });
    })
    .catch(function (err) {
      return next(err);
    });
}


// FEED ===========================================================================
function getUserFeed(req, res, next) {
  db
    .any(
      "SELECT photos.url, users.username, photos.date_created, photos.id, photos.caption FROM follows JOIN photos ON follows.followed_username=photos.username JOIN users ON follows.followed_username=users.username WHERE follower_username=${user} ORDER BY photos.date_created DESC",
      { user: req.user.username }
    )
    .then(data => {
      res.status(200).json({
        feed: data
      });
    })
    .catch(err => {
      console.log(`error rendering feed`, err);
      feed: "No data found";
    });
}


// FOLLOWS ===========================================================================
function addFollower(req, res, next) {
  db
    .none(
      "INSERT INTO follows (follower_username, followed_username) VALUES(${follower_username}, ${followed_username})",
      { 
        follower_username: req.user.username, 
        followed_username: req.params.followed_username 
      }
    )
    .then(data => {
      res.status(200).json({
        status: 'success',
        follow: "User followed"
      });
    })
    .catch(err => {
      res.status(500).json({
        status: 'Error',
        follow: "User not followed"
      });
    });
}

function getFollowersCount(req, res, next) {
  db
    .one("SELECT COUNT(followed_username) FROM follows WHERE followed_username=${username}", {
      username: req.params.username
    })
    .then(data => {
      res.status(200).json({
        status: 'success',
        followers: data.count
      });
    });
}

function getFollowers(req, res, next) {
  db
    .any(
      "SELECT follower_username FROM follows JOIN users ON follows.followed_username=${username} WHERE users.username=${username}",
      {
        username: req.params.username
      }
    )
    .then(data => {
      res.status(200).json({
        status: "Success",
        data: data
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        data: "Error",
        err
      });
    });
}

function getFollowingCount(req, res, next) {
  db
    .one("SELECT COUNT(follower_username) FROM follows WHERE follower_username=${username}", {
      username: req.params.username
    })
    .then(data => {
      res.status(200).json({
        status: 'success',
        following: data.count
      });
    });
}

function getFollowing(req, res, next) {
  db
    .any(
      "SELECT followed_username FROM follows JOIN users ON follows.follower_username=${username} WHERE users.username=${username}",
      {
        username: req.params.username
      }
    )
    .then(data => {
      res.status(200).json({
        status: "Success",
        data: data
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        data: "Error",
        err
      });
    });
}



// ADOPTABLES ===========================================================================
function getAllAdoptables(req, res, next) {
  db.any('SELECT * FROM adoptables')
    .then( data => {
      res.status(200)
        .json({
          status: 'success',
          data: data
        })
    })
    .catch(function (err) {
      return next(err)
    })
}



// AUTHENTICATION ======================================================================
function registerUser(req, res, next) {
  const hash = authHelpers.createHashPassword(req.body.password);
  db
    .none(
      "INSERT INTO users (username, email, password_digest, bio, profile_pic) VALUES (${username}, $(email), ${password_digest}, ${bio}, ${profile_pic})",
      {
        username: req.body.username,
        email: req.body.email,
        password_digest: hash,
        bio: req.body.bio,
        profile_pic: req.body.profile_pic
      }
    )
    .then(() => {
      res.status(200).json({
        message: "Registration successful."
      });
    })
    .catch(err => {
      res.status(500).json({
        message: `Registration Failed    `,
        err
      });
    });
}

function logoutUser(req, res, next) {
  req.logout();
  res.status(200).send("Logged out successfully");
}

function getUser(req, res, next) {
  db
    .one("SELECT * FROM users WHERE username=${username}", {
      username: req.user.username
    })
    .then(data => {
      res.status(200).json({ user: data });
    });
}

function getSingleUser(req, res, next) {
  db
    .one("SELECT * FROM users WHERE username=${username}", {
      username: req.params.username
    })
    .then(data => {
      res.status(200).json({ user: data });
    });
}

function editUser(req, res, next) {
  db
    .none(
      "UPDATE users SET email=${email}, bio=${bio}, profile_pic=${profile_pic} WHERE username=${username}",
      {
        email: req.body.email,
        bio: req.body.bio,
        profile_pic: req.body.profile_pic,
        username: req.user.username
      }
    )
    .then(() => {
      res.status(200).json({
        message: "successfully updated user"
      });
    })
    .catch(err => {
      res.status(500).json({
        message: 'Registration Failed',
        err
      });
    });
}



module.exports = {
  getAllPhotos: getAllPhotos,
  getSinglePhoto: getSinglePhoto,
  createPhoto: createPhoto,
  updatePhoto: updatePhoto,
  removePhoto: removePhoto,
  likePhoto: likePhoto,
  getPhotoLikes: getPhotoLikes,
  addFollower: addFollower,
  getFollowersCount: getFollowersCount,
  getFollowers: getFollowers,
  getFollowing: getFollowing,
  getFollowingCount: getFollowingCount,
  getAllAdoptables: getAllAdoptables,
  registerUser: registerUser,
  logoutUser: logoutUser,
  getUser: getUser,
  getSingleUser: getSingleUser,
  editUser: editUser,
  getUserFeed: getUserFeed,
  getAllLikes: getAllLikes,
  removeLike: removeLike
};