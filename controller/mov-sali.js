const excelJS = require('exceljs');
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "jorge",
  password: "qwerty",
  database: "911db"
});

async function get_info(callback){
  con.query('SELECT * FROM movilidad_academica_salida', function(error, results, fields) {
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
  const worksheet = workbook.addWorksheet("Movilidad academica de salida"); // New Worksheet  
  const path = "./files";  // Path to download excel
  
    // Column for data in excel. key must match data key
  worksheet.columns = [    
    
    { header: "Id", key: "ID", width: 10 },
    { header: "Periodo Id", key: "PERIODO_ID", width: 10 },
    { header: "Periodo", key: "PERIODO", width: 10 },
    { header: "Campus Id", key: "CAMPUS_ID", width: 10 },
    { header: "Campus", key: "CAMPUS_DESC", width: 10 },
    { header: "Unidad Id", key: "UNIDAD_ID", width: 10 },
    { header: "Unidad", key: "UNIDAD", width: 10 },
    { header: "Empleado Id", key: "EMPLEADO_ID", width: 10 },
    { header: "Empleado Nombre", key: "EMPLEADO_NOMBRE", width: 10 },
    { header: "Apellido Paterno", key: "EMPLEADO_APELLIDO1", width: 10 },
    { header: "Apellido Materno", key: "EMPLEADO_APELLIDO2", width: 10 },
    { header: "Sexo Id", key: "SEXO_ID", width: 10 },
    { header: "Sexo", key: "SEXO", width: 10 },
    { header: "Unidad Receptora", key: "UR", width: 10 },
    { header: "Unidad Pais", key: "UR_PAIS", width: 10 },
    { header: "Unidad Entidad", key: "UR_ENTIDAD", width: 10 },
    { header: "Unidad Idioma", key: "UR_IDIOMA", width: 10 },
    { header: "TMA Id", key: "TMA_ID", width: 10 },
    { header: "Tipo de movilidad", key: "TMA", width: 10 }, 
    { header: "Validado", key: "validar", width: 10 },
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
      var data = workbook.xlsx.writeFile( path + "/reporte-movilidad-salida.xlsx")
   .  then(() => {
        res.download(path + "/reporte-movilidad-salida.xlsx");
     });
     }catch (err) {
       res.send({
        status: "error",
        message: "Something went wrong",
        path: path + "/reporte-movilidad-salida.xlsx",
       });
     }
  });

};
module.exports = exportData;
