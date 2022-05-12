var mysql      = require('mysql');
var config;
config = {
  mysql_pool : mysql.createPool({
    host: "localhost",
    user: "jorge",
    password: "qwerty",
    database: "911db"
  })
};
module.exports = config;
