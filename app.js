// Importando express
import express from "express";

// Importando cors
import cors from 'cors';

// Importamos la conexion a la BD
import db from "./database/db.js";

// Importamos nuestro enrutador
import router from './routes/routes.js';


// Variable de express
const app = express()

// Instancias principales para la conexion con la base de datos
app.use(cors())
app.use(express.json())
app.use('/registros', router)

// Probando la conexion a la base de datos
try {
    await db.authenticate()
    console.log('Conexion exitosa a la BD de registros')
} catch (error) {
    console.log(`Error de conexion es: ${error}`)
}

// Corriendo el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`)
})


// Rutas para generar el registro
app.post('/', (req, res) => { // Variables, que pasan despues como registro
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password


    // Haciendo la insercion a la base de datos
    db.query("INSERT INTO registros (name, email, password) VALUES (?,?,?)", [
        name, email, password
    ], (error) => {
        res.send({error: error})
    })
})

// Rutas para validar el Login
app.get('/:email/:password', (req, res) => {
    const {email, password} = req.body

    // Haciendo la busqueda en la base de datos
    db.query("SELECT * FROM registros WHERE email = ? AND password = ?", [
        email, password
    ], (error, result) => { // Si encuentra un error
        if (error) {
            res.send({error: error})
        }

        // Si encuentra un registro
        if (result.length > 0) {
            res.send(result)
        } else {
            res.send({message: "El usuario y/o clave son incorrectas"})
        }

    })
})

