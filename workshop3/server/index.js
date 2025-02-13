const express = require('express');
const app = express();
const mongoose = require("mongoose");
const port = 3000;
// Conexión a la base de datos Workshop4
const db=mongoose.connect("mongodb://127.0.0.1:27017/Workshop4", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("Conexion exitosa"))
  .catch(err => console.error(" Error al conectar con MongoDB:", err));

// Middleware
app.use(cors({ domains: '*', methods: "*" }));
app.use(bodyParser.json());

// Importar controladores
const { taskPatch, taskPost, taskGet } = require("./controllers/taskController.js");
const { teacherPost, teacherGet, teacherPut, teacherDelete } = require("./controllers/teacherController.js");

// Rutas de Tasks
app.get("/api/tasks", taskGet);
app.post("/api/tasks", taskPost);
app.patch("/api/tasks", taskPatch);
app.put("/api/tasks", taskPatch);

// Rutas de Teachers
app.get("/api/teachers", teacherGet);
app.post("/api/teachers", teacherPost);
app.put("/api/teachers/:id", teacherPut);
app.delete("/api/teachers/:id", teacherDelete);

app.listen(port, () => console.log(`Servidor corriendo en http://localhost:${port}`));