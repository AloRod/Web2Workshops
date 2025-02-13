require('dotenv').config();  // Cargar las variables de entorno

const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;  // Obtener la cadena de conexión desde .env
const routes = require('./routes/routes'); // Importar las rutas
const app = express();
app.use(express.json());

// Conectar a MongoDB
mongoose.connect(mongoString);  
const database = mongoose.connection;  // referencia a la conexión de la base de datos

// Manejar los errores de conexión
database.on('error', (error) => {
    console.log('Error al conectar a la base de datos:', error);
});

// Mensaje de éxito cuando la conexión es exitosa
database.once('connected', () => {
    console.log('Conexión exitosa a la base de datos');
});

// Usar las rutas definidas en routes.js
app.use('/api', routes);  // Definir que las rutas comienzan con /api

// Iniciar el servidor
app.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000');
});


