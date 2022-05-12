var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "jorge",
  password: "qwerty",
  database: "911db"
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM movilidad_academica_entrada", function (err, result, fields) {
    if (err) throw err;
    console.log("QUERY COMPLETE!");
    
    module.exports = result;
  });
});


