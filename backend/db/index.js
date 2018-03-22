var pgp = require("pg-promise")({});
var connectionString = "postgres://localhost/doggos";
var db = pgp(connectionString);

module.exports = db;
  
