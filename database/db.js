// Importando Sequelize
import {Sequelize} from "sequelize";
import 'dotenv/config'
// const mysql = require('mysql');
// const xlsx = require('xlsx');

// Conexion a la base de datos database_app
const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST, 
    dialect: 'mysql'
})


// Exportando la base de datos
export default db
