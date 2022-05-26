const excelJS = require('exceljs');
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "jorge",
  password: "qwerty",
  database: "911db"
});

async function get_info(callback){
  con.query('SELECT * FROM convenios', function(error, results, fields) {
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
    { header: "Convenio ID", key: "CONVENIO_VINCID", width: 10 },
    { header: "Convenio de vinculación", key: "CONVENIO_VINC", width: 10 },
    { header: "Fecha", key: "FECHA", width: 10 },
    { header: "Sector Id", key: "SECTOR_ID", width: 10 },
    { header: "Sector", key: "SECTOR", width: 10 }, 
    { header: "Origen Id", key: "ORIGEN_ID", width: 10 }, 
    { header: "Origen", key: "ORIGEN", width: 10 }, 
    { header: "Pais Vinculado", key: "PAIS_VINC", width: 10 }, 
    { header: "Institución y Organizacion", key: "INST_ORG", width: 10 }, 
    { header: "Cooperacion Academica", key: "COOP", width: 10 }, 
    { header: "Convenio Investivagion", key: "INVE", width: 10 },
    { header: "Convenio de Intercambio", key: "INTER", width: 10 },
    { header: "Convenio de Movilidad", key: "MOVI", width: 10 }, 
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
      var data = workbook.xlsx.writeFile( path + "/reporte-convenios.xlsx")
   .  then(() => {
        res.download(path + "/reporte-convenios.xlsx");
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
