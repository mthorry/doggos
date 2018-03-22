const db = require("../db/index");
const bcrypt = require("bcryptjs")


function comparePasswords(userPass, databasePass) {
    return bcrypt.compareSync(userPass,databasePass)
}

function createHashPassword(password) {
    const salt = bcrypt.genSaltSync()
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

function loginRequired(req, res, next) {
    if(!req.user) {
        res.status(401)
        .json({status: 'Please log in.'})
        return;
    }
    next()
}



module.exports = {
    comparePasswords,
    createHashPassword,
    loginRequired
}