const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const bodyParser = require('body-parser');
const exportData = require('./controller/mov-entr'); // CONTROLLER
const exportData2 = require('./controller/mov-sali'); // CONTROLLER
const exportData3 = require('./controller/inter-entr'); // CONTROLLER
const exportData4 = require('./controller/inter-sali'); // CONTROLLER
const exportData5 = require('./controller/convenios'); // CONTROLLER
const encoder = bodyParser.urlencoded();
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mysql = require('mysql');



//para poder acceder a los recursos staticos como los js o los css o los htmls...
app.use(express.static(__dirname+"/views"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname);

//session initialize
app.use(cookieParser());
app.use(session({secret: "Shh, its a secret!"}));


router.get('/',function(req,res){
  if(req.session.username){
    res.render('views/main.html',{name:req.session.username});
  }else{
    res.render('views/index.html');
  }
});

router.get('/main',function(req,res){
  if(req.session.username){
    if(req.session.tipo=="Coordinador"){
      var con = require('./config');
      con.query('SELECT * FROM movilidad_academica_entrada order by validar',function(err,rows)     {
        if(err){
         throw error; 
         res.render('views/main.html',{name:req.session.username,data:'',data2:'',data3:'',data4:'',data5:''});   
        }else{
            con.query('SELECT * FROM movilidad_academica_salida order by validar',function(err,rows2)     {
              if(err){
               throw error; 
               res.render('views/main.html',{name:req.session.username,data:'',data2:'',data3:'',data4:'',data5:''});
              }else{
                con.query('SELECT * FROM intercambio_estudiantil_entrada order by validar',function(err,rows3)     {
                  if(err){
                   throw error; 
                   res.render('views/main.html',{name:req.session.username,data:'',data2:'',data3:'',data4:'',data5:''});
                  }else{
                    con.query('SELECT * FROM intercambio_estudiantil_salida order by validar',function(err,rows4)     {
                      if(err){
                       throw error; 
                       res.render('views/main.html',{name:req.session.username,data:'',data2:'',data3:'',data4:'',data5:''});
                      }else{
                        con.query('SELECT * FROM convenios order by validar',function(err,rows5)     {
                          if(err){
                           throw error; 
                           res.render('views/main.html',{name:req.session.username,data:'',data2:'',data3:'',data4:'',data5:''});
                          }else{
                              res.render('views/main.html',{name:req.session.username,data:rows,data2:rows2,data3:rows3,data4:rows4,data5:rows5});
                          }
                        });
                      }
                    });
                  }
                });
              }
            });
        }
       });
    }else{
      //EL USUARIO NO ES COORDINADOR O ADMIN
      res.render('views/main.html',{name:req.session.usename,data:'NoAuth'});
    }

  }else{
    res.redirect("/");
  }
});

//aqui convertimos la data de la base de datos a excel y la exportamos
router.get('/excel-movilidad-entrada', exportData);
router.get('/excel-movilidad-salida', exportData2);
router.get('/excel-intercambio-entrada', exportData3);
router.get('/excel-intercambio-salida', exportData4);
router.get('/excel-convenios', exportData5);

//formularios
router.get('/movilidad-entrada',function(req,res){
  if(req.session.username){
    res.render('views/movilidad-entrada.html',{name:req.session.username,data:''});
  }else{
    res.redirect("/");
  }
});

router.get('/movilidad-salida',function(req,res){
  if(req.session.username){
    res.render('views/movilidad-salida.html',{name:req.session.username,data:''});
  }else{
    res.redirect("/");
  }
});

router.get('/intercambio-entrada',function(req,res){
  if(req.session.username){
    res.render('views/intercambio-entrada.html',{name:req.session.username,data:''});
  }else{
    res.redirect("/");
  }
});

router.get('/intercambio-salida',function(req,res){
  if(req.session.username){
    res.render('views/intercambio-salida.html',{name:req.session.username,data:''});
  }else{
    res.redirect("/");
  }
});

router.get('/convenios',function(req,res){
  if(req.session.username){
    res.render('views/convenios.html',{name:req.session.username,data:''});
  }else{
    res.redirect("/");
  }
});
router.get('/signout',function(req,res){
  req.session.destroy();
  res.redirect('/');
});
router.get('/ayuda',function(req,res){
  res.render('views/ayuda.html');
});


//add the router
app.use('/', router);

//main post methods here, we get main request, specific when coordinador wants to edit/validate some row.

app.post('/main',encoder, function(req, res) {
  var table = req.body.table;
  var ids = req.body.id;
  //console.log("POST success");
  if(table== "convenios"){
    var con = require('./config');
    con.query('SELECT * FROM convenios where ID='+ids,function(err,row)     {
      if(err){
        throw error;
      }else{
        res.render('views/convenios.html',{name:req.session.username,data:row});
      }
    });
  }else if(table== "movilidad-entrada"){
    var con = require('./config');
    con.query('SELECT * FROM movilidad_academica_entrada where ID='+ids,function(err,row)     {
      if(err){
        throw error;
      }else{
        res.render('views/movilidad-entrada.html',{name:req.session.username,data:row});
      }
    });
  }else if(table== "movilidad-salida"){
    var con = require('./config');
    con.query('SELECT * FROM movilidad_academica_salida where ID='+ids,function(err,row)     {
      if(err){
        throw error;
      }else{
        res.render('views/movilidad-salida.html',{name:req.session.username,data:row});
      }
    });
  }else if(table== "intercambio-entrada"){
    var con = require('./config');
    con.query('SELECT * FROM intercambio_estudiantil_entrada where ID='+ids,function(err,row)     {
      if(err){
        throw error;
      }else{
        res.render('views/intercambio-entrada.html',{name:req.session.username,data:row});
      }
    });
  }else if(table== "intercambio-salida"){
    var con = require('./config');
    con.query('SELECT * FROM intercambio_estudiantil_salida where ID='+ids,function(err,row)     {
      if(err){
        throw error;
      }else{
        res.render('views/intercambio-salida.html',{name:req.session.username,data:row});
      }
    });
  }
});

app.post('/convenios',encoder,function(req,res){
  var con = require('./config');
  if(req.body.form=="guardar"){
    var sql = "UPDATE convenios SET PERIODO_ID=?,PERIODO=?,CONVENIO_VINCID=?,CONVENIO_VINC=?,FECHA=?,SECTOR_ID=?,SECTOR=?"
    +",ORIGEN_ID=?,ORIGEN=?,PAIS_VINC=?,INST_ORG=?,COOP=?,INVE=?,INTER=?,MOVI=?,validar=? WHERE ID="+req.body.id;
    
      con.query(sql, [parseInt(req.body.periodoId),req.body.periodo,parseInt(req.body.convenioVincId),
        req.body.convenioVinc,req.body.fecha,parseInt(req.body.sectorId),
        req.body.sector,parseInt(req.body.origenId),req.body.origen,
        req.body.paisVinc,req.body.instOrg,parseInt(req.body.coop),
        parseInt(req.body.inve),parseInt(req.body.inter),parseInt(req.body.movi),1,parseInt(req.body.id)], function (err, result) {
        if (err) throw err;
        console.log("Number of records updated: " + result.affectedRows);
      });
  }else if(req.body.form=="validar"){
    con.query("update convenios set validar=1 where ID="+req.body.id,function(err,row){
      if(err) throw err;
      console.log("Number of record validated: " + row.affectedRows);
    });
  }
  res.redirect('/main');
});

//formularios inputs
app.post('/', encoder, function(req, res){
  var con = require('./config');

  if(req.body.form == "login"){
  //DIEGO para agregar contraseñas la funcion password no esta soportada en mysql 8
  // debemos usar la funcion directa UPPER(SHA1(UNHEX(SHA1('qwerty'))))
  //asi quedaria insert into usuarios (USUARIO, PASSWORD, TIPO) values ('judith',UPPER(SHA1(UNHEX(SHA1('qwerty')))), 'Coordinador');


	  /* login */
	  var username = req.body.username;
	  var password = req.body.password;
	  con.query("select * from usuarios where USUARIO = ? and PASSWORD = UPPER(SHA1(UNHEX(SHA1(?))))", [username, password], function(error, results, fields) {
		  if (error) throw error;
		  if (results  && results.length > 0) {
		    req.session.tipo=results[0].TIPO;
		    req.session.username=req.body.username;
		    console.log("Sesion iniciada: "+req.session.username +"\ntipo: "+req.session.tipo);
			  res.redirect("/main");
		  } else {
		    console.log("LOGIN INCORRECTO: "+ results)
			  res.redirect("/");
		  }
	  })
	  /* falta probar y probablemente arreglar el query */
  }
  
  if(req.body.form == "movilidad-entrada"){
    con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
      var sql = "INSERT INTO movilidad_academica_entrada (`PERIODO_ID`,`PERIODO`,`CAMPUS_ID`,`CAMPUS_DESC`,`UNIDAD_ID`,`UNIDAD`,"
      +"`VISITANTE_ID`,`VISITANTE_NOMBRE`,`VISITANTE_APELLIDO1`,`VISITANTE_APELLIDO2`,`SEXO_ID`,`SEXO`,`NIVEL_ID`,`NIVEL`,`DISCAPACIDAD`,"
      +"`HABLANTE_INDIGENA`,`ORIGEN_INDIGENA`,`UE`,`UE_PAIS`,`UE_ENTIDAD`,`UE_IDIOMA`,`TMA_ID`,`TMA`,`validar`,`AUTOR`} ) VALUES ?";
      var sexo,nivel,tma;
      
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
      
      if(req.body.tmaId == 1)
        tma="Docencia"
      else if(req.body.tmaId ==2)
        tma="Estancias Sabaticas"
      else
        tma="Estancia de Investigacion"
      
      
      var values = [
        [parseInt(req.body.periodoId),req.body.periodo,parseInt(req.body.campusId),
        req.body.campus,parseInt(req.body.unidadId),req.body.unidad,
        parseInt(req.body.visistanteId),req.body.visitante_nombre,
        req.body.apellido1,req.body.apellido2,parseInt(req.body.sexoId),
        sexo,parseInt(req.body.nivelId),nivel,parseInt(req.body.discapacidadId),
        parseInt(req.body.hablanteId),parseInt(req.body.origenId),req.body.ue,
        req.body.uePais,req.body.ueEntidad,req.body.ueIdioma,
        parseInt(req.body.tmaId),tma,0,req.session.username]
      ];
      con.query(sql, [values], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
      });
    });
    console.log(req.body.periodo);
    res.redirect('/main');
  }else if(req.body.form == "movilidad-salida"){
      console.log("Connected!");
      var sql = "INSERT INTO movilidad_academica_salida (`PERIODO_ID`,`PERIODO`,`CAMPUS_ID`,`CAMPUS_DESC`,`UNIDAD_ID`,`UNIDAD`,"
      +"`EMPLEADO_ID`,`EMPLEADO_NOMBRE`,`EMPLEADO_APELLIDO1`,`EMPLEADO_APELLIDO2`,`SEXO_ID`,`SEXO`,"
      +"`UR`,`UR_PAIS`,`UR_ENTIDAD`,`UR_IDIOMA`,`TMA_ID`,`TMA`,`validar`,`AUTOR`) VALUES ?";
      var tma,sexo,nivel;
      
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
      
      if(req.body.tmaId == 1)
        tma="Docencia"
      else if(req.body.tmaId ==2)
        tma="Estancias Sabaticas"
      else
        tma="Estancia de Investigacion"
      
      var values = [
        [parseInt(req.body.periodoId),req.body.periodo,parseInt(req.body.campusId),
        req.body.campus,parseInt(req.body.unidadId),req.body.unidad,
        parseInt(req.body.empleadoId),req.body.empleado_nombre,
        req.body.apellido1,req.body.apellido2,parseInt(req.body.sexoId),
        sexo,req.body.ur,req.body.urPais,req.body.urEntidad,
        req.body.urIdioma,parseInt(req.body.tmaId),tma,0,req.session.username]
      ];
      con.query(sql, [values], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
      });
    console.log(req.body.form);
    res.redirect('/main');
  }else if(req.body.form == "convenios"){
    con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
      var sql = "INSERT INTO convenios (`PERIODO_ID`,`PERIODO`,`CONVENIO_VINCID`,`CONVENIO_VINC`,`FECHA`,`SECTOR_ID`,"
      +"`SECTOR`,`ORIGEN_ID`,`ORIGEN`,`PAIS_VINC`,`INST_ORG`,"
      +"`COOP`,`INVE`,`INTER`,`MOVI`,`validar`,`AUTOR`) VALUES ?";
      
      var values = [
        [parseInt(req.body.periodoId),req.body.periodo,parseInt(req.body.convenioVincId),
        req.body.convenioVinc,req.body.fecha,parseInt(req.body.sectorId),
        req.body.sector,parseInt(req.body.origenId),req.body.origen,
        req.body.paisVinc,req.body.instOrg,parseInt(req.body.coop),
        parseInt(req.body.inve),parseInt(req.body.inter),parseInt(req.body.movi),0,req.session.username]
      ];
      con.query(sql, [values], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
      });
    });
    console.log(req.body.form);
    res.redirect('/main');
  }else if(req.body.form == "intercambio-entrada"){
    con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
      var sql = "INSERT INTO intercambio_estudiantil_entrada (`PERIODO_ID`,`PERIODO`,`CAMPUS_ID`,`CAMPUS_DESC`,`UNIDAD_ID`,`UNIDAD`,"
      +"`NIVEL_ID`,`NIVEL`,`PROGRAMA_ID`,`PROGRAMA_DESC`,`AREA_ID`,`AREA`,`ESTUDIANTE_ID`,`ESTUDIANTE_NOMBRE`,`ESTUDIANTE_APELLIDO1`,`ESTUDIANTE_APELLIDO2`,`SEXO_ID`,`SEXO`,`DISCAPACIDAD`,"
      +"`HABLANTE_INDIGENA`,`ORIGEN_INDIGENA`,`UR`,`UR_PAIS`,`UR_ENTIDAD`,`UR_IDIOMA`,`FINAN_ID`,`FINAN`,`FINAN_VAL`,`DATE_START`,`DATE_END`,`validar`,`AUTOR`) VALUES ?"
      var nivel,sexo,finan;
      
      if(req.body.sexoId == 1)
        sexo="Femenino"
      else
        sexo="Masculino"
        
      if(req.body.finanId == 1)
        finan="Si"
      else
        finan="No"
      
      if(req.body.nivelId == 1)
        nivel="Licenciatura"
      else if (req.body.nivelId == 2)
        nivel="Especialidad"
      else if (req.body.nivelId == 3)
        nivel="Maestria"
      else
        nivel="Doctorado"
      
      var values = [
        [parseInt(req.body.periodoId),req.body.periodo,parseInt(req.body.campusId),req.body.campus,parseInt(req.body.unidadId),req.body.unidad,
        parseInt(req.body.nivelId),nivel,parseInt(req.body.programaId),req.body.programa,parseInt(req.body.areaId),req.body.area,parseInt(req.body.estudianteId),
        req.body.estudiante_nombre,req.body.apellido1,req.body.apellido2,parseInt(req.body.sexoId),sexo,parseInt(req.body.discapacidadId),parseInt(req.body.hablanteId),parseInt(req.body.origenId),
        req.body.ue,req.body.uePais,req.body.ueEntidad,req.body.ueIdioma,parseInt(req.body.finanId),finan,parseInt(req.body.finan_val),req.body.fechaInicio,req.body.fechaFinal,0,req.session.username]
      ];
      con.query(sql, [values], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
      });
    });
    console.log(req.body.form);
    res.redirect('/main');
  }else if(req.body.form == "intercambio-salida"){
    con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
      var sql = "INSERT INTO intercambio_estudiantil_salida (`PERIODO_ID`,`PERIODO`,`CAMPUS_ID`,`CAMPUS_DESC`,`UNIDAD_ID`,`UNIDAD`,"
      +"`NIVEL_ID`,`NIVEL`,`PROGRAMA_ID`,`PROGRAMA_DESC`,`AREA_ID`,`AREA`,`ESTUDIANTE_ID`,`ESTUDIANTE_NOMBRE`,`ESTUDIANTE_APELLIDO1`,`ESTUDIANTE_APELLIDO2`,`SEXO_ID`,`SEXO`,`DISCAPACIDAD`,"
      +"`HABLANTE_INDIGENA`,`ORIGEN_INDIGENA`,`UR`,`UR_PAIS`,`UR_ENTIDAD`,`UR_IDIOMA`,`FINAN_ID`,`FINAN`,`FINAN_VAL`,`DATE_START`,`DATE_END`,`validar`,`AUTOR`) VALUES ?"
      var nivel,sexo,finan;
      
      if(req.body.sexoId == 1)
        sexo="Femenino"
      else
        sexo="Masculino"
        
      if(req.body.finanId == 1)
        finan="Si"
      else
        finan="No"
      
      if(req.body.nivelId == 1)
        nivel="Licenciatura"
      else if (req.body.nivelId == 2)
        nivel="Especialidad"
      else if (req.body.nivelId == 3)
        nivel="Maestria"
      else
        nivel="Doctorado"
      
      var values = [
        [parseInt(req.body.periodoId),req.body.periodo,parseInt(req.body.campusId),req.body.campus,parseInt(req.body.unidadId),req.body.unidad,
        parseInt(req.body.nivelId),nivel,parseInt(req.body.programaId),req.body.programa,parseInt(req.body.areaId),req.body.area,parseInt(req.body.estudianteId),
        req.body.estudiante_nombre,req.body.apellido1,req.body.apellido2,parseInt(req.body.sexoId),sexo,parseInt(req.body.discapacidadId),parseInt(req.body.hablanteId),parseInt(req.body.origenId),
        req.body.ue,req.body.uePais,req.body.ueEntidad,req.body.ueIdioma,parseInt(req.body.finanId),finan,parseInt(req.body.finan_val),req.body.fechaInicio,req.body.fechaFinal,0,req.session.username]
      ];
      con.query(sql, [values], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
      });
    });
    console.log(req.body.form);
    res.redirect('/main');
  }
  
  
  
});

app.listen(process.env.port || 4000);

console.log('Running at Port 4000');
