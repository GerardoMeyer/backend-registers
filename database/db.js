// Importando Sequelize
import {Sequelize} from "sequelize";
// const mysql = require('mysql');
// const xlsx = require('xlsx');

// Conexion a la base de datos database_app
const db = new Sequelize('nomina_sypris', 'usuario2', 'usuario2', {
    host: '172.27.98.46', 
    dialect: 'mysql'
})


// Exportando la base de datos
export default db
