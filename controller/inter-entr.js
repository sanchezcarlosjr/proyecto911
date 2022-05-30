const excelJS = require('exceljs');
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "jorge",
  password: "qwerty",
  database: "911db"
});

async function get_info(callback){
  con.query('SELECT * FROM intercambio_estudiantil_entrada where validar=1', function(error, results, fields) {
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
  const worksheet = workbook.addWorksheet("Intercambio Estudiantil de entrada"); // New Worksheet  
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
    { header: "Nivel Id", key: "NIVEL_ID", width: 10 },  
    { header: "Nivel", key: "NIVEL", width: 10 }, 
    { header: "Programa Id", key: "PROGRAMA_ID", width: 10 },  
    { header: "Programa", key: "PROGRAMA_DESC", width: 10 },
    { header: "Area Id", key: "AREA_ID", width: 10 },  
    { header: "Area", key: "AREA", width: 10 }, 
    { header: "Estudiante Id", key: "ESTUDIANTE_ID", width: 10 },  
    { header: "Estudiante Nombre", key: "ESTUDIANTE_NOMBRE", width: 10 }, 
    { header: "Apellido Paterno", key: "ESTUDIANTE_APELLIDO1", width: 10 }, 
    { header: "Apellido Materno", key: "ESTUDIANTE_APELLIDO2", width: 10 }, 
    { header: "Sexo Id", key: "SEXO_ID", width: 10 },
    { header: "Sexo", key: "SEXO", width: 10 },
    { header: "Discapacidad", key: "DISCAPACIDAD", width: 10 }, 
    { header: "Hablante Indigena", key: "HABLANTE_INDIGENA", width: 10 },
    { header: "Origen Indigena", key: "ORIGEN_INDIGENA", width: 10 }, 
    { header: "Unidad Receptora", key: "UR", width: 10 }, 
    { header: "Unidad Pais", key: "UR_PAIS", width: 10 }, 
    { header: "Unidad Entidad", key: "UR_ENTIDAD", width: 10 }, 
    { header: "Unidad Idioma", key: "UR_IDIOMA", width: 10 }, 
    { header: "Financiamiento Id", key: "FINAN_ID", width: 10 },
    { header: "Financiamiento", key: "FINAN", width: 10 },
    { header: "Finan Cantidad", key: "FINAN_VAL", width: 10 }, 
    { header: "Fecha Inicio", key: "DATE_START", width: 10 },
    { header: "Fecha Terminacion", key: "DATE_END", width: 10 },
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
      var data = workbook.xlsx.writeFile( path + "/reporte-intercambio-entrada.xlsx")
   .  then(() => {
        res.download(path + "/reporte-intercambio-entrada.xlsx");
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
