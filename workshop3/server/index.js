require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Conectar a MongoDB 
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('Error al conectar a MongoDB:', err));

// Importar rutas
const teacherRoutes = require('./routes/routes'); 
app.use('/teachers', teacherRoutes); // Ahora las rutas estarán en "/teachers"
const CourseRoutes = require('./routes/routes'); 
app.use('/courses', CourseRoutes); // Ahora las rutas estarán en "/courses"

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
