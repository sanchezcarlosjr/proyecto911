const excelJS = require('exceljs');
var mysqlConf = require('../js/config').mysql_pool;

function get_info(callback){
  mysqlConf.getConnection(function (err, connection) {
      connection.query('SELECT * FROM movilidad_academica_entrada' , function (err, rows, fields) {
      console.log("Query correcto");
    
      lsq = rows;
      //console.log(worksheet)
      connection.release();   //---> don't forget the connection release.
      
      return callback(rows);
    });
  }); 
}

var lsq;

get_info(function(rows){
  lsq = rows;
  //console.log(lsq);
  //rest of your code goes in here
});


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
    { header: "Campus id", key: "CAMPUS_ID", width: 10 },
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
    
  ];
  
  
  // Looping through User data
  let counter = 1;
  lsq.forEach((row) => {
    
    worksheet.addRow(row); // Add data in worksheet
  });
  
  
  // Making first line in excel bold
  worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
  });
  console.log("SEGUNDO WOORKSHEET---------------------------------------")

  
  try {  
    const data = await workbook.xlsx.writeFile( path + "/move-ent-report.xlsx")
   .  then(() => {
        res.send({
          status: "success",
          message: "file successfully downloaded",
          path: path + "/users.xlsx",
        });
   });
   }catch (err) {
     res.send({
      status: "error",
      message: "Something went wrong",
      path: path + "/users.xlsx",
     });
   }
};
module.exports = exportData;