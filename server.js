const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const bodyParser = require('body-parser');



//para poder acceder a los recursos staticos como los js o los css o los htmls...
app.use(express.static(__dirname));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/main.html'));
  //__dirname : It will resolve to your project folder.
});

router.get('/movilidad-entrada',function(req,res){
  res.sendFile(path.join(__dirname+'/movilidad-entrada.html'));
});

router.get('/movilidad-salida',function(req,res){
  res.sendFile(path.join(__dirname+'/movilidad-salida.html'));
});

router.get('/index',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
});

router.get('/convenios',function(req,res){
  res.sendFile(path.join(__dirname+'/convenios.html'));
});

//add the router
app.use('/', router);
app.post('/', function(req, res){
  var mysql = require('mysql');

  var con = mysql.createConnection({
    host: "localhost",
    user: "jorge",
    password: "qwerty",
    database: "test"
  });
  if(req.body.form == "movilidad-entrada")
    con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO tabla1 (´nombre´, ´apellido´) VALUES ?";
    var values = [
      [req.body.periodo, 'exitosa']
    ];
    con.query(sql, [values], function (err, result) {
      if (err) throw err;
      console.log("Number of records inserted: " + result.affectedRows);
      });
    });
    console.log(req.body.periodo);
    res.sendFile(path.join(__dirname+'/main.html'));
});

app.listen(process.env.port || 4000);

console.log('Running at Port 4000');
