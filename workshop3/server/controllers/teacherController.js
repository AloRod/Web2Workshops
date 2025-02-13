const Teacher = require("../models/teacherModel");

/**
 * Crear un profesor (POST)
 */
const teacherPost = (req, res) => {
  const teacher = new Teacher({
    name: req.body.name,
    subject: req.body.subject
  });

  teacher.save()
    .then(newTeacher => res.status(201).json(newTeacher))
    .catch(err => res.status(400).json({ error: err.message }));
};

/**
 * Obtener todos los profesores (GET)
 */
const teacherGet = (req, res) => {
  Teacher.find()
    .then(teachers => res.json(teachers))
    .catch(err => res.status(500).json({ error: err.message }));
};

/**
 * Actualizar un profesor (PUT)
 */
const teacherPut = (req, res) => {
  Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(updatedTeacher => res.json(updatedTeacher))
    .catch(err => res.status(400).json({ error: err.message }));
};

/**
 * Eliminar un profesor (DELETE)
 */
const teacherDelete = (req, res) => {
  Teacher.findByIdAndDelete(req.params.id)
    .then(() => res.json({ message: "Profesor eliminado correctamente" }))
    .catch(err => res.status(400).json({ error: err.message }));
};

module.exports = { teacherPost, teacherGet, teacherPut, teacherDelete };
