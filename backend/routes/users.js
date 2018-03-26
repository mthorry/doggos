var express = require('express');
var router = express.Router();
var db = require('../db/queries')
var passport = require('../auth/local')
const { loginRequired } = require("../auth/helpers");

// Authentication
router.post('/new', db.registerUser);
router.post('/login', passport.authenticate('local'), (req, res) => {
  res.json(req.user);
})
router.get('/logout',loginRequired, db.logoutUser)

// User info
router.get('/getUser', loginRequired, db.getUser)
router.get('/getSingleUser/:username', db.getSingleUser)
router.put('/edit', loginRequired, db.editUser)

module.exports = router;
