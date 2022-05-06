var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "jorge",
  password: "qwerty",
  database: "test"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "INSERT INTO tabla1 (´nombre´, ´apellido´) VALUES ?";
  var values = [
    ['John', 'Highway'],
    ['Peter', 'Lowstreet'],
    ['Viola', 'Sideway']
  ];
  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });
});
