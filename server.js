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
    database: "911db"
  });
  if(req.body.form == "movilidad-entrada")
    con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO movilidad_academica_entrada (`PERIODO_ID`,`PERIODO`,`CAMPUS_ID`,`CAMPUS_DESC`,`UNIDAD_ID`,`UNIDAD`,"
    +"`VISITANTE_ID`,`VISITANTE_NOMBRE`,`VISITANTE_APELLIDO1`,`VISITANTE_APELLIDO2`,`SEXO_ID`,`SEXO`,`NIVEL_ID`,`NIVEL`,`DISCAPACIDAD`,"
    +"`HABLANTE_INDIGENA`,`ORIGEN_INDIGENA`,`UE`,`UE_PAIS`,`UE_ENTIDAD`,`UE_IDIOMA`,`TMA_ID`,`validar`) VALUES ?";
    var sexo,nivel;
    if(req.body.sexoId == 1)
      sexo="Femenino"
    else
      sexo="Masculino"
    if(req.body.nivelId == 1)
      nivel="Licenciatura"
    else if (req.body.nivelId == 2)
      nivel="Especialidad"
    else if (req.body.nivelId == 3)
      nivel="Maestria"
    else
      nivel="Doctorado"
    var values = [
      [parseInt(req.body.periodoId),req.body.periodo,parseInt(req.body.campusId),req.body.campus,parseInt(req.body.unidadId),req.body.unidad,parseInt(req.body.visistanteId),req.body.visitante_nombre,req.body.apellido1,req.body.apellido2,parseInt(req.body.sexoId),sexo,parseInt(req.body.nivelId),nivel,parseInt(req.body.discapacidadId),parseInt(req.body.hablanteId),parseInt(req.body.origenId),req.body.ue,req.body.uePais,req.body.ueEntidad,req.body.ueIdioma,parseInt(req.body.tmaId),0]
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
