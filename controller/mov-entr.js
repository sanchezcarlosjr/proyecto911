const excelJS = require('exceljs');
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "jorge",
  password: "qwerty",
  database: "911db"
});

async function get_info(callback){
  con.query('SELECT * FROM movilidad_academica_entrada where validar=1', function(error, results, fields) {
		  if (results != null) {
		    console.log("Reporte generado con exito");
			  
			  return callback(results);
		  } else {
		    console.log("Error")
		  }    
		  res.end();
	  });
}

var lsq;



const exportData = async (req, res) => {
  // WRITE DOWNLOAD EXCEL LOGIC
  const workbook = new excelJS.Workbook();  // Create a new workbook  
  const worksheet = workbook.addWorksheet("Movilidad academica de entrada"); // New Worksheet  
  const path = "./files";  // Path to download excel
  
    // Column for data in excel. key must match data key
  worksheet.columns = [    
    
    { header: "Id", key: "ID", width: 10 },
    { header: "Periodo Id", key: "PERIODO_ID", width: 10 },
    { header: "Periodo", key: "PERIODO", width: 10 },
    { header: "Campus Id", key: "CAMPUS_ID", width: 10 },
    { header: "Campus", key: "CAMPUS_DESC", width: 10 },
    { header: "Unidad ID", key: "UNIDAD_ID", width: 10 },
    { header: "Unidad", key: "UNIDAD", width: 10 },
    { header: "Visitante ID", key: "VISITANTE_ID", width: 10 },
    { header: "Visitante Nombre", key: "VISITANTE_NOMBRE", width: 10 },
    { header: "Apellido paterno", key: "VISITANTE_APELLIDO1", width: 10 },
    { header: "Apellido materno", key: "VISITANTE_APELLIDO2", width: 10 },
    { header: "Sexo id", key: "SEXO_ID", width: 10 },
    { header: "Sexo", key: "SEXO", width: 10 },
    { header: "Nivel ID", key: "NIVEL_ID", width: 10 },
    { header: "Nivel", key: "NIVEL", width: 10 },
    { header: "Discapacidad", key: "DISCAPACIDAD", width: 10 },
    { header: "Hablante indigena", key: "HABLANTE_INDIGENA", width: 10 },
    { header: "Origen indigena", key: "ORIGEN_INDIGENA", width: 10 },
    { header: "Unidad emisora", key: "UE", width: 10 },
    { header: "Unidad pais", key: "UE_PAIS", width: 10 },
    { header: "Unidad entidad", key: "UE_ENTIDAD", width: 10 },
    { header: "Unidad idioma", key: "UE_IDIOMA", width: 10 },
    { header: "TMA id", key: "TMA_ID", width: 10 },
    { header: "validado", key: "validar", width: 10 },
    { header: "Tipo de movilidad", key: "TMA", width: 10 },
    { header: "Autor", key: "AUTOR", width: 10 },
    
  ];
  
  get_info(function(rows){
    lsq = rows;
    //console.log(lsq);
    //rest of your code goes in here
    
    // Looping through User data
    let counter = 1;
    lsq.forEach((row) => {
      
      worksheet.addRow(row); // Add data in worksheet
    });
    
    
    // Making first line in excel bold
    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
    });
    try {  
      var data = workbook.xlsx.writeFile( path + "/reporte-movilidad-entrada.xlsx")
   .  then(() => {
        res.download(path + "/reporte-movilidad-entrada.xlsx");
        /*res.send({
          status: "success",
          message: "file successfully downloaded",
          path: path + "/users.xlsx",
        });*/
     });
     }catch (err) {
       res.send({
        status: "error",
        message: "Something went wrong",
        path: path + "/users.xlsx",
       });
     }
  });

};
module.exports = exportData;
